class Api {
  constructor({ url, headers }) {
    this._url = url; // https://mesto.nomoreparties.co/v1/cohort-54/
    this._headers = headers;
  }

  checkResponse(response) {
    // отдельная функция для общения с сервером
    if (response.ok) {
      return response.json(); // Promise.resolve
    } else {
      Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
    }
  }

  getCards() {
    return fetch(`${this._url}${"cards"}`, {
      headers: this._headers,
    }).then(this.checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}${"cards/"}${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this.checkResponse);
  }

  addNewCard(name, link) {
    return fetch(`${this._url}${"cards"}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this.checkResponse);
  }

  getProfileInfo() {
    return fetch(`${this._url}${"users/me"}`, {
      headers: this._headers,
    }).then(this.checkResponse);
  }

  editProfile(name, about) {
    return fetch(`${this._url}${"users/me"}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this.checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}${"cards/"}${id}${"/likes"}`, {
      method:`${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
    }).then(this.checkResponse);
  }
/*
  putLike(id) {
    return fetch(`${this._url}${"cards/"}${id}${"/likes"}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this.checkResponse);
  } */

  changeAvatar(avatar) {
    return fetch(`${this._url}${"users/me/avatar"}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this.checkResponse);
  }

}



// ↓  конфиг API

const apiConfig = {
  url: "http://api.swearwolfie.mesto.nomoredomains.rocks/",
  headers: {
    authorization: "e005a204-1370-46e1-93c7-d7d1a162ac21",
    "Content-type": "application/json",
  },
};

const apiThingie = new Api(apiConfig);
export default apiThingie;
