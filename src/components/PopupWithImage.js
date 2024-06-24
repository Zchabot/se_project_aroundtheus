import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector(".modal__open-picture");
    this._imageTitle = this._popupElement.querySelector(".modal__footer");
  }

  open(imageData) {
    this._image.src = imageData[0];
    this._image.alt = imageData[1];
    this._imageTitle.textContent = imageData[2];
    super.open();
  }
}
