document.querySelectorAll(".tab-links").forEach((item) => {
    item.addEventListener('click', openClick)
})

function openClick() {
    document.querySelectorAll(".tab-links").forEach((item) => item.classList.remove('active'))
    event.target.classList.add('active')
    document.querySelectorAll(".tab-content").forEach((item) => {
        if (item.dataset.name === event.target.dataset.name) {
            item.style.display = 'block'
        } else {
            item.style.display = 'none'
        }
    })
}

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