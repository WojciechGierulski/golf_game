
import {SCALE} from "../game_params/params.js";




export default class Drawer {
  constructor(canvas, controller)
  {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.setTransform(1,0,0,-1,0,canvas.height);
    this.controller = controller;
    this.ctx.scale(1/SCALE, 1/SCALE);
    this.msg = null;
  }

  draw_background ()
  {
    var gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0.2222222222222222, "rgb(24, 44, 118)");
    gradient.addColorStop(0.9595959595959596, "rgb(76, 104, 207)");
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, SCALE*this.canvas.width, SCALE*this.canvas.height);
  }

  draw_arrow(level)
  {
    if (this.controller.request.length > 0)
    {
      this.ctx.beginPath();
      this.ctx.arrow(level.ball.x, level.ball.y, this.controller.request[0] , this.controller.request[1], [-15, 5, -20, 16]);
      this.ctx.fillStyle = "#FF0000";
      this.ctx.fill();
      console.log("arrow");
    }
  }

  draw_text() // used only to display "you won" text
  {
    console.log(this.msg)
    if (this.msg != null)
    {
      this.render_text(this.msg, this.canvas.width/2, this.canvas.height/2, 60);
    }
  }

  draw_game(level, timer)
  {
    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw_background();
    level.draw(this.ctx);
    level.ball.draw(this.ctx);
    this.draw_arrow(level);
    this.draw_text();
    this.draw_strikes();
    this.draw_timer(timer);
  }

  draw_strikes()
  {
    var text = "Total strikes: " + this.controller.strikes.toString();
    this.render_text(text, this.canvas.width * 0.9, this.canvas.height * 0.2, 30);
  }

  draw_timer(timer)
  {
    var text = timer.get_minutes() + ":" + timer.get_seconds();
    this.render_text(text, this.canvas.width * 0.9, this.canvas.height * 0.1, 30);
  }

  render_text(text, x, y, font_size)
  {
    this.ctx.beginPath();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    var font_size = 1/SCALE * font_size;
    this.ctx.font = font_size.toString() + 'px Comic Sans MS';
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = 'black';
    this.ctx.textAlign = "center";
    this.ctx.fillText(text, x, y);
    this.ctx.strokeText(text, x, y);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.setTransform(1,0,0,-1,0,canvas.height);
    this.ctx.scale(1/SCALE, 1/SCALE);
  }
}
