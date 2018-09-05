export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}


export class GildedRose {
    items: Array<Item>;
    public static readonly AGED_BRIE = 'Aged Brie';
    public static readonly BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert';
    public static readonly SULFURAS = 'Sulfuras, Hand of Ragnaros';
    public static readonly MIN_QUALITY = 0;
    public static readonly MAX_QUALITY = 50;

    constructor(items = []) {
        this.items = items;
    }

    updateQuality() {
        this.items.forEach(this.updateItem.bind(this));
        return this.items;
    }

    updateItem(item) {
        this.updateQualityOfItem(item);
        this.updateSellInOfItem(item);
    }

    updateQualityOfItem(item) {
        if (item.name === GildedRose.SULFURAS) return;
        if (item.name === GildedRose.AGED_BRIE) {
            if (item.sellIn > 0) {
                this.increaseQualityRespectingLimit(item, 1);
            }
            return;
        }
        if (item.name === GildedRose.BACKSTAGE) {
            if (item.sellIn < 1) {
                item.quality = 0;
            } else if (item.sellIn < 6) {
                this.increaseQualityRespectingLimit(item, 3);
            } else if (item.sellIn < 11) {
                this.increaseQualityRespectingLimit(item, 2);
            } else {
                this.increaseQualityRespectingLimit(item, 1);
            }
            return;
        }

        if (item.sellIn < 1) {
            this.decreaseQualityRespectingLimit(item, 2);
        } else {
            this.decreaseQualityRespectingLimit(item, 1);
        }
    }

    updateSellInOfItem(item) {
        if (item.name === GildedRose.SULFURAS) return;
        item.sellIn -= 1;
    }

    increaseQualityRespectingLimit(item, howMany) {
        item.quality = Math.min(item.quality+howMany, GildedRose.MAX_QUALITY);
    }

    decreaseQualityRespectingLimit(item, howMany) {
        item.quality = Math.max(item.quality-howMany, GildedRose.MIN_QUALITY);
    }
}
