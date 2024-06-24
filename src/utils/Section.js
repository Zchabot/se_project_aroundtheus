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

  addItem(item) {
    this._element = this._renderer(item);
    this._container.prepend(this._element);
  }
}

/* function renderCard(cardData, wrapper) {
  wrapper.prepend(cardElement(cardData));
}

function cardElement(cardData) {
  return new Card(cardData, "#cards__card", handleImageClick).getView();
}


initialCards.forEach((cardData) => renderCard(cardData, cardListEl)); */
