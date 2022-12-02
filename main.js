import { ELEMENTS_UI } from "/ui-elements.js"
import { storage } from "/storage.js"
import { convertKelvinToCelsius, convertTimestampToDate } from "/helpers.js"

let LIST_OF_FAVORITE_CITIES = storage.getFavoriteCitiesFromStorage() // storage ==>> LIST

let currentCity = storage.getCurrentCityFromStorage() // storage ==>> currentCity
if (!currentCity) {
    currentCity = 'Atlanta'
}

getResult(currentCity)
RenderForFavoriteList()

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
        // console.log(data)
        ELEMENTS_UI.SYSTEM_MESSAGE_BLOCK.style.display = 'none'
    })
    .catch(function(err) {
        
        ELEMENTS_UI.SYSTEM_MESSAGE_BLOCK.style.display = 'block'
        
        if (errorStatus === 404) {
            ELEMENTS_UI.SYSTEM_MESSAGE_TEXT.textContent = `City not found. Please enter another city name..`
        } else {
            ELEMENTS_UI.SYSTEM_MESSAGE_TEXT.textContent = `Sorry, network failure. Please try again later..`
        }
        
        ELEMENTS_UI.SYSTEM_MESSAGE_CLOSE.addEventListener('click', function() {
            ELEMENTS_UI.SYSTEM_MESSAGE_BLOCK.style.display = 'none'
        })

        setTimeout(() => {
            ELEMENTS_UI.SYSTEM_MESSAGE_BLOCK.style.display = 'none'
        }, 7000)
    }) 
}


function showResult(data) {
    
    ELEMENTS_UI.CITY_NAME_NOW.textContent = data.name
    ELEMENTS_UI.CITY_NAME_DETAILS.textContent = data.name
    
    ELEMENTS_UI.WEATHER_DIV_CURRENT_TEMPER.style.display = 'inline'
    ELEMENTS_UI.WEATHER_SPAN_CURRENT_TEMPER.forEach(item => item.textContent = convertKelvinToCelsius(data.main.temp))
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

ELEMENTS_UI.FAVORITE_BUTTON.addEventListener('click', addOrRemoveCityOnHeartButton)

function addOrRemoveCityOnHeartButton() {
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
            cityItemBtn.addEventListener('click', deleteButtonOnEachItem)
            
            cityItem.prepend(cityItemBtn)
            cityItem.prepend(cityItemName)
            
            ELEMENTS_UI.FAVORITE_LIST.prepend(cityItem)
        })
    }
}

function deleteButtonOnEachItem() {
    
    const cityName = event.target.previousElementSibling.textContent
    
    LIST_OF_FAVORITE_CITIES = LIST_OF_FAVORITE_CITIES.filter(item => item !== cityName)
    
    storage.saveFavoriteCitiesInStorage(LIST_OF_FAVORITE_CITIES) //  LIST ==>> storage
    
    if (cityName === ELEMENTS_UI.CITY_NAME_NOW.textContent) {
        ELEMENTS_UI.FAVORITE_BUTTON.classList.remove('checked')
    }
    
    RenderForFavoriteList()
}

ELEMENTS_UI.BUTTON_CLEAR_ALL.addEventListener("click", clearAllFavoriteList)

function clearAllFavoriteList() {
  
    localStorage.clear()
    LIST_OF_FAVORITE_CITIES = []
    storage.saveFavoriteCitiesInStorage(LIST_OF_FAVORITE_CITIES) //  LIST ==>> storage
    getResult(currentCity)
    RenderForFavoriteList()

};