import { each } from "lodash";

export default class Cursor {
  constructor() {
    this.element = document.getElementById("circularcursor");
    this.hoveredElement = document.querySelectorAll('[data-animation="hover"]');

    this.create();
  }

  create() {
    document.addEventListener("mousemove", (e) => {
      this.element.style.left = `${e.clientX}px`;
      this.element.style.top = `${e.clientY}px`;
    });

    each(this.hoveredElement, (element) => {
      element.addEventListener("mouseover", (e) => {
        if (e.target.classList.contains("btn-nav"));
        {
          this.element.style.mixBlendMode = "difference";
          this.element.style.transform = "scale(3)";
          this.element.style.background = "#fff";
        }
      });
    });

    each(this.hoveredElement, (element) => {
      element.addEventListener("mouseout", (e) => {
        if (e.target.classList.contains("btn-nav"));
        {
          this.element.style.mixBlendMode = "none";
          this.element.style.transform = "scale(1)";
          this.element.style.background = "none";
        }
      });
    });
  }
}
