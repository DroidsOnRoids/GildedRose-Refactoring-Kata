import { Item } from "./gilded-rose";
import { QualityUpdater, AgedBrieUpdater, BackstageUpdater, SulfurasUpdater, ItemQualityUpdater } from "./quality-updater";
import { AGED_BRIE, BACKSTAGE, SULFURAS } from "./item-types";

export default class QualityUpdaterFactory{
    static get(item:Item):QualityUpdater{
        switch(item.name){
            case AGED_BRIE:
                return new AgedBrieUpdater();
             case BACKSTAGE:
                return new BackstageUpdater();
            case SULFURAS:
                return new SulfurasUpdater();
            default:
                return new ItemQualityUpdater();
        }
    }
}