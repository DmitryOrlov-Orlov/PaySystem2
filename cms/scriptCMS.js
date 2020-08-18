function renderList() {
    ls = localStorage.getItem('cardsData');
    let cardsData = JSON.parse(ls);

    function list() {
        let list = document.querySelector('.list');
        list.innerHTML = '';
        cardsData.forEach(item => {
            let listItemAdd = listItem(item);
            list.appendChild(listItemAdd);
        });
    }

    function listItem(product) {
        let basketItem = document.createElement('div');
        basketItem.innerHTML = `
            <div class="list-block">
            <div class="list-img" style="background-image:url(${product.imgPathMax}"></div>
            <div class="list-icon" style="background-image:url(${product.imgPathMin}"></div>
            <div class="list-name">${product.name}</div>
            <div class="list-price">$${product.prise}</div>
            <button class="list-red" data-id=${product.id}>РЕД</button>
            <div class="list-basket-canceling" data-id=${product.id}></div>
        </div>
    `
        return basketItem;
    }
    list();



    let name = document.querySelector('.name');
    let nameStr = '';
    name.onchange = funcName;
    function funcName() {
        nameStr = this.value;
        console.log(nameStr);
    }


    let price = document.querySelector('.price');
    let priceStr = '';
    price.onchange = funcPrice;
    function funcPrice() {
        priceStr = this.value;
        console.log(priceStr);
    }


    let imgMax = document.querySelector('.imgMax');
    let imgMaxStr = '';
    imgMax.onchange = funcimgMax;
    function funcimgMax() {
        imgMaxStr = this.value;
        console.log(imgMaxStr);
    }


    let imgMin = document.querySelector('.imgMin');
    let imgMinStr = '';
    imgMin.onchange = funcimgMin;
    function funcimgMin() {
        imgMinStr = this.value;
        console.log(imgMinStr);
    }



    let buttonAdd = document.querySelector('.buttonAdd');
    buttonAdd.onclick = function () {

        if (nameStr === '' || priceStr === '' || imgMaxStr === '' || imgMinStr === '') {
            console.log('Заполните пустые поля');
        } else {
            console.log('Товар добавлен');

            fetch('http://localhost:3000/goods', {
                method: 'post',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: `name=${nameStr}&prise=${priceStr}&imgPathMin=${imgMinStr}&imgPathMax=${imgMaxStr}&amount=1&totalPrice=${priceStr}&inBasket=false`
            })
                .then(json)
            /* .then(function (data) {
                console.log('Request succeeded with JSON response', data);
            })
            .catch(function (error) {
                console.log('Request failed', error);
            }); */

        }
    }

}
renderList();


