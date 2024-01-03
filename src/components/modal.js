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
function closeWithEsc(evt) {
	if (evt.key === 'Escape' && popups[0].classList.contains('popup_is-opened')) {
		popups[0].classList.remove('popup_is-opened');
	} else if (popups[1].classList.contains('popup_is-opened')) {
		popups[1].classList.remove('popup_is-opened');
	} else if (popups[2].classList.contains('popup_is-opened')) {
		popups[2].classList.remove('popup_is-opened');
	}
}
//  функция-обработчик события клика по оверлею;
function closeWithClickOnOverlay(evt) {
	if (
		evt.target === popups[0] ||
		evt.target === popups[1] ||
		evt.target === popups[3]
	) {
		evt.target.classList.toggle('popup_is-opened');
	}
}

export { openModal, closeModal, closeWithEsc, closeWithClickOnOverlay };
