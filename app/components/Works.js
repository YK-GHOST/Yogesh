import Component from "../classes/Components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default class Works extends Component {
  constructor() {
    super({
      element: ".works",
      elements: {
        worksLink: ".works",
      },
    });

    this.createAnimation();
    console.log("works");
  }

  createAnimation() {}
}
