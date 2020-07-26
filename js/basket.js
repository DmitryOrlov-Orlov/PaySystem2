var cardsData = [{
    id: 1,
    name: "Golden fruit jam",
    prise: 10.99,
    imgPathMin: "/img/imgPathMin/1min.svg",
    imgPathMax: "/img/imgPathMax/1.svg",
    amount: 1,
    totalPrice: 10.99,
    totalAmount: 1,
    inBasket: true
},
{
    id: 2,
    name: "Golden fruit",
    prise: 8.10,
    imgPathMin: "/img/imgPathMin/2min.svg",
    imgPathMax: "/img/imgPathMax/1.svg",
    amount: 1,
    totalPrice: 8.10,
    totalAmount: 1,
    inBasket: true
},
{
    id: 3,
    name: "Golden",
    prise: 8.20,
    imgPathMin: "/img/imgPathMin/3min.svg",
    imgPathMax: "/img/imgPathMax/1.svg",
    amount: 1,
    totalPrice: 8.20,
    totalAmount: 1,
    inBasket: true
}]

/*---------- ЭЛЕМЕНТЫ В КОРЗИНЕ У КОТОРЫХ TRUE(начало)----------*/
function basket() {
    let basket = document.querySelector('.basket');
    basket.innerHTML = '';
    cardsData.forEach(elem => {
        let basketToAdd = basketItem(elem);
        basket.appendChild(basketToAdd);
    });
}

function basketItem(product) {
    let basketItem = document.createElement('div');

    if (product.inBasket) {
        basketItem.innerHTML = `
        <div class="basket-item">
            <div class="basket-img" style="background-image:url(${product.imgPathMin}"></div>
            <div class="basket-two-text">
                <p class="basket_text-name">${product.name}</p>
                <p class="basket_text-p">Quantity ${product.amount} Bottle</p>
            </div>
            <input class="basket-quantity" placeholder="1" value='${product.amount}' type='number' data-id=${product.id}>
    
            <div class="basket-price">$${(product.prise * product.amount).toFixed(2)}</div>
            <div class="basket-canceling" data-id=${product.id}></div>
        </div>
        `
    }
    return basketItem;
}
basket();
/*----------ЭЛЕМЕНТЫ В КОРЗИНЕ У КОТОРЫХ TRUE(конец)----------*/


/*----------В КАЖДОМ ЭЛЕМЕНТЕ МЕНЯТЕСЯ ЦЕНА ЕСЛИ ИЗМЕНИТЬ РУКАМИ КОЛИЧЕСТВО(начало)----------*/
function basketQuantity() {
    let basketQuantityAll = document.querySelectorAll('.basket-quantity');
    basketQuantityAll.forEach(elem => {
        elem.onchange = basketQuantityChange;
    });
    console.log(basketQuantityAll);
}

function basketQuantityChange(e) {
    let basketPriceAll = document.querySelectorAll('.basket-price');
    let id = Number(e.target.getAttribute('data-id'));
    let res = (cardsData[id - 1].prise * e.target.value).toFixed(2);
    cardsData[id - 1].totalPrice = res;
    basketPriceAll[id - 1].innerHTML = `$${res}`;
    totalPrice();
    basketTextP(id - 1, e);
}
basketQuantity();
/*----------В КАЖДОМ ЭЛЕМЕНТЕ МЕНЯТЕСЯ ЦЕНА ЕСЛИ ИЗМЕНИТЬ РУКАМИ КОЛИЧЕСТВО(конец)----------*/


/* -----ИЗМЕНИТЬ КОЛИЧЕСТВО БУТЫЛОК В СТРОКЕ(начало)----- */
function basketTextP(elem, e) {
    let basketTextP = document.querySelectorAll('.basket_text-p');
    basketTextP[elem].innerHTML = `Quantity ${e.target.value} Bottle`;
}
/* -----ИЗМЕНИТЬ КОЛИЧЕСТВО БУТЫЛОК В СТРОКЕ(начало)----- */




/*----------ОБЩАЯ ЦЕНА (начало)----------*/
let totalAmountPrice = document.querySelector('.totalAmount-price');
function totalPrice() {
    cardsData.reduce((sum, current) => {
        totalAmountPrice.innerHTML = sum + Number(current.totalPrice);

        return sum + Number(current.totalPrice);
    }, 0);
}
/* totalAmountPrice.innerHTML = `$${totalPrise()}`; */
/*----------ОБЩАЯ ЦЕНА (конец)----------*/



/*----------КОЛИЧЕСТВО ПОЗИЦИЙ В КОРЗИНЕ(начало)----------*/

function itemToBasket() {
    let sumInBasketTrue = 0;
    cardsData.forEach(elem => {
        if (elem.inBasket) {
            sumInBasketTrue++;
        }
    });
    document.querySelector('.card-itemAdded').innerHTML = `${sumInBasketTrue} Item added`;
}

/*----------КОЛИЧЕСТВО ПОЗИЦИЙ В КОРЗИНЕ(конец)----------*/



/*----------КНОПКА УДАЛЕНИЯ ПОЗИЦИИ ИЗ КОРЗИНЫ(начало)----------*/

const basketCancelingAll = document.querySelectorAll('.basket-canceling');
basketCancelingAll.forEach(elem => {
    elem.onclick = basketCancelDelete;
})


function basketCancelDelete(e) {
    let id = e.target.getAttribute('data-id');
    cardsData[id - 1].inBasket = false;
    basket();
    itemToBasket();
    cardsData.forEach(elem => {
        console.log(elem.inBasket);
    });
}


/*----------КНОПКА УДАЛЕНИЯ ПОЗИЦИИ ИЗ КОРЗИНЫ(конец)----------*/