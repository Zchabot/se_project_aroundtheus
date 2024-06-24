export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this._setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    this._removeEventListeners();
  }

  _setEventListeners() {
    document.addEventListener("keydown", this.handleEscClose);
    this._popupElement.addEventListener("mousedown", this.handleClickOverlay);
    this._closeButton.addEventListener("mousedown", this.handleCloseButton);
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", this.handleEscClose);
    this._popupElement.removeEventListener(
      "mousedown",
      this.handleClickOverlay
    );
    this._closeButton.removeEventListener("mousedown", this.handleCloseButton);
  }

  handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  handleClickOverlay = (event) => {
    if (event.target.classList.contains("modal")) {
      this.close();
    }
  };

  handleCloseButton = () => {
    this.close();
  };
}
