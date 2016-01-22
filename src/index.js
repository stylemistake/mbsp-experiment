'use strict';

const Vector = require('./Vector.js');
const Plane = require('./Plane.js');
const Shape = require('./Shape.js');
const MBSPTreeNode = require('./MBSPTreeNode.js');

// Initialize Two.js
let originalCanvas = new Two({ width: 300, height: 200 })
  .appendTo(document.getElementById('original'));

let multiresCanvas = new Two({ width: 300, height: 200 })
  .appendTo(document.getElementById('multires'));


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

var approximation = original.clone().approximate(0);

// --------------------------------------------------------
//  Rendering
// --------------------------------------------------------

// let tree = MBSPTreeNode.create(original, 0.1);
// let vertices = tree.toShape();
// console.log(tree, vertices);

render(originalCanvas, original);
render(multiresCanvas, approximation);

// Listen to input field text change events
document.getElementById('max_err')
  .addEventListener('input', (e) => {
    let maxErr = parseFloat(e.srcElement.value) / 100;
    var approximation = original.clone().approximate(maxErr);
    render(multiresCanvas, approximation);
  });
