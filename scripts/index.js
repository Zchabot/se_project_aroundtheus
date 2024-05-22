const initialCards = [
  {
    name: "Yosemite Valley",
    link: "images/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "images/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "images/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "images/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "images/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "images/lago.jpg",
  },
];

// Elements //

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = document.querySelector(".modal__close");
const profileModalTitle = document.querySelector(".modal__title-input");
const profileModalSubtitle = document.querySelector(".modal__subtitle-input");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileFormElement = document.querySelector(".modal__form");
let cardTemplate =
  document.querySelector("#cards__card").content.firstElementChild;
const cardListEl = document.querySelector(".cards");

// Functions //

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".cards__image");
  const cardTitleEl = cardElement.querySelector(".cards__image-title");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

// Event Handlers //

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = profileModalTitle.value;
  profileSubtitle.textContent = profileModalSubtitle.value;
  profileEditModal.classList.remove("modal_opened");
}

// Event Listeners //

profileEditButton.addEventListener("click", function () {
  profileModalTitle.value = profileTitle.textContent;
  profileModalSubtitle.value = profileSubtitle.textContent;
  profileEditModal.classList.add("modal_opened");
});

profileCloseButton.addEventListener("click", function () {
  profileEditModal.classList.remove("modal_opened");
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
