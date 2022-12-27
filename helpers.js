export function convertKelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(1)
}

export function convertTimestampToTime(unix_timestamp, timezone) {
  let date = new Date((unix_timestamp + timezone) * 1000)
  let hours = '0' + date.getUTCHours()
  let minutes = '0' + date.getMinutes()
  return hours.slice(-2) + ':' + minutes.slice(-2)
}

export function convertTimestampToDayAndMonth(unix_timestamp, timezone) {
  let date = new Date((unix_timestamp + timezone) * 1000)
  let day = date.getUTCDate()
  let monthNum = date.getUTCMonth()
  let monthObj = {
    0: 'января',
    1: 'февраля',
    2: 'марта',
    3: 'апреля',
    4: 'мая',
    5: 'июня',
    6: 'июля',
    7: 'августа',
    8: 'сентября',
    9: 'октября',
    10: 'ноября',
    11: 'декабря',
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
    Clear: 'Ясно',
    Snow: 'Снег',
    Thunderstorm: 'Гроза',
    Drizzle: 'Дождь',
    Rain: 'Дождь',
    Mist: 'Туман',
    Smoke: 'Смог',
    Haze: 'Туман',
    Dust: 'Пыль',
    Fog: 'Туман',
    Sand: 'Песок',
    Ash: 'Пепел',
    Squall: 'Ураган',
    Tornado: 'Торнадо',
  }
  return weather[weatherFromData]
}
