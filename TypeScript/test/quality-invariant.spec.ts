import { expect } from 'chai';
import QualityInvariant from '../app/quality-invariant';
import { SULFURAS } from '../app/item-types';

describe('QualityInvariant', () =>{
    describe('verify', () =>{
        it('should return minimal quantity value if quality is below of it',() =>{
            expect(QualityInvariant.verify('lorem ipsum',QualityInvariant.MIN - 1)).to.equal(QualityInvariant.MIN);
        })
        it('should return max quantity value if quality is below of it',() =>{
            expect(QualityInvariant.verify('lorem ipsum',QualityInvariant.MAX + 1)).to.equal(QualityInvariant.MAX);
        })
        it('should return actual quantity value if it is in range',() =>{
            expect(QualityInvariant.verify('lorem ipsum',23)).to.equal(23);
        })
        it('should allow Sulfuras, Hand of Ragnaros to have quantity above maximum', () =>{
            expect(QualityInvariant.verify(SULFURAS, 80)).to.equal(80);
        })
    })
});