module.exports = class ArrayMap extends Map {
  constructor() {
    super();
  }

  getKeys() {
    return Array.from(this, ([name]) => (name));
  }

  getValues() {
    return Array.from(this, ([name, value]) => (name, value));
  }
}