import { SCALE } from "../game_params/params.js";
import Physics from "../game_controlling/physics.js";

export default class Controller
{
    constructor(ball, canvas)
    {
        this.canvas = canvas;
        this.request = [];
        this.ball = ball;
        this.mouse_is_down = false;
        this.level_won = false;
        this.strikes = 0;
        canvas.addEventListener('mousedown', this.mouse_down.bind(this), false);
        canvas.addEventListener('mouseup', this.mouse_up.bind(this), false);
        canvas.addEventListener("mousemove", this.mouse_move.bind(this), false);
    }

    mouse_up(event)
    {
        if (this.mouse_is_down)
        {
            var rect = this.canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = (event.clientY - rect.top - this.canvas.height) * -1;
            x *= SCALE;
            y *= SCALE;
            var new_vel = Physics.calculate_power(this.ball, [x, y]);
            if (new_vel[1] > 0)
            {
                this.ball.vel_x = new_vel[0];
                this.ball.vel_y = new_vel[1];
                this.move_a_bit(new_vel)
                this.mouse_is_down = false;
                this.ball.in_contact = false;
                this.request = [];
                this.strikes += 1;
            }
        }
    }

    mouse_down(event)
    {
        if (!this.level_won)
        {
            var rect = this.canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = (event.clientY - rect.top - this.canvas.height) * -1;
            x *= SCALE;
            y *= SCALE;
            var distance = Physics.point_to_point_distance([x, y], [this.ball.x, this.ball.y]);
            if (distance < 2 * this.ball.RADIUS)
            {
                this.mouse_is_down = true;
            }
        }
    }

    mouse_move(event)
    {
        if (this.mouse_is_down)
        {
            var rect = this.canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = (event.clientY - rect.top - this.canvas.height) * -1;
            x *= SCALE;
            y *= SCALE;
            if (y < this.ball.y)
            {
                var d = Physics.point_to_point_distance([this.ball.x, this.ball.y], [x, y]);
                if (d > 100)
                {
                    d = 100;
                }
                var angle = Math.atan2(y - this.ball.y, x - this.ball.x);
                if (x > this.ball.x)
                {
                    var x_fin = this.ball.x - Math.cos(angle) * d;
                }
                else
                {
                    var x_fin = this.ball.x - Math.cos(angle) * d;
                }
                var y_fin = this.ball.y - Math.sin(angle) * d;
                this.request = [x_fin,y_fin];
            }
        }
        else
        {
            this.request = [];
        }
    }

    move_a_bit(vel)
    {
        this.ball.x += Math.sign(vel[0]);
        this.ball.y += 1;
    }
}