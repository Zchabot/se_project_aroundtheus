import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector(".modal__open-picture");
    this._imageTitle = this._popupElement.querySelector(".modal__footer");
  }

  open(src, alt, title) {
    this._image.src = src;
    this._image.alt = alt;
    this._imageTitle.textContent = title;
    super.open();
  }
}
