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


class UseByDate {
    constructor(private sellIn: number) {}

    isExpired(): boolean {
        return this.sellIn < 0
    }

    decrease(): void {
        this.sellIn = this.sellIn - 1
    }

    value(): number {
        return this.sellIn;
    }
}
class Product {
    protected useByDate: UseByDate
    name: string;
    _sellIn: number;
    quality: number;

    constructor({name,quality,sellIn}: Item){
        this.name = name;
        this.quality = quality;
        this._sellIn  = sellIn;
        this.useByDate = new UseByDate(this._sellIn)
    }

    get sellIn() {
        return this.useByDate.value()
    }


    update(): void {
        const item = this;

        if (item.quality > 0) {
            item.quality = item.quality - 1;
        }

        this.useByDate.decrease()
        if (this.useByDate.isExpired()) {
            if (item.quality > 0) {
                item.quality = item.quality - 1;
            }
        }
    }
}

class AgedBireProduct extends Product {
    update(): void {
        this.useByDate.decrease()
        if (this.quality >= 50) return;
        this.quality = this.quality + 1;
    }
}

class BackStageProduct extends Product {
    update(): void {
        this.useByDate.decrease()
        this.quality = this.quality + 1
        if (this.sellIn < 11) {
            if (this.quality < 50) {
                this.quality = this.quality + 1
            }
        }
        if (this.sellIn < 6) {
            if (this.quality < 50) {
                this.quality = this.quality + 1
            }
        }

        if (this.sellIn < 0) {
            this.quality = 0;
        }
    }
}

class SulfurasProduct extends Product {
    update(): void {}
}

class Conjured extends Product {
    update(): void {
        this.useByDate.decrease()

        if (this.useByDate.isExpired()){
            this.quality -=4;
        } else {
            this.quality = this.quality -2;
        }

    }
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
        case GildedRose.CONJURED: {
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
    public static readonly CONJURED = 'Conjured'
    public static readonly MIN_QUALITY = 0;
    public static readonly MAX_QUALITY = 50;

    constructor(items = []) {
        this.products = items.map(recognizeProduct);
    }

    updateQuality() {
        this.products.forEach((product) => { product.update(); })
        return this.products;
    }
}

export const AgedBrieFactory = (initialQuality: number, initialSellIn: number) => {
    return new Item(
        GildedRose.AGED_BRIE,
        initialSellIn,
        initialQuality,
    );
}
