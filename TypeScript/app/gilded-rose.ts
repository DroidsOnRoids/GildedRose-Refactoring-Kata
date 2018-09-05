import QualityUpdaterFactory from "./quality-updater-factory";

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
        this.items.forEach(this.updateItem)
        return this.items;
    }

    updateSellIn = (item:Item):void =>{
        item.sellIn -= 1;
    }

    updateItem = (item:Item):void => {
        const {AGED_BRIE,SULFURAS,BACKSTAGE} = GildedRose;
        this.updateSellIn(item);
        const updater = QualityUpdaterFactory.get(item);
        updater.update(item);
    }
}

