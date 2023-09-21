class Api {
  constructor(feature) {
    this._url = feature.baseUrl;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject;
  }

  getinfo(token) {
    return this._request(`${this._url}/users/me`, { headers: {"Authorization" : `Bearer ${token}` }});
  }

  getInitialCards(token) {
    return this._request(`${this._url}/cards`, { headers: {"Authorization" : `Bearer ${token}` } });
  }

  setUserInfo(data, token) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.title,
        about: data.subtitle,
      }),
    });
  }

  setAvatar(data, token) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  addCard(data, token) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  remuvelikeCard(cardId, token) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {"Authorization" : `Bearer ${token}`},
    });
  }

  likeCard(cardId, token) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers:{"Authorization" : `Bearer ${token}`},
    });
  }

  deleteCard(cardId, token) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {"Authorization" : `Bearer ${token}`},
    });
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000",
});

export default api;