const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
const likeButton = cardElement.querySelector('.card__like-button');

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

export { cardElement, likeButton, createCard, addLike, deleteCard };
