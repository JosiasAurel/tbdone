
let goal;
let targetDays;

goal = prompt("Enter your target goal");
targetDays = prompt("For how many days do you plan to do this");
targetDays = parseInt(targetDays);


let progress = 0;
let progressTicks = new Array(targetDays).fill(false);

function fillProgressTicks() {
    progressTicks.forEach(tick => {
        const _tick = document.createElement("input");
        _tick.setAttribute("type", "checkbox");
        document.body.appendChild(_tick);
    });
}

fillProgressTicks();

