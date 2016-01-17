'use strict';

var assert = require('chai').assert;

const Plane2 = require('../src/Plane2.js');
const Vector2 = require('../src/Vector2.js');

describe('Plane2', () => {
  let p1, p2, p3, p4, p5;

  describe('fromPoints', () => {
    it('should initialize', () => {
      p1 = Plane2.fromPoints(new Vector2(0, 0), new Vector2(10, 10));
      p2 = Plane2.fromPoints(new Vector2(0, 10), new Vector2(10, 0));
      p3 = Plane2.fromPoints(new Vector2(4, 0), new Vector2(6, 4));
      p4 = Plane2.fromPoints(new Vector2(0, 0), new Vector2(0, 1));
      p5 = Plane2.fromPoints(new Vector2(0, 0), new Vector2(1, 0));
    });

    it('should return a correct plane', () => {
      assert.deepEqual(p1, new Plane2(-10, 10, 0));
      assert.deepEqual(p2, new Plane2(10, 10, -100));
      assert.deepEqual(p3, new Plane2(-4, 2, 16));
      assert.deepEqual(p4, new Plane2(-1, 0, 0));
      assert.deepEqual(p5, new Plane2(0, 1, 0));
    });
  });

  describe('intersection', () => {
    it('should return a correct point', () => {
      assert.deepEqual(p1.intersection(p2), new Vector2(5, 5));
      assert.deepEqual(p2.intersection(p3), new Vector2(6, 4));
      assert.deepEqual(p3.intersection(p4), new Vector2(0, -8));
      assert.deepEqual(p4.intersection(p5), new Vector2(0, 0));
    });
    it('should return null on parallel lines', () => {
      assert.deepEqual(new Plane2(-4, 2, 16)
        .intersection(new Plane2(-4, 2, 22)), null);
    });
    it('should return null on infinite intersections', () => {
      assert.deepEqual(new Plane2(-1, 0, 1)
        .intersection(new Plane2(-1, 0, 1)), null);
    });
  });

  describe('normalize', () => {
    it('should return a normalized plane', () => {
      let plane = Plane2.fromPoints(new Vector2(5, 0), new Vector2(8, 4));
      assert.deepEqual(plane, new Plane2(-4, 3, 20));
      assert.deepEqual(plane.normalize(), new Plane2(-0.8, 0.6, 4));
    });
  });
});
