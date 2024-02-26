const countriesContainer = document.querySelector(".countries-container");
const searchBtn = document.getElementById("search-btn");
const searchBar = document.getElementById("search-bar");
const allCountryBtn = document.getElementById("all-country-btn");
const sortCountryBtn = document.getElementById("sort-country-btn");
const addCountryBtn = document.getElementById("add-country-btn");
const postCountryBtn = document.getElementById("post-country-data");
const addCountryForm = document.querySelector(".add-country-form");
const deletedCountriesEl = document.querySelector(".deleted-countries");
const deletedCountryBtn = document.getElementById("deleted-country-btn");
const updateCountryBtn = document.getElementById("update-country-data");

const countryNameEl = document.getElementById("country-name");
const continentEl = document.getElementById("continent");
const populationEl = document.getElementById("population");
const countryImgEl = document.getElementById("country-img");

// global variable for update country
let currentCountry, currentIndex;

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  fetchCountryData(searchBar.value);
});

addCountryBtn.addEventListener("click", function (e) {
  e.preventDefault();
  clearForm();
  addCountryForm.classList.remove("hidden");
  countriesContainer.classList.add("hidden");
  updateCountryBtn.classList.add("hidden");
  postCountryBtn.classList.remove("hidden");
});

postCountryBtn.addEventListener("click", function (e) {
  e.preventDefault();
  saveToLocalStorage();
});

allCountryBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addCountryForm.classList.add("hidden");
  showAllCountries();
});

sortCountryBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addCountryForm.classList.add("hidden");

  sortCountries();
});

deletedCountryBtn.addEventListener("click", function (e) {
  e.preventDefault();

  addCountryForm.classList.add("hidden");

  let deletedCountries = localStorage.getItem("deletedCountries");
  deletedCountries = JSON.parse(deletedCountries) || [];

  let ulEl = `<ul class="list-group">`;
  deletedCountries.forEach((country) => {
    ulEl += `
      <li class="list-group-item list-item">  ${country}
        <span class="btn btn-warning" id="restore-country-btn" onclick="restoreCountry('${country}')"> 
          Restore Country
        </span>
      </li>
      `;
  });
  if (ulEl == `<ul class="list-group">`)
    countriesContainer.innerHTML = "No deleted countries";
  else {
    ulEl += `</ul>`;
    countriesContainer.innerHTML = ulEl;
  }
});

