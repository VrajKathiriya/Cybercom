const countriesContainer = document.querySelector(".countries-container");
const searchBtn = document.getElementById("search-btn");
const searchBar = document.getElementById("search-bar");
const favoriteBtn = document.getElementById("favorite-btn");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  fetchCountryData(searchBar.value);
});

favoriteBtn.addEventListener("click", function (e) {
  e.preventDefault();
  showFavoritesCountries();
});

// function which fetch data from API and return json data
async function getJSON(url) {
  try {
    let res = await fetch(url);
    if (!res.ok) throw new Error("No country found");
    return await res.json();
  } catch (err) {
    countriesContainer.innerHTML = err.message;
  }
}

// function which fetch data from an API
async function fetchCountryData(countryName) {
  try {
    const countries = await getJSON(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    if (!countries) return;
    bindCountriesData({ countries });
  } catch (err) {
    countriesContainer.innerHTML = err.message;
  }
}

// function which shows favorites countries
async function showFavoritesCountries() {
  let countries = localStorage.getItem("countries");
  countries = JSON.parse(countries) || [];

  let newCountries = [];
  countriesContainer.innerHTML = "Loading...";

  for (let i = 0; i < countries.length; i++) {
    let country = countries[i];
    let data = await getJSON(country.url);
    newCountries.push(...data);
  }

  bindCountriesData({ newCountries });
}

// function which binds data to ui
function bindCountriesData({ countries, newCountries }) {
  let html = "";
  countries?.forEach((country) => {
    html += `
     <div class="card" style="width: 18rem">
       <img src=${country.flags.svg} class="card-img-top" alt="..." />
       <div class="card-body">
         <h4 class="card-title">${country.name.common}</h4>
         <h6 class="card-title">${country.continents[0]}</h6>
         <h6 class="card-title">👨‍👩‍👧‍👦 ${country.population}</h6>
         <a href=${country.maps.googleMaps} class="btn btn-primary mb-1")" target=blank>Show On Google Maps</a>
         <a href="#" class="btn btn-warning save-btn" onclick="saveToLocalStorage('${country.name.common}','${searchBar.value}')" id='${country.name.common}'>Add to favorites</a>
       </div>
     </div>
     `;
  });
  newCountries?.forEach((country) => {
    html += `
     <div class="card" style="width: 18rem">
       <img src=${country.flags.svg} class="card-img-top" alt="..." />
       <div class="card-body">
         <h4 class="card-title">${country.name.common}</h4>
         <h6 class="card-title">${country.continents[0]}</h6>
         <h6 class="card-title">👨‍👩‍👧‍👦 ${country.population}</h6>
         <a href=${country.maps.googleMaps} class="btn btn-primary mb-1")" target=blank>Show On Google Maps</a>
         <a href="#" class="btn btn-danger" onclick="deleteFromLocalStorage('${country.name.common}')" id=${country.name.common}>Remove from Favorites</a>
       </div>
     </div>
     `;
  });

  countriesContainer.innerHTML = html;
  if (html == "" && newCountries)
    countriesContainer.innerHTML = "no favorites countries";
}

// fucntion which saves data to localstorage
function saveToLocalStorage(countryName, searchValue) {
  const saveBtn = document.getElementById(countryName);
  console.log(saveBtn, countryName);

  let countries = localStorage.getItem("countries");
  countries = JSON.parse(countries) || [];

  let available = countries.find(
    (country) => country.countryName == countryName
  );
  console.log(available);

  if (available) {
    console.log(saveBtn);
    saveBtn.innerText = "Added to favorites";
    saveBtn.classList.remove("btn-warning");
    saveBtn.classList.add("btn-success");
    return;
  }

  if (saveBtn?.innerText == "Added to favorites") return;

  let newCountry = {
    id: Date.now(),
    countryName,
    url: `https://restcountries.com/v3.1/name/${searchValue}`,
  };

  countries = [...countries, newCountry];

  localStorage.setItem("countries", JSON.stringify(countries));

  saveBtn.innerText = "Added to favorites";
  saveBtn.classList.remove("btn-warning");
  saveBtn.classList.add("btn-success");
}

// function which deletes data from localstorage
function deleteFromLocalStorage(countryName) {
  let countries = localStorage.getItem("countries");
  countries = JSON.parse(countries) || [];

  countries = countries.filter((country) => country.countryName != countryName);

  localStorage.setItem("countries", JSON.stringify(countries));
  showFavoritesCountries();
}
