import './css/styles.css';
import countryCardTpl from "./templates/countryCards.hbs";
import countryFlagsTpl from "./templates/flags.hbs";
import debounce from "lodash.debounce";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
    inputCountry: document.querySelector('[id = search-box]'),
    countryInfo: document.querySelector('.country-info'),
    countryList: document.querySelector('.country-list')
    
};


//refs.inputCountry.addEventListener('input', debounce(onSearch, 300));

// function onSearch(e) {
//     e.preventDefault();
    
     
//     const searchName = e.target.value;
//     if (searchName === '') {
//         clearTheFoundResult()
//         return
//     }
   
//         if (searchName.length >= 10) {
//             clearTheFoundResult()
//             error();
//             return
//         }
//         if (searchName.length <= 2) {
//             tooManyMatches()
//             clearTheFoundResult();
//             return
//         }
//         if (searchName.status === 404) {
//              clearTheFoundResult()
//             error()
           
//             return
//         }
    
   
    
//     fetchCountries(searchName)
//         .then(rendrerCountryCard)
//         .catch(error => console.log(error))
    
// }

// function fetchCountries(countryName) {
//   return fetch(`https://restcountries.com/v3.1/name/${countryName.trim()}?fields=name,capital,population,flags,languages`)
//     .then(response => {
//         return response.json();
//     })
// }

// function rendrerCountryCard(country) {
//         const markup = countryCardTpl(country);
//         refs.countryInfo.innerHTML = markup;  
// }

function clearTheFoundResult() {
    refs.countryInfo.innerHTML = "";
    refs.countryList.innerHTML = "";
}

function tooManyMatches() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function onError(){
  Notify.failure('Oops, there is no country with that name.');
}
    
////////////////////////////////////////////////////////////////////////////
const onSearch = (evt) => {
  let countryName = ''
  countryName = evt.target.value
  if (countryName === '') {
    clearTheFoundResult()
    return
  }

  fetch(`https://restcountries.com/v3.1/name/${countryName.trim()}?fields=name,capital,population,flags,languages`)
    .then(response => {
      return response.json()
    })
    .then(country => {
      if (country.length >= 10) {
        tooManyMatches()
        clearTheFoundResult()
        return
      }
      if (country.length <= 2) {
        clearTheFoundResult()
        const markup = countryCardTpl(country)
        refs.countryInfo.innerHTML = markup
        return
      }
      if (country.status === 404) {
        clearTheFoundResult()
        onError()
        return
      }
      clearTheFoundResult()
      const markup = country.map(countryFlagsTpl).join('')
      refs.countryList.innerHTML = markup
      })
      .catch(error => {
        console.log(error)
    });
}


refs.inputCountry.addEventListener('input', debounce(onSearch, 300))
