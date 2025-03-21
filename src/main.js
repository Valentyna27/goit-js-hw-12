// Add iziToast library and import functions from modules

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImages } from './js/pixabay-api';
import { refillGallery, clearGallery } from './js/render-functions';

const form = document.querySelector('form');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.load-more-btn');

let page = 1;
let perPage = 15;
let newQuery = '';

form.addEventListener('submit', async event => {
  event.preventDefault();

  let inputValue = form.search.value.trim();
  loader.style.display = 'block';
  page = 1;

  try {
    clearGallery();
    loadBtn.style.display = 'none';

    newQuery = inputValue;
    inputValue = newQuery;

    if (newQuery === '') {
      iziToast.error({
        title: 'Error',
        titleColor: '#FFFFFF',
        icon: 'material-icons',
        iconText: 'error',
        iconColor: '#FFFFFF',
        message: `Please, fill in the field`,
        messageColor: '#FFFFFF',
        backgroundColor: '#EF4040',
        position: 'bottomRight',
        close: false,
        layout: 2,
        timeout: 10000,
      });
      return;
    }

    const response = await getImages(newQuery, page);
    if (response.hits.length === 0) {
      iziToast.error({
        title: 'No images',
        titleColor: '#FFFFFF',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        backgroundColor: '#EF4040',
        position: 'bottomRight',
        icon: 'material-icons',
        iconText: 'error',
        iconColor: '#FFFFFF',
        messageColor: '#FFFFFF',
        close: false,
        layout: 2,
        timeout: 10000,
      });
      return;
    }
    refillGallery(response.hits);
    loadBtn.style.display = 'block';
  } catch (error) {
    console.error(error);
  } finally {
    loader.style.display = 'none';
    form.reset();
  }
});

// Add event listener on loadBtn
loadBtn.addEventListener('click', async () => {
  loader.style.display = 'block';
  loadBtn.style.display = 'none';

  try {
    page += 1;
    const response = await getImages(newQuery, page);
    refillGallery(response.hits);
    smoothScroll();

    if (page * perPage >= response.totalHits) {
      iziToast.show({
        title: 'Notification',
        titleColor: '#FFFFFF',
        message:
          'We are sorry, but you have reached the end of search results.',
        backgroundColor: '#6cc4ea',
        position: 'bottomRight',
        icon: 'material-icons',
        iconText: 'announcement',
        iconColor: '#FFFFFF',
        messageColor: '#FFFFFF',
        close: false,
        layout: 2,
        timeout: 10000,
      });
      loadBtn.style.display = 'none';
    } else {
      loadBtn.style.display = 'block';
    }
  } catch (error) {
    console.error(error);
  } finally {
    loader.style.display = 'none';
  }
});

// Smooth scroll function
function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');
  if (galleryItem) {
    const { height } = galleryItem.getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  }
}
