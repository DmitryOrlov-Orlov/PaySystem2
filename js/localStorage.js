var cardsData = [{
    id: 1,
    name: "Golden fruit jam",
    prise: 10,
    imgPathMin: "/img/imgPathMin/1min.svg",
    imgPathMax: "/img/imgPathMax/1.svg",
    amount: 1,
    totalPrice: 0,
    inBasket: false
},
{
    id: 2,
    name: "Golden fruit jam",
    prise: 15,
    imgPathMin: "/img/imgPathMin/2min.svg",
    imgPathMax: "/img/imgPathMax/1.svg",
    amount: 1,
    totalPrice: 0,
    inBasket: false
},
{
    id: 3,
    name: "Golden fruit jam",
    prise: 20,
    imgPathMin: "/img/imgPathMin/3min.svg",
    imgPathMax: "/img/imgPathMax/1.svg",
    amount: 1,
    totalPrice: 0,
    inBasket: false
},
]

localStorage.setItem('cardsData', JSON.stringify(cardsData));