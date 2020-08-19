fetch('http://localhost:3000/goods')
    .then(response => {
        return response.json();
    })
    .then(cardsData => {

        const ls = localStorage.getItem('cardsData');
        const cardsDataLs = JSON.parse(ls);
        if (cardsDataLs) {
            cardsDataLs.forEach(c => {
                if (c.inBasket) {
                    const i = cardsData.findIndex(y => y.id === c.id);
                    if (i > -1) {
                        cardsData[i] = c;

                    }
                }

            })
        }




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
        let countId = 1;

        document.querySelector('.next').onclick = function () {
            let gallery = document.querySelector('.gallery');
            if (countId >= 0 && countId <= cardsData.length - 2) {
                position -= width;
                gallery.style.marginLeft = position + 'px';
                countId++;
                navQuantity.innerHTML = `Quantity ${cardsData[countId].amount}`;
                let firstPagePrice = document.querySelector('.first-page-price');
                firstPagePrice.innerHTML = `$${cardsData[countId].totalPrice}`;
            }
        }
        /* ----------СДВИГ ВЛЕВО ГАЛЛЕРЕНИИ (конец)--------- */



        /* ----------СДВИГ ВПРАВО ГАЛЛЕРЕНИИ (начало)--------- */
        document.querySelector('.prev').onclick = function () {
            let gallery = document.querySelector('.gallery');
            if (countId <= cardsData.length && countId >= 1) {
                position += width;
                gallery.style.marginLeft = position + 'px';
                countId--;
                navQuantity.innerHTML = `Quantity ${cardsData[countId].amount}`;
                let firstPagePrice = document.querySelector('.first-page-price');
                firstPagePrice.innerHTML = `$${cardsData[countId].totalPrice}`;
            }
        }
        /* ----------СДВИГ ВПРАВО ГАЛЛЕРЕНИИ (конец)--------- */



        /* ----------ЛАЙК, ДОБАВИТЬ В КОРЗИНУ изменит занчение в карзине на true или на false (начало)--------- */
        let idLike = document.querySelectorAll('.idLike');
        document.querySelector('.header-heart').onclick = function () {

            let numCardsData = cardsData[countId];
            if (numCardsData.inBasket == false) {
                numCardsData.inBasket = true;
                idLike[countId].classList.add('gallery-like');
            } else {
                numCardsData.inBasket = false;
                idLike[countId].classList.remove('gallery-like');
            }
            local();
        }
        /* ----------ЛАЙК, ДОБАВИТЬ В КОРЗИНУ изменит занчение в карзине на true или на false (конец)--------- */

        /* элемент добавлен в корзину если в локале добавен (считали) */
        cardsData.forEach(elem => {
            if (elem.inBasket) {
                idLike[elem.id - 1].classList.add('gallery-like');
            }
        });



        /* ----------ДОБАВИТЬ\УБАВИТЬ КОЛИЧЕСТВО БУТЫЛОЧЕК(начало)--------------- */
        let navQuantity = document.querySelector('.nav-quantity');
        navQuantity.innerHTML = `Quantity ${cardsData[countId].amount}`;

        document.querySelector('.minus').onclick = function () {
            if (cardsData[countId].amount >= 1) {
                cardsData[countId].amount--;
                navQuantity.innerHTML = `Quantity ${cardsData[countId].amount}`;
                totalPrise();
                local();
            }
        }

        document.querySelector('.plus').onclick = function () {
            cardsData[countId].amount++;
            navQuantity.innerHTML = `Quantity ${cardsData[countId].amount}`;
            totalPrise();
            local();
        }
        /* ----------ДОБАВИТЬ УБАВИТЬ КОЛИЧЕСТВО БУТЫЛОЧЕК(начало)--------------- */



        /*-----ЦЕНА ОТДЕЛЬНО ДЛЯ КАЖДОГО ЭЛЕМЕНТА_СДВИГ(начало)-----*/
        let firstPagePrice = document.querySelector('.first-page-price');
        function totalPrise() {
            cardsData[countId].totalPrice = (cardsData[countId].amount * cardsData[countId].prise).toFixed(2);
            firstPagePrice.innerHTML = `$${cardsData[countId].totalPrice}`;
        }
        totalPrise();

        function local() {
            localStorage.setItem('cardsData', JSON.stringify(cardsData));
        }
        local();
    })
    .catch(error => console.log(error))



/* const a = async () => {
    let b = await fetch('http://localhost:3000/goods');
    return b.json();
};
console.log(a()); */

/* fetch('http://localhost:3000/goods').then(res => res.json())
    .then(console.log) */

/* fetch('http://localhost:3000/goods')
    .then(data => {
        console.log(data)
        console.log(data.text());
    }) */
