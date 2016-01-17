'use strict';

let Vector2 = require('./Vector2.js');
let Plane2 = require('./Plane2.js');

let vec = new Vector2(2, 2).normalize();
let plane = Plane2.fromPoints(new Vector2(2, 2), new Vector2(4, 3));
console.log(plane);
