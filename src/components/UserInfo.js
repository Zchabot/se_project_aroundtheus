export default class UserInfo {
  constructor({ profileName, profileTitle }) {
    this._profileName = document.querySelector(profileName);
    this._profileTitle = document.querySelector(profileTitle);
  }

  getUserInfo() {
    this._profileInfo = {
      name: this._profileName.textContent,
      title: this._profileTitle.textContent,
    };
    return this._profileInfo;
  }

  setUserInfo({ name, title }) {
    this._profileName.textContent = name;
    this._profileTitle.textContent = title;
  }
}
