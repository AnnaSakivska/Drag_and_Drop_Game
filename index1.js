const container = document.querySelector(".container");
const ball = document.querySelectorAll(".ball");
const soccerFeild = document.querySelector(".feild");
const goalAreaFirst = document.querySelector(".feild__goalarea-team-1");
const goalAreaSecond = document.querySelector(".feild__goalarea-team-2");
const leftGoal = document.querySelector(".score__ball-keeper-1");
const rightGoal = document.querySelector(".score__ball-keeper-2");
const scoreTeamOne = document.querySelector(".score__team-1");
const scoreTeamTwo = document.querySelector(".sscore__team-2");

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const rectFeild = soccerFeild.getBoundingClientRect();
const rectgoalArea = goalAreaFirst.getBoundingClientRect();
// console.log(rectFeild);

// const feildWidth = soccerFeild.offsetWidth;

[...ball].forEach((el) => {
  //Seting the balls randomly on the soccerFeild

  let randomLeftPosition = getRandomArbitrary(0, rectFeild.width - 50);
  let randomTopPosition = getRandomArbitrary(
    rectFeild.top - container.style.marginTop,
    rectFeild.height
  );

  // console.log(randomLeftPosition);

  function setPosition() {
    if (
      randomLeftPosition < 155 ||
      (randomLeftPosition > rectFeild.width - 200 && randomTopPosition)
    ) {
      el.style.left = getRandomArbitrary(155, rectFeild.width - 200) + "px";
      // console.log(el.style.left + " rect");
    } else {
      el.style.left = randomLeftPosition + "px";
    }

    el.style.top =
      getRandomArbitrary(
        rectFeild.top - container.style.marginTop,
        rectFeild.height
      ) + "px";
  }
  setPosition();
  //   console.log(el.style.left + " " + el.style.top);
  //   {
  //     prevX: getRandomArbitrary(rect.x, rect.width + rect.x),
  //     prevY: getRandomArbitrary(rect.y, rect.height + rect.y),
  //   };
  // console.log(el);
  el.addEventListener("mousedown", mousedown);
});

// console.log(prevPositions);

function mousedown(e) {
  soccerFeild.addEventListener("mousemove", mousemove);
  soccerFeild.addEventListener("mouseup", mouseup);
  let target = e.target;
  // const rect = target.getBoundingClientRect();

  let prevX = e.clientX;
  console.log(prevX);
  let prevY = e.clientY;

  // console.log(prevX);
  // let prevY = e.clientY;

  // console.log(target);

  function mousemove(e) {
    // const rect = target.getBoundingClientRect();

    // console.log(e);
    let newX = prevX - e.clientX;
    console.log(newX);
    let newY = prevY - e.clientY;
    // console.log(target);
    const rect = target.getBoundingClientRect();
    // console.log(rect);
    target.style.left = rect.left - newX + "px";
    // console.log(target);
    target.style.top = rect.left - newY + "px";
    target.style.zIndex = 2;
  }

  function mouseup() {}
}
