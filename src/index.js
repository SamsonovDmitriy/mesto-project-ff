import { addLike, createCard, deleteCard } from '../src/components/card.js';
import { closeModal, openModal } from '../src/components/modal';
import { initialCards } from './components/cards.js';
import './index.css';

const pageContent = document.querySelector('.page__content');
const cardContainer = pageContent.querySelector('.places');
const cardList = cardContainer.querySelector('.places__list');

const popups = pageContent.querySelectorAll('.popup');
const openImagePopup = pageContent.querySelector('.popup_type_image');
const editProfilePopup = pageContent.querySelector('.popup_type_edit');
const addCardPopup = pageContent.querySelector('.popup_type_new-card');
const buttonOpenEditProfilePopup = pageContent.querySelector(
	'.profile__edit-button'
);
const buttonOpenAddCardPopup = pageContent.querySelector(
	'.profile__add-button'
);
const popupImage = pageContent.querySelector('.popup__image');
const imageTitle = pageContent.querySelector('.popup__caption');

const forms = document.forms;
const formEditProfile = forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const profileTitle = pageContent.querySelector('.profile__title');
const profileDescription = pageContent.querySelector('.profile__description');
const formNewCard = forms['new-place'];
const cardName = formNewCard.elements[`place-name`];
const cardLink = formNewCard.elements.link;

function openImage(cardName, imageLink) {
	openModal(openImagePopup);
	popupImage.src = imageLink;
	imageTitle.alt = cardName;
	imageTitle.textContent = cardName;
}

function handleFormSubmitForEdit(evt) {
	evt.preventDefault();
	profileTitle.textContent = nameInput.value;
	profileDescription.textContent = jobInput.value;
	closeModal(editProfilePopup);
}

function handleFormSubmitForAddCard(evt) {
	evt.preventDefault();
	const cardTitle = cardName.value;
	const cardSrc = cardLink.value;
	cardList.prepend(
		createCard(cardTitle, cardSrc, deleteCard, addLike, openImage)
	);
	closeModal(addCardPopup);
	formNewCard.reset();
}

initialCards.forEach(element => {
	cardList.append(
		createCard(element.name, element.link, deleteCard, addLike, openImage)
	);
});

buttonOpenEditProfilePopup.addEventListener(
	'click',
	() => openModal(editProfilePopup),
	(nameInput.value = profileTitle.textContent),
	(jobInput.value = profileDescription.textContent)
);
buttonOpenAddCardPopup.addEventListener('click', () => openModal(addCardPopup));

Array.from(popups).forEach(popup => {
	const closeButton = popup.querySelector('.popup__close');
	closeButton.addEventListener('click', () => closeModal(popup));
});

formEditProfile.addEventListener('submit', handleFormSubmitForEdit);
formNewCard.addEventListener('submit', handleFormSubmitForAddCard);
