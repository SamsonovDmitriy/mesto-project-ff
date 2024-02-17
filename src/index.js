import { createCard, deleteCard, likeHandler } from '../src/components/card.js';
import { closeModal, openModal } from '../src/components/modal';
import {
	getInitialCards,
	getProfileInfo,
	postNewAvatar,
	postNewCard,
	postProfileInfo,
} from './components/api.js';
import { clearValidation, enableValidation } from './components/validation.js';
import './index.css';

const pageContent = document.querySelector('.page__content');
const cardContainer = pageContent.querySelector('.places');
const cardList = cardContainer.querySelector('.places__list');

const popups = pageContent.querySelectorAll('.popup');
const popupZoomImage = pageContent.querySelector('.popup_type_image');
const popupEditProfile = pageContent.querySelector('.popup_type_edit');
const popupAddCard = pageContent.querySelector('.popup_type_new-card');
const popupNewAvatar = pageContent.querySelector('.popup_type_new-avatar');
const buttonOpenPopupEditProfile = pageContent.querySelector(
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
const avatar = pageContent.querySelector('.profile__avatar');
const formNewCard = forms['new-place'];
const cardName = formNewCard.elements[`place-name`];
const cardLink = formNewCard.elements.link;
const avatarForm = forms['new-avatar'];
const avatarFormInput = avatarForm.elements.link;

let myId = '';

function openImage(cardName, imageLink) {
	openModal(popupZoomImage);
	popupImage.src = imageLink;
	imageTitle.alt = cardName;
	imageTitle.textContent = cardName;
}

function renderLoading(isLoading, popup) {
	isLoading
		? (popup.querySelector('.popup__button').textContent = 'сохранение...')
		: (popup.querySelector('.popup__button').textContent = 'сохранение');
}

function handleFormSubmitForEdit(evt) {
	evt.preventDefault();
	renderLoading(true, popupEditProfile);

	profileTitle.textContent = nameInput.value;
	profileDescription.textContent = jobInput.value;

	postProfileInfo(nameInput.value, jobInput.value)
		.catch(err => console.log(err))
		.finally(() => renderLoading(false, popupEditProfile));

	nameInput.value = profileTitle.textContent;
	jobInput.value = profileDescription.textContent;

	closeModal(popupEditProfile);
}

function handleFormSubmitForAddCard(evt) {
	evt.preventDefault();
	renderLoading(true, popupAddCard);
	const cardTitle = cardName.value;
	const cardSrc = cardLink.value;
	postNewCard(cardName.value, cardLink.value)
		.catch(err => console.log(err))
		.finally(() => renderLoading(false, popupAddCard));
	cardList.prepend(
		createCard(
			cardTitle,
			cardSrc,
			deleteCard,
			likeHandler,
			openImage,
			'0',
			true
		)
	);
	closeModal(popupAddCard);
	formNewCard.reset();
}

function handleFormSubmitForUpdateAvatar(evt) {
	evt.preventDefault();
	renderLoading(true, popupNewAvatar);
	postNewAvatar(avatarFormInput.value)
		.catch(err => console.log(err))
		.finally(() => renderLoading(false, popupNewAvatar));
	avatar.src = avatarFormInput.value;
	avatarForm.reset();
	closeModal(popupNewAvatar);
}

Array.from(popups).forEach(popup => {
	const closeButton = popup.querySelector('.popup__close');
	closeButton.addEventListener('click', () => closeModal(popup));
});

buttonOpenPopupEditProfile.addEventListener('click', () => {
	clearValidation(formEditProfile),
		(nameInput.value = profileTitle.textContent);
	(jobInput.value = profileDescription.textContent),
		openModal(popupEditProfile);
});

buttonOpenAddCardPopup.addEventListener('click', () => {
	clearValidation(formNewCard), formNewCard.reset(), openModal(popupAddCard);
});

formEditProfile.addEventListener('submit', handleFormSubmitForEdit);

formNewCard.addEventListener('submit', handleFormSubmitForAddCard);

avatarForm.addEventListener('submit', handleFormSubmitForUpdateAvatar);

avatar.addEventListener('click', () => {
	openModal(popupNewAvatar);
});

enableValidation();

Promise.all([getProfileInfo(), getInitialCards()])
	.then(([profileInfo, cards]) => {
		profileTitle.textContent = profileInfo.name;
		profileDescription.textContent = profileInfo.about;
		avatar.src = profileInfo.avatar;
		myId = profileInfo[`_id`];
		nameInput.value = profileInfo.name;
		jobInput.value = profileInfo.about;

		Array.from(cards).forEach(card => {
			const deleteButton = () => {
				if (card.owner[`_id`] === myId) {
					return true;
				} else {
					return false;
				}
			};
			const cardId = card['_id'];
			const setButton = deleteButton();
			const likes = card.likes.length;
			cardList.append(
				createCard(
					card.name,
					card.link,
					deleteCard,
					likeHandler,
					openImage,
					likes,
					setButton,
					cardId
				)
			);
		});
	})
	.catch(err => console.log(err));
