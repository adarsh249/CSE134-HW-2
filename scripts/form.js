const contactForm = document.getElementById('contact_me_form');
const nameInput = document.getElementById('full_name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const commentInput = document.getElementById('comments');
const nameInputError = document.querySelector('output[for="full_name"][name="error_message"]');
const emailInputError = document.querySelector('output[for="email"][name="error_message"]');
const phoneInputError = document.querySelector('output[for="phone"][name="error_message"]');
const commentInputError = document.querySelector('output[for="comments"][name="error_message"]');

function validateFullName() {
    if(!nameInput.checkValidity()) {
        console.log("not valid");
        nameInput.setCustomValidity('This field is required.');
        nameInputError.textContent = nameInput.validationMessage;
    }
    else {
        console.log("valid");
        nameInput.setCustomValidity('');
        nameInputError.textContent = '';
    }

    isIllegalChar(nameInput, nameInputError);
}

function validateEmail() {
    if(!emailInput.checkValidity()) {
        emailInput.setCustomValidity('Invalid email format.');
        emailInputError.textContent = emailInput.validationMessage;
    }
    else {
        emailInput.setCustomValidity('');
        emailInputError.textContent = '';
    }

    isIllegalChar(emailInput, emailInputError);
}

function validatePhone() {
    if(!phoneInput.checkValidity()) {
        phoneInput.setCustomValidity('Please type the input as xxx-xxx-xxxx');
        phoneInputError.textContent = phoneInput.validationMessage;
    }
    else {
        phoneInputError.textContent = '';
    }

    isIllegalChar(phoneInput, phoneInputError);
}

function validateComments() {
    if(!commentInput.checkValidity()) {
        if(commentInput.value.length < 50) {
            commentInput.setCustomValidity('You must have at least 50 characters.');
            commentInputError.textContent = commentInput.validationMessage;
        }
        else if(commentInput.value.length > 1500) {
            commentInput.setCustomValidity('You must have less than 1500 characters');
            commentInputError.textContent = commentInput.validationMessage;
        }
    }

    isIllegalChar(commentInput, commentInputError);
}

function isIllegalChar(input, inputError) {
    const allowedChars = /^[A-Za-z\s.,!?'"()]+$/;
    const inputVal = input.value;

    if(!allowedChars.test(inputVal)) {
        inputError.textContent = 'Illegal characters detected.';
    }
}

nameInput.addEventListener('input', validateFullName);
emailInput.addEventListener('input', validateEmail);
phoneInput.addEventListener('input', validatePhone);
commentInput.addEventListener('input', validateComments);