
import { addLike, createCard, deleteCard } from '../src/components/card.js';
import {
	closeModal,
	closeWithClickOnOverlay,
	closeWithEsc,
	openModal,
} from '../src/components/modal';
import { initialCards } from './components/cards.js';
import './index.css';

const pageContent = document.querySelector('.page__content');
const cardContainer = pageContent.querySelector('.places');
const cardList = cardContainer.querySelector('.places__list');
const popups = pageContent.querySelectorAll('.popup');
const editButton = pageContent.querySelector('.profile__edit-button');
const addButton = pageContent.querySelector('.profile__add-button');
const closeButton = pageContent.querySelector('.popup__close');
const forms = document.forms;
const editForm = forms['edit-profile'];
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;
const formNewCard = forms['new-place'];
const cardName = formNewCard.elements[`place-name`];
const cardLink = formNewCard.elements.link;

const popupImage = pageContent.querySelector('.popup__image');
const imageTitle = pageContent.querySelector('.popup__caption');

function openImage(cardName, imageLink) {
	openModal(popups[2])
	popupImage.src = imageLink;
	imageTitle.alt = cardName;
	imageTitle.textContent = cardName;
}

function handleFormSubmitForEdit(evt) {
	evt.preventDefault();
	pageContent.querySelector('.profile__title').textContent = nameInput.value;
	pageContent.querySelector('.profile__description').textContent = jobInput.value;
	popups[0].classList.remove('popup_is-opened')
}

function handleFormSubmitForAddCard(evt) {
	evt.preventDefault();
	const cardTitle = cardName.value;
	const cardSrc = cardLink.value;
	cardList.prepend(createCard(cardTitle, cardSrc, deleteCard, addLike));
	popups[1].classList.remove('popup_is-opened');
	cardName.value = '';
	cardLink.value = '';
}

initialCards.forEach(element => {
	cardList.append(
		createCard(element.name, element.link, deleteCard, addLike, openImage)
	);
});

editButton.addEventListener('click', () => openModal(popups[0]))
addButton.addEventListener('click', () => openModal(popups[1]))
editForm.addEventListener('submit', handleFormSubmitForEdit);
formNewCard.addEventListener('submit', handleFormSubmitForAddCard);

pageContent.addEventListener('click', closeModal)
document.addEventListener('keydown', closeWithEsc)
pageContent.addEventListener('click', closeWithClickOnOverlay);

export { pageContent, popups };
