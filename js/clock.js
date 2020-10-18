const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    const hoursStr = `${hours < 10 ? `0${hours}` : hours}`;
    const minutesStr = `${minutes < 10 ? `0${minutes}` : minutes}`;
    const secondsStr = `${seconds < 10 ? `0${seconds}` : seconds}`;
    clockTitle.innerText = `${hoursStr} : ${minutesStr} : ${secondsStr}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();
