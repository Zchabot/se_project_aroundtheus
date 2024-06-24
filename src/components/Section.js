export default class Section {
  constructor({ items, renderer }, itemContainerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(itemContainerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this.addItem(item);
    });
  }

  /* Tried this here. It did not work. Please explain further. Thank you.
  renderItems() {
    this._items.forEach(this._renderer);
  } */

  addItem(item) {
    const element = this._renderer(item);
    this._container.prepend(element);
  }
}
