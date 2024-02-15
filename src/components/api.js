// ОБЩИЕ МОМЕНТЫ
// 1. Все запросы присвойте переменным и экспортируйте их
// 2. Не забывайте проверять, всё ли в порядке с ответом. Для этого можно использовать res.ok или res.status
// 3. Учитывайте случай, когда сервер вернул ошибку: если ошибка, отклоняем промис
// 4. Обрабатывайте ошибки, которые попадают в catch
// 5. Пользуйтесь вкладкой Network для просмотра запросов

// ОБЩИЕ ТРЕБОВАНИЯ
// реализованы все запросы описанные в задании:
//  1. получение данных пользователя и карточек
//  2. обновление данных пользователя
//  3. обновление аватара пользователя
//  4. запросы добавления
//  5. удаления
//  6. и лайка карточек

// 1. АВАТАР
// а) при наведении указателя мыши на аватар, на нём появляется иконка редактирования
// б) при клике открывается модальное окно с формой редактирования аватара;
// в) при нажатии кнопки «Сохранить» в форме редактирования аватара отправляется запрос сохранения данных на сервер.
// г) При успешном его выполнении модальное окно закрывается, а аватар обновляется на странице.

// 2. КАРТОЧКИ
// карточки отображаются на странице только после получения _id пользователя для чего применен Promise.all;
// а) При открытии страницы с сервера запрашиваются данные карточек и пользователя и отображаются на странице.
// б) при нажатии на кнопку «Сохранить» отправляется запрос на добавление карточки на сервер. При успешном его выполнении в начало списка карточек добавляется новая с введенными в форму данными;
// в)при клике на кнопку удаления карточки отправляется запрос на сервер, и при его успешном завершении карточка удаляется со страницы;

// ***ЛАЙКИ
// а) у карточки отображается количество лайков;
// б) при клике на кнопку лайка карточки отправляется запрос на сервер и по его завершению кнопка лайка изменяет состояние и обновляется счетчик количества лайков;
// в) кнопка удаления отображается только на карточках принадлежащих пользователю;

// ***текст кнопок отправки изменяется на время выполнения запроса.

const config = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
	headers: {
		authorization: '3cb83034-531b-488d-9a5a-b162780a6227',
		'Content-Type': 'application/json',
	},
};

function getInitialCards() {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers,
	});
}

function getProfileInfo() {
	return fetch(`${config.baseUrl}/users/me`, {
		headers: config.headers,
	});
}

function postProfileInfo(name, about) {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			about: about,
		}),
	});
}

function postNewCard(name, link) {
	return fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			link: link,
		}),
	});
}

// возможно в пути можно сразу добавить /likes
function getCounterOfLikes() {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers,
	});
}

function deleteMyCard(cardId) {
	fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	});
}

function addLike(cardId) {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'PUT',
		headers: config.headers,
	});
}

function deleteLike(cardId) {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	});
}

function postNewAvatar(link) {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			avatar: link,
		}),
	});
}

export {
	addLike,
	deleteMyCard,
	getCounterOfLikes,
	getInitialCards,
	getProfileInfo,
	postNewAvatar,
	postNewCard,
	postProfileInfo,
	deleteLike
};

addLike, 1
deleteMyCard, 1
getInitialCards,1
getProfileInfo, 1
postNewAvatar, 1
postNewCard, 1
postProfileInfo, 1