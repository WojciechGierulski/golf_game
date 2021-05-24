import {SCALE, BOX_SIZE} from "../game_params/params.js"
import Physics from "../game_controlling/physics.js";

export default class LevelObject
{
  constructor(image, row, col)
  {
    this.image = image;
    this.row = row;
    this.col = col;
  }
  draw(ctx)
  {
    return undefined;
  }
}

class Border
{
  constructor(sizee)
  {
    var size = sizee.slice(0);
    size[0] *= SCALE;
    size[1] *= SCALE;
    this.boundaries = [[[0, 0], [size[0], 0]], [[0, 0], [0, size[1]]], [[0, size[1]], [size[0], size[1]]], [[size[0], 0], [size[0], size[1]]]]
  }

  detect_collision(ball)
  {
    var result = [false, 0, 99];
    for (var boundary of this.boundaries)
    {
      result = Physics.detect_collision_with_line(boundary, ball);
      if (result[0])
      {
        break;
      }
    }
    return result;
  }

  draw(ctx)
  {
    ;
  }
}


class SquareTerrainObject extends LevelObject
{
  constructor(image, row, col)
  {
    super(image, row, col);
  }

  draw(ctx)
  {
    var x_cord = this.col * BOX_SIZE;
    var y_cord = this.row * BOX_SIZE;
    ctx.drawImage(this.image, x_cord, y_cord, BOX_SIZE, BOX_SIZE);
  }
}

class Boundary 
{
  constructor(x1, y1, x2, y2)
  {
    this.boundary = [[x1, y1], [x2, y2]];
  }

  detect_collision(ball)
  {
    var result = [false];
    result = Physics.detect_collision_with_line(this.boundary, ball);
    return result;
  }
}


export {SquareTerrainObject, Border, Boundary};
