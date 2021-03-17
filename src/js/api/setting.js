import ApiImages from "./apiService.js";
import imageList from '../templates/template.hbs';
import LoadMoreBtn from '../load-more.js'
import { onOpenModal } from './modal.js'
import basicLightbox from 'basiclightbox';

const refs = {
  search: document.querySelector('#search-form'),
  cardContainer: document.querySelector('.card-container'),
  gallery: document.querySelector('.gallery'),

};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const apiImages = new ApiImages();

refs.search.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);
refs.gallery.addEventListener('click', onOpenModal);

async function onSearch(e) {
  e.preventDefault();
  clearImgContainer();
  apiImages.query = e.currentTarget.elements.query.value;
 
  try {
    loadMoreBtn.show();
    loadMoreBtn.disable();
    apiImages.resetPage();
    fetchHits();

    if (apiImages.query === '') {
      return emptyStringMessage();
    }
  } catch (error) {
    errorMessage();
  }
}

/*function animateScroll() {
  const indexToScroll = 12 * (apiImages.page - 1) - 11;
  const itemToScroll = refs.imgGallery.children[indexToScroll];
  const options = {
    speed: 500,
    verticalOffset: -10,
  };

  animateScrollTo(itemToScroll, options);
}*/

async function fetchHits() {
  loadMoreBtn.disable();

  try {
    const response = await apiImages.fetchImages();
    if (response.length === 0) {
      noPicturesAtAll();
      animateScrollTo(0, options);
    } else if (response.length > 0) {
      imagesMurkup(response);

      loadMoreBtn.enable();
      animateScroll();
    }

    if (response.length < 12) {
      loadMoreBtn.hide();
    }
  } catch (error) {
    loadMoreBtn.hide();
  }
}

function imagesMurkup(hits) {
  refs.cardContainer.insertAdjacentHTML('beforeend', imgCard(hits));
}

function clearImgContainer() {
  refs.cardContainer.innerHTML = '';
}
/*const refs = {
    searchForm: document.querySelector('.search-form'),
    articlesContainer: document.querySelector('.card-container')
}
refs.searchForm.addEventListener('submit', onSearch)

function onSearch(event) {
    event.preventDefault()
    
}
const gallery = document.querySelector(".card-container")

export default class Setting {
    constructor() {
      this.searchQuery = '';
      this.page = 1;
    }
  
    async fetchImgs() {
      try {
        const response = await fetch(
          `https:${BASE_URL}/?key=${API_KEY}/&q=${this.searchQuery}&image_type=photo&orientation=horizontal&page=${this.page}&per_page=12` 
        )
        .then(response => response.json())
        .then(({hits}) => {
          articlesContainer.innerHTML = imageList(hits)
        })
  
        const addImgs = await response.json();
        this.incrementPage();
  
        return addImgs.hits;
      } catch (info) {
        noMorePicturesLeft();
      }
    }
  
    incrementPage() {
      this.page += 1;
    }
  
    resetPage() {
      this.page = 1;
    }
  
    get query() {
      return this.searchQuery;
    }
  
    set query(newQuery) {
      this.searchQuery = newQuery;
    }
  }*/