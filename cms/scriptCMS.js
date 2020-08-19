fetch('http://localhost:3000/goods')
    .then(response => {
        return response.json();
    })
    .then(cardsData => {

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
                    <div class="list-red" data-id-red=${product.id}>РЕД</div>
                    <div class="list-basket-canceling" data-id=${product.id}></div>
                </div>
                `
            return basketItem;
        }
        list();
    })
    .catch(error => console.log(error))

let data = {
    "name": '',
    "prise": 0,
    "imgPathMin": '/img/imgPathMin/',
    "imgPathMax": '/img/imgPathMax/',
    "amount": 1,
    "totalPrice": 0,
    "inBasket": false
}

let name = document.querySelector('.name');
name.onchange = function () {
    data.name = this.value;
}

let price = document.querySelector('.price');
price.onchange = function () {
    data.totalPrice = +this.value;
    data.prise = +this.value;
}

let imgMax = document.querySelector('.imgMax');
imgMax.onchange = function () {
    data.imgPathMax = this.value;
}

let imgMin = document.querySelector('.imgMin');
imgMin.onchange = function () {
    data.imgPathMin = this.value;
}

let out = document.querySelector('.out');
let buttonAdd = document.querySelector('.buttonAdd');
buttonAdd.onclick = function (e) {
    e.preventDefault();

    if (data.name === '' || data.prise === '' || data.imgPathMax === '' || data.imgPathMin === '') {
        out.innerHTML = 'Заполните пустые поля';
    } else {
        out.innerHTML = 'Товар добавлен';
        fetch('http://localhost:3000/goods', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
    }
}

