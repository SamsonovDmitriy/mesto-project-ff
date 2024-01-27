const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardName, imageLink, deleteCard, likeHandler, openImage) {
	const cardElement = getCardTemplate(cardTemplate)
	const likeButton = cardElement.querySelector('.card__like-button');
	const cardImage = cardElement.querySelector('.card__image');
	const cardTitle = cardElement.querySelector('.card__title');
	const deleteButton = cardElement.querySelector('.card__delete-button');
	cardImage.src = imageLink;
	cardImage.alt = cardName;
	cardTitle.textContent = cardName;
	deleteButton.addEventListener('click', deleteCard);
	likeButton.addEventListener('click', likeHandler);
	cardImage.addEventListener('click', () => openImage(cardName, imageLink));
	return cardElement;
}

function getCardTemplate(template) {
	const element = template.cloneNode(true);
	return element;
}

function addLike(evt) {
	if (evt.target.classList.contains('card__like-button')) {
		evt.target.classList.toggle('card__like-button_is-active');
	}
}

function deleteCard(evt) {
	evt.target.closest('.places__item').remove();
}

export { addLike, createCard, deleteCard };
