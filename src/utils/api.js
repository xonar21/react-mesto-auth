class Api {
    constructor(baseUrl,headers) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    _handleResponse(res) {
        if (res.ok) return res.json();
        return Promise.reject(res.status);
    }
    getUserInformation() {
      return fetch(`${this._baseUrl.baseUrl}/users/me`, {    
        method: 'GET',
        headers: {
          authorization: `${this._baseUrl.headers.authorization}`
        }
      })
        .then(res => this._handleResponse(res))
    }
    getCardsFromServer() {
      return fetch(`${this._baseUrl.baseUrl}/cards`, {  
        method: 'GET',
          headers: {
            authorization: `${this._baseUrl.headers.authorization}`
          }
        })
        .then(res => this._handleResponse(res))
    }
    pathEditProfile(info) {
      return fetch(`${this._baseUrl.baseUrl}/users/me`, {
        method: 'PATCH',
          headers: {
            authorization: `${this._baseUrl.headers.authorization}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: info.name,
            about: info.subname})
          })
          .then(res => 
            this._handleResponse(res)
          )
    }
    postCard({name, link}) {
      return fetch(`${this._baseUrl.baseUrl}/cards`, {
        method: 'POST',
          headers: {
            authorization: `${this._baseUrl.headers.authorization}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            link: link
          })
      })
      .then(res => res.json());  
    }
    delCardFromServer(id) {
      return fetch(`${this._baseUrl.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `${this._baseUrl.headers.authorization}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json());
    }

    changeLikeCardStatus(id, isLiked) {
      if(isLiked) {
        return this.likeCard(id);
      }
      else {
        return this.unlikeCard(id);
      }
    }

    likeCard(cardId) {
      return fetch(`${this._baseUrl.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: `${this._baseUrl.headers.authorization}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => this._handleResponse(res));
    }
    unlikeCard(cardId) {
      return fetch(`${this._baseUrl.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: `${this._baseUrl.headers.authorization}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => this._handleResponse(res));
    }
    patchAvatar(data) {
      return fetch(`${this._baseUrl.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: `${this._baseUrl.headers.authorization}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({avatar: data.avatar})
      })
      .then(res => this._handleResponse(res));
    }
}
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-35/',
  headers: {
    authorization: '4f1e5520-cc86-4d96-8418-3f1ecec3cfa5',
    'Content-Type': 'application/json'
  }
});
export default api;