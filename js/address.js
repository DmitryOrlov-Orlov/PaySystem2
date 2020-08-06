let addresses = [
    {
        id: 1,
        city: 'Екатеринбург',
        street: 'Ленина',
        house: 111,
    },
    {
        id: 2,
        city: 'Верхняя Пышма',
        street: 'Дзержинского',
        house: 100,
    },
    {
        id: 3,
        city: 'Каменк-Уральский',
        street: 'Джугашвили',
        house: 5,
    },
    {
        id: 4,
        city: 'Париж',
        street: 'Ясная',
        house: 15,
    },
    {
        id: 4,
        city: 'Нижний Тагил',
        street: 'Успешная',
        house: 1,
    },
]


function createAddresses() {
    let address = document.querySelector('.address');
    address.innerHTML = '';
    addresses.forEach(elem => {
        let create = addressItem(elem);
        address.appendChild(create);
    });
}

function addressItem(product) {
    let span = document.createElement('a');
    span.href = '#'
    span.classList.add('test')
    span.innerHTML = `
    <div class="address-item">
        <p>г. ${product.city} <br>ул.${product.street} <br>д.${product.house}</p>
    </div>
    `
    return span;
}

createAddresses();

