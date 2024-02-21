import { addLike, deleteLike, deleteMyCard } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

function createCard(
	cardName,
	imageLink,
	deleteCard,
	handleLikeCard,
	openImage,
	likes,
	setDeleteButton,
	card,
	myId,
	cardId
) {
	const cardElement = getCardTemplate(cardTemplate);
	const likeButton = cardElement.querySelector('.card__like-button');
	const cardImage = cardElement.querySelector('.card__image');
	const cardTitle = cardElement.querySelector('.card__title');
	const deleteButton = cardElement.querySelector('.card__delete-button');
	const counterOfLikes = cardElement.querySelector('.card__likes-counter');

	setDeleteButton(card, myId, deleteButton);

	counterOfLikes.textContent = likes;
	cardImage.src = imageLink;
	cardImage.alt = cardName;
	cardTitle.textContent = cardName;

	likeButton.addEventListener('click', () => {
		handleLikeCard(checkStatusLike, likeButton, counterOfLikes, cardId);
	});
	cardImage.addEventListener('click', () => openImage(cardName, imageLink));
	deleteButton.addEventListener('click', () => {
		deleteCard(deleteButton, cardId);
	});
	return cardElement;
}

function setDeleteButton(card, myId, deleteButton) {
	if (card.owner[`_id`] === myId) {
		deleteButton.hidden = false;
	} else {
		deleteButton.hidden = true;
	}
}

function getCardTemplate(template) {
	const element = template.cloneNode(true);
	return element;
}

function deleteCard(element, cardId) {
	deleteMyCard(cardId);
	element.parentElement.remove();
}

function checkStatusLike() {
	if (!element.classList.contains('card__like-button_is-active')) {
		return true;
	} else {
		return false;
	}
}

function changeLike(element, counter, likes) {
	element.classList.toggle('card__like-button_is-active');
	counter.textContent = likes;
}

export { createCard, deleteCard, setDeleteButton, changeLike };
