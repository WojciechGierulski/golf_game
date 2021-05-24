import Drawer from "../game_controlling/drawer.js";
import {LEVELS_LIST} from "../game_objects/levels.js";
import {SIZE, canvas} from "../game_params/params.js";
import Ball from "../game_objects/ball.js";
import GameLogic from "../game_controlling/logic.js";
import Controller from "../game_controlling/ball_control.js";
import Timer from "../game_controlling/timer.js"


class GameController
{
  constructor(game)
  {
    this.game = game;
    document.body.onkeydown = this.space_press.bind(this);
    this.level_nr = 1;
    this.last_level_nr = 2;
    this.timer = new Timer();
    this.timer.start();
    this.strikes = 0;
    window.post = async function(url, data)
    {
      try {
        const response = await fetch(url, { method: "POST", body: JSON.stringify(data) });
        window.location.href = "/high-scores";
      } catch (err) {
        console.info(err + " url: " + url);
      }
    }
  }

  mainloop()
  {
    this.game.game_mainloop(this.timer);
    if (this.game.level.check_victory())
    {
      if (this.level_nr == this.last_level_nr)
      {
        this.game.drawer.msg = "You won, press space to save your score in highscores!";
      }
      else
      {
        this.game.drawer.msg = "You won level, press space to continue!";
      }
      this.game.level_won = true;
      this.game.controller.level_won = true;
      this.timer.stop();
    }
    window.requestAnimationFrame(this.mainloop.bind(this));
  }


  space_press(e) // when level won
  {
    if (e.keyCode == 32)
    {
      if (this.game.level_won)
      {
        if (this.level_nr == this.last_level_nr)
        {
          var strikes = this.game.controller.strikes + "";
          var seconds = this.timer.get_seconds() + "";
          var minutes = this.timer.get_minutes() + "";
          post("/game", {'strikes': strikes, 'minutes': minutes, 'seconds': seconds});
        }
        else
        {
          this.timer.start();
          this.strikes += this.game.controller.strikes;
          this.game = new Game(canvas, new LEVELS_LIST[this.level_nr](new Ball()));
          this.game.controller.strikes = this.strikes;
          this.level_nr += 1;
        }
      }
    }
  }
}


class Game
{
  constructor(canvas, level)
  {
    this.canvas = canvas;
    this.level = level;
    this.logic = new GameLogic(this.level);
    this.controller = new Controller(this.level.ball, this.canvas);
    this.drawer = new Drawer(canvas, this.controller);
    this.level_won = false;
  }

  game_mainloop(timer)
  {
    this.logic.do_logic();
    this.drawer.draw_game(this.level, timer);
  }
}



var gamecontroller = new GameController(new Game(canvas, new LEVELS_LIST[0](new Ball())));
gamecontroller.mainloop();
