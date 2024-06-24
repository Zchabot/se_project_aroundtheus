export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    // Like Button

    this._likeButton.addEventListener("click", this._handleLikeIcon);

    // Delete Button

    this._cardElement
      .querySelector(".cards__delete-button")
      .addEventListener("click", this._handleDeleteCard);

    // Image

    this._cardElement
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._handleImageClick(
          this._cardImageEl.src,
          this._cardImageEl.alt,
          this._cardTitleEl.textContent
        );
      });
  }

  _handleLikeIcon = () => {
    this._likeButton.classList.toggle("cards__like-button_active");
  };

  _handleDeleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);

    this._likeButton = this._cardElement.querySelector(".cards__like-button");
    this._cardImageEl = this._cardElement.querySelector(".cards__image");
    this._cardTitleEl = this._cardElement.querySelector(".cards__image-title");

    this._setEventListeners();
    this._cardTitleEl.textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    return this._cardElement;
  }
}
