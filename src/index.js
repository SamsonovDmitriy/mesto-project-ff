// Здесь импорты
import { addLike, createCard, deleteCard } from '../src/components/card.js';
import {
	closeModal,
	closeWithClickOnOverlay,
	closeWithEsc,
	openModal,
} from '../src/components/modal';
import { initialCards } from './cards.js';
import './index.css';

const pageContent = document.querySelector('.page__content');
const cardContainer = pageContent.querySelector('.places');
const cardList = cardContainer.querySelector('.places__list');
const popups = pageContent.querySelectorAll('.popup');
const forms = document.forms;
const editForm = forms['edit-profile'];
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;
const formNewCard = forms['new-place'];
const cardName = formNewCard.elements[`place-name`];
const cardLink = formNewCard.elements.link;

function handleFormSubmitForEdit(evt) {
	evt.preventDefault();
	nameInput.value = pageContent.querySelector('.profile__title').textContent;
	jobInput.value = pageContent.querySelector(
		'.profile__description'
	).textContent;
	const name = nameInput.value;
	const job = jobInput.value;
	pageContent.querySelector('.profile__title').textContent = name;
	pageContent.querySelector('.profile__description').textContent = job;
	popups[0].classList.remove('popup_is-opened');
}

// обработчик отправки формы добавления картинки
function handleFormSubmitForAddCard(evt) {
	evt.preventDefault();
	const cardTitle = cardName.value;
	const cardSrc = cardLink.value;
	cardList.prepend(createCard(cardTitle, cardSrc, deleteCard, addLike));
	popups[1].classList.toggle('popup_is-opened');
	cardName.value = '';
	cardLink.value = '';
}

initialCards.forEach(element => {
	cardList.append(createCard(element.name, element.link, deleteCard, addLike));
});

editForm.addEventListener('submit', handleFormSubmitForEdit);
formNewCard.addEventListener('submit', handleFormSubmitForAddCard);
pageContent.addEventListener('click', openModal);
pageContent.addEventListener('click', closeModal);
pageContent.addEventListener('keydown', closeWithEsc);
pageContent.addEventListener('click', closeWithClickOnOverlay);

export { pageContent, popups };
