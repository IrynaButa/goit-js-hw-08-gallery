
// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи. Для того чтобы открыть, 
//необходимо добавить на div.lightbox CSS - класс is - open
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того,
//   чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

//     Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
import pictures from "./pictures-gallery.js";

const refs = {
  imgContainer: document.querySelector("ul.js-gallery"),
  image: document.getElementsByClassName('.gallery__image'),
  imageItem: document.querySelector('.gallery__item'),
  lightbox: document.querySelector("div.lightbox"),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  lightboxContent: document.querySelector("div.lightbox__content"),
  lightboxImage: document.querySelector(".lightbox__image"),
  lightboxOverlay: document.querySelector('div.lightbox__overlay'),

};

function createImgCard(pictures) { 
  return pictures
    .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a class="gallery__link"
    href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"/>
  </a>
</li>`;})
    .join('');
}

const cardsMarkup = createImgCard(pictures);
refs.imgContainer.insertAdjacentHTML("beforeend", cardsMarkup);
refs.imgContainer.addEventListener('click', onImgContainerClick);
refs.closeModalBtn.addEventListener('click', onCloseBtnClick);
refs.lightboxOverlay.addEventListener('click', onBackdropClick);

//const collection = Array.prototype.slice.call(document.querySelectorAll('[data-source]'));
const collection = pictures.reduce((acc, { original }) => {
  acc.push(original);
  return acc;
}, []);
const collection2 = pictures.reduce((acc, { description }) => {
  acc.push(description);
  return acc;
}, []);


function onImgContainerClick(event) { 
   event.preventDefault(); 
  if (event.target.nodeName !== "IMG") { 
    return;
  }

  addIsOpenImgClass(refs.lightbox);

refs.lightboxImage.src = event.target.dataset.source;
  refs.lightboxImage.alt = event.target.alt;

  window.addEventListener("keydown", onEscKeyPress);
  window.addEventListener("keydown", onRightKeyPress);
  window.addEventListener("keydown", onLeftKeyPress);
}

function onCloseBtnClick(event) { 
  
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
  refs.lightboxImage.alt = '';
  
  window.removeEventListener("keydown", onEscKeyPress);
  window.removeEventListener("keydown", onRightKeyPress);
  window.removeEventListener("keydown", onLeftKeyPress);
}

function onBackdropClick(event) { 
if (event.target === event.currentTarget) {
    onCloseBtnClick();
  }
}
function addIsOpenImgClass(image) { 
  image.classList.add('is-open');
  
}


function onEscKeyPress(event) { 
  if (event.code === "Escape") {
 onCloseBtnClick();
}
}
let src = 0;
  let alt = 0;
function onRightKeyPress(event) {
  if (event.code !== "ArrowRight") {
    return;
  }
  

  refs.lightboxImage.src =
      collection[
        src === collection.length ? (src = 0) : src++
    ];
   refs.lightboxImage.alt =
     collection2[
        alt === collection2.length ? (alt = 0) : alt++
      ];
  
    // refs.lightboxImage.src = collection[index].dataset.source;
    //   refs.lightboxImage.alt = collection[index].alt;
    //console.log(collection.length - 1);
  // console.log(collection[index]);
  // console.log(collection[index]);
  //  console.log(collection[index]);
  }


// collection.forEach(function(img,i) {
//         img.addEventListener('click', function(event) {
//           event.preventDefault();
//           index = i;
//         },false);
//     });
 
// btnLeft.addEventListener('click', function(e) {
//  e.preventDefault();
// index--
// index < 0 && (index = collection.length-1);
// show();

// },false)

// btnRight.addEventListener('click', function(e) {
//  e.preventDefault();
//  index++
// index >= collection.length && (index = 0);
//   show();
// },false)

// function show() {

//     fotoGallery.classList.remove('kap-show__hidden-gallery');

//     hiddenImg.src = collection[index].src;

// };

  



// refs.lightboxImage.src =  'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg';
//   refs.lightboxImage.alt = event.currentTarget.alt;

function onLeftKeyPress(event) {
  if (event.code === "ArrowLeft") {
    
  }
}
