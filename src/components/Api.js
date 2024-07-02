import { cardList, userInformation } from "../pages/index.js";

export default class Api {
  constructor(options) {
    this._options = options;
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((results) => {
        results.forEach((result) => {
          cardList.renderItems(result);
        });
      })

      .catch((err) => {
        console.error(err);
      });
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    })
      .then((res) => res.json())
      .then((result) => {
        userInformation.setUserInfo(result.name, result.about, result.avatar);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  saveUserData({ name, about }) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  saveUserImage({ avatar }) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  addNewCard(name, link) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._options.headers,
    });
  }

  addLike(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._options.headers,
    });
  }

  deleteLike(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._options.headers,
    });
  }
}
