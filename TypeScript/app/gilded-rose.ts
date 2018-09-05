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

export class RegularItem extends Item {
    increaseQualityRespectingLimit(howMany) {
        this.quality = Math.min(this.quality+howMany, GildedRose.MAX_QUALITY);
    }

    decreaseQualityRespectingLimit(howMany) {
        this.quality = Math.max(this.quality-howMany, GildedRose.MIN_QUALITY);
    }

    updateQuality() {
        if (this.sellIn < 1) {
            this.decreaseQualityRespectingLimit(2);
        } else {
            this.decreaseQualityRespectingLimit(1);
        }
    }

    updateSellIn() {
        this.sellIn -= 1;
    }

    update() {
        this.updateQuality();
        this.updateSellIn();
    }
}

export class AgedBrie extends RegularItem {
    updateQuality() {
        if (this.sellIn > 0) {
            this.increaseQualityRespectingLimit(1);
        }
    }
}

export class Backstage extends RegularItem {
    updateQuality() {
        if (this.sellIn < 1) {
            this.quality = 0;
        } else if (this.sellIn < 6) {
            this.increaseQualityRespectingLimit(3);
        } else if (this.sellIn < 11) {
            this.increaseQualityRespectingLimit(2);
        } else {
            this.increaseQualityRespectingLimit(1);
        }
    }
}

export class Sulfuras extends RegularItem {
    updateQuality() {}
    updateSellIn() {}
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
        for (let i=0; i < this.items.length; i+=1) {
            const rawItem = this.items[i];
            let item;
            switch (rawItem.name) {
                case GildedRose.AGED_BRIE:
                    item = new AgedBrie(rawItem.name, rawItem.sellIn, rawItem.quality);
                    break;
                case GildedRose.BACKSTAGE:
                    item = new Backstage(rawItem.name, rawItem.sellIn, rawItem.quality);
                    break;
                case GildedRose.SULFURAS:
                    item = new Sulfuras(rawItem.name, rawItem.sellIn, rawItem.quality);
                    break;
                default:
                    item = new RegularItem(rawItem.name, rawItem.sellIn, rawItem.quality);
                    break;
            }
            item.update();
            this.items[i] = item;
        }
        return this.items;
    }
}
