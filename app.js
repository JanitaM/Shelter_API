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
  },
  {
    name: 'Ginger',
    id: '1233',
    age: '7',
    gender: 'Female',
    intake: '7/6/2019'
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
      parseBreedJSON(response);
      populateData();
    });
  } else if (e.target.id === `randomBtn`) {
    $.getJSON(`https://dog.ceo/api/breeds/image/random`, function (response) {
      parseRandomJSON(response);
      populateData();
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
}

// Random Breed Request
const parseRandomJSON = json => {
  images.src = json.message;
  display.style.display = 'block';
}

// Add Dog Data
const populateData = () => {
  // Clear existing data first
  if (leftCol.firstChild && rightCol) {
    leftCol.removeChild(leftCol.firstChild);
    rightCol.removeChild(rightCol.firstChild);
  }

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

// Event Listeners
breedBtn.addEventListener('click', getRequest);
randomBtn.addEventListener('click', getRequest);