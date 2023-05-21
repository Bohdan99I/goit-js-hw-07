import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");

//Створюємо розмітку
function createGalleryItem(galleryItems) {
      return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
    })
    .join("");
}

//Додаємо елементи img до HTML
const items = createGalleryItem(galleryItems);
gallery.insertAdjacentHTML("beforeend", items);

// Додаємо слухача
gallery.addEventListener("click", onGalleryClick);

function onGalleryClick(event) {
    // Прибираємо нативну поведінку
    event.preventDefault();
    //Спрацювання функції лише по кліку на зображення
    const isImgClick = event.target.classList.contains("gallery__image");
    if (!isImgClick) {
        return;
    }
    // Бібліотека для відкриття модалки
    const instance = basicLightbox.create(`<img src="${event.target.dataset.source}" width="800" height="600">`, {
        onShow: () => {
            document.addEventListener("keydown", keyEsc);
        },
        onClose: () => {
            document.removeEventListener("keydown", keyEsc);
        },
    });
    //Закриття модалки через "Escape"
    const keyEsc = (event) => {
        if (event.key === "Escape") {
            instance.close()
        }
    };

    instance.show();
}

console.log(galleryItems);