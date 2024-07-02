import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");

gallery.addEventListener("click", onImgClick);

const listGallery = createListGallery(galleryItems);

gallery.insertAdjacentHTML("beforeend", listGallery);

function createListGallery() {
  return galleryItems
    .map(
      (item) =>
        `<li class="gallery__item">
            <a class="gallery__link" href=${item.original}>
                 <img
                    class="gallery__image"
                    src=${item.preview}
                    data-source=${item.original}
                    alt=${item.description}
                />
            </a>
        </li>`
    )
    .join("");
}

function onImgClick(items) {
  rebootBlocking(items);

  if (items.target.nodeName !== "IMG") {
    return;
  }

  openAndCloseModal(items);
}

function openAndCloseModal(items) {
  const imgModal = basicLightbox.create(
    ` <img src=${items.target.dataset.source}>`
  );

  imgModal.show();

  gallery.addEventListener("keydown", (ev) => {
    if (ev.code === "Escape") {
      imgModal.close();
    }
  });
}

function rebootBlocking(items) {
  items.preventDefault();
}
