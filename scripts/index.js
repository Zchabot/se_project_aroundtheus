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

let profileEditButton = document.querySelector(".profile__edit-button");
let profileEditModal = document.querySelector("#profile-edit-modal");
profileEditButton.addEventListener("click", function () {
  profileEditModal.classList.add("modal_opened");
});

let profileCloseButton = document.querySelector(".modal__close");
profileCloseButton.addEventListener("click", function () {
  profileEditModal.classList.remove("modal_opened");
});
