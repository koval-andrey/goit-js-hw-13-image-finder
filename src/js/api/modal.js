import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import '../templates/template.hbs'

function onOpenModal(event) {
  event.preventDefault();
  const instance = basicLightbox.create(`
  <img src="${event.target.dataset.source}" width="800" height="600">
`);
  instance.show();
}
export { onOpenModal };