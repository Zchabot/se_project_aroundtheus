import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../utils/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  config,
  profileEditButton,
  profileModalTitle,
  profileModalSubtitle,
  profileFormElement,
  addCardButton,
  addCardFormElement,
} from "../utils/constants.js";
import "./index.css";

// UserInfo //

const userInformation = new UserInfo({
  profileName: ".profile__title",
  profileTitle: ".profile__subtitle",
});

// Section //

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      return new Card(cardItem, "#cards__card", handleImageClick).getView();
    },
  },
  ".cards"
);

const newCard = new Section(
  {
    items: "",
    renderer: (cardItem) => {
      return new Card(cardItem, "#cards__card", handleImageClick).getView();
    },
  },
  ".cards"
);

cardList.renderItems();

// Form Validation //

const addCardFormValidator = new FormValidator(config, addCardFormElement);
const profileFormValidator = new FormValidator(config, profileFormElement);

addCardFormValidator.enableValidation();
profileFormValidator.enableValidation();

// Popup With Form //

const newCardPopup = new PopupWithForm("#add-card-modal", (inputData) => {
  newCard.addItem({ name: inputData[0], link: inputData[1] });
  addCardFormElement.reset();
  addCardFormValidator.resetFormValidation();
});

const profilePopup = new PopupWithForm("#profile-edit-modal", (inputData) => {
  userInformation.setUserInfo(inputData);
});

newCardPopup.setEventListeners();
profilePopup.setEventListeners();

// Popup With Image //

const imagePopup = new PopupWithImage("#open-picture-modal");

imagePopup.setEventListeners();

// Functions //

function handleImageClick() {
  imagePopup.open([
    this._cardImageEl.src,
    this._cardImageEl.alt,
    this._cardTitleEl.textContent,
  ]);
}

function fillProfileForm() {
  const profileInfo = userInformation.getUserInfo();
  profileModalTitle.value = profileInfo.name;
  profileModalSubtitle.value = profileInfo.title;
}

// Event Listeners //

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  profileFormValidator.resetFormValidation();
  profilePopup.open();
});

addCardButton.addEventListener("click", () => newCardPopup.open());
