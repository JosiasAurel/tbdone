
let goal;
let targetDays;
let startDate;
let daysIn;
let progressTicks = new Array(targetDays).fill(false);

function initMission() {
    goal = prompt("Enter your target goal");
    targetDays = prompt("For how many days do you plan to do this");
    targetDays = parseInt(targetDays);

    startDate = new Date().toUTCString();
    startDate = new Date(startDate).getTime()

    const goalContent = document.getElementById("goal-content");
    goalContent.innerHTML = `Goal is ${goal} for ${targetDays} days.<br /> You are 50% into it!`;

}

initMission();
fillProgressTicks();
assignId();

const childList = document.getElementById("ticks-counter").children;
console.log(childList);

function fillProgressTicks() {
    const container = document.getElementById("ticks-counter");
    progressTicks.forEach(_ => {
        const _tick = document.createElement("input");
        _tick.setAttribute("type", "checkbox");
        container.appendChild(_tick);
    });
}

function randomID(length) {
    const pickup = "qwertzuiopasdfghjklyxcvbnm1234567890";
    let strId = "";
    for (let i = 0; i < length; i++) {
        // console.log(pickup.split("").length);
        const idx = Math.floor(Math.random()*pickup.split("").length);
        strId += pickup[idx];
    }
    return strId;
}

function assignId() {
    if (localStorage.getItem("id") === null) {
        localStorage.setItem("id", randomID(7));
    }
}

