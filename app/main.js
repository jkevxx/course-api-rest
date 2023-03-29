const API_URL = 'https://api.thecatapi.com/v1/images/search';
const img = document.querySelector('img');
// const btn = document.getElementById('btn-change');

const btnSend = document.getElementById('btn-send')
const inputNumber = document.getElementById('input-number');

// Insert elements
const imgContainer = document.querySelector('.container__img');
const imgFragment = document.createDocumentFragment();


getCatAwait();

// ASYNC
async function getCatAwait(limit = 1) {
  try {
    const res = await fetch(`${API_URL}?limit=${limit}`);
    const data = await res.json();

    data.forEach(el => {
      const imgElement = document.createElement('img');
      imgElement.setAttribute("src", `${el.url}`);
      imgElement.setAttribute('alt', "Cats")
      imgFragment.appendChild(imgElement);
    })
    imgContainer.appendChild(imgFragment);
    // document.body.appendChild(imgContainer);
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}


// btn.addEventListener('click', () => {
//   getCatAwait();
// })


btnSend.addEventListener('click', () => {
  let number = inputNumber.value;
  if (parseInt(number) > 0) {
    getCatAwait(number)
    inputNumber.value = '';
    // number = '';
  } else {
    console.log('this is not a number');
  }
})