import { getFormInputs, listenerInputs } from "./validate.js";

var $ = require('jquery');

describe('Testing the text field', () => {
    document.body.innerHTML = `
    <form data-ig-validation method="get">
        <input type="text" value="isabel" id="textField" data-ig-type="text">
    </form>
    `;
    const allowedLengths = {
        l1: [3, 10]
    };

    const allowedTextsLengths = {
        l1: ["hol", "hola", "abcdefghij"]
    }

    for (let keyL in allowedLengths) {
        var field = document.getElementById('textField');
        field.setAttribute("data-ig-minlength", allowedLengths[keyL][0]);
        field.setAttribute("data-ig-maxlength", allowedLengths[keyL][1]);

        for (let keyT in allowedTextsLengths[keyL]) {
            it(`"${allowedTextsLengths[keyL][keyT]}" debe ser permitido para ["${allowedLengths[keyL]}"]`, () => {
                field.value = allowedTextsLengths[keyL][keyT];
                var result = listenerInputs(field, "");
                expect(result).toBe('valid_input');
            });
        }
    }

    const disallowedTextsLengths = {
        l1: ["", "ho", "abcdefghijabcdefghijabcdefghijabcdefghij"]
    }
    for (let keyL in allowedLengths) {
        var field = document.getElementById('textField');
        field.setAttribute("data-ig-minlength", allowedLengths[keyL][0]);
        field.setAttribute("data-ig-maxlength", allowedLengths[keyL][1]);

        for (let keyT in disallowedTextsLengths[keyL]) {
            it(`"${disallowedTextsLengths[keyL][keyT]}" NO debe ser permitido para ["${allowedLengths[keyL]}"]`, () => {
                field.value = disallowedTextsLengths[keyL][keyT];
                var result = listenerInputs(field, "");
                expect(result).not.toBe('valid_input');
            });
        }
    }
});

describe('Testing the textarea field', () => {
    document.body.innerHTML = `
    <form data-ig-validation method="get">
        <input type="text" value="isabel" id="textareaField" data-ig-type="textarea">
    </form>
    `;
    const allowedLengths = {
        l1: [5, 20]
    };

    const allowedTextsLengths = {
        l1: ["holaa", "abcdefghij", "abcdefghijabcdefghij"]
    }

    for (let keyL in allowedLengths) {
        var field = document.getElementById('textareaField');
        field.setAttribute("data-ig-minlength", allowedLengths[keyL][0]);
        field.setAttribute("data-ig-maxlength", allowedLengths[keyL][1]);

        for (let keyT in allowedTextsLengths[keyL]) {
            it(`"${allowedTextsLengths[keyL][keyT]}" debe ser permitido para ["${allowedLengths[keyL]}"]`, () => {
                field.value = allowedTextsLengths[keyL][keyT];
                var result = listenerInputs(field, "");
                expect(result).toBe('valid_input');
            });
        }
    }

    const disallowedTextsLengths = {
        l1: ["", "hola", "abcdefghijabcdefghija"]
    }
    for (let keyL in allowedLengths) {
        var field = document.getElementById('textareaField');
        field.setAttribute("data-ig-minlength", allowedLengths[keyL][0]);
        field.setAttribute("data-ig-maxlength", allowedLengths[keyL][1]);

        for (let keyT in disallowedTextsLengths[keyL]) {
            it(`"${disallowedTextsLengths[keyL][keyT]}" NO debe ser permitido para ["${allowedLengths[keyL]}"]`, () => {
                field.value = disallowedTextsLengths[keyL][keyT];
                var result = listenerInputs(field, "");
                expect(result).not.toBe('valid_input');
            });
        }
    }
});

describe('Testing checkbox fields', () => {
    document.body.innerHTML = `
    <form data-ig-validation>
        <input type="checkbox" id="check1" data-ig-type="checkbox" name="java">Java<br>
        <input type="checkbox" id="check2" data-ig-type="checkbox" name="cplus">C++<br>
        <input type="checkbox" id="check3" data-ig-type="checkbox" name="c">C<br>
    </form>
    `;

    var checkboxes = getFormInputs(document)[1];
    var field = document.getElementById('check1');

    it("Ningún checkbox seleccionado", () => {
        var result = listenerInputs("", checkboxes);
        expect(result).not.toBe('valid_input');
    });
    it("1 checkbox seleccionado", () => {
        checkboxes[0].checked = true;

        var result = listenerInputs("", checkboxes);
        expect(result).toBe('valid_input');
    });
    it("TODOS checkboxs seleccionados", () => {
        checkboxes[0].checked = true;
        checkboxes[1].checked = true;
        checkboxes[2].checked = true;

        var result = listenerInputs("", checkboxes);
        expect(result).toBe('valid_input');
    });
});

describe('Testing the number field', () => {
    document.body.innerHTML = `
    <form data-ig-validation method="get">
        <input type="text" value="isabel" id="numberField" data-ig-type="number">
    </form>
    `;
    const allowedRange = {
        l1: [5, 20]
    };

    const allowedNumber = {
        l1: ["5", "6", "10", "15", "19", "20"]
    }

    for (let keyR in allowedRange) {
        var field = document.getElementById('numberField');
        field.setAttribute("data-ig-min", allowedRange[keyR][0]);
        field.setAttribute("data-ig-max", allowedRange[keyR][1]);

        for (let keyT in allowedNumber[keyR]) {
            it(`"${allowedNumber[keyR][keyT]}" debe ser permitido para ["${allowedRange[keyR]}"]`, () => {
                field.value = allowedNumber[keyR][keyT];
                var result = listenerInputs(field, "");
                expect(result).toBe('valid_input');
            });
        }
    }

    const disallowedNumber = {
        l1: ["", "4", "0", "-3", "21"]
    }
    for (let keyR in allowedRange) {
        var field = document.getElementById('numberField');
        field.setAttribute("data-ig-minlength", allowedRange[keyR][0]);
        field.setAttribute("data-ig-maxlength", allowedRange[keyR][1]);

        for (let keyT in disallowedNumber[keyR]) {
            it(`"${disallowedNumber[keyR][keyT]}" NO debe ser permitido para ["${allowedRange[keyR]}"]`, () => {
                field.value = disallowedNumber[keyR][keyT];
                var result = listenerInputs(field, "");
                expect(result).not.toBe('valid_input');
            });
        }
    }
});