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

const openPictureModal = document.querySelector("#open-picture-modal");
const openPictureCloseButton = openPictureModal.querySelector(".modal__close");

// Functions //

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".cards__image");
  const cardTitleEl = cardElement.querySelector(".cards__image-title");
  const likeButton = cardElement.querySelector(".cards__like-button");
  const deleteButton = cardElement.querySelector(".cards__delete-button");
  const openPictureImage = openPictureModal.querySelector(
    ".modal__open-picture"
  );
  const openPictureTitle = openPictureModal.querySelector(".modal__footer");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("cards__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openPictureImage.src = cardImageEl.src;
    openPictureImage.alt = cardImageEl.alt;
    openPictureTitle.textContent = cardTitleEl.textContent;
    openModal(openPictureModal);
  });

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

function fillProfileForm() {
  profileModalTitle.value = profileTitle.textContent;
  profileModalSubtitle.value = profileSubtitle.textContent;
}

function fillProfileInformation() {
  profileTitle.textContent = profileModalTitle.value;
  profileSubtitle.textContent = profileModalSubtitle.value;
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
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  addCardFormElement.reset();
}

// Event Listeners //

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openModal(profileEditModal);
});

profileCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

addCardButton.addEventListener("click", () => openModal(addCardModal));

addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));

openPictureCloseButton.addEventListener("click", () =>
  closeModal(openPictureModal)
);

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

// Loops //

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
