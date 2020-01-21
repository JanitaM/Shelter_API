// Variables
let
  images = document.getElementById('card-img'),
  breedBtn = document.getElementById('breedBtn'),
  randomBtn = document.getElementById('randomBtn'),
  display = document.getElementById('display-container');

// Functions
const getRequest = e => {
  if (e.target.id === `breedBtn`) {
    let breed = document.getElementById('breedValue');
    url = `https://dog.ceo/api/breed/${breed.value}/images`;

    $.getJSON(url, function (response) {
      parseBreedJSON(response);
    });
  } else if (e.target.id === `randomBtn`) {
    $.getJSON(`https://dog.ceo/api/breeds/image/random`, function (response) {
      parseRandomJSON(response);
    });
  }

  e.preventDefault();
}

const parseBreedJSON = json => {
  images.src = json.message[0]; //change this to random
  display.style.display = 'block';
}

const parseRandomJSON = json => {
  images.src = json.message;
  display.style.display = 'block';
}

// Event Listeners
breedBtn.addEventListener('click', getRequest);
randomBtn.addEventListener('click', getRequest);

// A cookie associated with a cross-site resource at http://dog.ceo/ was set without the `SameSite` attribute. A future release of Chrome will only deliver cookies with cross-site requests if they are set with `SameSite=None` and `Secure`. You can review cookies in developer tools under Application>Storage>Cookies and see more details at https://www.chromestatus.com/feature/5088147346030592 and https://www.chromestatus.com/feature/5633521622188032.
