// Elements //

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileModalTitle = document.querySelector("[name='name']");
export const profileModalSubtitle = document.querySelector("[name='title']");
export const profileFormElement = document.forms["profile-form"];

export const addCardButton = document.querySelector(".profile__add-button");
export const addCardFormElement = document.forms["add-card-form"];

export const profilePictureElement = document.querySelector(".profile__image");
export const profilePictureFormElement = document.forms["profile-picture-form"];
