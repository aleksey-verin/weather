const ELEMENTS_UI = {
    FORM_SEARCH: document.querySelector(".form-search"),
    INPUT_SEARCH: document.querySelector(".input-search"),
    TAB_LINKS: document.querySelectorAll(".tab-links"),
    TAB_CONTENTS: document.querySelectorAll(".tab-content"),
    CITY_NAME_NOW: document.querySelector('.now-city-name'),
    CITY_NAME_DETAILS: document.querySelector('.details-city-name'),
    
    WEATHER_CURRENT_TEMPER: document.querySelectorAll('.current-temp'),
    WEATHER_FEELS_TEMPER: document.querySelector('.current-feels'),
    WEATHER_CLOUDY: document.querySelector('.current-cloudy'),
    WEATHER_PICTURE: document.querySelector('.picture-weather'),
    WEATHER_SUNRISE: document.querySelector('.current-sunrise'),
    WEATHER_SUNSET: document.querySelector('.current-sunset'),

    SYSTEM_MESSAGE_BLOCK: document.querySelector('.error-block'),
    SYSTEM_MESSAGE_TEXT: document.querySelector('.error-message'),
    SYSTEM_MESSAGE_CLOSE: document.querySelector('.error-close'),

    FAVORITE_BUTTON: document.querySelector('.favorite-button'),
    FAVORITE_LIST: document.querySelector('.list-cities'),
}

// storage.saveFavoriteCities(favoriteCities)
// const favoriteCities = storage.getFavoriteCities();
// const currentCity = storage.getCurrentCity();

const storage = {
    saveFavoriteCitiesInStorage(LIST_OF_FAVORITE_CITIES) {
        return localStorage.setItem('favoriteCities', JSON.stringify(LIST_OF_FAVORITE_CITIES))
    },
    getFavoriteCitiesFromStorage() {
        return JSON.parse(localStorage.getItem('favoriteCities'))
    },
    saveCurrentCityInStorage(currentCity) {
        return localStorage.setItem('currentCity', JSON.stringify(currentCity))
    },
    getCurrentCityFromStorage() {
        return JSON.parse(localStorage.getItem('currentCity'))
    },
}



// let LIST_OF_FAVORITE_CITIES = []
// let currentCity

let LIST_OF_FAVORITE_CITIES = storage.getFavoriteCitiesFromStorage() // storage ==>> LIST

let currentCity = storage.getCurrentCityFromStorage() // storage ==>> currentCity
if (!currentCity) {
    currentCity = 'Atlanta'
}

getResult(currentCity)

RenderForFavoriteList()

document.querySelector('.button-clear').addEventListener("click", clearAllFavoriteList)

function clearAllFavoriteList() {
  
    localStorage.clear()
    LIST_OF_FAVORITE_CITIES = []
    // console.log(LIST_OF_FAVORITE_CITIES)
    storage.saveFavoriteCitiesInStorage(LIST_OF_FAVORITE_CITIES) //  LIST ==>> storage
    getResult(currentCity)
    RenderForFavoriteList()

};


ELEMENTS_UI.TAB_LINKS.forEach((item) => {
    item.addEventListener('click', showTab)
})

function showTab() {
    ELEMENTS_UI.TAB_LINKS.forEach((item) => item.classList.remove('active'))
    event.target.classList.add('active')
    ELEMENTS_UI.TAB_CONTENTS.forEach((item) => {
        if (item.dataset.name === event.target.dataset.name) {
            item.style.display = 'block'
        } else {
            item.style.display = 'none'
        }
    })
}


ELEMENTS_UI.FORM_SEARCH.addEventListener('submit', getCity)

function getCity() {
    if (ELEMENTS_UI.INPUT_SEARCH.value !== '') {
        event.preventDefault();
        getResult(ELEMENTS_UI.INPUT_SEARCH.value.trim())
        ELEMENTS_UI.INPUT_SEARCH.value = ''
      }
}

function getResult(nameFromInput) {
    
    const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const cityName = nameFromInput;
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

    let errorStatus = new Number

    let response = fetch(url)
    response
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
           return errorStatus = response.status
        }  
    })
    .then((data) => {
        showResult(data)
        ELEMENTS_UI.SYSTEM_MESSAGE_BLOCK.style.display = 'none'
    })
    .catch(function(err) {

        ELEMENTS_UI.SYSTEM_MESSAGE_BLOCK.style.display = 'block'
        if (errorStatus === 404) {
            ELEMENTS_UI.SYSTEM_MESSAGE_TEXT.textContent = `City not found. Please enter another city name..`
        } else {
            ELEMENTS_UI.SYSTEM_MESSAGE_TEXT.textContent = `Sorry, network failure. Please try again later..`
        }
        setTimeout(() => {
            ELEMENTS_UI.SYSTEM_MESSAGE_BLOCK.style.display = 'none'
        }, 5000)
    })

}

