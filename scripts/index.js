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
const profileCloseButton = profileEditModal.querySelector(".modal__close");
const profileModalTitle = document.querySelector("[name='title']");
const profileModalSubtitle = document.querySelector("[name='subtitle']");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileFormElement = document.querySelector("#profile-form");
const cardTemplate =
  document.querySelector("#cards__card").content.firstElementChild;
const cardListEl = document.querySelector(".cards");
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = addCardModal.querySelector(".modal__close");
const addCardFormElement = document.querySelector("#add-card-form");
const addCardModalTitle = document.querySelector("[name='card-title']");
const addCardModalUrl = document.querySelector("[name='url']");
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

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

// Event Handlers //

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = profileModalTitle.value;
  profileSubtitle.textContent = profileModalSubtitle.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = addCardModalTitle.value;
  const link = addCardModalUrl.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
}

// Event Listeners //

profileEditButton.addEventListener("click", () => {
  profileModalTitle.value = profileTitle.textContent;
  profileModalSubtitle.value = profileSubtitle.textContent;
  openModal(profileEditModal);
});

profileCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

addCardButton.addEventListener("click", () => openModal(addCardModal));

addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

// Loops //

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
