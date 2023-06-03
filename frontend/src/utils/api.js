class Api {
  constructor({ url, headers }) {
    this._url = url; // https://api.swearwolfie.mesto.nomoredomains.rocks/
    this._headers = headers;
  }

  getToken(jwt) {
    this._headers.authorization = `Bearer ${jwt}`;
  }

  checkResponse(response) {
    // отдельная функция для общения с сервером
    if (response.ok) {
      return response.json(); // Promise.resolve
    } else {
      Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
    }
  }

  getCards(headers = this._headers) {
  //  const token = localStorage.getItem("jwt");
    return fetch(`${this._url}${"cards"}`, {
      headers: headers,
    }).then(this.checkResponse);
  }

  deleteCard(id) {
  //  const token = localStorage.getItem("jwt");
    return fetch(`${this._url}${"cards/"}${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this.checkResponse);
  }

  addNewCard(name, link) {
  //  const token = localStorage.getItem("jwt");
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
  //  const token = localStorage.getItem("jwt");
    console.log(token, 'the falling of your feet')
    return fetch(`${this._url}${"users/me"}`, {
      headers: this._headers,
    }).then(this.checkResponse);
  }

  editProfile(name, about) {
  //  const token = localStorage.getItem("jwt");
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
  //  const token = localStorage.getItem("jwt");
    return fetch(`${this._url}${"cards/"}${id}${"/likes"}`, {
      method:`${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
    }).then(this.checkResponse);
  }
/*
  putLike(id) {
    return fetch(`${this._url}${"cards/"}${id}${"/likes"}`, {
      method: "PUT",
      headers: {
    "Content-type": "application/json",
    authorization: `Bearer ${token}`
  },
    }).then(this.checkResponse);
  } */

  changeAvatar(avatar) {
  //  const token = localStorage.getItem("jwt");
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
  url: "https://api.swearwolfie.mesto.nomoredomains.rocks/",
  headers: {
    "Content-type": "application/json",
  },
};

const apiThingie = new Api(apiConfig);
export default apiThingie;