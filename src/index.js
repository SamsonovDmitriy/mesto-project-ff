// Здесь импорты

import './index.css';
// import { createCard, deleteCard } from '../src/components/card.js'
// + К импорту добавится функцию для лайка
// import { openModal, closeModal } from '../src/components/modal'
// разобраться почему второй импорт серый
// и добавяться ещё две функции в импорт обработки события
// По esc
// по нажатию на оверлей

// здесь то, что в index

const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places');
const cardList = cardContainer.querySelector('.places__list');
//
const pageContent = document.querySelector('.page__content');
const popupEdit = pageContent.querySelector('.popup_type_edit');
const popupNewCard = pageContent.querySelector('.popup_type_new-card');
const popupImage = pageContent.querySelector('.popup_type_image');
const editButton = pageContent.querySelector('.profile__edit-button');
const popup = pageContent.querySelector('.popup');
// обработчик открытия попапа
pageContent.addEventListener('click', function openModal(evt) {
	if (evt.target.classList.contains('profile__edit-button')) {
		popupEdit.classList.add('popup_is-opened');
	} else if (evt.target.classList.contains('profile__add-button')) {
		popupNewCard.classList.add('popup_is-opened');
	} else if (evt.target.classList.contains('card__image')) {
		popupImage.classList.add('popup_is-opened');
	}
});
// обработчик закрытия попапа
pageContent.addEventListener('click', function closeModal(evt) {
	if (evt.target.classList.contains('popup__close')) {
		evt.target.closest('.popup').classList.toggle('popup_is-opened');
	}
});
// обработчик отправки формы
const formElement = document.forms[`edit-profile`];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

function handleFormSubmit(evt) {
	evt.preventDefault();
	const name = nameInput.value;
	const job = jobInput.value;
	name.textContent = '';
	job.textContent = '';
}

formElement.addEventListener('submit', handleFormSubmit);
// обработчик открывающий изображение
pageContent.addEventListener('click', function (evt) {
	if (evt.target.classList.contains('popup_type_image')) {
	}
});
// вызовы функций, подключенных из других модулей, с передачей им переменных и обработчиков
initialCards.forEach(element => {
	cardList.append(createCard(element.name, element.link, deleteCard));
});
// здесь card.js
function createCard(cardName, imageLink, deleteFunction) {
	const cardElement = cardTemplate
		.querySelector('.places__item')
		.cloneNode(true);
	const cardImage = cardElement.querySelector('.card__image');
	const cardTitle = cardElement.querySelector('.card__title');
	const deleteButton = cardElement.querySelector('.card__delete-button');
	cardImage.src = imageLink;
	cardImage.alt = cardName;
	cardTitle.textContent = cardName;
	deleteButton.addEventListener('click', deleteFunction);
	return cardElement;
}

function deleteCard(evt) {
	evt.target.closest('.places__item').remove();
}

// здесь modal.js

// export { openModal, closeModal }

// function openModal(дом-элемент) {}

// function closeModal(дом-элемент) {}

// функция-обработчик события нажатия Esc

//  функция-обработчик события клика по оверлею;