ELEMENTS_UI.SYSTEM_MESSAGE_CLOSE.addEventListener('click', () => ELEMENTS_UI.SYSTEM_MESSAGE_BLOCK.style.display = 'none')

function convertKelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(1)
}

function convertTimestampToDate(unix_timestamp, timezone) {
    let date = new Date(unix_timestamp * 1000)
    let hours = date.getUTCHours() + timezone / 3600
    if (hours < 0) {
        hours = hours + 24
    }
    if (hours > 24) {
        hours = hours - 24
    }
    let minutes = "0" + date.getMinutes()
    return hours + ':' + minutes.slice(-2)
}
  
function showResult(data) {

    ELEMENTS_UI.CITY_NAME_NOW.textContent = data.name
    ELEMENTS_UI.CITY_NAME_DETAILS.textContent = data.name
    
    document.querySelector('.now-temperature').style.display = 'inline'
    ELEMENTS_UI.WEATHER_CURRENT_TEMPER.forEach(item => item.textContent = convertKelvinToCelsius(data.main.temp))
    ELEMENTS_UI.WEATHER_FEELS_TEMPER.textContent = convertKelvinToCelsius(data.main.feels_like)
    ELEMENTS_UI.WEATHER_CLOUDY.textContent = data.weather[0].main
    ELEMENTS_UI.WEATHER_PICTURE.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
    ELEMENTS_UI.WEATHER_PICTURE.style.display = 'block'

    ELEMENTS_UI.WEATHER_SUNRISE.textContent = convertTimestampToDate(data.sys.sunrise, data.timezone)
    ELEMENTS_UI.WEATHER_SUNSET.textContent = convertTimestampToDate(data.sys.sunset, data.timezone)

    if (LIST_OF_FAVORITE_CITIES.includes(ELEMENTS_UI.CITY_NAME_NOW.textContent)) {
        ELEMENTS_UI.FAVORITE_BUTTON.classList.add('checked')
    } else {
        ELEMENTS_UI.FAVORITE_BUTTON.classList.remove('checked')
    }

    currentCity = data.name
    storage.saveCurrentCityInStorage(currentCity) // currentCity ==>> storage
    
}

ELEMENTS_UI.FAVORITE_BUTTON.addEventListener('click', addOrRemoveCity)

function addOrRemoveCity() {
    const cityName = ELEMENTS_UI.CITY_NAME_NOW.textContent

    if (LIST_OF_FAVORITE_CITIES.includes(cityName) === false) {
        ELEMENTS_UI.FAVORITE_BUTTON.classList.add('checked')
        LIST_OF_FAVORITE_CITIES.push(cityName)
        
        storage.saveFavoriteCitiesInStorage(LIST_OF_FAVORITE_CITIES) //  LIST ==>> storage
        
        RenderForFavoriteList()
    } else {
        ELEMENTS_UI.FAVORITE_BUTTON.classList.remove('checked')
        LIST_OF_FAVORITE_CITIES = LIST_OF_FAVORITE_CITIES.filter(item => item !== cityName)
    
        storage.saveFavoriteCitiesInStorage(LIST_OF_FAVORITE_CITIES) //  LIST ==>> storage
        
        RenderForFavoriteList()
    }
}

function removeItemButton() {
    const cityName = event.target.previousElementSibling.textContent
 
    LIST_OF_FAVORITE_CITIES = LIST_OF_FAVORITE_CITIES.filter(item => item !== cityName)

    storage.saveFavoriteCitiesInStorage(LIST_OF_FAVORITE_CITIES) //  LIST ==>> storage

    if (cityName === ELEMENTS_UI.CITY_NAME_NOW.textContent) {
        ELEMENTS_UI.FAVORITE_BUTTON.classList.remove('checked')
    }

    RenderForFavoriteList()
}


function RenderForFavoriteList() {

    LIST_OF_FAVORITE_CITIES = storage.getFavoriteCitiesFromStorage() // storage ==>>  LIST 
    
    if (LIST_OF_FAVORITE_CITIES === null) {
        LIST_OF_FAVORITE_CITIES = []
    }
    
    ELEMENTS_UI.FAVORITE_LIST.textContent = ''
    
    if (LIST_OF_FAVORITE_CITIES) {

        LIST_OF_FAVORITE_CITIES.forEach((item) => {
    
            let cityItem = document.createElement('div')
            cityItem.className = 'list-item'
            
            let cityItemName = document.createElement('div')
            cityItemName.className = 'list-item_name'
            cityItemName.textContent = item
            cityItemName.addEventListener('click', () => getResult(event.target.textContent))
            
            let cityItemBtn = document.createElement('div')
            cityItemBtn.className = 'list-item_btn'
            cityItemBtn.innerHTML = '&#9587'
            cityItemBtn.addEventListener('click', removeItemButton)
            
            cityItem.prepend(cityItemBtn)
            cityItem.prepend(cityItemName)
    
            ELEMENTS_UI.FAVORITE_LIST.prepend(cityItem)
        })
    }
}