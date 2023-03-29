const API_URL = 'https://api.thecatapi.com/v1/images/search';
const img = document.querySelector('img');
const btn = document.getElementById('btn');

getCatAwait();

// PROMISE
// getCatPromise();
function getCatPromise() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      img.src = data[0].url;
    }
    ).catch(err => console.error(err))
}

// ASYNC
async function getCatAwait() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    img.src = data[0].url;
  } catch (error) {
    console.log(error)
  }
}


btn.addEventListener('click', () => {
  // getCatPromise();
  getCatAwait();
})