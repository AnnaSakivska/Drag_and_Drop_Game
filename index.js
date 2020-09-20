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

const rectFeild = soccerFeild.getBoundingClientRect();
const rectGoalArea = goalAreaSecond.getBoundingClientRect();
const rectGoalArea1 = goalAreaFirst.getBoundingClientRect();
const rectGoalArea2 = goalAreaSecond.getBoundingClientRect();

// console.log(rectGoalArea2.width + " ...rectGoalArea2.width");
// console.log(rectFeild.width + " ...rectFeild.width");
// console.log(rectFeild.width - rectGoalArea2.width);

let scoreCount = {
  teamFirst: {
    count: 0,
    ballInFeild1: false,
  },
  teamSecond: {
    count: 0,
    ballInFeild2: false,
  },
};

const ballsAmount = 9;

scoreTeamOne.innerHTML = scoreCount.teamFirst.count;
scoreTeamTwo.innerHTML = scoreCount.teamSecond.count;

//chosing the winner of the game

function choseTheWinner() {
  if (
    scoreCount.teamFirst.count + scoreCount.teamSecond.count ===
    ballsAmount
  ) {
    if (scoreCount.teamFirst.count > scoreCount.teamSecond.count) {
      goalAreaFirst.style.background = "#66DE62";
      goalAreaSecond.style.background = "#DE7562";
    }
    if (scoreCount.teamFirst.count < scoreCount.teamSecond.count) {
      goalAreaSecond.style.background = "#66DE62";
      goalAreaFirst.style.background = "#DE7562";
    }
  }
}

//Iterating over all balls

[...balls].forEach((el) => {
  // to set a random position for a ball in the beginning
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  const rectBall = el.getBoundingClientRect();

  const randomLeftPosition = getRandomArbitrary(
    rectBall.left,
    rectFeild.width - rectBall.left
  );
  const randomTopPosition = getRandomArbitrary(
    rectBall.height,
    rectFeild.height - rectBall.height
  );

  function setPosition() {
    if (
      randomLeftPosition < rectGoalArea.width ||
      randomLeftPosition + rectBall.width >
        rectFeild.width - rectGoalArea.width - rectBall.width
    ) {
      el.style.left =
        getRandomArbitrary(
          rectGoalArea.width,
          rectFeild.width - rectGoalArea.width - rectBall.width
        ) + "px";
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

  //functionality for moving ball around

  const target = e.target;
  const rect = target.getBoundingClientRect();

  const prevX = Math.round(rect.left);
  const prevY = Math.round(rect.top);

  const ballLeft = parseInt(target.style.left, 10);
  const ballTop = isNaN(parseInt(target.style.top, 10))
    ? 0
    : parseInt(target.style.top, 10);

  // console.log(rect.left);

  function mousemove(e) {
    let newX = prevX - e.clientX;
    let newY = prevY - e.clientY;
    const rect = target.getBoundingClientRect();
    target.style.zIndex = 1;

    // Restricting the area of game
    function restrictGameArea() {
      if (parseInt(target.style.left) < 0) {
        target.style.left = 0;
      } else if (parseInt(target.style.left) > rectFeild.width - rect.width) {
        target.style.left = rectFeild.width - rect.width + "px";
      } else if (parseInt(target.style.top) < 0) {
        target.style.top = 0;
      } else if (parseInt(target.style.top) > rectFeild.height - rect.height) {
        target.style.top = rectFeild.height - rect.height + "px";
      } else {
        target.style.left = ballLeft - 20 - newX + "px";
        target.style.top = ballTop - 20 - newY + "px";
      }
    }
    restrictGameArea();
  }

  //Stopping the dragging ball and scoring

  function mouseup() {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    console.log(target);

    //adding scored ball to the title

    function addBallIntoTitle(parent) {
      const targetCopy = document.createElement("div");
      targetCopy.className = target.className + " scored-ball";
      targetCopy.innerText = target.innerText;
      parent.appendChild(targetCopy);
    }

    //scoring the ball into goal area

    function putBallIntoFoalArea() {
      if (
        rect.left > rectGoalArea1.left &&
        rect.left < rectGoalArea1.left + rectGoalArea1.width - rect.width &&
        rect.top > rectGoalArea1.top &&
        rect.top < rectGoalArea1.top + rectGoalArea1.height - rect.height
      ) {
        target.removeEventListener("mousedown", mousedown);
        scoreCount.teamFirst.ballInFeild1 = true;
        addBallIntoTitle(leftGoal);
      }
      if (
        rect.left > rectFeild.left + rectFeild.width - rectGoalArea2.width &&
        rect.left < rectFeild.left + rectFeild.width &&
        rect.top > rectGoalArea2.top &&
        rect.top < rectGoalArea2.top + rectGoalArea2.height - rect.height
      ) {
        target.removeEventListener("mousedown", mousedown);
        scoreCount.teamSecond.ballInFeild2 = true;
        addBallIntoTitle(rightGoal);
      }
    }

    //Functions to score and calculate score

    function scoreTeamFirst() {
      putBallIntoFoalArea();

      if (scoreCount.teamFirst.ballInFeild1 === true) {
        scoreCount.teamFirst.count += 1;
        scoreTeamOne.innerHTML = scoreCount.teamFirst.count;
      }
      if (scoreCount.teamSecond.ballInFeild2 === true) {
        scoreCount.teamSecond.count += 1;
        scoreTeamTwo.innerHTML = scoreCount.teamSecond.count;
      }
      scoreCount.teamFirst.ballInFeild1 = false;
      scoreCount.teamSecond.ballInFeild2 = false;
    }

    soccerFeild.removeEventListener("mousemove", mousemove);
    soccerFeild.removeEventListener("mouseup", mouseup);
    scoreTeamFirst();
    choseTheWinner();
  }
}
