// Dummy Dog Data
const dogList = [
  {
    Name: 'Fenway',
    ID: '1234',
    Age: '5',
    Gender: 'Male',
    intake: '9/10/2019'
  },
  {
    name: 'Folly',
    id: '1235',
    age: '1',
    gender: 'Female',
    intake: '12/20/2019'
  },
  {
    name: 'Whiskey',
    id: '1236',
    age: '2',
    gender: 'Female',
    intake: '1/6/2020'
  }
];

// Variables
const
  images = document.getElementById('card-img'),
  breedBtn = document.getElementById('breedBtn'),
  randomBtn = document.getElementById('randomBtn'),
  display = document.getElementById('display-container'),
  breed = document.getElementById('breedValue'),
  leftCol = document.getElementById('card-left-col'),
  rightCol = document.getElementById('card-right-col');

// Functions
// Get API Request
const getRequest = e => {
  if (e.target.id === `breedBtn`) {
    url = `https://dog.ceo/api/breed/${breed.value}/images`;
    $.getJSON(url, function (response) {
      return parseBreedJSON(response);
    });
  } else if (e.target.id === `randomBtn`) {
    $.getJSON(`https://dog.ceo/api/breeds/image/random`, function (response) {
      return parseRandomJSON(response);
    });
  }

  e.preventDefault();
}

// Specific Breed Request
const parseBreedJSON = json => {
  let randomIndex = Math.floor(Math.random() * json.message.length);
  images.src = json.message[randomIndex];
  display.style.display = 'block';
  breed.value = "";
  populateData();
}

// Random Breed Request
const parseRandomJSON = json => {
  images.src = json.message;
  display.style.display = 'block';
  populateData();
}

// Add Dog Data
const populateData = (e) => {
  // Create a new ul
  const ulLeft = document.createElement('ul');
  const ulRight = document.createElement('ul');

  // Create random index
  let randomIndex = Math.floor(Math.random() * dogList.length);
  // Pull random data from the dogList array
  let randomData = dogList[randomIndex];
  // Print the data
  const data = Object.entries(randomData);

  // Left Col
  for (let [key, value] of data) {
    let li = document.createElement('li');
    ulLeft.appendChild(li);
    li.innerHTML += `${key.toUpperCase()}:`;
  }
  // append ul to left col
  leftCol.appendChild(ulLeft);

  // Right Col
  for (let [key, value] of data) {
    let li = document.createElement('li');
    ulRight.appendChild(li);
    li.innerHTML += value.toUpperCase();
  }
  // append ul to right col
  rightCol.appendChild(ulRight);
}

// References

// https://zellwk.com/blog/looping-through-js-objects/
// https://www.vitoshacademy.com/javascript-create-ul-and-li-elements-with-js-with-chained-function/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in

// Event Listeners
breedBtn.addEventListener('click', getRequest);
randomBtn.addEventListener('click', getRequest);