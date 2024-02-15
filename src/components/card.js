const cardTemplate = document.querySelector('#card-template').content;

function createCard(
	cardName,
	imageLink,
	deleteMyCard,
	likeHandler,
	putLike,
	openImage,
	likes,
	buttonDelete,
	cardId
) {
	const cardElement = getCardTemplate(cardTemplate);
	const likeButton = cardElement.querySelector('.card__like-button');
	const cardImage = cardElement.querySelector('.card__image');
	const cardTitle = cardElement.querySelector('.card__title');
	const deleteButton = cardElement.querySelector('.card__delete-button');
	const counterOfLikes = cardElement.querySelector('.card__likes-counter');
	if (!buttonDelete) {
		deleteButton.hidden = true;
	}
	counterOfLikes.textContent = likes;
	cardImage.src = imageLink;
	cardImage.alt = cardName;
	cardTitle.textContent = cardName;
	likeButton.addEventListener('click', () => likeHandler(cardId), putLike(likeButton), counterOfLikes.textContent = likes)
	cardImage.addEventListener('click', () => openImage(cardName, imageLink));
	deleteButton.addEventListener('click', () => {
		deleteMyCard(cardId);
	});
  
	return cardElement;
}

function getCardTemplate(template) {
	const element = template.cloneNode(true);
	return element;
}

function putLike(element) {
	element.classList.toggle('card__like-button_is-active');
}

export { createCard, putLike };
