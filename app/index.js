import Cursor from "./Cursor/Cursor";
import Works from "./components/Works";
import Canvas from "./components/Canvas";

import Navigation from "./components/Navigation";
class App {
  constructor() {
    this.createCursor();

    this.createNavigation();
    this.createPages();
    this.createCanvas();

    this.update();
  }

  createCursor() {
    return new Cursor();
  }

  createNavigation() {
    this.Navigation = new Navigation();
  }

  createPages() {
    this.works = new Works();
  }

  createCanvas() {
    // this.canvas = new Canvas();
  }

  update() {
    if (this.canvas && this.canvas.update) {
      this.canvas.update();
    }
    this.frame = window.requestAnimationFrame(this.update.bind(this));
  }
}

new App();
