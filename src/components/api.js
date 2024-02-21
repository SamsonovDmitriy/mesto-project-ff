const config = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
	headers: {
		authorization: '3cb83034-531b-488d-9a5a-b162780a6227',
		'Content-Type': 'application/json',
	},
};

function handleResponse(res) {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка: ${res.status}`);
}

function getInitialCards() {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers,
	}).then(res => handleResponse(res));
}

function getProfileInfo() {
	return fetch(`${config.baseUrl}/users/me`, {
		headers: config.headers,
	}).then(res => handleResponse(res));
}

function postProfileInfo(name, about) {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			about: about,
		}),
	}).then(res => handleResponse(res));
}

function postNewCard(name, link) {
	return fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			link: link,
		}),
	}).then(res => handleResponse(res));
}

function getCounterOfLikes() {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers,
	}).then(res => handleResponse(res));
}

function deleteMyCard(cardId) {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	}).then(res => handleResponse(res));
}

function addLike(cardId) {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'PUT',
		headers: config.headers,
	}).then(res => handleResponse(res));
}

function deleteLike(cardId) {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	}).then(res => handleResponse(res));
}

function postNewAvatar(link) {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			avatar: link,
		}),
	}).then(res => handleResponse(res));
}

export {
	addLike,
	deleteLike,
	deleteMyCard,
	getCounterOfLikes,
	getInitialCards,
	getProfileInfo,
	postNewAvatar,
	postNewCard,
	postProfileInfo,
};
