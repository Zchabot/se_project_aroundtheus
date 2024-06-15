import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "./images/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "./images/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "./images/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "./images/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "./images/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "./images/lago.jpg",
  },
];

// Elements //

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalTitle = document.querySelector("[name='title']");
const profileModalSubtitle = document.querySelector("[name='subtitle']");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileFormElement = document.forms["profile-form"];
const cardListEl = document.querySelector(".cards");

const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = document.forms["add-card-form"];
const addCardModalTitle = document.querySelector("[name='card-title']");
const addCardModalUrl = document.querySelector("[name='url']");

const openPictureModal = document.querySelector("#open-picture-modal");
const modals = document.querySelectorAll(".modal");
const formEls = [...document.querySelectorAll(config.formSelector)];

// Functions //

const handleImageClick = () => {
  openModal(openPictureModal);
};

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKey);
}

function renderCard(cardData, wrapper) {
  wrapper.prepend(cardElement(cardData));
}

function fillProfileForm() {
  profileModalTitle.value = profileTitle.textContent;
  profileModalSubtitle.value = profileSubtitle.textContent;
}

function fillProfileInformation() {
  profileTitle.textContent = profileModalTitle.value;
  profileSubtitle.textContent = profileModalSubtitle.value;
}

function clickOverlayCloseModal(modal) {
  modal.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(event.target);
    }
  });
}

function closeOpenModals() {
  modals.forEach((modal) => {
    if (modal.classList.contains("modal_opened")) {
      closeModal(modal);
    }
  });
}

const handleEscKey = (evt) => {
  if (evt.key === "Escape") {
    closeOpenModals();
  }
};

function closeModalFunctions(modal) {
  clickOverlayCloseModal(modal);
  closeModalCloseButton(modal);
}

function closeModalCloseButton(modal) {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal__close")) {
      closeModal(modal);
    }
  });
}

function cardElement(cardData) {
  return new Card(cardData, "#cards__card", handleImageClick).getView();
}

// Event Handlers //

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  fillProfileInformation();
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = addCardModalTitle.value;
  const link = addCardModalUrl.value;
  const addCardSubmitButton = addCardModal.querySelector(
    config.submitButtonSelector
  );
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  resetErrorClass(addCardModal);
  addCardFormElement.reset();
  addCardSubmitButton.classList.add(config.inactiveButtonClass);
}

function resetErrorClass(modal) {
  const inputEls = [...modal.querySelectorAll(config.inputSelector)];
  inputEls.forEach((inputEl) => {
    inputEl.classList.remove(config.inputErrorClass);
    const errorMessageEl = modal.querySelector(`#${inputEl.id}-error`);
    errorMessageEl.textContent = "";
  });
}
// Event Listeners //

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  resetErrorClass(profileEditModal);
  openModal(profileEditModal);
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

addCardButton.addEventListener("click", () => openModal(addCardModal));

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

// Loops //

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

modals.forEach((modal) => closeModalFunctions(modal));

formEls.forEach((formEl) => {
  new FormValidator(config, formEl).enableValidation();
});
