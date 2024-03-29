function openModal(popup) {
	popup.classList.add('popup_is-opened');
	document.addEventListener('keydown', closeWithEsc);
	document.addEventListener('click', closeWithClickOnOverlay);
}

function closeModal(popup) {
	popup.classList.remove('popup_is-opened');
	document.removeEventListener('keydown', closeWithEsc);
	document.removeEventListener('click', closeWithClickOnOverlay);
}

function closeWithEsc(evt) {
	if (evt.key === 'Escape') {
		closeModal(document.querySelector('.popup_is-opened'));
	}
}

function closeWithClickOnOverlay(evt) {
	if (evt.target === document.querySelector('.popup_is-opened')) {
		closeModal(evt.target);
	}
}

export { closeModal, openModal }

