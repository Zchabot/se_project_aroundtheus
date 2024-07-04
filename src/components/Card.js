export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLikes
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikes = handleLikes;
    this._isLiked = isLiked;
  }

  _setEventListeners() {
    // Like Button

    this._likeButton.addEventListener("click", this._handleLikeIcon);

    // Delete Button

    this._cardElement
      .querySelector(".cards__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard(this._cardElement);
      });

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
    this._handleLikes(this._isLiked, this._id, this._likeButton);
    if (this._isLiked) {
      this._isLiked = false;
    } else {
      this._isLiked = true;
    }
  };

  _isLiked() {
    return this._isLiked;
  }

  _renderLikes(likeButton) {
    if (this._isLiked) {
      likeButton.classList.add("cards__like-button_active");
    } else {
      likeButton.classList.remove("cards__like-button_active");
    }
  }

  setIsLiked(isLiked, likeButton) {
    this._isLiked = isLiked;
    this._renderLikes(likeButton);
  }

  deleteCard(cardElement) {
    cardElement.remove();
    cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);

    this._likeButton = this._cardElement.querySelector(".cards__like-button");
    this._cardImageEl = this._cardElement.querySelector(".cards__image");
    this._cardTitleEl = this._cardElement.querySelector(".cards__image-title");

    this._setEventListeners();
    this._renderLikes(this._likeButton);
    this._cardTitleEl.textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardElement.id = this._id;
    return this._cardElement;
  }
}
