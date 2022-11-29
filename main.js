const ELEMENTS_UI = {
    FORM_SEARCH: document.querySelector(".form-search"),
    INPUT_SEARCH: document.querySelector(".input-search"),
    TAB_LINKS: document.querySelectorAll(".tab-links"),
    TAB_CONTENTS: document.querySelectorAll(".tab-content"),
    CITY_NAME: document.querySelectorAll('.city-name'),
    WEATHER_CURRENT_TEMPER: document.querySelectorAll('.current-temp'),
    WEATHER_FEELS_TEMPER: document.querySelector('.current-feels'),
    WEATHER_CLOUDY: document.querySelector('.current-cloudy'),
    WEATHER_PICTURE: document.querySelector('.picture-weather'),

    WEATHER_SUNRISE: document.querySelector('.current-sunrise'),
    WEATHER_SUNSET: document.querySelector('.current-sunset'),
}

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
        getResult(ELEMENTS_UI.INPUT_SEARCH.value)
        ELEMENTS_UI.INPUT_SEARCH.value = ''
      }
}

function getResult(nameFromInput) {
    
    const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const cityName = nameFromInput;
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
    
    setTimeout(() => {
        ELEMENTS_UI.CITY_NAME.forEach((item) => {
            if (!item.classList.contains('correct')) {
                item.classList.add('error')
                item.textContent = `loading data...`
            }
        })
    }, 1000)

    let response = fetch(url)
    response
    .then(response => response.json())
    .then(data => showResult(data))
    .catch(function(err) {
        ELEMENTS_UI.CITY_NAME.forEach((item) => {
            item.classList.add('error')
            if (err.message !== 'Failed to fetch') {
                item.textContent = `city not found`
            } else {
                item.textContent = `sorry, network failure`
            }
        })
    })
}

function convertKelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(1)
}

function convertTimestampToDate(unix_timestamp, timezone) {
    let date = new Date(unix_timestamp * 1000)
    let hours = date.getUTCHours() + timezone / 3600
    let minutes = "0" + date.getMinutes()
    return hours + ':' + minutes.slice(-2)
}
  
function showResult(data) {

    ELEMENTS_UI.CITY_NAME.forEach((item) => {
        item.textContent = data.name
        item.classList.add('correct')
    })
    ELEMENTS_UI.WEATHER_CURRENT_TEMPER.forEach(item => item.textContent = convertKelvinToCelsius(data.main.temp))
    ELEMENTS_UI.WEATHER_FEELS_TEMPER.textContent = convertKelvinToCelsius(data.main.feels_like)
    ELEMENTS_UI.WEATHER_CLOUDY.textContent = data.weather[0].main
    ELEMENTS_UI.WEATHER_PICTURE.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`

    ELEMENTS_UI.WEATHER_SUNRISE.textContent = convertTimestampToDate(data.sys.sunrise, data.timezone)
    ELEMENTS_UI.WEATHER_SUNSET.textContent = convertTimestampToDate(data.sys.sunset, data.timezone)
    console.log(data)
    // console.log(data.sys.sunrise)
    // console.log(data.sys.sunset)
    // console.log(data.sys.sunset.getTimezoneOffset())
    // console.log(new Date.toString(data.sys.sunrise))
    // console.log(new Date(data.sys.sunset))
    // console.log(data.weather[0].main)
}
   

    // current-temp


    // let nameForScreen = (nameFromInput.toLowerCase())[0].toUpperCase() + (nameFromInput.toLowerCase()).slice(1)
    // let probabilityForScreen = (probability * 100).toFixed(0)
  
    // switch (gender) {
    //   case 'male':
    //     ELEMENTS_FROM_UI.RESULT_MAIN.firstElementChild.textContent = nameForScreen
    //     document.querySelector('.text_result').firstElementChild.nextElementSibling.textContent = ' - '
    //     ELEMENTS_FROM_UI.RESULT_MAIN.lastElementChild.textContent = 'мужчина'
    //     ELEMENTS_FROM_UI.RESULT_PROBABILITY.textContent = `С вероятностью: ${probabilityForScreen}%`
    //     break;
    //   case 'female':
    //     ELEMENTS_FROM_UI.RESULT_MAIN.firstElementChild.textContent = nameForScreen
    //     document.querySelector('.text_result').firstElementChild.nextElementSibling.textContent = ' - '
    //     ELEMENTS_FROM_UI.RESULT_MAIN.lastElementChild.textContent = 'женщина'
    //     ELEMENTS_FROM_UI.RESULT_PROBABILITY.textContent = `С вероятностью: ${probabilityForScreen}%`
    //     break;
    //   default:
    //     ELEMENTS_FROM_UI.RESULT_MAIN.innerHTML = `Имя <span>${nameForScreen}</span> </br><span>не найдено</span>`
    //     ELEMENTS_FROM_UI.RESULT_PROBABILITY.textContent = ''
    //     break;
    // }
//  

// ELEMENTS_FROM_UI.FORM.addEventListener("submit", getMale);

// function getMale(event) {
//   if (ELEMENTS_FROM_UI.INPUT.value !== '') {
//     event.preventDefault();
//     let nameInLatin = cyrillicToLatin(ELEMENTS_FROM_UI.INPUT.value)
//     getResult(nameInLatin, ELEMENTS_FROM_UI.INPUT.value)
//     ELEMENTS_FROM_UI.INPUT.value = ''
//   }
// }

// function openTab(event, nameOfTab) {
    
//     let tabcontent = document.getElementsByClassName("tabcontent");
//     for (let i = 0; i < tabcontent.length; i++) {
//         tabcontent[i].style.display = "none";
//     }
//     let tablinks = document.getElementsByClassName("tablinks");
//     for (let i = 0; i < tablinks.length; i++) {
//         tablinks[i].className = tablinks[i].className.replace(" active", "");
//     }
//     document.getElementById(nameOfTab).style.display = "block";
//     event.currentTarget.className += " active";
// }

// const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
// const cityName = 'boston';
// const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'; (этот ключ имеет ограничение в кол-ве запросов, если будут ошибки - придется сгенерировать новый или спросить в чате)
// const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;