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
    cardList.renderItems(results);
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
  newCardPopup.renderLoading();
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
    .finally(() => newCardPopup.resetButton("Create"));
});

const profilePopup = new PopupWithForm("#profile-edit-modal", (inputData) => {
  profilePopup.renderLoading();
  api
    .saveUserData({ name: inputData.name, about: inputData.title })
    .then((result) => {
      userInformation.setUserInfo(result.name, result.about);
      profileFormElement.reset();
      profilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => profilePopup.resetButton("Save"));
});

const profilePicturePopup = new PopupWithForm(
  "#profile-picture-modal",
  (inputData) => {
    profilePicturePopup.renderLoading();
    api
      .saveUserImage({ avatar: inputData.url })
      .then((result) => {
        userInformation.setAvatar(result.avatar);
        profilePictureFormElement.reset();
        profilePictureFormValidator.resetFormValidation();
        profilePicturePopup.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => profilePicturePopup.resetButton("Save"));
  }
);

export const deletePopup = new PopupConfirmDelete(
  "#delete-card-modal",
  (card) => {
    deletePopup.renderLoading();
    api
      .deleteCard(card._id)
      .then(() => {
        card.deleteCard();
        deletePopup.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => deletePopup.resetButton());
  }
);

// Popup With Image //

const imagePopup = new PopupWithImage("#open-picture-modal");

// Functions //

function handleDeleteClick(card) {
  deletePopup.open(card);
}

function handleImageClick(src, alt, title) {
  imagePopup.open(src, alt, title);
}

function fillProfileForm() {
  const profileInfo = userInformation.getUserInfo();
  profileModalTitle.value = profileInfo.name;
  profileModalSubtitle.value = profileInfo.title;
}

function handleLikes(card) {
  if (card._isLiked) {
    api
      .deleteLike(card._id)
      .then((result) => {
        card.setIsLiked(result.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .addLike(card._id)
      .then((result) => {
        card.setIsLiked(result.isLiked);
      })
      .catch((err) => {
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
