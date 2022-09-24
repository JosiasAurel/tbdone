
let goal;
let targetDays;
let startDate;
let daysIn;
let progressTicks;

function initMission() {
    goal = localStorage.getItem("mission") ?? prompt("Enter your target goal");
    targetDays = localStorage.getItem("targetDays") ?? prompt("For how many days do you plan to do this");
    targetDays = parseInt(targetDays);

    progressTicks = localStorage.getItem("progess") ?? new Array(targetDays).fill(false);
    
    startDate = localStorage.getItem("start") ?? new Date().toString();

    let completed = localStorage.getItem("completed");

    localStorage.setItem("start", startDate);
    localStorage.setItem("mission", goal);
    localStorage.setItem("targetDays", targetDays);

    const goalContent = document.getElementById("goal-content");
    goalContent.innerHTML = `Goal is ${goal} for ${targetDays} days.<br /> You are 50% into it!`;
    const completedMsg = document.createElement("p");
    completedMsg.innerText = "COMPLETED";
    completedMsg.classList.add("completed");
    fillProgressTicks();
}

initMission();
assignId();

function fillProgressTicks() {
    const container = document.getElementById("ticks-counter");
    progressTicks.forEach((state, i) => {
        const _tick = document.createElement("input");
        _tick.setAttribute("type", "checkbox");
        state ?
            _tick.setAttribute("checked", true)
            :
            _tick.removeAttribute("checked");
        container.appendChild(_tick);
        _tick.addEventListener("click", _e => {
            const tickDay = new Date(new Date().setDate(new Date().getDate() + i));
            const today = new Date();
            if (today.toString() == tickDay.toString()) { 
                if (!progressTicks[i] && !_tick.getAttribute("disabled")) { 
                    _tick.checked = true;
                    progressTicks[i] = true;
                    updateProgressTicks();
                    if (typeof progressTicks[i+1] === "undefined") {
                        localStorage.setItem("completed", true);
                        alert("Goal Completed");
                    }
                } else _tick.removeAttribute("checked");
            } else {
                _tick.checked = false;
                alert("You can't check this today. Try again tomorrow.");
            } 
        });
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

// serialize and save progress ticks
const updateProgressTicks = _ => localStorage.setItem("progress", progressTicks.join(""));

// load and desrialize progress ticks
const loadProgressTicks = _ => localStorage.getItem("progress").split("");

function assignId() {
    if (localStorage.getItem("id") === null) {
        localStorage.setItem("id", randomID(7));
    }
}

