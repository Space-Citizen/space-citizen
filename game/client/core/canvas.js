
canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
context.canvas.width = window.innerWidth * 0.99;
context.canvas.height = window.innerHeight * 0.99;

function canvasClear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.oncontextmenu = function (e) {
  e.preventDefault();
};
