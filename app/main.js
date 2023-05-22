import { API_KEY } from '../config.js';
const API_URL = 'https://api.thecatapi.com/v1';
// const img = document.querySelector('img');
// const btn = document.getElementById('btn-change');

const btnSend = document.getElementById('btn-send');
const inputNumber = document.getElementById('input-number');

// Insert elements
const imgContainer = document.querySelector('.container__img');
const imgFragment = document.createDocumentFragment();

const favImgContainer = document.querySelector('.container__fav-img');
const favImgFragment = document.createDocumentFragment();

// ASYNC
async function getCatAwait(limit = 1) {
  try {
    const res = await fetch(
      `${API_URL}/images/search?limit=${limit}&api_key=${API_KEY}`
    );
    const data = await res.json();

    data.forEach((el) => {
      const divImgContainer = document.createElement('div');
      const imgElement = document.createElement('img');
      const btn = document.createElement('button');

      // Image Properties
      imgElement.setAttribute('src', `${el.url}`);
      imgElement.setAttribute('alt', 'Cats');
      imgElement.setAttribute('id', `${el.id}`);

      // Button Properties
      btn.innerText = 'Add to Favorites';
      btn.classList.add('btn-favorites');
      btn.setAttribute('id', `${el.id}`);

      btn.addEventListener('click', () => {
        saveFavoriteCats(el.id);
        loadFavoritesCats();
      });

      divImgContainer.appendChild(imgElement);
      divImgContainer.appendChild(btn);

      // divImg.appendChild(imgFragment);
      imgFragment.appendChild(divImgContainer);
    });
    imgContainer.appendChild(imgFragment);
    // document.body.appendChild(imgContainer);
  } catch (error) {
    console.log(error);
  }
}

btnSend.addEventListener('click', () => {
  let number = inputNumber.value;
  if (parseInt(number) > 0) {
    getCatAwait(number);
    inputNumber.value = '';
    // number = '';
  } else {
    console.log('this is not a number');
  }
});

async function loadFavoritesCats() {
  try {
    const res = await fetch(`${API_URL}/favourites`, {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
        'content-type': 'application/json',
      },
    });

    const data = await res.json();
    console.log(data);

    data.forEach((el) => {
      const divImgContainer = document.createElement('div');
      const imgElement = document.createElement('img');
      const btn = document.createElement('button');

      // Image Properties
      imgElement.setAttribute('src', `${el.image.url}`);
      imgElement.setAttribute('alt', 'Cats');
      imgElement.setAttribute('id', `${el.image.id}`);

      // Button Properties
      btn.innerText = 'Remove to Favorites';
      btn.classList.add('btn-rm-favorites');
      btn.setAttribute('id', `${el.image.id}`);

      btn.addEventListener('click', () => {
        deleteFavoriteCats(el.id);
      });

      divImgContainer.appendChild(imgElement);
      divImgContainer.appendChild(btn);

      favImgFragment.appendChild(divImgContainer);
    });
    favImgContainer.innerHTML = '';
    favImgContainer.appendChild(favImgFragment);
  } catch (error) {
    console.log(error);
  }
}

async function saveFavoriteCats(id) {
  const res = await fetch(`${API_URL}/favourites`, {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  console.log(res);
  // console.log(id);
}
async function deleteFavoriteCats(id) {
  const res = await fetch(`${API_URL}/favourites/${id}`, {
    method: 'DELETE',
    headers: {
      'x-api-key': API_KEY,
    },
  });
  console.log(res);
  loadFavoritesCats();
}

getCatAwait();
loadFavoritesCats();
