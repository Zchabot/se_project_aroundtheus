import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputFields = [
      ...this._popupElement.querySelectorAll(".modal__input"),
    ];
    this._submitButton = this._popupForm.querySelector(".modal__button");
  }

  _getInputValues() {
    const inputValues = {};

    this._inputFields.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  open() {
    super.open();
    this._popupForm.addEventListener("submit", this.handleSubmitListener);
  }

  close() {
    super.close();
    this._popupForm.removeEventListener("submit", this.handleSubmitListener);
  }

  handleSubmitListener = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  };

  _loadingButtonCallback() {
    this._submitButton.textContent = "Saving...";
  }
}