updateCountryBtn.addEventListener("click", function (e) {
  e.preventDefault();
  updateCountryData();
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
    let localCountries = localStorage.getItem("countries");
    localCountries = JSON.parse(localCountries) || [];

    for (let country of localCountries) {
      if (country.name.common == countryName.toLowerCase()) {
        bindCountriesData({ countries: [country] });
        return;
      }
    }
    const countries = await getJSON(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    if (!countries) return;
    bindCountriesData({ countries });
  } catch (err) {
    countriesContainer.innerHTML = err.message;
  }
}

// function which fetch all countries data
async function fetchAllCountriesData() {
  try {
    let countries = await getJSON(`https://restcountries.com/v3.1/all`);
    if (!countries) return;
    countries = countries.slice(0, 5);
    return countries;
  } catch (err) {
    countriesContainer.innerHTML = err.message;
  }
}

// function which shows favorites countries
async function showAllCountries() {
  countriesContainer.innerHTML = "Loading...";
  let countries = await fetchAllCountriesData();

  let localCountries = localStorage.getItem("countries");
  localCountries = JSON.parse(localCountries) || [];

  countries = [...localCountries, ...countries];
  bindCountriesData({ countries });
}

// function which sort countries
async function sortCountries() {
  countriesContainer.innerHTML = "Loading...";
  let countries = await fetchAllCountriesData();

  let localCountries = localStorage.getItem("countries");
  localCountries = JSON.parse(localCountries) || [];

  countries = [...localCountries, ...countries];
  countries.sort((a, b) => a.population - b.population);
  bindCountriesData({ countries });
}

// function which binds data to ui
function bindCountriesData({ countries }) {
  countriesContainer.classList.remove("hidden");
  addCountryForm.classList.add("hidden");

  let deletedCountries = localStorage.getItem("deletedCountries");
  deletedCountries = JSON.parse(deletedCountries) || [];

  let html = "";
  let localCountries = [];
  countries?.forEach((country, i) => {
    let condition;
    if (country.id && country.status) condition = true;
    else
      condition =
        !deletedCountries.includes(country.name.common.toLowerCase()) &&
        !localCountries.includes(country.name.common.toLowerCase());
    if (condition) {
      html += `
      <div class="card" style="width: 18rem">
        <img src=${country.flags.svg} class="card-img-top" alt="..." />
        <div class="card-body">
          <h4 class="card-title">${country.name.common.toUpperCase()}</h4>
          <h6 class="card-title">${country.continents[0]}</h6>
          <h6 class="card-title">👨‍👩‍👧‍👦 ${country.population}</h6>
          <a href="#" class="btn btn-primary edit-btn mb-2" id='${
            country.name.common
          }' onclick="editCountry('${
        country.name.common
      }',${i})">Edit country</a>
          <a href="#" class="btn btn-danger delete-btn mb-2" id='${
            country.name.common
          }' onclick="addToDeletedCountries('${
        country.name.common
      }')">Delete country</a>
        </div>
      </div>
      `;
    }
    if (country.id)
      localCountries = [...localCountries, country.name.common.toLowerCase()];
  });

  countriesContainer.innerHTML = html;
  if (html == "") countriesContainer.innerHTML = "no countries found";
}

// fucntion which saves data to localstorage
async function saveToLocalStorage() {
  let countries = localStorage.getItem("countries");
  countries = JSON.parse(countries) || [];

  let deletedCountries = localStorage.getItem("deletedCountries");
  deletedCountries = JSON.parse(deletedCountries) || [];

  const countryName = countryNameEl.value;
  const continent = continentEl.value;
  const imgUrl = countryImgEl.value;
  const population = populationEl.value;

  if (!countryName) {
    alert("Please enter country name");
    return;
  } else if (!continent) {
    alert("Please enter continent name");
    return;
  } else if (!population) {
    alert("Please enter population");
    return;
  } else if (!imgUrl) {
    alert("Please enter image url");
    return;
  }

  let oldCountries = await fetch(`https://restcountries.com/v3.1/all`);
  oldCountries = await oldCountries.json();

  for (let country of deletedCountries) {
    if (country == countryName.toLowerCase()) {
      alert("This country is alredy deleted");
      clearForm();
      return;
    }
  }

  for (let country of oldCountries) {
    if (country.name.common.toLowerCase() == countryName.toLowerCase()) {
      alert("This country is already present");
      clearForm();
      return;
    }
  }

  for (let country of countries) {
    if (country.name.common.toLowerCase() == countryName.toLowerCase()) {
      alert("This country is already present");
      clearForm();
      return;
    }
  }

  let newCountry = {
    id: Date.now(),
    name: {
      common: countryName.toLowerCase(),
    },
    continents: [continent],
    population,
    flags: {
      svg: imgUrl,
    },
    index: 0,
  };

  countries = [...countries, newCountry];

  localStorage.setItem("countries", JSON.stringify(countries));
  alert("new country data posted successfully!");
  addCountryForm.classList.add("hidden");
  clearForm();
}

// function which add country in deletedCountries array in localstorage
function addToDeletedCountries(countryName) {
  let confirmed = confirm("Are you sure you want to delete this country!");
  if (!confirmed) return;

  let localCountries = localStorage.getItem("countries");
  localCountries = JSON.parse(localCountries) || [];

  let deletedCountries = localStorage.getItem("deletedCountries");
  deletedCountries = JSON.parse(deletedCountries) || [];

  for (let country of localCountries) {
    if (country.name.common.toLowerCase() == countryName.toLowerCase()) {
      localCountries = localCountries.filter(
        (country) =>
          country.name.common.toLowerCase() != countryName.toLowerCase()
      );
      localStorage.setItem("countries", JSON.stringify(localCountries));

      deletedCountries = deletedCountries.filter(
        (country) => country != countryName.toLowerCase()
      );
      localStorage.setItem(
        "deletedCountries",
        JSON.stringify(deletedCountries)
      );
      location.reload();
      return;
    }
  }

  if (deletedCountries.includes(countryName.toLowerCase())) return;
  deletedCountries = [...deletedCountries, countryName.toLowerCase()];

  localStorage.setItem("deletedCountries", JSON.stringify(deletedCountries));
  location.reload();
}

// function which allows to edit country
async function editCountry(countryName, index) {
  postCountryBtn.classList.add("hidden");
  updateCountryBtn.classList.remove("hidden");

  let localCountries = localStorage.getItem("countries");
  localCountries = JSON.parse(localCountries) || [];

  let deletedCountries = localStorage.getItem("deletedCountries");
  deletedCountries = JSON.parse(deletedCountries) || [];

  let editCountry;

  for (let country of localCountries) {
    if (country.name.common == countryName) {
      editCountry = country;
    }
  }

  if (!editCountry) {
    editCountry = await getJSON(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    console.log(editCountry);
    editCountry = editCountry.filter(
      (country) =>
        country.name.common.toLowerCase() == countryName.toLowerCase()
    );
    editCountry = editCountry[0];
  }

  currentCountry = editCountry;

  console.log(currentCountry);

  countryNameEl.value = editCountry.name.common;
  continentEl.value = editCountry.continents[0];
  populationEl.value = editCountry.population;
  countryImgEl.value = editCountry.flags.svg;
  addCountryForm.classList.remove("hidden");
}

// function which will update country data
function updateCountryData() {
  console.log(currentCountry);
  const countryName = countryNameEl.value;
  const continent = continentEl.value;
  const imgUrl = countryImgEl.value;
  const population = populationEl.value;

  let localCountries = localStorage.getItem("countries");
  localCountries = JSON.parse(localCountries) || [];

  if (!countryName) {
    alert("Please enter country name");
    return;
  } else if (!continent) {
    alert("Please enter continent name");
    return;
  } else if (!population) {
    alert("Please enter population");
    return;
  } else if (!imgUrl) {
    alert("Please enter image url");
    return;
  }

  let newCountry = {
    id: Date.now(),
    name: {
      common: countryName.toLowerCase(),
    },
    continents: [continent],
    population,
    flags: {
      svg: imgUrl,
    },
    index: 0,
    status: "updated",
  };

  if (
    countryName.toLowerCase() == currentCountry.name.common.toLowerCase() &&
    continent.toLowerCase() == currentCountry.continents[0].toLowerCase() &&
    population == currentCountry.population &&
    imgUrl == currentCountry.flags.svg
  ) {
    clearForm();
    return;
  }

  if (currentCountry.id) {
    let index;
    localCountries.forEach((country, i) => {
      if (country.id == currentCountry.id) index = i;
    });

    localCountries[index] = newCountry;
  } else {
    let deletedCountries = localStorage.getItem("deletedCountries");
    deletedCountries = JSON.parse(deletedCountries) || [];

    deletedCountries = [
      ...deletedCountries,
      currentCountry.name.common.toLowerCase(),
    ];

    localStorage.setItem("deletedCountries", JSON.stringify(deletedCountries));

    localCountries = [...localCountries, newCountry];
  }

  localStorage.setItem("countries", JSON.stringify(localCountries));
  clearForm();
}

// function which restore country
function restoreCountry(countryName) {
  let deletedCountries = localStorage.getItem("deletedCountries");
  deletedCountries = JSON.parse(deletedCountries) || [];

  deletedCountries = deletedCountries.filter(
    (country) => country != countryName
  );

  localStorage.setItem("deletedCountries", JSON.stringify(deletedCountries));
  alert("country restored!");
  location.reload();
}

// function which clears a form
function clearForm() {
  countryNameEl.value = "";
  continentEl.value = "";
  populationEl.value = "";
  countryImgEl.value = "";
}
