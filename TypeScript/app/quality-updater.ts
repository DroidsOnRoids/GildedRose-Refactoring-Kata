import { Item } from "./gilded-rose";
import QualityInvariant from "./quality-invariant";

interface QualityUpdater {
    update(item:Item):void
}

class ItemQualityUpdater implements QualityUpdater {
    update(item: Item): void {
        item.quality = QualityInvariant.verify(item.name,item.quality - this._getDegredValue(item));
    }

    protected _shouldDegradesTwice(item:Item):boolean{
        return item.sellIn <0;
    }

    protected _getDegredValue(item:Item):number{
        return this._shouldDegradesTwice(item) ? 2 : 1;
    }
}

class AgedBrieUpdater implements QualityUpdater{
    update(item: Item): void {
        item.quality = QualityInvariant.verify(item.name,item.quality+1);
    }

}

class BackstageUpdater implements QualityUpdater {
    update(item: Item): void {
        if(this._isWorthless(item)){
            item.quality = 0;
        } else{
            item.quality = QualityInvariant.verify(item.name,item.quality + this._getIncreasedValue(item));
        }
    }
    private _getIncreasedValue(item:Item):number {
        if(item.sellIn > 10){
            return 1;
        } else if(item.sellIn >5){
            return 2;
        } else {
            return 3;
        }
    }
    private _isWorthless(item:Item):boolean{
        return item.sellIn <= 0;
    }
}

class SulfurasUpdater implements QualityUpdater{
    update(item: Item): void {
    }
}

class ConjuredUpdater extends ItemQualityUpdater{
    protected _getDegredValue(item:Item):number{
        return this._shouldDegradesTwice(item) ? 4 : 2;
    }
}

export {
    QualityUpdater,
    ItemQualityUpdater,
    AgedBrieUpdater,
    BackstageUpdater,
    SulfurasUpdater,
    ConjuredUpdater,
}