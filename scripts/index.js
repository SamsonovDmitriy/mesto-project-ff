
const cardTemplate = document.querySelector('#card-template').content
const cardContainer = document.querySelector('.places')
const cardList = cardContainer.querySelector('.places__list')

function addCard(cardTitle, imageLink, deleteFunction) {
	const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)
	cardElement.querySelector('.card__title').textContent = cardTitle
	cardElement.querySelector('.card__image').src = imageLink
	cardElement.querySelector('.card__image').alt = cardTitle
	const deleteButton = cardElement.querySelector('.card__delete-button')
	deleteButton.addEventListener('click', deleteFunction)
	return cardElement
}

function deleteCard(evt){
	evt.target.closest('.places__item').remove()
}

initialCards.forEach( element => {
	cardList.append(addCard(element.name, element.link, deleteCard))
})
