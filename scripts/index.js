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
const profileModalTitle = document.querySelector("[name='title']");
const profileModalSubtitle = document.querySelector("[name='subtitle']");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileFormElement = document.querySelector("#profile-form");
const cardTemplate =
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

function closeModal() {
  profileEditModal.classList.remove("modal_opened");
}

// Event Handlers //

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = profileModalTitle.value;
  profileSubtitle.textContent = profileModalSubtitle.value;
  closeModal();
}

// Event Listeners //

profileEditButton.addEventListener("click", function () {
  profileModalTitle.value = profileTitle.textContent;
  profileModalSubtitle.value = profileSubtitle.textContent;
  profileEditModal.classList.add("modal_opened");
});

profileCloseButton.addEventListener("click", function () {
  closeModal();
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
