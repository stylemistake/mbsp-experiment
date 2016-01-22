'use strict';

const Vector = require('./Vector.js');

class Plane {
  constructor(a, b, c) {
    // Equation: ax + by + c = 0
    this.a = a;
    this.b = b;
    this.c = c;
  }

  intersection(plane) {
    let x, y;
    if (this.b !== 0) {
      x = (this.b * plane.c - plane.b * this.c) /
        (this.a * plane.b - plane.a * this.b);
      y = 0 - (this.a * x + this.c) / this.b;
    } else
    if (this.a !== 0) {
      y = (this.a * plane.c - plane.a * this.c) /
        (plane.a * this.b - this.a * plane.b);
      x = 0 - (this.b * y + this.c) / this.a;
    }
    if (isNaN(x) || !isFinite(x) || isNaN(y) || !isFinite(y)) {
      return null;
    }
    return new Vector(x || 0, y || 0);
  }

  normalize() {
    const m = new Vector(this.a, this.b).magnitude();
    return new Plane(this.a / m, this.b / m, this.c / m);
  }

  distanceTo(point) {
    const plane = this.normalize();
    return plane.a * point.x + plane.b * point.y + plane.c;
  }

  queryY(x) {
    return 0 - (this.a * x + this.c) / this.b;
  }

  queryX(y) {
    return 0 - (this.b * y + this.c) / this.a;
  }
}

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
