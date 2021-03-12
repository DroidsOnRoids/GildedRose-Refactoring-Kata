import { expect } from "chai";
import {
  Item,
  GildedRose,
  AgedBrieFactory,
  DailyGildedRoseInventory,
} from "../app/gilded-rose";

const agedBrie = GildedRose.AGED_BRIE;
const sulfuras = GildedRose.SULFURAS;
const backstage = GildedRose.BACKSTAGE;

describe("Daily Gilded Rose Inventory", function () {
  it("items does not change name", function () {
    const name = "foo";
    const item = new Item(name, 0, 0);
    const inventory = new DailyGildedRoseInventory([item]);
    const tomorrowInventory = inventory.tomorrow();
    expect(tomorrowInventory.items[0].name).to.equal(name);
  });

  it("item is immutable", () => {
    const item = new Item("foo", 5, 5);
    const inventory = new DailyGildedRoseInventory([item]);
    inventory.tomorrow();
    expect(item.sellIn).to.equal(5);
    expect(item.quality).to.equal(5);
  });

  it("tomorrow items has changed values", () => {
    const item = new Item("foo", 5, 5);
    const inventory = new DailyGildedRoseInventory([item]);
    const tomorrowInventory = inventory.tomorrow();
    expect(tomorrowInventory.items[0].sellIn).to.equal(4);
    expect(tomorrowInventory.items[0].quality).to.equal(4);
  });
});

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });

  it("works in place", () => {
    const item = new Item("foo", 5, 5);
    const gildedRose = new GildedRose([item]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(4);
    expect(item.sellIn).to.equal(4);
    expect(item.quality).to.equal(4);
  });

  describe("updateQuality()", function () {
    it("decreases sell in value", () => {
      const gildedRose = new GildedRose([new Item("foo", 5, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(4);
    });

    it("decreases quality value", () => {
      const gildedRose = new GildedRose([new Item("foo", 5, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(4);
    });

    it("the quality of an item is never negative", () => {
      const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
    });

    describe("sell in is zero", () => {
      const gildedRose = new GildedRose([new Item("foo", 0, 5)]);

      it("decreases quality by 2", () => {
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(3);
      });
    });

    describe("for aged Brie", () => {
      it('"Aged Brie" actually increases in Quality the older it gets', () => {
        const gildedRose = new GildedRose([AgedBrieFactory(10, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(11);
      });

      it("increases quality even after sell in date", () => {
        const gildedRose = new GildedRose([AgedBrieFactory(10, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(11);
      });

      it("The Quality of an item is never more than 50", () => {
        const gildedRose = new GildedRose([AgedBrieFactory(50, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(50);
      });
    });

    describe("for sulfuras", () => {
      it("being a legendary item, never has to be sold or decreases in Quality", () => {
        const gildedRose = new GildedRose([new Item(sulfuras, 10, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(10);
      });
    });

    describe('"Backstage passes", like aged brie, increases in Quality as its SellIn value approaches', () => {
      it("quality increases by 1", () => {
        const gildedRose = new GildedRose([new Item(backstage, 20, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(21);
      });

      it("quality increases by 2 when there are 10 days or less", () => {
        const gildedRose = new GildedRose([new Item(backstage, 10, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(12);
      });

      it("quality increases by 3 when there are 5 days or leess", () => {
        const gildedRose = new GildedRose([new Item(backstage, 5, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(8);
      });

      it("Quality drops to 0 after the concert", () => {
        const gildedRose = new GildedRose([new Item(backstage, 0, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
      });
    });
  });
});
