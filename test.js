// // 1669613371
// // 1669640742

// boston
// 1669636241
// 1669670048
// let unix_timestamp = 1669613371
// // Create a new JavaScript Date object based on the timestamp
// // multiplied by 1000 so that the argument is in milliseconds, not seconds.
// var date = new Date(unix_timestamp * 1000);

// console.log(date)
// // Hours part from the timestamp
// var hours = date.getHours();
// // Minutes part from the timestamp
// var minutes = "0" + date.getMinutes();
// // Seconds part from the timestamp
// var seconds = "0" + date.getSeconds();

// // Will display time in 10:30:23 format
// var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

// console.log(formattedTime);

// let a = new Date(1669613371)
// console.log(a)


function convertTimestampToDate(unix_timestamp, timezone) {
    let date = new Date(unix_timestamp * 1000)
    let hours
    if (date.getUTCHours() > -(timezone / 3600)) {
        hours = date.getUTCHours() + timezone / 3600
    } else {
        hours = date.getUTCHours() + 24 + timezone / 3600
    }
    console.log(date.getUTCHours())
    console.log(timezone / 3600)
    console.log(hours)
    let minutes = "0" + date.getMinutes()
    return hours + ':' + minutes.slice(-2)
}


// function unixToDate(unix_timestamp) {
//     let date = new Date(unix_timestamp * 1000)
//     console.log(date.getTimezoneOffset())
//     let hours = date.getUTCHours()
//     //  + date.getTimezoneOffset() / 60
    
//     let minutes = "0" + date.getMinutes()
//     let formattedTime = hours + ':' + minutes.slice(-2)
//     console.log(formattedTime)
// }

console.log(convertTimestampToDate(1669757416, -18000))
// console.log(convertTimestampToDate(1669723129))

// 06.51 / 16.14 boston
// New York 1669723129 1669757416 -18000 06:59 16:30
// "Washington" 1669735603 1669767266 -28800 07:06 16:47
// 08:31 / 16:05 moscow