var cardsData = [{
    id: 1,
    name: "Golden fruit jam",
    prise: 10.99,
    imgPathMin: "/img/imgPathMin/1min.svg",
    imgPathMax: "/img/imgPathMax/1.svg",
    amount: 1,
    totalPrice: 10.99,
    inBasket: true
},
{
    id: 2,
    name: "Golden fruit jam",
    prise: 8.10,
    imgPathMin: "/img/imgPathMin/2min.svg",
    imgPathMax: "/img/imgPathMax/1.svg",
    amount: 1,
    totalPrice: 8.10,
    inBasket: true
},
{
    id: 3,
    name: "Golden fruit jam",
    prise: 8.20,
    imgPathMin: "/img/imgPathMin/3min.svg",
    imgPathMax: "/img/imgPathMax/1.svg",
    amount: 1,
    totalPrice: 8.20,
    inBasket: true
},
{
    id: 4,
    name: "Golden fruit jam",
    prise: 12.00,
    imgPathMin: "/img/imgPathMin/4min.svg",
    imgPathMax: "/img/imgPathMax/1.svg",
    amount: 1,
    totalPrice: 12.00,
    inBasket: false
},
{
    id: 5,
    name: "Golden fruit jam",
    prise: 8.00,
    imgPathMin: "/img/imgPathMin/5min.svg",
    imgPathMax: "/img/imgPathMax/1.svg",
    amount: 1,
    totalPrice: 8.00,
    inBasket: false
},
{
    id: 6,
    name: "Golden fruit jam",
    prise: 8.00,
    imgPathMin: "/img/imgPathMin/6min.svg",
    imgPathMax: "/img/imgPathMax/1.svg",
    amount: 1,
    totalPrice: 8.00,
    inBasket: false
},
{
    id: 7,
    name: "Golden fruit jam",
    prise: 8.00,
    imgPathMin: "/img/imgPathMin/7min.svg",
    imgPathMax: "/img/imgPathMax/1.svg",
    amount: 1,
    totalPrice: 8.00,
    inBasket: false
},
{
    id: 8,
    name: "Golden fruit jam",
    prise: 8.00,
    imgPathMin: "/img/imgPathMin/8min.svg",
    imgPathMax: "/img/imgPathMax/1.svg",
    amount: 1,
    totalPrice: 8.00,
    inBasket: false
},
{
    id: 9,
    name: "Golden fruit jam",
    prise: 8.00,
    imgPathMin: "/img/imgPathMin/9min.svg",
    imgPathMax: "/img/imgPathMax/1.svg",
    amount: 1,
    totalPrice: 8.00,
    inBasket: false
}]



/* -----КАРУСЕЛЬ(начало)-------- */
function createGallery() {
    let createGallery = document.querySelector('.gallery');
    createGallery.innerHTML = '';
    cardsData.forEach(elem => {
        let createGalleryElem = gallery(elem);
        createGallery.appendChild(createGalleryElem);
    });
}

function gallery(product) {
    let gallerySpan = document.createElement('span');
    gallerySpan.innerHTML = `
    <div class="carousel-item">
        <div class="carousel-img-max" style="background-image: url(${product.imgPathMax})"></div>
        <div class=" idLike" data-id="${product.id}"></div>
    </div>
    `
    return gallerySpan;
}
createGallery();
/* -----КАРУСЕЛЬ(конец)-------- */



/* ----------СДВИГ ВЛЕВО ГАЛЛЕРЕНИИ (начало)--------- */
let width = 213;
let position = 0;
let countId = 2;

document.querySelector('.next').onclick = function () {
    let gallery = document.querySelector('.gallery');
    if (countId >= 1 && countId <= cardsData.length - 1) {
        position -= width;
        gallery.style.marginLeft = position + 'px';
        countId++;
        navQuantity.innerHTML = `Quantity ${cardsData[countId - 1].amount}`;
        let firstPagePrice = document.querySelector('.first-page-price');
        firstPagePrice.innerHTML = `$${cardsData[countId - 1].totalPrice.toFixed(2)}`;
    }
}
/* ----------СДВИГ ВЛЕВО ГАЛЛЕРЕНИИ (конец)--------- */



/* ----------СДВИГ ВПРАВО ГАЛЛЕРЕНИИ (начало)--------- */
document.querySelector('.prev').onclick = function () {
    let gallery = document.querySelector('.gallery');
    if (countId <= cardsData.length && countId >= 2) {
        position += width;
        gallery.style.marginLeft = position + 'px';
        countId--;
        navQuantity.innerHTML = `Quantity ${cardsData[countId - 1].amount}`;
        let firstPagePrice = document.querySelector('.first-page-price');
        firstPagePrice.innerHTML = `$${cardsData[countId - 1].totalPrice.toFixed(2)}`;
    }
}
/* ----------СДВИГ ВПРАВО ГАЛЛЕРЕНИИ (конец)--------- */



/* ----------ЛАЙК, ДОБАВИТЬ В КОРЗИНУ изменит занчение в карзине на true или на false (начало)--------- */
document.querySelector('.header-heart').onclick = function () {
    let idLike = document.querySelectorAll('.idLike');
    let numCardsData = cardsData[countId - 1];
    if (numCardsData.inBasket == false) {
        numCardsData.inBasket = true;
        idLike[countId - 1].classList.add('gallery-like');
    } else {
        numCardsData.inBasket = false;
        idLike[countId - 1].classList.remove('gallery-like');
    }
}
/* ----------ЛАЙК, ДОБАВИТЬ В КОРЗИНУ изменит занчение в карзине на true или на false (конец)--------- */



/* ----------ДОБАВИТЬ\УБАВИТЬ КОЛИЧЕСТВО БУТЫЛОЧЕК(начало)--------------- */
let navQuantity = document.querySelector('.nav-quantity');
navQuantity.innerHTML = `Quantity ${cardsData[countId - 1].amount}`;
document.querySelector('.minus').onclick = function () {
    if (cardsData[countId - 1].amount >= 1) {
        cardsData[countId - 1].amount--;
        navQuantity.innerHTML = `Quantity ${cardsData[countId - 1].amount}`;
        totalPrise();
    }
}
document.querySelector('.plus').onclick = function () {
    cardsData[countId - 1].amount++;
    navQuantity.innerHTML = `Quantity ${cardsData[countId - 1].amount}`;
    totalPrise();

}
/* ----------ДОБАВИТЬ УБАВИТЬ КОЛИЧЕСТВО БУТЫЛОЧЕК(начало)--------------- */



/*-----ЦЕНА ОТДЕЛЬНО ДЛЯ КАЖДОГО ЭЛЕМЕНТА_СДВИГ(начало)-----*/
function totalPrise() {
    console.log(cardsData[countId - 1].id);

    console.log('до ' + cardsData[countId - 1].totalPrice);
    cardsData[countId - 1].totalPrice = (cardsData[countId - 1].amount * cardsData[countId - 1].prise).toFixed(2);
    console.log('после ' + cardsData[countId - 1].totalPrice);

    let firstPagePrice = document.querySelector('.first-page-price');
    firstPagePrice.innerHTML = `$${cardsData[countId - 1].totalPrice}`;
}
totalPrise();



/*-----ЦЕНА ОТДЕЛЬНО ДЛЯ КАЖДОГО ЭЛЕМЕНТА_СДВИГ(начало)-----*/