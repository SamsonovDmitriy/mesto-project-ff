import { addLike, deleteLike, deleteMyCard } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

function createCard(
	cardName,
	imageLink,
	deleteCard,
	likeHandler,
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
		likeHandler(likeButton, cardId, counterOfLikes);
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

function likeHandler(element, cardId, counter) {
	if (!element.classList.contains('card__like-button_is-active')) {
		element.classList.add('card__like-button_is-active');
		addLike(cardId)
			.then(data => {
				counter.textContent = data.likes.length;
			})
			.catch(err => console.log(err));
	} else {
		element.classList.toggle('card__like-button_is-active');
		deleteLike(cardId)
			.then(data => {
				counter.textContent = data.likes.length;
			})
			.catch(err => console.log(err));
	}
}

function deleteCard(element, cardId) {
	deleteMyCard(cardId);
	element.parentElement.remove();
}

export { createCard, deleteCard, likeHandler, setDeleteButton };
