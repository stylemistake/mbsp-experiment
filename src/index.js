'use strict';

const $ = require('jquery');

const Vector = require('./Vector.js');
const Plane = require('./Plane.js');
const Shape = require('./Shape.js');
const MBSPTreeNode = require('./MBSPTreeNode.js');


// --------------------------------------------------------
//  Helper functions
// --------------------------------------------------------

function shapeToPath(shape) {
  let anchors = shape.vertices.map((vec) => {
    // Invert Y coordinates and add some offset
    return new Two.Anchor(2 + vec.x, 14 - vec.y);
  });
  let path = new Two.Path(anchors, true);
  path.stroke = '#2288aa';
  path.linewidth = 0.5;
  path.scale = 12;
  return path;
}

function render(canvas, shape) {
  canvas.clear();
  canvas.add(shapeToPath(shape));
  canvas.update();
}


// --------------------------------------------------------
//  Vector image
// --------------------------------------------------------

// Video camera icon
let original = new Shape([
  new Vector(1, 2),
  new Vector(1, 9),
  new Vector(5, 7),
  new Vector(5, 9),
  new Vector(6, 9),
  new Vector(7, 11),
  new Vector(9, 12),
  new Vector(11, 11),
  new Vector(12, 9),
  new Vector(13, 11),
  new Vector(15, 12),
  new Vector(17, 11),
  new Vector(18, 9),
  new Vector(19, 9),
  new Vector(19, 1),
  new Vector(5, 1),
  new Vector(5, 4),
]);

var approx = original.clone().approximate(0);

var approxList = MBSPTreeNode.createApproxList(original, 1);

// --------------------------------------------------------
//  Rendering
// --------------------------------------------------------

// Initialize Two.js
const originalCanvas = new Two({ width: 300, height: 200 })
  .appendTo(document.getElementById('original'));

const approxInitialCanvas = new Two({ width: 300, height: 200 })
  .appendTo(document.getElementById('approx_init'));

const approxListCanvas = new Two({ width: 300, height: 200 })
  .appendTo(document.getElementById('approx_list'));

// let tree = MBSPTreeNode.create(original, 0.1);
// let vertices = tree.toShape();
// console.log(tree, vertices);

console.log(approxList);

render(originalCanvas, original);
render(approxInitialCanvas, approx);
render(approxListCanvas, approxList[0]);

// Listen to input field text change events
const $max_err = $('#max_err');
$max_err.on('input', () => {
  let maxErr = parseFloat($max_err.val()) / 100;
  var approximation = original.clone().approximate(maxErr);
  render(approxInitialCanvas, approximation);
});

// Listen to input field text change events
const $approx_iter = $('#approx_iter');
$approx_iter.on('input', () => {
  let approxIter = parseInt($approx_iter.val(), 10);
  render(approxListCanvas, approxList[approxIter]);
});
