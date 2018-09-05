import {
    AGED_BRIE,
    BACKSTAGE,
    SULFURAS,
    MIN_QUALITY,
    MAX_QUALITY,
} from './constants';
import { Item } from './item';

class RegularItem extends Item {
    increaseQualityRespectingLimit(howMany) {
        this.quality = Math.min(this.quality+howMany, MAX_QUALITY);
    }

    decreaseQualityRespectingLimit(howMany) {
        this.quality = Math.max(this.quality-howMany, MIN_QUALITY);
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

class AgedBrie extends RegularItem {
    updateQuality() {
        if (this.sellIn > 0) {
            this.increaseQualityRespectingLimit(1);
        }
    }
}

class Backstage extends RegularItem {
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

class Sulfuras extends RegularItem {
    updateQuality() {}
    updateSellIn() {}
}

export class ItemFactory {
    static getItem(rawItem) {
        switch (rawItem.name) {
            case AGED_BRIE:
                return new AgedBrie(rawItem.name, rawItem.sellIn, rawItem.quality);
            case BACKSTAGE:
                return new Backstage(rawItem.name, rawItem.sellIn, rawItem.quality);
            case SULFURAS:
                return new Sulfuras(rawItem.name, rawItem.sellIn, rawItem.quality);
            default:
                return new RegularItem(rawItem.name, rawItem.sellIn, rawItem.quality);
        }
    }
}
