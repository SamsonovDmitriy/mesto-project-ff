import { pageContent, popups } from '../index.js';
function openModal(evt) {
	const EditButton = pageContent.querySelector('.profile__edit-button');
	const addButton = pageContent.querySelector('.profile__add-button');
	if (evt.target === EditButton) {
		popups[0].classList.add('popup_is-opened');
	} else if (evt.target === addButton) {
		popups[1].classList.add('popup_is-opened');
	} else if (evt.target.classList.contains('card__image')) {
		popups[2].classList.add('popup_is-opened');
	}
}

function closeModal(evt) {
	if (evt.target.classList.contains('popup__close')) {
		evt.target.closest('.popup').classList.toggle('popup_is-opened');
	} else if (popups[1].classList.contains('.popup_is-opened')) {
		popups[1].remove('popup_is-opened')
	}
}

function closeWithEsc(evt) {
	if (evt.key === 'Escape' && popups[0].classList.contains('popup_is-opened')) {
		popups[0].classList.remove('popup_is-opened');
	} else if (evt.key === 'Escape' && popups[1].classList.contains('popup_is-opened')) {
		popups[1].classList.remove('popup_is-opened');
	} else if (evt.key === 'Escape' && popups[2].classList.contains('popup_is-opened')) {
		popups[2].classList.remove('popup_is-opened');
	}
}

function closeWithClickOnOverlay(evt) {
	if (
		evt.target === popups[0] ||
		evt.target === popups[1] ||
		evt.target === popups[2]
	) {
		evt.target.classList.toggle('popup_is-opened');
	}
}

export { closeModal, closeWithClickOnOverlay, closeWithEsc, openModal };
