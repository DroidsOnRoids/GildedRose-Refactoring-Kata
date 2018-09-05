import { ItemFactory } from './item-factory';
import { Item } from './item';

export class GildedRose {
    items: Array<Item>;

    constructor(items = []) {
        this.items = items;
    }

    updateQuality() {
        for (let i=0; i < this.items.length; i+=1) {
            const rawItem = this.items[i];
            let item = ItemFactory.getItem(rawItem);
            // switch (rawItem.name) {
            //     case GildedRose.AGED_BRIE:
            //         item = new AgedBrie(rawItem.name, rawItem.sellIn, rawItem.quality);
            //         break;
            //     case GildedRose.BACKSTAGE:
            //         item = new Backstage(rawItem.name, rawItem.sellIn, rawItem.quality);
            //         break;
            //     case GildedRose.SULFURAS:
            //         item = new Sulfuras(rawItem.name, rawItem.sellIn, rawItem.quality);
            //         break;
            //     default:
            //         item = new RegularItem(rawItem.name, rawItem.sellIn, rawItem.quality);
            //         break;
            // }
            item.update();
            this.items[i] = item;
        }
        return this.items;
    }
}
