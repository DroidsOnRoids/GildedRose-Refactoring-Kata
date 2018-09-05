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
                this.incrementQualityRespectingLimit(item);
            }
            return;
        }
        if (item.name === GildedRose.BACKSTAGE) {
            this.incrementQualityRespectingLimit(item);
            if (item.sellIn < 11) {
                this.incrementQualityRespectingLimit(item);
            }
            if (item.sellIn < 6) {
                this.incrementQualityRespectingLimit(item);
            }
            if (item.sellIn < 1) {
                item.quality = 0;
            }
            return;
        }

        this.decrementQualityRespectingLimit(item);
        if (item.sellIn < 1) {
            this.decrementQualityRespectingLimit(item);
        }
    }

    updateSellInOfItem(item) {
        if (item.name === GildedRose.SULFURAS) return;
        item.sellIn -= 1;
    }

    incrementQualityRespectingLimit(item) {
        item.quality = Math.min(item.quality+1, GildedRose.MAX_QUALITY);
    }

    decrementQualityRespectingLimit(item) {
        item.quality = Math.max(item.quality-1, GildedRose.MIN_QUALITY);
    }
}
