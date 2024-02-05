// чисто добавить clearValidation

function showInputError(formElement, inputElement, errorMessage) {
	const ErrorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add('popup__input_type_error');
	ErrorElement.textContent = errorMessage;
	ErrorElement.classList.add('popup__error_visible');
}

function hideInputError(formElement, inputElement) {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove('popup__input_type_error');
	errorElement.classList.remove('popup__error_visible');
	errorElement.textContent = '';
}

function switchButton(formElement) {
	const button = formElement.querySelector('.popup__button');
	!formElement.checkValidity()
		? button.classList.add('popup__button_disabled')
		: button.classList.remove('popup__button_disabled');
}

function formIsValid(formElement, inputElement) {
	if (inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage);
	} else {
		inputElement.setCustomValidity('');
	}

	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage);
		switchButton(formElement);
	} else {
		hideInputError(formElement, inputElement);
		switchButton(formElement);
	}
}

function setEventListeners(formElement) {
	const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
	inputList.forEach(inputElement => {
		inputElement.addEventListener('input', () => {
			formIsValid(formElement, inputElement);
		});
	});
}

function enableValidation() {
	const formList = Array.from(document.querySelectorAll('.form'));
	formList.forEach(formElement => {
		setEventListeners(formElement);
	});
}

// function clearValidation(formElement) {
// 	switchButton(formElement);
// 	const inputList = Array.from();
// 	inputList.forEach(inputElement => {
// 		hideInputError(formElement, inputElement);
// 	});
// }

export { enableValidation };
