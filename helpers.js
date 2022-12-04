export function convertKelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(1)
}

export function convertTimestampToTime(unix_timestamp, timezone) {
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

export function convertTimestampToDayAndMonth(unix_timestamp) {
    let date = new Date(unix_timestamp * 1000)

    let day = date.getUTCDate()
    let monthNum = date.getUTCMonth()
    let monthObj = {
        1: 'января',
        2: "февраля",
        3: "марта",
        4: "апреля",
        5: "мая",
        6: "июня",
        7: "июля",
        8: "августа",
        9: "сентября",
        10: "октября",
        11: "ноября",
        12: "декабря",
    }
    let month
    for (let item in monthObj) {
        if (item == monthNum) {
            month = monthObj[item]
        }
    }

    return `${day} ${month}`
}


export function translateWeather(weatherFromData) {
    let weather = {
    Clouds: 'Облачно',
    Clear : 'Ясно',
    Snow : 'Снег',
    Thunderstorm : 'Гроза',
    Drizzle : 'Дождь',
    Rain : 'Дождь',
    Mist : 'Туман',
    Smoke : 'Смог',
    Haze : 'Туман',
    Dust : 'Пыль',
    Fog : 'Туман',
    Sand : 'Песок',
    Ash : 'Пепел',
    Squall : 'Ураган',
    Tornado : 'Торнадо',
}
    return weather[weatherFromData]
}
