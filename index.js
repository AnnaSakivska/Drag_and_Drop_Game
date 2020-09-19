const container = document.querySelector(".container");
const balls = document.querySelectorAll(".ball");
const ballYellow = document.querySelector(".ball--color-yellow");
const soccerFeild = document.querySelector(".feild");
const goalAreaFirst = document.querySelector(".feild__goalarea-team-1");
const goalAreaSecond = document.querySelector(".feild__goalarea-team-2");
const leftGoal = document.querySelector(".score__ball-keeper-1");
const rightGoal = document.querySelector(".score__ball-keeper-2");
const scoreTeamOne = document.querySelector(".score__team-1");
const scoreTeamTwo = document.querySelector(".score__team-2");

//Balls appear randomly on the feild in the begining
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const rectFeild = soccerFeild.getBoundingClientRect();
const rectGoalArea = goalAreaSecond.getBoundingClientRect();
const rectGoalArea1 = goalAreaFirst.getBoundingClientRect();
const rectGoalArea2 = goalAreaSecond.getBoundingClientRect();

let scoreCount = {
  teamFirst: {
    count: 0,
    ballInFeild1: false,
  },
  teamSecond: {
    count: 0,
    ballInFeild1: false,
  },
};

scoreTeamOne.innerHTML = scoreCount.teamFirst.count;
scoreTeamTwo.innerHTML = scoreCount.teamSecond.count;

//Iterating over all balls
[...balls].forEach((el) => {
  const rectBall = el.getBoundingClientRect();

  const randomLeftPosition = getRandomArbitrary(
    rectBall.left,
    rectFeild.width - rectBall.left
  );
  const randomTopPosition = getRandomArbitrary(
    rectBall.height,
    rectFeild.height - rectBall.height
  );

  //A Function to set a random position for a ball
  function setPosition() {
    if (
      randomLeftPosition < rectGoalArea.width ||
      randomLeftPosition + rectBall.width >
        rectFeild.width - rectGoalArea.width - rectBall.width
      //     &&
      //     randomTopPosition > (rectFeild.height - rectGoalArea.height) / 2) ||
      //   randomTopPosition <
      //     rectFeild.height -
      //       rectGoalArea.height -
      //       (rectFeild.height - rectGoalArea.height) / 2
    ) {
      el.style.left =
        getRandomArbitrary(
          rectGoalArea.width,
          rectFeild.width - rectGoalArea.width - rectBall.width
        ) + "px";
      //   el.style.left =
      //     getRandomArbitrary(
      //       rectBall.height,
      //       (rectFeild.height - rectGoalArea.height) / 2 ||
      //         rectFeild.height -
      //           rectGoalArea.height +
      //           (rectFeild.height - rectGoalArea.height) / 2
      //     ) + "px";
    } else {
      el.style.left = randomLeftPosition + "px";
      el.style.top = randomTopPosition + "px";
    }
  }
  setPosition();

  el.addEventListener("mousedown", mousedown);
});

function mousedown(e) {
  soccerFeild.addEventListener("mousemove", mousemove);
  soccerFeild.addEventListener("mouseup", mouseup);

  let target = e.target;
  //   const rect = target.getBoundingClientRect();

  const rect = target.getBoundingClientRect();

  let prevX = Math.round(rect.left);
  let prevY = Math.round(rect.top);

  let ballLeft = parseInt(target.style.left, 10);
  let ballTop = isNaN(parseInt(target.style.top, 10))
    ? 0
    : parseInt(target.style.top, 10);

  function mousemove(e) {
    let newX = prevX - e.clientX;
    let newY = prevY - e.clientY;

    target.style.left = ballLeft - 20 - newX + "px";
    // console.log(target.style.left);

    target.style.top = ballTop - 20 - newY + "px";
    target.style.zIndex = 2;

    // console.log(rectGoalArea1.width + " ... rectGoalArea1.width");

    //A function to add score
    if (
      target.offsetLeft > rectGoalArea1.left &&
      target.offsetLeft < rectGoalArea1.left + rectGoalArea1.width - rect.width
    ) {
      // scoreTeamTwo.innerHTML = scoreCount.teamSecond;
      target.removeEventListener("mousedown", mousedown);
      scoreCount.teamFirst.ballInFeild1 = true;
      leftGoal.appendChild = `${target}`;
      //   console.log()
    }
  }

  function mouseup() {
    // console.log(target.offsetLeft + "   rect.left");
    if (scoreCount.teamFirst.ballInFeild1 === true) {
      scoreCount.teamFirst.count += 1;
      scoreTeamOne.innerHTML = scoreCount.teamFirst.count;
    }
    scoreCount.teamFirst.ballInFeild1 = false;

    soccerFeild.removeEventListener("mousemove", mousemove);
    soccerFeild.removeEventListener("mouseup", mouseup);
  }
}
