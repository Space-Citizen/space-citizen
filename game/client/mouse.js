

var mouse = {
  x: null,
  y: null,
  right_click: false,
  left_click: false,
}

canvas.addEventListener("mousemove", function (evt) {
  var rect = canvas.getBoundingClientRect();
  mouse.x = evt.clientX - rect.left;
  mouse.y = evt.clientY - rect.top
  //console.log(mouse.x + ',' + mouse.y);
}, false);

canvas.addEventListener("mousedown", function (evt) {
  if (evt.which == 1) {
    mouse.left_click = true;
  }
  if (evt.which == 3) {
    mouse.right_click = true;
  }
  console.log(evt)
});

canvas.addEventListener("mouseup", function (evt) {
  console.log(evt.which);
  if (evt.which == 1) {
    mouse.left_click = false;
  }
  if (evt.which == 3) {
    mouse.right_click = false;
  }
});
