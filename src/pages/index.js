import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
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

cardList.renderItems();

// Form Validation //

const addCardFormValidator = new FormValidator(config, addCardFormElement);
const profileFormValidator = new FormValidator(config, profileFormElement);

addCardFormValidator.enableValidation();
profileFormValidator.enableValidation();

// Popup With Form //

const newCardPopup = new PopupWithForm("#add-card-modal", (inputData) => {
  cardList.addItem({ name: inputData.title, link: inputData.url });
  addCardFormElement.reset();
  addCardFormValidator.resetFormValidation();
  newCardPopup.close();
});

const profilePopup = new PopupWithForm("#profile-edit-modal", (inputData) => {
  userInformation.setUserInfo(inputData);
  profilePopup.close();
});

// Popup With Image //

const imagePopup = new PopupWithImage("#open-picture-modal");

// Functions //

function handleImageClick(src, alt, title) {
  imagePopup.open(src, alt, title);
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
