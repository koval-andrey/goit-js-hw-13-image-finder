import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basiclightbox.min.css";

function onOpenModal(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const { target } = event;
if(target.dataset.largeImage)
  event.preventDefault();
  const imageToShow = `<img src="${event.target.dataset.source}" width="800" height="600">`;
  const instance = basicLightbox.create(imageToShow);
  instance.show();
}

export { onOpenModal };
