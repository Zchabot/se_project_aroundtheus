export default class Section {
  constructor({ renderer }, itemContainerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(itemContainerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      const element = this._renderer(item);
      this._container.append(element);
    });
  }

  addItem(item) {
    const element = this._renderer(item);
    this._container.prepend(element);
  }
}
