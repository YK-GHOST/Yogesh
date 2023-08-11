import { gsap } from "gsap";
import Component from "../classes/Components";
import { each } from "lodash";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default class Navigation extends Component {
  constructor() {
    super({
      element: ".navigation",
      elements: {
        navBtn: ".btn-nav",
        navCloseBtn: ".navigation__close",
        navLinks: ".navigation__menu__link",
        navBar: ".navigation__bar",
      },
    });

    this.showNavigation();
    this.addListeners();
    this.createAnimations();
  }

  createAnimations() {
    gsap.set(this.elements.navBar, {
      width: 0,
    });

    this.st = ScrollTrigger.create({
      trigger: "",
      start: "top top",

      pin: true,

      scrub: 1,

      onUpdate: () => {
        this.elements.navBar.style.width = `${
          (window.scrollY / document.documentElement.clientHeight) * 100
        }%`;
      },
    });
  }

  showNavigation() {
    this.timeline = gsap.timeline({ paused: true });

    this.timeline.to(".navigation", {
      left: 0,
      duration: 0.2,
      ease: "power1.inOut",
    });

    this.timeline.from(
      ".navigation__menu > div",
      {
        y: 100,
        duration: 0.8,
        opacity: 0,
        ease: "power1.inOut",
        stagger: 0.1,
      },
      "0.1",
      "-=0.4"
    );

    this.timeline.from(
      ".navigation__socials",
      { y: 100, duration: 0.8, opacity: 0, ease: "power1.inOut" },
      "0.4",
      "-=0.6"
    );

    this.timeline.reverse();

    this.elements.navBtn.addEventListener("click", (e) => {
      this.timeline.reversed(!this.timeline.reversed());
      this.elements.navCloseBtn.classList.toggle("hide");
    });

    this.elements.navCloseBtn.addEventListener("click", (e) => {
      if (e.target || e.target.closest(".navigation")) {
        this.elements.navCloseBtn.classList.toggle("hide");
        this.timeline.reversed(!this.timeline.reversed());
      }
    });
  }

  addListeners() {
    each(this.elements.navLinks, (link) => {
      link.addEventListener("click", this.goToHash.bind(this));
    });
  }

  goToHash(e) {
    this.timeline.reversed(!this.timeline.reversed());
  }
}
