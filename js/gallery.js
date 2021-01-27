import images from "./gallery-items.js"

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('.js-lightbox__image'),
  closeLightboxBtn: document.querySelector('button[data-action="close-lightbox"]'),
  lightboxOverlay: document.querySelector('.js-lightbox__overlay'),
};

createGallery(refs.gallery, images);

refs.gallery.addEventListener('click', onImageClick);
refs.closeLightboxBtn.addEventListener('click', closeLightbox);
refs.lightboxOverlay.addEventListener('click', closeLightbox);
document.addEventListener('keydown', event => {
  if (event.code === 'Escape') closeLightbox();
});

document.addEventListener('keydown', event => {
  if (!refs.lightbox.classList.contains('is-open')) return;
  if (event.code === 'ArrowLeft') toggleLightboxImage('preview index');
  if (event.code === 'ArrowRight') toggleLightboxImage('next index');
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

function createGallery(gallery, images) {
  const imagesRefs = images.map((image, index) => createGalleryImage(image, index));
  gallery.append(...imagesRefs);
  gallery.setAttribute('data-last-collection-index', images.length - 1);
};

function onImageClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') return;

  const imageIndex = event.target.dataset.index;

  openLightbox();
  setLightboxImage(imageIndex);
};

function openLightbox() {
  refs.lightbox.classList.add('is-open');
};

function setLightboxImage(imageIndex) {
  const imageRef = refs.gallery.querySelector(`img[data-index="${imageIndex}"]`);
  refs.lightboxImage.src = imageRef.dataset.source;
  refs.lightboxImage.alt = imageRef.alt;
  refs.lightboxImage.setAttribute('data-index', imageIndex);
};

function closeLightbox() {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
};

function toggleLightboxImage(indexAction) {
  const lastCollectionIndex = Number(refs.gallery.dataset.lastCollectionIndex);
  const currentImageIndex = Number(refs.lightboxImage.dataset.index);
  let index;
  
  if (indexAction === 'preview index') {
    if (currentImageIndex <= 0) return;
    index = currentImageIndex - 1;
  }

  else if (indexAction === 'next index') {
    if (currentImageIndex >= lastCollectionIndex) return;
    index = currentImageIndex + 1;
  };

  setLightboxImage(index);
};