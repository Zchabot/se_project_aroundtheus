export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this.handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this.handleEscClose);
  }

  handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("modal")) {
        this.close();
      }
    });

    this._closeButton.addEventListener("mousedown", () => {
      this.close();
    });
  }
}

/*

function clickOverlayCloseModal(modal) {
  modal.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(event.target);
    }
  });


function closeModalCloseButton(modal) {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal__close")) {
      closeModal(modal);
    }
  });
}
}
*/
