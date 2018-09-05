import { SULFURAS } from "./item-types";

export default class QualityInvariant{
    public static readonly MAX = 50;
    public static readonly MIN = 0;

    static verify(name, quality):number{
        if(name === SULFURAS){
            return quality;
        }
        return Math.min(Math.max(this.MIN,quality),this.MAX);
    }
}