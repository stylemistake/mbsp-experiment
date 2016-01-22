'use strict';

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  add(vec) {
    return new Vector(this.x + vec.x, this.y + vec.y);
  }

  subtract(vec) {
    return new Vector(this.x - vec.x, this.y - vec.y);
  }

  multiply(n) {
    return new Vector(this.x * n, this.y * n);
  }

  divide(n) {
    return new Vector(this.x / n, this.y / n);
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    return this.divide(this.magnitude());
  }

  rotate90() {
    return new Vector(this.y, 0 - this.x);
  }

  rotate270() {
    return new Vector(0 - this.y, this.x);
  }
}

module.exports = Vector;
