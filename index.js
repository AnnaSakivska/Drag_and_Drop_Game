const container = document.querySelector(".container");
const ball = document.querySelectorAll(".ball");
const soccerFeild = document.querySelector(".feild");
const goalAreaFirst = document.querySelector(".feild__goalarea-team-1");
const goalAreaSecond = document.querySelector(".feild__goalarea-team-2");
const leftGoal = document.querySelector(".score__ball-keeper-1");
const rightGoal = document.querySelector(".score__ball-keeper-2");
const scoreTeamOne = document.querySelector(".score__team-1");
const scoreTeamTwo = document.querySelector(".sscore__team-2");

// let prevPositions = {};

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const rectFeild = soccerFeild.getBoundingClientRect();
const rectgoalArea = goalAreaFirst.getBoundingClientRect();
console.log(rectFeild);

// const feildWidth = soccerFeild.offsetWidth;

[...ball].forEach((el) => {
  //   prevPositions.el = el;
  //   console.log(el);
  function setPosition() {
    let randomLeftPosition = getRandomArbitrary(0, rectFeild.width - 50);
    let randomTopPosition = getRandomArbitrary(
      rectFeild.top,
      rectFeild.height - container.style.marginTop
    );

    console.log(randomLeftPosition);

    if (
      randomLeftPosition < 155 ||
      randomLeftPosition > rectFeild.width - 200
    ) {
      el.style.left = getRandomArbitrary(155, rectFeild.width - 200) + "px";
      console.log(el.style.left + " rect");
    } else {
      el.style.left = randomLeftPosition + "px";
    }

    el.style.top =
      getRandomArbitrary(
        rectFeild.top,
        rectFeild.height - container.style.marginTop
      ) + "px";
  }
  setPosition();
  //   console.log(el.style.left + " " + el.style.top);
  //   {
  //     prevX: getRandomArbitrary(rect.x, rect.width + rect.x),
  //     prevY: getRandomArbitrary(rect.y, rect.height + rect.y),
  //   };
  //   ball.addEventListener("mousedown", mousedown);
});

// console.log(prevPositions);

// function mousedown(e) {
//   soccerFeild.addEventListener("mousemove", mousemove);
//   soccerFeild.addEventListener("mouseup", mouseup);

//   let prevX = e.clientX;
//   let prevY = e.clientY;

//   function mousemove(e) {
//     let target = this.target;
//     let newX = prevX - e.clientX;
//     let newY = prevY - e.clientY;

//     const rect = target.getBoundingClientRect();

//     target.style.left = rect.left - newX + "px";
//     target.style.top = rect.left - newY + "px";
//   }

//   function mouseup() {}
// }
