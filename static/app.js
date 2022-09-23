
let goal;
let targetDays;

goal = prompt("Enter your target goal");
targetDays = prompt("For how many days do you plan to do this");
targetDays = parseInt(targetDays);


let progress = 0;
let progressTicks = new Array(targetDays).fill(false);

function fillProgressTicks() {
    const container = document.getElementById("ticks-counter");
    progressTicks.forEach(_ => {
        const _tick = document.createElement("input");
        _tick.setAttribute("type", "checkbox");
        container.appendChild(_tick);
    });
}

fillProgressTicks();

