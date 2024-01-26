
function createCard(cardName,imageLink,deleteFunction,likeFunction,
	openImageFunction
) {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardElement = cardTemplate
		.querySelector('.places__item')
		.cloneNode(true);
	const likeButton = cardElement.querySelector('.card__like-button');
	const cardImage = cardElement.querySelector('.card__image');
	const cardTitle = cardElement.querySelector('.card__title');
	const deleteButton = cardElement.querySelector('.card__delete-button');
	cardImage.src = imageLink;
	cardImage.alt = cardName;
	cardTitle.textContent = cardName;
	deleteButton.addEventListener('click', deleteFunction);
	likeButton.addEventListener('click', likeFunction);
	cardImage.addEventListener('click',() => openImageFunction(cardName,imageLink));
	return cardElement;
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
