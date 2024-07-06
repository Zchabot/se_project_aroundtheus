import Popup from "./Popup";

export default class PopupConfirmDelete extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupForm.querySelector(".modal__button");
  }

  open(element) {
    super.open();
    this._popupForm.addEventListener("submit", this.handleSubmitListener);
    this._element = element;
  }

  close() {
    super.close();
    this._popupForm.removeEventListener("submit", this.handleSubmitListener);
  }

  handleSubmitListener = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._element);
  };

  renderLoading() {
    this._submitButton.textContent = "Removing Card...";
  }

  resetButton() {
    this._submitButton.textContent = "Yes";
  }
}
