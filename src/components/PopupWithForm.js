import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputFields = [
      ...this._popupElement.querySelectorAll(".modal__input"),
    ];
  }

  _getInputValues() {
    this._inputValues = [];
    this._inputFields.forEach((inputField) => {
      this._inputValues.push(`${inputField.value}`);
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
