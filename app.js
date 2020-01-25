// Dummy Dog Data
const dogList = [
  {
    name: 'Fenway',
    id: '1234',
    age: '5',
    gender: 'Male',
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
const  //const or let??
  image = document.querySelector('card-img'),
  breedBtn = document.getElementById('breedBtn'),
  randomBtn = document.getElementById('randomBtn'),
  display = document.getElementById('display-container'),
  breed = document.getElementById('breedValue');

// Functions
// Get API Request
const getRequest = e => {
  if (e.target.id === `breedBtn`) {
    url = `https://dog.ceo/api/breed/${breed.value}/images`;  //returns an array of many dogs
    $.getJSON(url, function (response) {
      parseBreedJSON(response);
    });
  } else if (e.target.id === `randomBtn`) {
    $.getJSON(`https://dog.ceo/api/breeds/image/random/3`, function (response) { //returns array of 3 dogs
      parseRandomJSON(response);
    });
  }

  e.preventDefault();
}

// Specific Breed Request
const parseBreedJSON = json => {
  let randomIndex = Math.floor(Math.random() * json.message.length);  //create random index
  let dogsArray = json.message.slice(randomIndex, randomIndex + 3);  //save random index plus 2 additional urls to an array
  populateData(dogsArray);  //passes in image urls
  display.style.display = 'block';  //show display-container
  breed.value = "";  //clear input field
}

// Random Breed Request
const parseRandomJSON = json => {
  let dogsArray = json.message; //save 3 elements to array
  populateData(dogsArray);  //passes in images
  display.style.display = 'block';  //show display-container
}

// Add Dog Images and Data
const populateData = arr => {  //takes in dogsArray
  // Clear existing data first
  while (display.hasChildNodes()) {
    display.removeChild(display.firstChild);
  }

  arr.forEach(el => {  //for each element in array
    const newCardGroup = document.createElement('div');  //create new card-group div
    newCardGroup.className = 'card-group';  //add class of card-group
    const newImg = document.createElement('img');  //create a new img tag
    newImg.src = el;  //set src to el
    newCardGroup.appendChild(newImg);  //append to newCardGroup

    const newCardInfo = document.createElement('div');  //create new card-info div
    newCardInfo.className = 'card-info';  //add class of card-info
    newCardGroup.appendChild(newCardInfo);  //append to newCardGroup

    // Create card-left-col and card-right-col
    const newLeftCol = document.createElement('div');
    newLeftCol.className = 'card-left-col';

    const newRightCol = document.createElement('div');
    newRightCol.className = 'card-right-col';

    // Append both to card-info
    newCardInfo.appendChild(newLeftCol);
    newCardInfo.appendChild(newRightCol);

    // Create left and right ul's
    const ulLeft = document.createElement('ul');
    const ulRight = document.createElement('ul');

    // Create random index
    let randomIndex = Math.floor(Math.random() * dogList.length);
    // Pull random data from the dogList array
    let randomData = dogList[randomIndex];
    // Print the data
    const data = Object.entries(randomData);

    // Left Col - loop through dog object at randomIndex
    for (let [key, value] of data) {
      let li = document.createElement('li');  //create a new li
      ulLeft.appendChild(li);  //append to ul
      li.innerHTML += `${key.toUpperCase()}:`;  //save the key as li, convert to uppercase
    }

    newLeftCol.appendChild(ulLeft);  //append ul to left col

    // Right Col - loop through dog object at randomIndex
    for (let [key, value] of data) {
      let li = document.createElement('li');  //create a new li
      ulRight.appendChild(li);  //append to ul
      li.innerHTML += value.toUpperCase();  //save the value as li, convert to uppercase
    }

    newRightCol.appendChild(ulRight);  //append ul to right col

    display.appendChild(newCardGroup)  // Append to card-group to display-container
  });
}

// Event Listeners
breedBtn.addEventListener('click', getRequest);
randomBtn.addEventListener('click', getRequest);