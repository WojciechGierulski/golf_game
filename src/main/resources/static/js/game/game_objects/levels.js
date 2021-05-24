import {SquareTerrainObject, Border, Boundary} from "../game_objects/objects.js";
import {load_images} from "../game_controlling/images.js";
import {SIZE} from "../game_params/params.js";
var images = load_images();


class Level
{
  constructor(ball)
  {
    this.terrain_objects = []
    this.boundaries = []
    this.ball = ball;
  }

  draw(ctx)
  {
    for (var obj of this.terrain_objects)
    {
      obj.draw(ctx);  
    }
  }

  check_victory()
  {
    ;
  }
}

class Level1 extends Level
{
  constructor(ball)
  {
    super(ball);
    this.ball.x = 100;
    this.ball.y = 80 + this.ball.RADIUS;

    // Drawable objects
    for (var i = 0; i <= 18; i++)
    {
      if (i == 17)
      {
        this.terrain_objects.push(new SquareTerrainObject(images["tile19"], 0, i));
      }
      else
      {
        this.terrain_objects.push(new SquareTerrainObject(images["tile2"], 0, i)); // row, column
      }
    }

    this.terrain_objects.push(new SquareTerrainObject(images["tile2"], 1, 10));
    this.terrain_objects.push(new SquareTerrainObject(images["tile2"], 1, 12));
    this.terrain_objects.push(new SquareTerrainObject(images["tile2"], 1, 14));
    this.terrain_objects.push(new SquareTerrainObject(images["tile2"], 2, 12));
    this.terrain_objects.push(new SquareTerrainObject(images["tile2"], 2, 14));


    // Boundaries objects

    // Goal
    this.boundaries.push(new Boundary(0, 80, 1370, 80));
    this.boundaries.push(new Boundary(1430, 80, 1520, 80));
    this.boundaries.push(new Boundary(1370, 80, 1370, 18));
    this.boundaries.push(new Boundary(1430, 80, 1430, 18));
    this.boundaries.push(new Boundary(1370, 18, 1430, 18));
    //

    this.boundaries.push(new Boundary(800, 80, 800, 160));
    this.boundaries.push(new Boundary(880, 80, 880, 160));
    this.boundaries.push(new Boundary(800, 160, 880, 160));

    this.boundaries.push(new Boundary(960, 80, 960, 240));
    this.boundaries.push(new Boundary(1040, 80, 1040, 240));
    this.boundaries.push(new Boundary(960, 240, 1040, 240));

    this.boundaries.push(new Boundary(1120, 80, 1120, 240));
    this.boundaries.push(new Boundary(1120, 240, 1200, 240));
    this.boundaries.push(new Boundary(1200, 80, 1200, 240));
    
    this.boundaries.push(new Border(SIZE));
  }

  check_victory()
  {
    var b = this.ball;
    if (b.x > 1370 && b.x < 1430 && b.y > 18 && b.y < 70)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}

class Level2 extends Level
{
  constructor(ball)
  {
    super(ball);
    this.ball.x = 100;
    this.ball.y = 480 + this.ball.RADIUS;

    // Drawable objects
    for (var i = 0; i <= 18; i++)
    {
      this.terrain_objects.push(new SquareTerrainObject(images["tile2"], 0, i)); // row, column
    }
    for (var i = 0; i <= 3; i++)
    {
      this.terrain_objects.push(new SquareTerrainObject(images["tile2"], 5, i)); // row, column
    }
    for (var i = 3; i <= 8; i++)
    {
      this.terrain_objects.push(new SquareTerrainObject(images["tile8"], i, 7)); // row, column
    }
    for (var i = 8; i <= 10; i++)
    {
      this.terrain_objects.push(new SquareTerrainObject(images["tile2"], 1, i)); // row, column
    }
    for (var i = 15; i <= 18; i++)
    {
      this.terrain_objects.push(new SquareTerrainObject(images["tile2"], 6, i)); // row, column
    }
    for (var i = 11; i <= 14; i++)
    {
      this.terrain_objects.push(new SquareTerrainObject(images["tile8"], 1, i)); // row, column
    }
    this.terrain_objects.push(new SquareTerrainObject(images["tile2"], 2, 11));
    this.terrain_objects.push(new SquareTerrainObject(images["tile2"], 2, 12));

    this.terrain_objects.push(new SquareTerrainObject(images["tile2"], 4, 13));
    this.terrain_objects.push(new SquareTerrainObject(images["tile2"], 4, 14));
    this.terrain_objects.push(new SquareTerrainObject(images["tile8"], 3, 13));
    this.terrain_objects.push(new SquareTerrainObject(images["tile8"], 3, 14));
    this.terrain_objects.push(new SquareTerrainObject(images["tile8"], 2, 13));
    this.terrain_objects.push(new SquareTerrainObject(images["tile8"], 2, 14));

    this.terrain_objects.push(new SquareTerrainObject(images["tile2"], 6, 15));
    this.terrain_objects.push(new SquareTerrainObject(images["tile2"], 6, 16));
    this.terrain_objects.push(new SquareTerrainObject(images["tile19"], 6, 17));
    this.terrain_objects.push(new SquareTerrainObject(images["tile2"], 6, 18));
    
    this.terrain_objects.push(new SquareTerrainObject(images["tile2"], 1, 15));



    // Boundaries objects

    // Goal
    this.boundaries.push(new Boundary(0, 80, 1520, 80));

    this.boundaries.push(new Boundary(0, 480, 320, 480));
    this.boundaries.push(new Boundary(0, 400, 320, 400));
    this.boundaries.push(new Boundary(320, 480, 320, 400));

    this.boundaries.push(new Boundary(560, 720, 560, 240));
    this.boundaries.push(new Boundary(640, 720, 640, 240));
    this.boundaries.push(new Boundary(560, 240, 640, 240));

    this.boundaries.push(new Boundary(640, 80, 640, 160));
    this.boundaries.push(new Boundary(640, 160, 880, 160));
    this.boundaries.push(new Boundary(880, 160, 880, 240));
    this.boundaries.push(new Boundary(880, 240, 1040, 240));
    this.boundaries.push(new Boundary(1040, 240, 1040, 400));
    this.boundaries.push(new Boundary(1040, 400, 1200, 400));
    this.boundaries.push(new Boundary(1200, 400, 1200, 80));

    this.boundaries.push(new Boundary(1200, 480, 1520, 480));
    this.boundaries.push(new Boundary(1200, 480, 1200, 560));

    this.boundaries.push(new Boundary(1200, 560, 1370, 560));
    this.boundaries.push(new Boundary(1430, 560, 1520, 560));
    this.boundaries.push(new Boundary(1370, 560, 1370, 500));
    this.boundaries.push(new Boundary(1370, 500, 1430, 500));
    this.boundaries.push(new Boundary(1430, 500, 1430, 560));

    this.boundaries.push(new Boundary(1200, 160, 1280, 160));
    this.boundaries.push(new Boundary(1280, 160, 1280, 80));
    
    this.boundaries.push(new Border(SIZE));
  }

  check_victory()
  {
    var b = this.ball;
    if (b.x > 1370 && b.x < 1430 && b.y > 520 && b.y < 550)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}


var LEVELS_LIST = [];
LEVELS_LIST.push(Level1)
LEVELS_LIST.push(Level2);

export {LEVELS_LIST};