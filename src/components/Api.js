import { cardList, userInformation } from "../pages/index.js";

export default class Api {
  constructor(options) {
    this._options = options;
  }

  _processResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
    }).then(this._processResponse);
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    }).then(this._processResponse);
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
    }).then(this._processResponse);
  }

  deleteCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._options.headers,
    }).then(this._processResponse);
  }

  addLike(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._options.headers,
    }).then(this._processResponse);
  }

  deleteLike(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._options.headers,
    }).then(this._processResponse);
  }
}
