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
  deleteCardFormElement,
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

api
  .getInitialCards()
  .then((results) => {
    results.forEach((result) => {
      cardList.renderItems(result);
    });
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getUserInfo()
  .then((result) => {
    userInformation.setUserInfo(result.name, result.about);
    userInformation.setAvatar(result.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

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
        handleDeleteClick,
        handleLikes
      ).getView();
    },
  },
  ".cards"
);

const card = new Card(
  {},
  "#cards__card",
  handleImageClick,
  handleDeleteClick,
  handleLikes
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
  loadingButtonCallback(addCardFormElement, "Saving...");
  api
    .addNewCard(inputData.title, inputData.url)
    .then((result) => cardList.addItem(result))
    .then(() => {
      addCardFormElement.reset();
      addCardFormValidator.resetFormValidation();
      newCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => onloadButtonReset(addCardFormElement, "Create"));
});

const profilePopup = new PopupWithForm("#profile-edit-modal", (inputData) => {
  loadingButtonCallback(profileFormElement, "Saving...");
  api
    .saveUserData({ name: inputData.name, about: inputData.title })
    .then(() => api.getUserInfo())
    .then((result) => {
      userInformation.setUserInfo(result.name, result.about);
      profileFormElement.reset();
      profilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => onloadButtonReset(profileFormElement, "Save"));
});

const profilePicturePopup = new PopupWithForm(
  "#profile-picture-modal",
  (inputData) => {
    loadingButtonCallback(profilePictureFormElement, "Saving...");
    api
      .saveUserImage({ avatar: inputData.url })
      .then(() => api.getUserInfo())
      .then((result) => {
        userInformation.setAvatar(result.avatar);
        profilePictureFormElement.reset();
        profilePictureFormValidator.resetFormValidation();
        profilePicturePopup.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => onloadButtonReset(profilePictureFormElement, "Save"));
  }
);

export const deletePopup = new PopupConfirmDelete(
  "#delete-card-modal",
  (element) => {
    loadingButtonCallback(deleteCardFormElement, "Removing Card...");
    api
      .deleteCard(element.id)
      .then(() => {
        card.deleteCard(element);
        deletePopup.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => onloadButtonReset(deleteCardFormElement, "Yes"));
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

function loadingButtonCallback(formElement, text) {
  const buttonElement = formElement.querySelector(".modal__button");
  buttonElement.textContent = text;
}

function onloadButtonReset(formElement, text) {
  const buttonElement = formElement.querySelector(".modal__button");
  buttonElement.textContent = text;
}

function handleLikes(isLiked, id) {
  if (isLiked) {
    api.deleteLike(id).catch((err) => {
      console.error(err);
    });
  } else {
    api.addLike(id).catch((err) => {
      console.error(err);
    });
  }
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
