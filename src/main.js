import { getFormInputs, listenerInputs } from './validate.js';


var checkboxes = getFormInputs(document)[1];

var inputs = getFormInputs(document)[0];
console.log(getFormInputs(document))

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('blur', function(e) {
        Toast.init();
        Toast.show(listenerInputs(inputs[i], checkboxes, e), 'alert');
    });
}

const Toast = {
    init() {
        this.hideTimeout = null;
        this.el = document.createElement("div");
        this.el.className = "toast";
        document.body.appendChild(this.el);
    },

    show(message, state) {
        clearTimeout(this.hideTimeout);

        this.el.textContent = message;
        this.el.className = "toast toast--visible";

        if (state) {
            this.el.classList.add(`toast--${state}`);
        }

        this.hideTimeout = setTimeout(() => {
            this.el.classList.remove("toast--visible");
        }, 3000);
    }
};