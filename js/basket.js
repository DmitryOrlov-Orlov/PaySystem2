window.addEventListener('storage', function (e) {
    console.log(e.target.localStorage);
    ls = localStorage.getItem('cardsData');
    let cardsData = JSON.parse(ls);
    console.log(cardsData);



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
        }

        function basketQuantityChange(e) {
            let id = Number(e.target.getAttribute('data-id'));
            console.log('id = ' + id);
            let eTargetValue = e.target.value;
            cardsData[id - 1].amount = eTargetValue;
            localStorage.setItem('cardsData', JSON.stringify(cardsData));
            console.log(cardsData[id - 1].amount);

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
            let totalAmountPriceItem = 0;
            cardsData.forEach(elem => {
                if (elem.inBasket) {
                    totalAmountPriceItem += elem.amount * elem.prise;
                }

            });
            totalAmountPrice.innerHTML = totalAmountPriceItem.toFixed(2);
        }
        totalAmountPrice();



        /*----------КОЛИЧЕСТВО ПОЗИЦИЙ В КОРЗИНЕ(начало)----------этот код можно добавить в ОБЩАЯ Цена и код уменьшится*/

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
            console.log('до ' + cardsData[id - 1].inBasket);
            cardsData[id - 1].inBasket = false;
            console.log('после ' + cardsData[id - 1].inBasket);
            cardsData[id - 1].amount = 0;
            localStorage.setItem('cardsData', JSON.stringify(cardsData));
            renderList();
        }
        /*----------КНОПКА УДАЛЕНИЯ ПОЗИЦИИ ИЗ КОРЗИНЫ(конец)----------*/


    }
    renderList();
})