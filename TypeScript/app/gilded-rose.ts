import { ItemFactory } from './item-factory';
import { Item } from './item';

export class GildedRose {
    items: Array<Item>;

    constructor(items = []) {
        this.items = items;
    }

    updateQuality() {
        for (let i=0; i < this.items.length; i+=1) {
            let item = ItemFactory.getItem(this.items[i]);
            item.update();
            this.items[i] = item;
        }
        return this.items;
    }
}
