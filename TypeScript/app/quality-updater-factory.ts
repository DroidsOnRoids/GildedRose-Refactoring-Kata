import { Item } from "./gilded-rose";
import { QualityUpdater, AgedBrieUpdater, BackstageUpdater, SulfurasUpdater, ItemQualityUpdater, ConjuredUpdater } from "./quality-updater";
import { AGED_BRIE, BACKSTAGE, SULFURAS, CONJURED } from "./item-types";

export default class QualityUpdaterFactory{
    static get(item:Item):QualityUpdater{
        switch(item.name){
            case AGED_BRIE:
                return new AgedBrieUpdater();
             case BACKSTAGE:
                return new BackstageUpdater();
            case SULFURAS:
                return new SulfurasUpdater();
            case CONJURED:
                return new ConjuredUpdater();
            default:
                return new ItemQualityUpdater();
        }
    }
}