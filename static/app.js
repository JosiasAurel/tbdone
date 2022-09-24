
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

    localStorage.setItem("start", startDate);
    localStorage.setItem("mission", goal);
    localStorage.setItem("targetDays", targetDays);

    const goalContent = document.getElementById("goal-content");
    goalContent.innerHTML = `Goal is ${goal} for ${targetDays} days.<br /> You are 50% into it!`; 
    
    setCompleted();
    progressTicks = loadProgressTicks(); 
    // console.log(result);
    fillProgressTicks();
}

function setCompleted() {
    let completed = localStorage.getItem("completed");

    if (completed === "true") {

    const goalContent = document.getElementById("goal-content");
    const changeGoal = document.getElementById("change-goal");
    const completedMsg = document.createElement("p");
    completedMsg.innerText = "COMPLETED";
    completedMsg.classList.add("completed");

        goalContent.appendChild(completedMsg); 
        changeGoal.innerText = "New Goal";

}
}

document.getElementById("change-goal").addEventListener("click", e => {
    if (e.target.innerText === "New Goal") {
        storeGoal(); 
        clearGoalStore();
    } else if (e.target.innerText === "Reset Goal") {
        clearGoalStore();
    } 
    location.reload();
});

initMission();
assignId();

function fillProgressTicks() {
    const container = document.getElementById("ticks-counter");
    progressTicks.forEach((state, i) => {
        const _tick = document.createElement("input");
        _tick.setAttribute("type", "checkbox");
        state ?
            _tick.checked = true
            :
            _tick.checked = false;
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
                        alert("Goal Completed. Well done!");
                        setCompleted();
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
const updateProgressTicks = _ => localStorage.setItem("progress", progressTicks.join("-"));

function boolFromStringArray(arr) { return arr.map(item => item === "true" ? true : false) };

// load and desrialize progress ticks
function loadProgressTicks() { return boolFromStringArray(localStorage.getItem("progress").split("-")); };

function assignId() {
    if (localStorage.getItem("id") === null) {
        localStorage.setItem("id", randomID(7));
    }
}

function clearGoalStore() {
    const items = ["mission", "start", "targetDays"];

    items.forEach(item => localStorage.removeItem(item));
}

function storeGoal() {
        const goals = JSON.parse(localStorage.getItem("goals"));
        goals.push(loadGoal());
        localStorage.setItem("goals", JSON.stringify(goals));
    }

function loadGoal() {
        const name = localStorage.getItem("");
        const targetStreak = progressTicks.length;
        const actualStreak = progressTicks.filter(s => s === true).length;

        return { name, targetStreak, actualStreak  };
    }

function loadGoals() {
        return JSON.parse(localStorage.getItem("goals"));
    }
