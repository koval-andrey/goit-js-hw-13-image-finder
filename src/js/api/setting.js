import ApiImages from "./apiService.js";
import imgCard from "../templates/template.hbs";
import LoadMoreBtn from "../load-more.js";
import { onOpenModal } from "./modal.js";
import "core-js";

const refs = {
  search: document.querySelector("#search-form"),
  cardContainer: document.querySelector(".card-container"),
  gallery: document.querySelector(".gallery"),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const apiImages = new ApiImages();

refs.search.addEventListener("submit", onSearch);
loadMoreBtn.refs.button.addEventListener("click", fetchHits);
refs.gallery.addEventListener("click", onOpenModal);

async function onSearch(event) {
  event.preventDefault();
  clearImgContainer();
  apiImages.query = event.currentTarget.elements.query.value;

  try {
    loadMoreBtn.show();
    loadMoreBtn.disable();
    apiImages.resetPage();
    fetchHits();

    if (apiImages.query === "") {
      return emptyStringMessage();
    }
  } catch (error) {
    errorMessage();
  }
}

async function fetchHits() {
  loadMoreBtn.disable();

  try {
    const response = await apiImages.fetchImages();
    if (response.length === 0) {
      noPicturesAtAll();
    } else if (response.length > 0) {
      imagesMarkup(response);
      loadMoreBtn.enable();
    }

    if (response.length < 12) {
      loadMoreBtn.hide();
    }
  } catch (error) {
    loadMoreBtn.hide();
  }
}

function imagesMarkup(hits) {
  refs.cardContainer.insertAdjacentHTML("beforeend", imgCard(hits));
}

function clearImgContainer() {
  refs.cardContainer.innerHTML = "";
}
