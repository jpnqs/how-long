

const FRAME_RATE = 30;

class Game {



  constructor() {
    this.gameObjects = [];
    }

  start() {
    setInterval(() => {
        this.gameLoop();
    }, 1000 / FRAME_RATE);
  }

  // called FRAME_RATE times per second
  gameLoop() {
    this.gameObjects.forEach(gameObject => {
      gameObject.update();
    });
  }



}