import Cursor from "./Cursor/Cursor";
import Works from "./components/Works";

import Navigation from "./components/Navigation";
class App {
  constructor() {
    this.createCursor();
    this.create();
  }

  createCursor() {
    return new Cursor();
  }

  create() {
    this.Navigation = new Navigation();
    this.works = new Works();
  }
}

new App();
