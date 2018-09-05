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
        this.updateSellIn(item);
        const updater = QualityUpdaterFactory.get(item);
        updater.update(item);
    }
}

