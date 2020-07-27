var cardsData = [{
    id: 1,
    name: "Golden fruit jam",
    prise: 2,
    imgPathMin: "/img/imgPathMin/1min.svg",
    imgPathMax: "/img/imgPathMax/1.svg",
    amount: 1,
    totalPrice: 0,
    inBasket: true
},
{
    id: 2,
    name: "Golden fruit",
    prise: 3,
    imgPathMin: "/img/imgPathMin/2min.svg",
    imgPathMax: "/img/imgPathMax/1.svg",
    amount: 1,
    totalPrice: 0,
    inBasket: true
},
{
    id: 3,
    name: "Golden",
    prise: 5,
    imgPathMin: "/img/imgPathMin/3min.svg",
    imgPathMax: "/img/imgPathMax/1.svg",
    amount: 1,
    totalPrice: 0,
    inBasket: true
},
{
    id: 4,
    name: "Golden",
    prise: 3.20,
    imgPathMin: "/img/imgPathMin/3min.svg",
    imgPathMax: "/img/imgPathMax/1.svg",
    amount: 1,
    totalPrice: 0,
    inBasket: true
},
{
    id: 5,
    name: "Golden",
    prise: 2.20,
    imgPathMin: "/img/imgPathMin/3min.svg",
    imgPathMax: "/img/imgPathMax/1.svg",
    amount: 1,
    totalPrice: 0,
    inBasket: true
},
{
    id: 6,
    name: "Golden",
    prise: 1.20,
    imgPathMin: "/img/imgPathMin/3min.svg",
    imgPathMax: "/img/imgPathMax/1.svg",
    amount: 1,
    totalPrice: 0,
    inBasket: true
}]



function renderList() {
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
        let id = Number(e.target.getAttribute('data-id'));
        let eTargetValue = e.target.value;
        cardsData[id - 1].amount = eTargetValue;

        /* рубрика ОБЩАЯ ЦЕНА ДЛЯ ОТДЕЛЬНОЙ ПОЗИЦИИ */
        let basketPriceAll = document.querySelectorAll('.basket-price');
        basketPriceAll[id - 1].innerHTML = `$${(cardsData[id - 1].prise * eTargetValue).toFixed(2)}`;

        /* рубрика ПРОСТО КОЛ-ВО БУТЫЛОЧЕК в позиции */
        let basketTextPAll = document.querySelectorAll('.basket_text-p');
        basketTextPAll[id - 1].innerHTML = `Quantity ${eTargetValue} Bottle`;

        /* рубрика ОБЩАЯ ЦЕНА */

        totalAmountPrice();
    }
    basketQuantity();

    /* рубрика ОБЩАЯ ЦЕНА */
    function totalAmountPrice() {
        let totalAmountPrice = document.querySelector('.totalAmount-price');
        let totalAmountPriceItem = cardsData.reduce((sum, elem) => {
            return sum + Number(elem.prise * elem.amount)
        }, 0);
        totalAmountPrice.innerHTML = totalAmountPriceItem.toFixed(2);
    }
    totalAmountPrice();



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
    itemToBasket();
    /*----------КОЛИЧЕСТВО ПОЗИЦИЙ В КОРЗИНЕ(конец)----------*/



    /*----------КНОПКА УДАЛЕНИЯ ПОЗИЦИИ ИЗ КОРЗИНЫ(начало)----------*/
    let basketCancelingAll = document.querySelectorAll('.basket-canceling');
    basketCancelingAll.forEach(elem => {
        elem.onclick = basketCancelDelete;
    })
    function basketCancelDelete(e) {
        let id = e.target.getAttribute('data-id');
        cardsData[id - 1].inBasket = false;
        renderList();
    }
    /*----------КНОПКА УДАЛЕНИЯ ПОЗИЦИИ ИЗ КОРЗИНЫ(конец)----------*/
}
renderList();

