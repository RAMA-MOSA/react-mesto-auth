class Api {
    constructor(options) {
      this._headers = options.headers;
      this._url = options.baseUrl;
    }; 
  
    getInitialData() {
      return Promise.all([this.getUserInfo(), this.getCards()]);
    };
  
    _handleResponse(res){
        if(!res.ok){
            return Promise.reject(`Ошибка:${res.status}`);
        }
        return res.json();
    };

    setUserAvatar(data){
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then(this._handleResponse)
    };

    changeLikeCardStatus(id, isLiked){
        if(isLiked){
            return this.deleteLike(id);
        }else{
            return this.addLike(id);
        }
    };

    deleteLike(id){
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._handleResponse)
    };

    addLike(id){
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers,
        }).then(this._handleResponse)
    };

    deleteCard(id){
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._handleResponse)
    };

    postCard(data){
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })
        }).then(this._handleResponse)
    };

    setUserInfo(data){
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            })
        }).then(this._handleResponse)
    };

    getCards(){
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
          }).then(this._handleResponse)
    };

    getUserInfo(){
        return fetch(`${this._url}/users/me`, {
          method: 'GET',
          headers: this._headers,
        }).then(this._handleResponse)
    };
};

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
    headers: {
      authorization: 'd558607e-48f8-4a90-b7e5-75f1fe753f5b',
      'Content-Type': 'application/json'
    }
}); 

export default api
