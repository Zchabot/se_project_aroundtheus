export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners(_handleImageClick) {
    // Like Button
    this._cardElement
      .querySelector(".cards__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    // Delete Button
    this._cardElement
      .querySelector(".cards__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    // Image
    this._cardElement
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._handleOpenImage();
        this._handleImageClick(this);
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".cards__like-button")
      .classList.toggle("cards__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleOpenImage() {
    const openPictureImage = document.querySelector(".modal__open-picture");
    const openPictureTitle = document.querySelector(".modal__footer");
    const cardImageEl = this._cardElement.querySelector(".cards__image");
    const cardTitleEl = this._cardElement.querySelector(".cards__image-title");

    openPictureImage.src = cardImageEl.src;
    openPictureImage.alt = cardImageEl.alt;
    openPictureTitle.textContent = cardTitleEl.textContent;
  }

  getView(_handleImageClick) {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);

    this._cardImageEl = this._cardElement.querySelector(".cards__image");
    this._cardTitleEl = this._cardElement.querySelector(".cards__image-title");

    this._setEventListeners(_handleImageClick);
    this._cardTitleEl.textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    return this._cardElement;
  }
}
