// Selectors
const workBtn = document.getElementById("work-btn")
const shortBreakBtn = document.getElementById("short-break-btn")
const longBreakBtn = document.getElementById("long-break-btn")
const timer = document.getElementById("time-display")
const workSessionsSpan = document.querySelector(".work-sessions")
const audio = new Audio('./sounds/bell_school_handheld_ring_x3_gentle.mp3');

// Timer variables   
let workMins = 25
let shortBreakMins = 5
let longBreakMins = 15
let time = workMins * 60
let currentTimer = 0 // the variable for the current setInterval (used to clear the interval)

// Hooking up the buttons
workBtn.addEventListener("click", () => {
    startTimer(workMins);
})
    
shortBreakBtn.addEventListener("click", () => {
    startTimer(shortBreakMins);
})

longBreakBtn.addEventListener("click", () => {
    startTimer(longBreakMins);
})

// Timer function
const startTimer = (startingMinutes) => {
    if(currentTimer) // check if there is a timer running already
        clearInterval(currentTimer) 
    time = startingMinutes * 60
    timer.innerHTML = `${startingMinutes}: 00`
    currentTimer = setInterval(updateCountdown, 1000)
}

// Countdown function
const updateCountdown = () => {
    time--
    const minutes = Math.floor(time / 60)
    let seconds = time % 60
    seconds = seconds < 10 ? '0' + seconds : seconds
    timer.innerHTML = `${minutes}: ${seconds}`
    
    if(time <= 0) {
        clearInterval(currentTimer)
        time = 0
        updateStats()
        audio.play()
    }
}

// Stats
if(!("workSessions" in localStorage)) {
    localStorage.setItem("workSessions", "0");
}
workSessionsSpan.textContent = localStorage.getItem("workSessions");

setInterval(() => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // console.log(date)
}, 500)

const updateStats = () => {
    let nrWorkSessions = localStorage.getItem("workSessions");
    nrWorkSessions++;
    localStorage.setItem("workSessions", JSON.stringify(nrWorkSessions));
    workSessionsSpan.textContent = nrWorkSessions;
}

// Modal 
const edit = document.getElementById("edit-btn");
const stats = document.getElementById("stats-btn");
const editModalContainer = document.querySelector(".edit-modal-container");
const statsModalContainer = document.querySelector(".stats-modal-container");
const closeEdit = document.getElementById("close-edit-btn");
const closeStats = document.getElementById("close-stats-btn");

edit.addEventListener("click", () => {
    editModalContainer.classList.add("show");
})

stats.addEventListener("click", () => {
    statsModalContainer.classList.add("show");
})

closeEdit.addEventListener("click", () => {
    editModalContainer.classList.remove("show");
})

closeStats.addEventListener("click", () => {
    statsModalContainer.classList.remove("show");
})

// Theme
const container = document.querySelector(".container")
const timerContainer = document.querySelector(".timer")
const hexagon = document.querySelector(".hexagon")
const pdBtns = document.querySelectorAll(".pd-btn") // pomodoro buttons
const prettyThemeBtn = document.querySelector(".pretty-theme-btn")
const freshThemeBtn = document.querySelector(".fresh-theme-btn")
const brightThemeBtn = document.querySelector(".bright-theme-btn")

prettyThemeBtn.addEventListener("click", () => {
    changeTheme("#98dbc6", "#f18d9e", "#e6d72a");
})

freshThemeBtn.addEventListener("click", () => {
    changeTheme("#4cb5f5", "#b3c100", "#34675c", "#fff");
})

brightThemeBtn.addEventListener("click", () => {
    changeTheme( "#ffd959", "#f52549", "#fa6775");
})

// Function used to change themes according to the colors
const changeTheme = (containerBgColor, timerBgColor, btnBgColor, btnColor="#000") => {
    container.style.backgroundColor = containerBgColor;
    if(containerBgColor == "#4cb5f5") {
        hexagon.style.backgroundColor = btnBgColor;
    } else {
        hexagon.style.backgroundColor = timerBgColor;
    }
    timerContainer.style.backgroundColor = timerBgColor;
    pdBtns.forEach(pdBtn => {
        pdBtn.style.backgroundColor = btnBgColor;
        pdBtn.style.color = btnColor;
    })
}

// Slider range
const minsSpan = document.querySelector(".mins-span");
const minsSlider = document.querySelector(".mins-slider");

minsSlider.oninput = function() {
    const mins = minsSlider.value;
    minsSpan.innerHTML = mins;
    workMins = mins;
    shortBreakMins = mins < 50 ? (mins / 5) : 10; // make the short break a maximum of 10 mins
    longBreakMins = mins < 45 ? (parseInt(mins * 0.6)) : 24; // make the long break a maximum of 25 mins
    if(mins == 40 || mins == 35)
        longBreakMins = 20;
}

// var today = new Date();
// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
// var currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date+' '+time;

