import { expect } from 'chai';
import { GildedRose } from '../app/gilded-rose';
import { Item } from '../app/item';
import {
    AGED_BRIE,
    BACKSTAGE,
    SULFURAS,
    CONJURED,
} from '../app/constants';

describe('Gilded Rose', function () {
    const tick = (item) => {
      const gildedRose = new GildedRose([item]);
      const newItems = gildedRose.updateQuality();
      return newItems[0];
    }

    const expectName = (item, value) => expectProperty(item, 'name', value);
    const expectSellIn = (item, value) => expectProperty(item, 'sellIn', value);
    const expectQuality = (item, value) => expectProperty(item, 'quality', value);

    const expectProperty = (item, propertyName, value) => {
        it (`should have ${propertyName} equal ${value}`, () => {
            expect(item).to.have.property(propertyName, value);
        });
    };

    it('works in place', () => {
        const item = new Item('foo', 5, 5);
        const newItem = tick(item);
        expectSellIn(newItem, 4);
        expectQuality(newItem, 4);
        expectSellIn(item, 4);
        expectQuality(item, 4);
    })

    describe('for regular item', () => {
        describe('in basic case', () => {
            const item = new Item('foo', 5, 5);
            const newItem = tick(item);
            expectName(newItem, 'foo');
            expectSellIn(newItem, 4);
            expectQuality(newItem, 4);
        });

        describe('with sellIn 0', () => {
            const item = new Item('foo', 0, 5);
            const newItem = tick(item);
            expectSellIn(newItem, -1);
            expectQuality(newItem, 3);
        });

        describe('with sellIn -1', () => {
            const item = new Item('foo', -1, 5);
            const newItem = tick(item);
            expectSellIn(newItem, -2);
            expectQuality(newItem, 3);
        });

        describe('with quality 0', () => {
            const item = new Item('foo', 1, 0);
            const newItem = tick(item);
            expectQuality(newItem, 0);
        });

        describe('with quality above 50', () => {
            const item = new Item('foo', 1, 60);
            const newItem = tick(item);
            expectQuality(newItem, 59);
        });
    });

    describe('Aged Brie - increases in Quality the older it gets', function() {
        describe('in basic case', () => {
            const item = new Item(AGED_BRIE, 10, 10);
            const newItem = tick(item);
            expectQuality(newItem, 11);
        });

        describe('with quality pushed to the limit', () => {
            const item = new Item(AGED_BRIE, 50, 50);
            const newItem = tick(item);
            expectQuality(newItem, 50);
        });

        describe('with SellIn 1', () => {
            const item = new Item(AGED_BRIE, 1, 10);
            const newItem = tick(item);
            expectQuality(newItem, 11);
        });

        describe('with SellIn 0', () => {
            const item = new Item(AGED_BRIE, 0, 10);
            const newItem = tick(item);
            expectQuality(newItem, 10);
        });

        describe('with SellIn -1', () => {
            const item = new Item(AGED_BRIE, -1, 10);
            const newItem = tick(item);
            expectQuality(newItem, 10);
        });
    });

    describe('Sulfuras - never decreases in Quality or SellIn', () => {
        describe('in basic case', () => {
            const item = new Item(SULFURAS, 10, 10);
            const newItem = tick(item);
            expectSellIn(newItem, 10);
            expectQuality(newItem, 10);
        });
    });

    describe('Backstage passes - increases in Quality as its SellIn value approaches', () => {
        describe('in basic case', () => {
            const item = new Item(BACKSTAGE, 20, 20);
            const newItem = tick(item);
            expectQuality(newItem, 21);
        });

        describe('when 10 days left', () => {
            const item = new Item(BACKSTAGE, 10, 20);
            const newItem = tick(item);
            expectQuality(newItem, 22);
        });

        describe('when 5 days left', () => {
            const item = new Item(BACKSTAGE, 5, 20);
            const newItem = tick(item);
            expectQuality(newItem, 23);
        });

        describe('after the conect', () => {
            const item = new Item(BACKSTAGE, 0, 20);
            const newItem = tick(item);
            expectQuality(newItem, 0);
        });
    });


    describe('Conjured - ages twice as fast as regular item', () => {
        describe('in basic case', () => {
            const item = new Item(CONJURED, 20, 20);
            const newItem = tick(item);
            expectQuality(newItem, 18);
        });

        describe('when SellIn 0', () => {
            const item = new Item(CONJURED, 0, 20);
            const newItem = tick(item);
            expectQuality(newItem, 16);
        });
    });
});
