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


function unixToDate(unix_timestamp) {
    let date = new Date(unix_timestamp * 1000)
    console.log(date.getTimezoneOffset())
    let hours = date.getUTCHours()
    //  + date.getTimezoneOffset() / 60
    
    let minutes = "0" + date.getMinutes()
    let formattedTime = hours + ':' + minutes.slice(-2)
    console.log(formattedTime)
}

unixToDate(1669613371)
unixToDate(1669640742)

// 06.51 / 16.14 boston

// 08:31 / 16:05 moscow