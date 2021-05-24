import Physics from "../game_controlling/physics.js";


export default class GameLogic
{
    constructor(level)
    {
        this.level = level;
    }

    collisions()
    {
        for (var object of this.level.boundaries)
        {
            var result = object.detect_collision(this.level.ball);
            if (result[0])
            {
                Physics.change_ball_vel_vector_after_collision(result[1], this.level.ball)
                if (Math.abs(this.level.ball.vel_y) < 1 && Math.abs(this.level.ball.vel_x) < 1)
                {
                    if (Physics.normal_vector_line(result[1])[0] == 0)
                    {
                        this.level.ball.vel_y = 0;
                        this.level.ball.in_contact = true;
                        this.level.ball.vel_x = 0;
                    }
                }
                break;
            }
        }
    }

    do_logic()
    {
        this.level.ball.move();
        this.collisions();
        Physics.gravity(this.level.ball);
    }

}