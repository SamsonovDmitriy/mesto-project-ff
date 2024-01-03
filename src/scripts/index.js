// Здесь импорты
import { createCard, deleteCard, addLike } from '../src/components/card.js';
import { openModal, closeModal } from '../src/components/modal';
// import { create } from 'core-js/core/object';
// здесь то, что в index

const pageContent = document.querySelector('.page__content');
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
const likeButton = cardElement.querySelector('.card__like-button');
const cardContainer = pageContent.querySelector('.places');
const cardList = cardContainer.querySelector('.places__list');
const popups = pageContent.querySelectorAll('.popup');
const popupEdit = pageContent.querySelector('.popup_type_edit');
const popupNewCard = pageContent.querySelector('.popup_type_new-card');
const popupImage = pageContent.querySelector('.popup_type_image');
const editButton = pageContent.querySelector('.profile__edit-button');
const formElement = document.forms[`edit-profile`];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const formNewCard = document.forms[`new-place`];
const placeName = formNewCard.elements[`place-name`];
const placeLink = formNewCard.elements.link;

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
	evt.target.closest('.popup').classList.add('popup_is-animated');
	if (evt.target.classList.contains('popup__close')) {
		evt.target.closest('.popup').classList.toggle('popup_is-opened');
	}
});
// обработчик отправки формы Edit

function handleFormSubmitForEdit(evt) {
	evt.preventDefault();
	const name = nameInput.value;
	const job = jobInput.value;
	pageContent.querySelector('.profile__title').textContent = name;
	pageContent.querySelector('.profile__description').textContent = job;
	popups[0].classList.remove('popup_is-opened');
}

// обработчик отправки формы добавления картинки
function handleFormSubmitForAddCard(evt) {
	evt.preventDefault();
	const place = placeName.value;
	const link = placeLink.value;
	createCard(place, link, deleteCard, addLike);
	popups[1].classList.remove('popup_is-opened');
	place = '';
	link = '';
}
// обработчик открывающий изображение

/*pageContent.addEventListener('click', function (evt) {
	if (evt.target.classList.contains('popup_type_image')) {
		const image = popupImage.querySelector('.popup__image');
		image.src = link;
	}
});*/

// вызовы функций, подключенных из других модулей, с передачей им переменных и обработчиков

// здесь card.js
function createCard(cardName, imageLink, deleteFunction, likeFunction) {
	const cardImage = cardElement.querySelector('.card__image');
	const cardTitle = cardElement.querySelector('.card__title');
	const deleteButton = cardElement.querySelector('.card__delete-button');
	cardImage.src = imageLink;
	cardImage.alt = cardName;
	cardTitle.textContent = cardName;
	deleteButton.addEventListener('click', deleteFunction);
	likeButton.addEventListener('click', addLike);
	return cardElement;
}

function addLike(evt) {
	if (evt.target === likeButton) {
		evt.target.classList.toggle('card__like-button_is-active');
	}
}

function deleteCard(evt) {
	evt.target.closest('.places__item').remove();
}

// здесь modal.js
// функция-обработчик события нажатия Esc
pageContent.addEventListener('keydown', function (evt) {
	if (evt.key === 'Escape' && popups[0].classList.contains('popup_is-opened')) {
		popups[0].classList.remove('popup_is-opened');
	} else if (
		evt.key === 'Escape' &&
		popups[1].classList.contains('popup_is-opened')
	) {
		popups[1].classList.remove('popup_is-opened');
	} else if (
		evt.key === 'Escape' &&
		popups[2].classList.contains('popup_is-opened')
	) {
		popups[2].classList.remove('popup_is-opened');
	}
});
//  функция-обработчик события клика по оверлею;
pageContent.addEventListener('click', function (evt) {
	if (
		evt.target === popups[0] ||
		evt.target === popups[1] ||
		evt.target === popups[2]
	) {
		evt.target.classList.toggle('popup_is-opened');
	}
});

// вызов функций
initialCards.forEach(element => {
	cardList.append(createCard(element.name, element.link, deleteCard, addLike));
});
formElement.addEventListener('submit', handleFormSubmitForEdit);
pageContent.addEventListener('submit', handleFormSubmitForAddCard);
pageContent.addEventListener('keydown', closeWithEsc);
pageContent.addEventListener('click', closeWithClickOnOverlay);
