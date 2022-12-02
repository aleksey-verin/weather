export function convertKelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(1)
}

export function convertTimestampToDate(unix_timestamp, timezone) {
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