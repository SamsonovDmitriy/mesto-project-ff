import { addLike, createCard, deleteCard } from '../src/components/card.js';
import {
	closeModal,
	closeWithClickOnOverlay,
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
const popupImage = pageContent.querySelector('.popup__image');
const imageTitle = pageContent.querySelector('.popup__caption');

const forms = document.forms;
const editForm = forms['edit-profile'];
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;
const formNewCard = forms['new-place'];
const cardName = formNewCard.elements[`place-name`];
const cardLink = formNewCard.elements.link;

function openImage(cardName, imageLink) {
	openModal(popups[2]);
	popupImage.src = imageLink;
	imageTitle.alt = cardName;
	imageTitle.textContent = cardName;
}

function handleFormSubmitForEdit(evt) {
	evt.preventDefault();
	pageContent.querySelector('.profile__title').textContent = nameInput.value;
	pageContent.querySelector('.profile__description').textContent =
		jobInput.value;
	closeModal(popups[0]);
}

function handleFormSubmitForAddCard(evt) {
	evt.preventDefault();
	const cardTitle = cardName.value;
	const cardSrc = cardLink.value;
	cardList.prepend(
		createCard(cardTitle, cardSrc, deleteCard, addLike, openImage)
	);
	closeModal(popups[1]);
	cardName.value = '';
	cardLink.value = '';
}

initialCards.forEach(element => {
	cardList.append(
		createCard(element.name, element.link, deleteCard, addLike, openImage)
	);
});

editButton.addEventListener('click', () => openModal(popups[0]));
addButton.addEventListener('click', () => openModal(popups[1]));

Array.from(popups).forEach(popup => {
	const closeButton = popup.querySelector('.popup__close');
	closeButton.addEventListener('click', () => closeModal(popup));
});
document.addEventListener('click', closeWithClickOnOverlay);

editForm.addEventListener('submit', handleFormSubmitForEdit);
formNewCard.addEventListener('submit', handleFormSubmitForAddCard);

export { pageContent, popups };
