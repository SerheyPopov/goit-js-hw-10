import './css/styles.css';
import API from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryContainer = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(countryName, DEBOUNCE_DELAY));

// -----------------fn fetch and event--------------------

function countryName(evt) {
    let input = evt.target.value.trim();
    if (!input) {
        clearMarkupL() 
        clearMarkupC() 
        return
    }
    API.fetchCountries(input)
        .then(infoMassage)
        .catch(errorSerch);
}

// -----------------fn country list lenght-------------------

function infoMassage(countries) {
    if (countries.length > 10) {
        clearMarkupL()
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
        return
    }
    choisMarkup(countries);
}

// ---------------fn catch error-------------------

function errorSerch(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
}

// -------------------fn clear------------------

function clearMarkupL() {
    countryList.innerHTML = ''; 
}
function clearMarkupC() {
    countryContainer.innerHTML = '';
}

// ----------------fn choise markup--------------------------------------

function choisMarkup(countries) {
    if (countries.length === 1) {
        markupCountryContainer(countries);
        clearMarkupL()
       return 
    }
    markupCountryList(countries);
    clearMarkupC()
}

// ------------------fn render list------------------------------------

function markupCountryList(countries) {
    const marcupList = countries.map(({ name, flags }) =>
            `<li class = list>
            <img class = img_list src = "${flags.svg}" alt = "${name.official}">
            ${name.official}</li>`).join("");
    countryList.innerHTML = marcupList;
}

// ----------------fn render card-----------------------------------

function markupCountryContainer(countries) {
    return countries.map(({ name, capital, population, flags, languages }) => {
         const markupCard = `
         <h1 class="name"><img class = img src="${flags.svg}" alt="${name.official}" <span>${name.official}</span> </h1>
         <p class="text"><span class="span_text">Capital:</span> ${capital[0]}</p>
         <p class="text"><span class="span_text">Population:</span> ${population}</p>
         <p class="text"><span class="span_text">Languages:</span>  ${Object.values(languages).join(',')} </p> `;
        countryContainer.innerHTML = markupCard;
    })
};





