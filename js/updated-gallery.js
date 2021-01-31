import galleryImages from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImg: document.querySelector('.js-lightbox__image'),
  lightboxOverlay: document.querySelector('.js-lightbox__overlay'),
  lightboxCloseBtn: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
};

const {
  gallery,
  lightbox,
  lightboxImg,
  lightboxOverlay,
  lightboxCloseBtn,
} = refs;

gallery.addEventListener('click', handleGalleryClick);
lightboxOverlay.addEventListener('click', handleLightboxOverlayClick);
lightboxCloseBtn.addEventListener('click', handleLightboxCloseBtnClick);

let currentImgIdx = null;

function handleGalleryClick(e) {
  e.preventDefault();

  const { nodeName, alt, dataset } = e.target;

  if (nodeName === 'IMG') {
    const { source, index } = dataset;
    handleOpenModal(source, alt, +index);
  }
}

function handleLightboxCloseBtnClick() {
  handleCloseModal();
}

function handleLightboxOverlayClick() {
  handleCloseModal();
}

function handleKeypress({ code }) {
  code === 'Escape' && handleCloseModal();
  code === 'ArrowRight' && handleNextImg();
  code === 'ArrowLeft' && handlePreviousImg();
}

function handleOpenModal(src, alt, idx) {
  lightbox.classList.add('is-open');
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  currentImgIdx = idx;
  window.addEventListener('keydown', handleKeypress);
}

function handleCloseModal() {
  lightbox.classList.remove('is-open');
  lightboxImg.src = '';
  lightboxImg.alt = '';
  currentImgIdx = null;
  window.removeEventListener('keydown', handleKeypress);
}

function handleNextImg() {
  currentImgIdx =
    galleryImages.length - 1 === currentImgIdx ? 0 : currentImgIdx + 1;
  const { original, description } = galleryImages[currentImgIdx];
  lightboxImg.src = original;
  lightboxImg.alt = description;
}

function handlePreviousImg() {
  currentImgIdx =
    currentImgIdx === 0 ? galleryImages.length - 1 : currentImgIdx - 1;
  const { original, description } = galleryImages[currentImgIdx];
  lightboxImg.src = original;
  lightboxImg.alt = description;
}

/* ========== Create Gallery Markup ========== */
function createGalleryElementMarkup({ preview, original, description }, i) {
  return `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                data-index="${i}"
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </li>
  `;
}

function createGalleryMarkup(items) {
  return items.map(createGalleryElementMarkup).join('');
}

function renderGallery(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
}

renderGallery(createGalleryMarkup(galleryImages));
/* ========== End Create Gallery Markup ========== */
