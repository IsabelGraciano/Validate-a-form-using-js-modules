import { expressions } from "./expression.js";

describe('Testing texts', () => {
    const allowedTexts = ['prueba', 'PRUEBA', 'pRuEbA',
        'pRÚÉBÁ', 'prueba P R U E B A     '
    ];
    const disallowedTexts = ["$", "''", "", " isa", "45isa", ' ',
        "%", "$", "/", "$"
    ]

    //tests
    allowedTexts.forEach(text => {
        it(`"${text}" debe ser permitido`, () => {
            expect(text).toMatch(new RegExp(expressions['text']))
        })
    })

    disallowedTexts.forEach(text => {
        it(`"${text}" NO debe ser permitido`, () => {
            expect(text).not.toMatch(new RegExp(expressions['text']))
        })
    })
});


describe('Testing emails', () => {
    const allowedEmails = ['isa@prueba.com', '34isa@prueba.com',
        '154831@prueba.com', 'isabel@prueb34.com'
    ];
    const disallowedEmails = ['', ' ', 'is%&a@gmail.com', 'isa@@gmail.com',
        'isa@@gmail.com', 'isa$%bel@gmail.com', 'prueba', 'isabel@',
        'isabel@gmail', 'gmail.com', '@gmail.com'
    ];

    //tests
    allowedEmails.forEach(email => {
        it(`"${email}" debe ser permitido`, () => {
            expect(email).toMatch(new RegExp(expressions['email']))
        })
    })

    disallowedEmails.forEach(email => {
        it(`"${email}" NO debe ser permitido`, () => {
            expect(email).not.toMatch(new RegExp(expressions['email']))
        })
    })
});

describe('Testing numbers', () => {
    const allowedNumbers = ['23', '0'];
    const disallowedNumbers = ['', ' ', '9279234592376528374653287456238745',
        '-3', '7.2435', '3,456', 'pi', 'delta%&', '#$%#'
    ];

    //tests
    allowedNumbers.forEach(number => {
        it(`"${number}" debe ser permitido`, () => {
            expect(number).toMatch(new RegExp(expressions['number']))
        })
    })

    disallowedNumbers.forEach(number => {
        it(`"${number}" NO debe ser permitido`, () => {
            expect(number).not.toMatch(new RegExp(expressions['number']))
        })
    })
});

describe('Testing dates', () => {
    const allowedDates = ['2021-03-03'];
    const disallowedDates = ['', ' ', '2021/03/03', '03-2021-03',
        '03-03-2021', '03/2021/03', '03/03/2021', '03-03-21', '21-03-03'
    ];

    //tests
    allowedDates.forEach(date => {
        it(`"${date}" debe ser permitido`, () => {
            expect(date).toMatch(new RegExp(expressions['date']))
        })
    })

    disallowedDates.forEach(date => {
        it(`"${date}" NO debe ser permitido`, () => {
            expect(date).not.toMatch(new RegExp(expressions['date']))
        })
    })
});

describe('Testing text areas', () => {
    const allowedTextareas = ['prueba', 'PRUEBA', 'pRuEbA',
        'pRÚÉBÁ', 'prueba P R U E B A     ', " isa", "45isa",
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. A amet, odio voluptatum laboriosam ipsum fugit cum minima. Velit mollitia quae quibusdam, ipsa laboriosam quisquam nisi quod esse nemo molestias quia."
    ];
    const disallowedTextareas = ["$", "''", "",
        "%", "$", "/", "$"
    ]


    //tests
    allowedTextareas.forEach(textarea => {
        it(`"${textarea}" debe ser permitido`, () => {
            expect(textarea).toMatch(new RegExp(expressions['textarea']))
        })
    })

    disallowedTextareas.forEach(textarea => {
        it(`"${textarea}" NO debe ser permitido`, () => {
            expect(textarea).not.toMatch(new RegExp(expressions['textarea']))
        })
    })
});