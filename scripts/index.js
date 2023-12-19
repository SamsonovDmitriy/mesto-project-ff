
const cardTemplate = document.querySelector('#card-template').content
const cardContainer = document.querySelector('.places')
const cardList = cardContainer.querySelector('.places__list')

function createCard(cardName, imageLink, deleteFunction) {
	const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)
	const cardImage = cardElement.querySelector('.card__image')
	const cardTitle = cardElement.querySelector('.card__title')
	const deleteButton = cardElement.querySelector('.card__delete-button')
	cardImage.src = imageLink
	cardImage.alt = cardName
	cardTitle.textContent = cardName
	deleteButton.addEventListener('click', deleteFunction)
	return cardElement
}

function deleteCard(evt){
	evt.target.closest('.places__item').remove()
}

initialCards.forEach( element => {
	cardList.append(createCard(element.name, element.link, deleteCard))
})
