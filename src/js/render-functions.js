import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

const lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
});

export function clearGallery() {
  gallery.innerHTML = '';
}

export function refillGallery(images) {
  const markup = images
    .map(
      image => `
          <li class="gallery-item">
            <a class="gallery-link" href="${image.largeImageURL}">
              <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
            </a>
            <div class="container-image-info">
              <div class="sub-container">
                <p class="info-caption">Likes</p>
                <p class="info-numbers">${image.likes}</p>
              </div>
              <div class="sub-container">
                <p class="info-caption">Views</p>
                <p class="info-numbers">${image.views}</p>
              </div>
              <div class="sub-container">
                <p class="info-caption">Comments</p>
                <p class="info-numbers">${image.comments}</p>
              </div>
              <div class="sub-container">
                <p class="info-caption">Downloads</p>
                <p class="info-numbers">${image.downloads}</p>
              </div>
            </div>
          </li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  lightBox.refresh();
}
