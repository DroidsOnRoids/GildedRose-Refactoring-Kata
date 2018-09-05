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

    updateNormalItem = (item:Item):void =>{
        item.sellIn -= 1;
        const degradValue = item.sellIn <0 ? 2 : 1
        item.quality = Math.max(GildedRose.MIN_QUALITY, item.quality - degradValue)
    }

    updateAgedBrie = (item:Item):void =>{
        item.sellIn -= 1;
        item.quality = Math.min(GildedRose.MAX_QUALITY, item.quality+1)
    }
    updateSulfuras = (item:Item):void =>{
        item.sellIn -=1;
    }

    updateBackstage = (item:Item):void => {
        item.sellIn -= 1;
        if(item.sellIn > 10){
            item.quality = Math.min(GildedRose.MAX_QUALITY, item.quality+1)
        } else if(item.sellIn >5){
            item.quality = Math.min(GildedRose.MAX_QUALITY, item.quality+2)
        } else if(item.sellIn > 0){
            item.quality = Math.min(GildedRose.MAX_QUALITY, item.quality+3)
        } else {
            item.quality = 0
        }
    }

    updateItem = (item:Item):void => {
        const {AGED_BRIE,SULFURAS,BACKSTAGE} = GildedRose;
        switch(item.name){
            case AGED_BRIE:
                this.updateAgedBrie(item);
                break;
            case SULFURAS:
                this.updateSulfuras(item);
                break;
            case BACKSTAGE:
                this.updateBackstage(item);
                break;
            default:
                this.updateNormalItem(item);
        }
    }
}
