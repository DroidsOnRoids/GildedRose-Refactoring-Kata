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

class Product {
    item: Item;

    constructor(item: Item){
        this.item = item;
    }

    update(): void {
        const item = this.item;
        if (item.name != GildedRose.AGED_BRIE && item.name != GildedRose.BACKSTAGE) {
            if (item.quality > 0) {
                if (item.name != GildedRose.SULFURAS) {
                    item.quality = item.quality - 1
                }
            }
        } else {
            if (item.quality < 50) {
                item.quality = item.quality + 1
                if (item.name == GildedRose.BACKSTAGE) {
                    if (item.sellIn < 11) {
                        if (item.quality < 50) {
                            item.quality = item.quality + 1
                        }
                    }
                    if (item.sellIn < 6) {
                        if (item.quality < 50) {
                            item.quality = item.quality + 1
                        }
                    }
                }
            }
        }
        if (item.name != GildedRose.SULFURAS) {
            item.sellIn = item.sellIn - 1;
        }
        if (item.sellIn < 0) {
            if (item.name != GildedRose.AGED_BRIE) {
                if (item.name != GildedRose.BACKSTAGE) {
                    if (item.quality > 0) {
                        if (item.name != GildedRose.SULFURAS) {
                            item.quality = item.quality - 1
                        }
                    }
                } else {
                    item.quality = item.quality - item.quality
                }
            } else {
                if (item.quality < 50) {
                    item.quality = item.quality + 1
                }
            }
        }
    }
}


export class GildedRose {
    products: Array<Product>;
    public static readonly AGED_BRIE = 'Aged Brie';
    public static readonly BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert';
    public static readonly SULFURAS = 'Sulfuras, Hand of Ragnaros';
    public static readonly MIN_QUALITY = 0;
    public static readonly MAX_QUALITY = 50;

    constructor(items = []) {
        this.products = items.map((item) => (new Product(item)));
    }

    updateQuality() {
        this.products.forEach((product) => { product.update(); })
        return this.products.map((product) => product.item);
    }
}

export const AgedBrieFactory = (initialQuality: number, initialSellIn: number) => {
    return new Item(
        GildedRose.AGED_BRIE,
        initialSellIn,
        initialQuality,
    );
}
