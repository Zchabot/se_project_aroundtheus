import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  config,
  profileEditButton,
  profileModalTitle,
  profileModalSubtitle,
  profileFormElement,
  addCardButton,
  addCardFormElement,
  profilePictureElement,
  profilePictureFormElement,
} from "../utils/constants.js";
import "./index.css";
import Api from "../components/Api.js";
import PopupConfirmDelete from "../components/PopupDeleteCard.js";

// Api //

export const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "cb2e37e6-748b-43dc-a993-c3836c3f06a0",
    "Content-Type": "application/json",
  },
});
api.getInitialCards();
api.getUserInfo();

// UserInfo //

export const userInformation = new UserInfo({
  profileName: ".profile__title",
  profileTitle: ".profile__subtitle",
  profileImage: ".profile__image",
});

// Section //

export const cardList = new Section(
  {
    renderer: (cardItem) => {
      return new Card(
        cardItem,
        "#cards__card",
        handleImageClick,
        handleDeleteClick
      ).getView();
    },
  },
  ".cards"
);

// Form Validation //

const addCardFormValidator = new FormValidator(config, addCardFormElement);
const profileFormValidator = new FormValidator(config, profileFormElement);
const profilePictureFormValidator = new FormValidator(
  config,
  profilePictureFormElement
);

addCardFormValidator.enableValidation();
profileFormValidator.enableValidation();
profilePictureFormValidator.enableValidation();

// Popup With Form //

const newCardPopup = new PopupWithForm("#add-card-modal", (inputData) => {
  loadingButtonCallback(addCardFormElement);
  api
    .addNewCard(inputData.title, inputData.url)
    .then(() => location.reload(true))
    .then(() => {
      addCardFormElement.reset();
      addCardFormValidator.resetFormValidation();
      newCardPopup.close();
      onloadButtonReset(addCardFormElement, "Create");
    });
});

const profilePopup = new PopupWithForm("#profile-edit-modal", (inputData) => {
  loadingButtonCallback(profileFormElement);
  api
    .saveUserData({ name: inputData.name, about: inputData.title })
    .then(() => api.getUserInfo())
    .then(() => {
      profileFormElement.reset();
      profilePopup.close();
      onloadButtonReset(profileFormElement, "Save");
    });
});

const profilePicturePopup = new PopupWithForm(
  "#profile-picture-modal",
  (inputData) => {
    loadingButtonCallback(profilePictureFormElement);
    api
      .saveUserImage({ avatar: inputData.url })
      .then(() => api.getUserInfo())
      .then(() => {
        profilePictureFormElement.reset();
        profilePictureFormValidator.resetFormValidation();
        profilePicturePopup.close();
        onloadButtonReset(profilePictureFormElement, "Save");
      });
  }
);

export const deletePopup = new PopupConfirmDelete(
  "#delete-card-modal",
  (element) => {
    api.deleteCard(element.id);
    element.remove();
    element = null;
    deletePopup.close();
  }
);

// Popup With Image //

const imagePopup = new PopupWithImage("#open-picture-modal");

// Functions //

function handleDeleteClick(cardElement) {
  deletePopup.open(cardElement);
}

function handleImageClick(src, alt, title) {
  imagePopup.open(src, alt, title);
}

function fillProfileForm() {
  const profileInfo = userInformation.getUserInfo();
  profileModalTitle.value = profileInfo.name;
  profileModalSubtitle.value = profileInfo.title;
}

function loadingButtonCallback(formElement) {
  const buttonElement = formElement.querySelector(".modal__button");
  buttonElement.textContent = "Saving...";
}

function onloadButtonReset(formElement, text) {
  const buttonElement = formElement.querySelector(".modal__button");
  buttonElement.textContent = text;
}

// Event Listeners //

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  profileFormValidator.resetFormValidation();
  profilePopup.open();
});

addCardButton.addEventListener("click", () => newCardPopup.open());

profilePictureElement.addEventListener("click", () =>
  profilePicturePopup.open()
);
