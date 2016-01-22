'use strict';

const Vector = require('./Vector.js');

class Plane {
  constructor(a, b, c) {
    // Equation: Ax + By + C = 0
    // Why not "y = Ax + B"? Because Ax + By + C = 0 offers more flexibility,
    // and allows to represent horizontal and vertical lines without
    // using +/-Infinity numbers, and {A, B}, when normalized, is also a
    // normal vector. It's also easier to calculate the distance.
    this.a = a;
    this.b = b;
    this.c = c;
  }

  intersection(plane) {
    let x, y;
    // Calculate intersection by X
    if (this.b !== 0) {
      x = (this.b * plane.c - plane.b * this.c) /
        (this.a * plane.b - plane.a * this.b);
      y = 0 - (this.a * x + this.c) / this.b;
    } else
    // Calculate intersection by Y
    if (this.a !== 0) {
      y = (this.a * plane.c - plane.a * this.c) /
        (plane.a * this.b - this.a * plane.b);
      x = 0 - (this.b * y + this.c) / this.a;
    }
    // Catch all invalid results
    if (isNaN(x) || !isFinite(x) || isNaN(y) || !isFinite(y)) {
      return null;
    }
    // Return an intersection point.
    // '|| 0' is to eliminate the minus sign from '0', i.e. '-0'.
    // Minus zero makes tests fail and can lead to other nasty things.
    return new Vector(x || 0, y || 0);
  }

  // Normalizes the plane, so {A, B} becomes a normal vector for the plane.
  normalize() {
    const m = new Vector(this.a, this.b).magnitude();
    return new Plane(this.a / m, this.b / m, this.c / m);
  }

  // Calculate shortest distance from point to the plane
  distanceTo(point) {
    const plane = this.normalize();
    return plane.a * point.x + plane.b * point.y + plane.c;
  }

  // Query Y coordinate by providing X
  queryY(x) {
    return 0 - (this.a * x + this.c) / this.b;
  }

  // Query X coordinate by providing Y
  queryX(y) {
    return 0 - (this.b * y + this.c) / this.a;
  }
}

// Converts two points (line) into a normal vector and other things, which
// then are used to create a Plane.
Plane.fromPoints = function (point1, point2) {
  // Find slope component of the line
  const slope = point2.subtract(point1);
  // Find normal to the left of the line
  const normal = slope.rotate270();
  // Find vectical slope offset
  const offset = 0 - normal.x * point1.x - normal.y * point1.y;
  // Return a plane
  return new Plane(normal.x, normal.y, offset);
};

module.exports = Plane;
