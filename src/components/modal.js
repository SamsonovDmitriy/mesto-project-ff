// export { openModal, closeModal }

// function openModal(дом-элемент) {}
function openModal(evt) {
	if (evt.target.classList.contains('profile__edit-button')) {
		evt.target.closest('.popup').classList.add('popup_is-opened');
	}
}
// function closeModal(дом-элемент) {}
function closeModal(evt) {
	if (evt.target.classList.contains('popup__close')) {
		evt.target.closest('.popup').classList.toggle('popup_is-opened');
	}
}
// функция-обработчик события нажатия Esc

//  функция-обработчик события клика по оверлею;
