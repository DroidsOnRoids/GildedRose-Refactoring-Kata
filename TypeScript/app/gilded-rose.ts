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

const updateItem1 = (item) => {
    if (item.quality > 0) {
        item.quality--
    }
}

const updateItem2 = (item) => {
    item.sellIn--
    if (item.sellIn >= 0) return

    if (item.quality > 0) {
        item.quality--
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
        this.items.forEach(this.updateItem)
        return this.items;
    }

    updateItem(item) {
        if (item.name == GildedRose.SULFURAS) return
        if (item.name == GildedRose.AGED_BRIE) {
            if (item.quality < 50) {
                item.quality++
            }
            item.sellIn--
            if (item.sellIn < 0) {
                if (item.quality < 50) {
                    item.quality++
                }
            }
            return
        }
        if (item.name == GildedRose.BACKSTAGE) {
            if (item.quality < 50) {
                item.quality++
            }
            if (item.sellIn < 11) {
                if (item.quality < 50) {
                    item.quality++
                }
            }
            if (item.sellIn < 6) {
                if (item.quality < 50) {
                    item.quality++
                }
            }
            item.sellIn--
            if (item.sellIn >= 0) return

            item.quality = 0

            return
        }

        updateItem1(item);
        updateItem2(item);
    }
}
