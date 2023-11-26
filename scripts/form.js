/*might need to add different patterns for fullName, email, comments*/
/*Need to fix form errors submission. its not in json FORMAT */
const contactForm = document.getElementById('contact_me_form');
const nameInput = document.getElementById('full_name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const commentInput = document.getElementById('comments');
const nameInputError = document.querySelector('output[for="full_name"][name="error_message"]');
const emailInputError = document.querySelector('output[for="email"][name="error_message"]');
const phoneInputError = document.querySelector('output[for="phone"][name="error_message"]');
const commentInputError = document.querySelector('output[for="comments"][name="error_message"]');
const commentInputInfo = document.querySelector('output[for="comments"][name="info_message"]');
const submitButton = document.querySelector('#contact_me_form button');
const formErrors = []
const inputNames = {
    full_name: 'full_name',
    email: 'email',
    phone: 'phone',
    comments: 'comments'
};

function validateFullName() {
    if(nameInput.validity.patternMismatch){
        showRegExError(nameInput, nameInputError);
    }
    else if(nameInput.validity.valueMissing) {
        nameInput.setCustomValidity('Please fill out this field.');
        nameInput.style.borderColor = 'rgb(255, 77, 77)';
        nameInputError.textContent = nameInput.validationMessage;
    }
    else {
        nameInput.setCustomValidity('');
        nameInputError.textContent = '';
    }
}

function validateEmail() {
    if(emailInput.validity.patternMismatch){
        showRegExError(emailInput, emailInputError);
    }
    else if(emailInput.validity.valid) {
        emailInput.setCustomValidity('');
        emailInputError.textContent = ''; 
    }
    else if(emailInput.validity.valueMissing) {
        emailInput.style.borderColor = 'rgb(255, 77, 77)';
        emailInput.setCustomValidity('Please fill out this field.');
        emailInputError.textContent = emailInput.validationMessage;
    }
    else {
        emailInput.setCustomValidity('');
        emailInputError.textContent = emailInput.validationMessage;
    }
}

function validatePhone() {
    if(/[^0-9-]/.test(phoneInput.value)) {
        showRegExError(phoneInput, phoneInputError);
    }
    else if(phoneInput.validity.patternMismatch) {
        phoneInput.setCustomValidity('Please type the input as xxx-xxx-xxxx');
        phoneInputError.textContent = phoneInput.validationMessage;
        let errorData = {
            inputName: 'phone',
            errorType: 'Pattern mistmatch',
            errorMessage: 'Please type the input as xxx-xxx-xxxx.'
        };
        formErrors.push(errorData);
    }
    else {
        if(phoneInput.validity.valueMissing) {
            phoneInput.setCustomValidity('Please fill out this field.');
            phoneInput.style.borderColor = 'rgb(255, 77, 77)';
            phoneInputError.textContent = phoneInput.validationMessage;
        }
        else{
            phoneInput.setCustomValidity('');
            phoneInputError.textContent = '';
        }
    }
}

function validateComments() {
    if(commentInput.validity.patternMismatch){
        showRegExError(commentInput, commentInputError);
    }
    if(commentInput.validity.tooShort) {
        commentInput.setCustomValidity('You must have at least 50 characters.');
        commentInputError.textContent = commentInput.validationMessage;        
    }
    else if(commentInput.validity.tooLong) {
        commentInput.setCustomValidity('You must have less than 1500 characters.');
        commentInputError.textContent = commentInput.validationMessage;
        let errorData = {
            inputName: 'comments',
            errorType: 'tooLong',
            errorMessage: 'You must have less than 1500 characters.'
        };
        formErrors.push(errorData);
    }
    else if(commentInput.validity.valueMissing) {
        commentInput.setCustomValidity('Please fill out this field.');
        commentInput.style.borderColor = 'rgb(255, 77, 77)';
        commentInputError.textContent = commentInput.validationMessage;
    }
    else {
        commentInput.setCustomValidity('');
        commentInputError.textContent = '';
    }
}

function showRegExError(input, inputError) {
    let originalColor = input.style.backgroundColor;
    input.style.backgroundColor = 'rgb(255, 77, 77)';
    inputError.textContent = 'Invalid character entered.';
    setTimeout(function () {
        input.style.transition = 'background-color 0.5s ease-out';
        inputError.style.transition = 'opacity 0.5s ease-out'; 
        input.style.backgroundColor = originalColor;
        inputError.textContent = input.validationMessage;
    }, 500);

    let errorData = {
        "inputName": inputNames[input.id],
        "errorType": "RegEx Validation Error",
        "errorMessage": "Invalid character entered."
    };

    formErrors.push(errorData);
}

function characterCount() {
    let inputValue = commentInput.value;
    let remainingChars = commentInput.maxLength - inputValue.length;

    commentInputInfo.textContent = remainingChars + ' characters remaining.';
    if(remainingChars == 0) {
        commentInputInfo.textContent = 'Max character limit reached.';
        commentInputInfo.style.color = 'rgb(255, 77, 77)';
    }
    else if(remainingChars < 20) {
        commentInputInfo.style.color = 'rgb(255, 77, 77)';
    }
    else if(remainingChars < 50) {
        commentInputInfo.style.color = '#c49119';
    }
    else {
        commentInputInfo.style.color = 'rgb(109 223 78)';
    }
}

function sendData() {
    if(commentInput.validity.tooShort) {
        let errorData = {
            "inputName": "comments",
            "errorType": "tooShort",
            "errorMessage": "You must have at least 50 characters."
        };
        formErrors.push(errorData);
        
    }
    if(commentInput.validity.tooLong) {
        let errorData = {
            "inputName": "comments",
            "errorType": "tooLong",
            "errorMessage": "You must have less than 1500 characters."
        };
        formErrors.push(errorData);
    }
    console.log(formErrors);
    let formErrorsJSON = JSON.stringify(formErrors);
    let formErrorsValue = document.getElementById('form_errors');
    formErrorsValue.value = formErrorsJSON;
}

nameInput.addEventListener('input', validateFullName);
emailInput.addEventListener('input', validateEmail);
phoneInput.addEventListener('input', validatePhone);
commentInput.addEventListener('input', validateComments);
commentInput.addEventListener('input', characterCount);
submitButton.addEventListener('click', sendData);