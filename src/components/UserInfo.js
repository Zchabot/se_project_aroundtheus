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

  setUserInfo(inputData) {
    this._profileName.textContent = inputData[0];
    this._profileTitle.textContent = inputData[1];
  }
}

/*function fillProfileForm() {
  profileModalTitle.value = profileTitle.textContent;
  profileModalSubtitle.value = profileSubtitle.textContent;
}*/
