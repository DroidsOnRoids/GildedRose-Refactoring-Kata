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

        if (item.quality > 0) {
            item.quality = item.quality - 1;
        }

        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
            if (item.quality > 0) {
                item.quality = item.quality - 1;
            }
        }
    }
}

class AgedBireProduct extends Product {
    update(): void {
        this.item.sellIn = this.item.sellIn - 1;
        if (this.item.quality >= 50) return;
        this.item.quality = this.item.quality + 1;
    }
}

class BackStageProduct extends Product {
    update(): void {
        this.item.sellIn = this.item.sellIn - 1;
        this.item.quality = this.item.quality + 1
        if (this.item.sellIn < 11) {
            if (this.item.quality < 50) {
                this.item.quality = this.item.quality + 1
            }
        }
        if (this.item.sellIn < 6) {
            if (this.item.quality < 50) {
                this.item.quality = this.item.quality + 1
            }
        }

        if (this.item.sellIn < 0) {
            this.item.quality = 0;
        }
    }
}

class SulfurasProduct extends Product {
    update(): void {}
}

class Conjured extends Product {
    update(): void {}
}

const recognizeProduct = (item: Item): Product => {
    switch (item.name) {
        case GildedRose.AGED_BRIE: {
           return new AgedBireProduct(item);
        }
        case GildedRose.BACKSTAGE: {
            return new BackStageProduct(item);
        }
        case GildedRose.SULFURAS: {
            return new SulfurasProduct(item);
        }
        case 'Conjured': {
            return new Conjured(item);
        }
    }
    return new Product(item);
}


export class GildedRose {
    products: Array<Product>;
    public static readonly AGED_BRIE = 'Aged Brie';
    public static readonly BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert';
    public static readonly SULFURAS = 'Sulfuras, Hand of Ragnaros';
    public static readonly MIN_QUALITY = 0;
    public static readonly MAX_QUALITY = 50;

    constructor(items = []) {
        this.products = items.map(recognizeProduct);
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
