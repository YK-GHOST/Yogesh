import * as THREE from "three";
import vertex from "../../shaders/vertex.glsl";
import fragment from "../../shaders/fragement.glsl";
import { gsap } from "gsap";
import { each } from "lodash";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { MSDFTextGeometry, MSDFTextMaterial } from "three-msdf-text-utils";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { uniforms } from "three-msdf-text-utils";

import fnt from "../../../fonts/ClashDisplay-Bold-msdf.fnt";
import png from "../../../fonts/ClashDisplay-Bold.png";

export default class Canvas {
  constructor() {
    this.createScene();
    this.createCamera();
    this.createRenderer();

    this.onResize();

    this.time = 0.0;

    this.scroll = {
      x: 0,
      y: 0,
    };
  }

  createScene() {
    this.scene = new THREE.Scene();
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      100
    );

    this.camera.position.set(0, 0, -2);
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.documentElement.appendChild(this.renderer.domElement);

    this.createMesh();
  }

  createMesh() {
    this.geometry = new THREE.PlaneGeometry(1, 1);

    // this.uniforms = {
    //   uResolution: new THREE.Uniform(new THREE.Vector2()),
    //   uMouse: new THREE.Uniform(new THREE.Vector2()),
    // };

    // this.material = new THREE.ShaderMaterial({
    //   uniforms: this.uniforms,
    //   vertexShader: vertex,
    //   fragmentShader: fragment,
    //   side: THREE.DoubleSide,
    // });

    // this.mesh = new THREE.Mesh(this.geometry, this.material);
    // this.mesh.scale.x = 2;

    // this.scene.add(this.mesh);

    Promise.all([loadFontAtlas(png), loadFont(fnt)]).then(([atlas, font]) => {
      const geometry = new MSDFTextGeometry({
        text: "YOGESH",
        font: font.data,
      });

      // const material = new MSDFTextMaterial();

      const material = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        defines: {
          IS_SMALL: false,
        },
        extensions: {
          derivatives: true,
        },
        uniforms: {
          // Common
          ...uniforms.common,

          // Rendering
          ...uniforms.rendering,

          // Strokes
          ...uniforms.strokes,
        },
        vertexShader: vertex,
        fragmentShader: fragment,
      });

      material.uniforms.uMap.value = atlas;

      const mesh = new THREE.Mesh(geometry, material);

      this.scene.add(mesh);
      mesh.scale.set(-0.01, -0.01, 0.01);
    });

    function loadFontAtlas(path) {
      const promise = new Promise((resolve, reject) => {
        const loader = new THREE.TextureLoader();
        loader.load(path, resolve);
      });

      return promise;
    }

    function loadFont(path) {
      console.log(path);
      const promise = new Promise((resolve, reject) => {
        const loader = new FontLoader();
        loader.load(path, resolve);
      });

      return promise;
    }

    this.createComposer();
  }

  createComposer() {
    this.composer = new EffectComposer(this.renderer);

    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);

    this.createControls();
  }

  createControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enablePan = false;
    this.controls.enableZoom = false;
  }

  onResize() {
    window.addEventListener("scroll", (e) => {
      // console.log(window.scrollY / 100);
    });

    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    });
  }

  update() {
    this.controls.update();
    // this.mesh.rotation.x += 0.01;
    this.composer.render();
  }
}
