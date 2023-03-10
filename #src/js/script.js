import svg from "./vivus.js";

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const PASSWORD_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const mail = document.querySelector('#e-mail');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

firstName.addEventListener('input', () => removeValidationFailedClasses('.first-name'));
firstName.addEventListener('change', () => {
    if (isFieldEmpty(firstName.value)) {
        addValidationFailedClasses('.first-name');
    }
});
lastName.addEventListener('input', () => removeValidationFailedClasses('.last-name'));
lastName.addEventListener('change', () => {
    if (isFieldEmpty(lastName.value)) {
        addValidationFailedClasses('.last-name')
    }
});
mail.addEventListener('input', () => {
    document.querySelector('.e-mail__mark').classList.remove('activeMark');
    removeValidationFailedClasses('.e-mail')
});
mail.addEventListener('change', () => {
    if (!isEmailValid(mail.value) || isFieldEmpty(mail.value)) {
        addValidationFailedClasses('.e-mail')
    }
    else {
        document.querySelector('.e-mail__mark').classList.add('activeMark')
    }
});
password.addEventListener('input', () => removeValidationFailedClasses('.password'));
password.addEventListener('change', () => {
    if (!isPasswordValid(password.value) || isFieldEmpty(password.value)) {
        addValidationFailedClasses('.password')
    }
});
password2.addEventListener('input', () => removeValidationFailedClasses('.password2'));
password2.addEventListener('change', () => {
    if (!isPasswordConfirm(password2.value) || isFieldEmpty(password2.value)) {
        addValidationFailedClasses('.password2')
    }
});

function removeValidationFailedClasses(field) {
    document.querySelector(field).classList.remove('borderInWrongField');
    document.querySelector(field).classList.remove('tooltipInWrongField');
    document.querySelector(field).classList.remove('textInWrongField');
}

function addValidationFailedClasses(field) {
    document.querySelector(field).classList.add('borderInWrongField');
    document.querySelector(field).classList.add('tooltipInWrongField');
    document.querySelector(field).classList.add('textInWrongField');
}

function isFieldEmpty(value) {
    if (value == '') return true;
    return false;
}
function isEmailValid(value) {
    return EMAIL_REGEXP.test(value);
}
function isPasswordValid(value) {
    return PASSWORD_REGEXP.test(value);
}
function isPasswordConfirm(value) {
    if (value == password.value) return true;
    return false;
}

document.addEventListener('DOMContentLoaded', function () {
    let allField = document.querySelectorAll('.form__field');
    allField.forEach((e, index) => setTimeout(() => e.classList.add('readyField'), (index + 1) * 350));
});

document.querySelector('.form__submit').addEventListener('click', async function (e) {
    e.preventDefault();
    if (!isFieldEmpty(firstName.value) &&
        !isFieldEmpty(lastName.value) &&
        isEmailValid(mail.value) &&
        isPasswordValid(password.value) &&
        isPasswordConfirm(password2.value)) {
        let obj =
        {
            method: 'POST',
            body: new FormData(document.querySelector('.form'))
        }
        // let response = await fetch('./assets/server-ok.json');
        let response = await fetch('./assets/server-ok.json');
        let result = await response.json();
        if (result.state) {
            firstName.value = null;
            lastName.value = null;
            mail.value = null;
            password.value = null;
            password2.value = null;
            document.querySelector('.e-mail__mark').classList.remove('activeMark');
            document.querySelector('.alertOk').classList.add('alertOkActive');
            document.querySelector('.alertOk').addEventListener('animationend', function (e) {
                e.target.classList.remove('alertOkActive');
            });
        }
        else {
            document.querySelector('.alertError').classList.add('alertErrorActive');
            document.querySelector('.alertError').addEventListener('animationend', function (e) {
                e.target.classList.remove('alertErrorActive');
            });
        }
    }
    else {
        if (isFieldEmpty(firstName.value)) {
            addValidationFailedClasses('.first-name')
        }
        if (isFieldEmpty(lastName.value)) {
            addValidationFailedClasses('.last-name')
        }
        if (!isEmailValid(mail.value) || isFieldEmpty(mail.value)) {
            addValidationFailedClasses('.e-mail')
        }
        if (!isPasswordValid(password.value) || isFieldEmpty(password.value)) {
            addValidationFailedClasses('.password')
        }
        if (!isPasswordConfirm(password2.value) || isFieldEmpty(password2.value)) {
            addValidationFailedClasses('.password2')
        }
        e.target.classList.add('activeSubmit');
        document.querySelector('.form__submit').addEventListener('animationend', function (e) {
            e.target.classList.remove('activeSubmit');
        });
    }
});
