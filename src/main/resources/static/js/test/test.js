import Physics from "../game/physics.js";
import Ball from "../game/ball.js";
// Start with an iffe and expose the public variable on global
(function () {
    // "it" function defines the test case
    function it(desc, func) {
      //encapsulate the func call in try/catch block so that testing does not stop if one test fails
      try {
        func();
        // If the test case passes then log the test case description in the browser console with a checkmark
        console.log('\x1b[32m%s\x1b[0m', '\u2714 ' + desc);
      } catch (error) {
        // log the error on the console with an 'x'
        console.log('\n');
        console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + desc);
        console.error(error);
        console.log('\n');
      }
    }
    function assert(isTrue) {
      if (!isTrue) {
        throw new Error();
      }
    }

    it('should pass', function () {
      assert(1 == 1)
    });

    it('should fail', function () {
      assert(1 == 2)
    });

    it('normal vector', function () {
      var result = Physics.normal_vector_line([[0, 0], [0, 1]])
      assert(JSON.stringify(result) == JSON.stringify([-1, 0]))
    });

    it('line equatation vector', function () {
        var result = Physics.line_equatation_vector([[0, 1], [1, 2]])
        assert(JSON.stringify(result) == JSON.stringify([-1, 1, -1]))
    });
    
    it('normalize vector', function () {
      var result = Physics.normalize_vector([3, 4])
      assert(JSON.stringify(result) == JSON.stringify([0.6, 0.8]))
    });

    it('dot product', function () {
      var result = Physics.dot_product([1, 2], [2, 3])
      assert(result == 8)
    });

    it('point to point distance', function () {
      var result = Physics.point_to_point_distance([1, 1], [4, 5])
      assert(result == 5)
    });

    it('get vector after collision', function () {
      var ball = new Ball()
      ball.vel_x = 1;
      ball.vel_y = 1;
      var result = Physics.get_vector_after_collision(ball, [1, 0])
      assert(JSON.stringify(result) == JSON.stringify([-0.7, 0.6]))
    });

    it('move ball back', function () {
      var ball = new Ball(0, 0)
      ball.vel_y = -5;
      Physics.move_ball_back(1, ball)
      assert(ball.y == ball.RADIUS && Math.abs(ball.vel_x) < 0.01)
    });

    it('detect collision with line', function () {
      var ball = new Ball(10, 5)
      var result = Physics.detect_collision_with_line([[0, 0], [100, 0]], ball)
      assert(JSON.stringify(result) == JSON.stringify([true, [[0, 0], [100, 0]], 5]))
    });

})();