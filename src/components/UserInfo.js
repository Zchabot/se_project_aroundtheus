import { api } from "../pages";

export default class UserInfo {
  constructor({ profileName, profileTitle, profileImage }) {
    this._profileName = document.querySelector(profileName);
    this._profileTitle = document.querySelector(profileTitle);
    this._profilePicture = document.querySelector(profileImage);
  }

  getUserInfo() {
    this._profileInfo = {
      name: this._profileName.textContent,
      title: this._profileTitle.textContent,
      avatar: this._profilePicture.src,
    };
    return this._profileInfo;
  }

  setUserInfo(name, title) {
    this._profileName.textContent = name;
    this._profileTitle.textContent = title;
  }

  setAvatar(avatar) {
    this._profilePicture.src = avatar;
  }
}
