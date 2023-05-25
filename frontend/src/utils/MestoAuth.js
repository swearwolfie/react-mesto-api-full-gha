
  const basicURL = "http://api.swearwolfie.mesto.nomoredomains.rocks";

  // отдельная функция для общения с сервером
  function checkResponse(response) {
    if (response.ok) {
      return response.json(); // Promise.resolve
    } else {
      Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
    }
  }

  export const register = (email, password) => {
    return fetch(`${basicURL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      }),
    }).then(checkResponse);
  }

  export const authorize = (email, password) => {
    return fetch(`${basicURL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      }),
    }).then(checkResponse);
  }

  export const checkToken = (token) => {
    return fetch(`${basicURL}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
    }).then(checkResponse);
  }