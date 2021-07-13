// import { expression } from "./expression.js";

const ValidateField = (input, displayMessage, expression) => {
    if (displayMessage == "notValid-chkb") {
        return 'select one option';
    } else if (displayMessage == "successMsgCheckbox") {
        return 'valid_input';
    } else if (displayMessage == "number_invalid") {
        return 'The value of this field must be between ' +
            input.getAttribute('data-ig-min') + ' and ' + input.getAttribute('data-ig-max') + ' characters'
    } else if (displayMessage == "textLength_invalid") {
        return 'The value of this field must be between ' +
            input.getAttribute('data-ig-minlength') + ' and ' + input.getAttribute('data-ig-maxlength') + ' characters'
    } else if (input.value.match(expression)) {
        return 'valid_input';
    } else {
        return displayMessage;
    }
}

var expressions = {
    text: /^[a-zA-Z]+(?:\\s+[a-zA-Z]+)*/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    number: /^[0-9]{1,30}$/,
    textarea: /[a-zA-Z0-9À-ÿ\\s\\.\\,]{1,2000}/,
    date: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/, //yyyy-mm-dd
}

export function getFormInputs(document) {
    var numberOfForms = document.forms.length;
    for (let i = 0; i < numberOfForms; i++) {
        if (document.forms[i].hasAttribute('data-ig-validation')) {
            var inputs = document.querySelectorAll('form[data-ig-validation] input, form[data-ig-validation] textarea, form[data-ig-validation] select, form[data-ig-validation] option, form[data-ig-validation] checkbox');
            var checkboxes = document.querySelectorAll('input[data-ig-type=checkbox]');
            return [inputs, checkboxes];
        }
    }
}

export function listenerInputs(input, checkboxes) {
    var oneCheckboxSelected = false;
    var displayMessage = ""
    var text = expressions['text']
    var textarea = expressions['textarea']
    var targetName = ""

    if (input == "") {
        targetName = checkboxes[0].getAttribute('data-ig-type'); //checkbox
    } else {
        targetName = input.getAttribute('data-ig-type'); //text, number, date etc
    }

    const fieldTypes = {
        "text": (target, exreg) => {
            if (input.getAttribute('data-ig-minlength') || input.getAttribute('data-ig-maxlength')) {
                if (input.value.length < parseInt(input.getAttribute('data-ig-minlength')) ||
                    input.value.length > parseInt(input.getAttribute('data-ig-maxlength'))) {
                    return ValidateField(target, displayMessage = 'textLength_invalid', exreg)
                }
                text = text.toString()
                text = text.replace(input.getAttribute('data-ig-minlength'), 1);
                text = text.replace(input.getAttribute('data-ig-maxlength'), 20);
                text = text.replace('^', '');
                text = text.replace('$', '');

                text = text.replace(new RegExp(/1/), input.getAttribute('data-ig-minlength'));
                text = text.replace(new RegExp(/20/), input.getAttribute('data-ig-maxlength'));
                text = '^' + text + '$'
            }
            return ValidateField(target, displayMessage = 'You can only use characters with accents and spaces in this field', exreg)
        },

        "email": (target, exreg) => {
            return ValidateField(target, displayMessage = 'Your email must have @ and . to be correct', exreg)
        },

        "number": (target, exreg) => {
            if (parseInt(input.value) < parseInt(input.getAttribute('data-ig-min')) ||
                parseInt(input.value) > parseInt(input.getAttribute('data-ig-max'))) {
                return ValidateField(target, displayMessage = 'number_invalid', exreg)
            }
            return ValidateField(target, displayMessage = 'This is a numeric field', exreg);
        },
        "date": (target, exreg) => { return ValidateField(target, displayMessage = 'This should be a date format: yyyy-mm-dd', exreg) },
        "textarea": (target, exreg) => {
            textarea = textarea.toString()
            textarea = textarea.replace(input.getAttribute('data-ig-minlength'), 1);
            textarea = textarea.replace(input.getAttribute('data-ig-maxlength'), 2000);
            textarea = textarea.replace('^', '');
            textarea = textarea.replace('$', '');

            textarea = textarea.replace(new RegExp(/1/), input.getAttribute('data-ig-minlength'));
            textarea = textarea.replace(new RegExp(/2000/), input.getAttribute('data-ig-maxlength'));
            textarea = '^' + textarea + '$'

            if (input.value.length < parseInt(input.getAttribute('data-ig-minlength')) ||
                input.value.length > parseInt(input.getAttribute('data-ig-maxlength'))) {
                return ValidateField(target, displayMessage = 'textLength_invalid', exreg)
            }

            return ValidateField(target, displayMessage = 'This field recieves words, commas and dots', exreg)
        },
        "checkbox": (target, exreg) => {
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    oneCheckboxSelected = true;
                    return ValidateField(target, displayMessage = 'successMsgCheckbox', exreg)
                }
            }
            if (!oneCheckboxSelected) {
                return ValidateField(target, displayMessage = 'notValid-chkb', exreg)
            }
        },
    };
    return fieldTypes[targetName] ? fieldTypes[targetName](input, expressions[targetName]) : "This is not a valid field";
}