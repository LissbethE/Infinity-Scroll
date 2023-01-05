'use strict';

const imgContainer = document.querySelector('.img-container');
const loaderContainer = document.querySelector('.loader');
const loaderSvg = document.querySelector('.loader-svg');

let photosArray;
let ready;
let imagesLoaded = 0;
let totalImages = 0;
let count = 5;

const init = function (n) {
  const apiKey = `nHNWHow1DG2iPAbWDkKGYVUL4M8__p4gdUkhSU4WGm0`;
  return `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${n}`;
};
init(count);

// Check if all images were loaded
const imageLoaded = function () {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    console.log(imagesLoaded, totalImages);

    ready = true;
    imagesLoaded = 0;
    loaderContainer.hidden = true;
    count = 30;
    init(count);

    console.log(imagesLoaded, totalImages, count);
  }
};

// Create elements for links and photos, Add to DOM
const displayPhotos = function (data) {
  photosArray = data;
  totalImages = photosArray.length;

  photosArray.forEach(photo => {
    const html = `
        <a href="${photo.links.html}" target="_blank">
            <img srcset="${photo.urls.small} 400w, ${photo.urls.regular} 1080w"
            sizes="(max-width:900px) 20vw,(max-width:600px) 30vw, 300px"
            alt="${photo.alt_description}"
            title="${photo.alt_description}"
            src="${photo.urls.regular}" >
        </a>`;

    imgContainer.insertAdjacentHTML('beforeend', html);

    document
      .querySelectorAll('img')
      .forEach(img => img.addEventListener('load', imageLoaded));
  });
};

// Get photos from Unsplash API
const getPhotos = function () {
  console.log(count);

  const urlApi = init(count);

  console.log(urlApi);

  fetch(urlApi)
    .then(response => {
      if (!response.ok)
        throw new Error(`Something went wrong, Code: ${response.status}`);

      return response.json();
    })
    .then(data => displayPhotos(data))
    .catch(err => console.log(`💥💥${err.message}💥💥`));
};

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
