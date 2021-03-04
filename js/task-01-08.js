
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


const imgArray = pictures.reduce((acc, { original }) => {
  acc.push(original);
  return acc;
}, []);
const altArray = pictures.reduce((acc, { description }) => {
  acc.push(description);
  return acc;
}, []);
let currentImg = 0;
let currentAlt = 0;

function onImgContainerClick(event) { 
   event.preventDefault(); 
  if (event.target.nodeName !== "IMG") { 
    return;
  }

  addIsOpenImgClass(refs.lightbox);

refs.lightboxImage.src = event.target.dataset.source;
  refs.lightboxImage.alt = event.target.alt;

  

  window.addEventListener("keydown", onEscKeyPress);
  // window.addEventListener("keydown", onRightKeyPress);
  // window.addEventListener("keydown", onLeftKeyPress);
}

function onCloseBtnClick(event) { 
  
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
  refs.lightboxImage.alt = '';
  
  window.removeEventListener("keydown", onEscKeyPress);
  // window.removeEventListener("keydown", onRightKeyPress);
  // window.removeEventListener("keydown", onLeftKeyPress);
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

window.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') {
      refs.lightboxImage.src =
        imgArray[
          currentImg === imgArray.length ? (currentImg = 0) : currentImg++
        ];
      refs.lightboxImage.alt =
        altArray[
          currentAlt === altArray.length ? (currentAlt = 0) : currentAlt++
        ];
    }
  });
  window.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
      refs.lightboxImage.src =
        imgArray[
          currentImg === -1
            ? (currentImg = currentImg + imgArray.length)
            : currentImg--
        ];
      refs.lightboxImage.alt =
        altArray[
          currentAlt === -1
            ? (currentAlt = currentAlt + altArray.length)
            : currentAlt--
        ];
    }
  });
// function onRightKeyPress (event) {
//     if (event.key === 'ArrowRight') {
//       refs.lightboxImage.src =
//         imgArray[
//           currentImg === imgArray.length ? (currentImg = 0) : currentImg++
//         ];
//       refs.lightboxImage.alt =
//         altArray[
//           currentAlt === altArray.length ? (currentAlt = 0) : currentAlt++
//         ];
//     }
//   };
  


// function onLeftKeyPress(event) {
//   if (event.code === "ArrowLeft") {
//     refs.lightboxImage.src =
//         imgArray[
//           currentImg === -1
//             ? (currentImg = currentImg + imgArray.length)
//             : currentImg--
//         ];
//       refs.lightboxImage.alt =
//         altArray[
//           currentAlt === -1
//             ? (currentAlt = currentAlt + altArray.length)
//             : currentAlt--
//         ];
//   }
// }
