export var expressions = {
    text: /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    number: /^[0-9]{1,30}$/,
    textarea: /[a-zA-Z0-9À-ÿ\\s\\.\\,]{1,2000}/,
    date: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/, //yyyy-mm-dd
}