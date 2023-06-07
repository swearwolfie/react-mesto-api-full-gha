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

  getCards() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}${"cards"}`, {
      headers: {
    "Content-type": "application/json",
    authorization: `Bearer ${token}`
  },
    }).then(this.checkResponse);
  }

  deleteCard(id) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}${"cards/"}${id}`, {
      method: 'DELETE',
      headers: {
    "Content-type": "application/json",
    authorization: `Bearer ${token}`
  },
    }).then(this.checkResponse);
  }

  addNewCard(name, link) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}${"cards"}`, {
      method: "POST",
      headers: {
    "Content-type": "application/json",
    authorization: `Bearer ${token}`
  },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this.checkResponse);
  }

  getProfileInfo() {
    const token = localStorage.getItem("jwt");
    console.log(token, 'the falling of your feet')
    return fetch(`${this._url}${"users/me"}`, {
      headers: {
    "Content-type": "application/json",
    authorization: `Bearer ${token}`
  },
    }).then(this.checkResponse);
  }

  editProfile(name, about) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}${"users/me"}`, {
      method: "PATCH",
      headers: {
    "Content-type": "application/json",
    authorization: `Bearer ${token}`
  },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this.checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}${"cards/"}${id}${"/likes"}`, {
      method:`${isLiked ? 'PUT' : 'DELETE'}`,
      headers: {
    "Content-type": "application/json",
    authorization: `Bearer ${token}`
  },
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
    const token = localStorage.getItem("jwt");
    console.log(avatar, token, 'we all scream for ice cream')
    return fetch('https://api.swearwolfie.mesto.nomoredomains.rocks/users/me/avatar', {
      method: "PATCH",
      headers: {
    "Content-type": "application/json",
    authorization: `Bearer ${token}`
  },
      body: JSON.stringify({ avatar }),
    }).then(this.checkResponse);
  } // `${this._url}${"users/me/avatar"}`

}



// ↓  конфиг API

const apiConfig = {
  url: "https://api.swearwolfie.mesto.nomoredomains.rocks/",
};

const apiThingie = new Api(apiConfig);
export default apiThingie;