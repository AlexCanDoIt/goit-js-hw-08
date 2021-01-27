import images from "./gallery-items.js"

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('.js-lightbox__image'),
  closeLightboxBtn: document.querySelector('button[data-action="close-lightbox"]'),
  lightboxOverlay: document.querySelector('.js-lightbox__overlay'),
};

refs.gallery.append(...createGallery(images));

refs.gallery.addEventListener('click', onImageClick);
refs.closeLightboxBtn.addEventListener('click', closeLightbox);
refs.lightboxOverlay.addEventListener('click', closeLightbox);
document.addEventListener('keydown', event => {
  if (event.code === 'Escape') closeLightbox();
});

document.addEventListener('keydown', event => {
  if (!refs.lightbox.classList.contains('is-open')) return;

  const currentImageRef = refs.lightboxImage;
  const numberOfImages = Number(refs.gallery.dataset.lastCollectionIndex);

  if (event.code === 'ArrowLeft') getPreviousImage(currentImageRef);
  if (event.code === 'ArrowRight') getNextImage(currentImageRef, numberOfImages);
});

function createGalleryImage({ preview, original, description }, index) {
  const itemRef = document.createElement('li');
  itemRef.classList.add('gallery__item');

  const linkRef = document.createElement('a');
  linkRef.classList.add('galleru__link');
  linkRef.href = original;

  const imageRef = document.createElement('img');
  imageRef.classList.add('gallery__image');
  imageRef.src = preview;
  imageRef.alt = description;
  imageRef.setAttribute('data-source', original);
  imageRef.setAttribute('data-index', index);

  linkRef.appendChild(imageRef);
  itemRef.appendChild(linkRef);

  return itemRef;
};

function createGallery(images) {
  refs.gallery.setAttribute('data-last-collection-index', images.length - 1);

  return images.map((image, index) => createGalleryImage(image, index));
};

function onImageClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') return;

  const imageRef = event.target;
  const lightboxImageURL = imageRef.dataset.source;
  const lightboxImageAlt = imageRef.alt;
  const indexOfImage = imageRef.dataset.index;

  openLightbox();
  setLightboxImage(lightboxImageURL, lightboxImageAlt, indexOfImage);
};

function setLightboxImage(url, alt, index) {
  refs.lightboxImage.src = url;
  refs.lightboxImage.alt = alt;
  refs.lightboxImage.setAttribute('data-index', index);
};

function openLightbox() {
  refs.lightbox.classList.add('is-open');
};

function closeLightbox() {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
};

function getPreviousImage(currentImage) {
  if (currentImage.dataset.index <= 0) return;
  
  const index = Number(currentImage.dataset.index) - 1;
  const imageRef = refs.gallery.querySelector(`img[data-index="${index}"]`);
  const lightboxImageURL = imageRef.dataset.source;
  const lightboxImageAlt = imageRef.alt;

  setLightboxImage(lightboxImageURL, lightboxImageAlt, index);
};

function getNextImage(currentImage, numberOfImages) {
  if (currentImage.dataset.index >= numberOfImages) return;

  const index = Number(currentImage.dataset.index) + 1;
  const imageRef = refs.gallery.querySelector(`img[data-index="${index}"]`);
  const lightboxImageURL = imageRef.dataset.source;
  const lightboxImageAlt = imageRef.alt;

  setLightboxImage(lightboxImageURL, lightboxImageAlt, index);
};