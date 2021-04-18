import Phaser from "phaser";

const supporters = ["winterismute", "veon", "vivaladav"];

var game;
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  transparent: true,
  scene: {
    init: init,
    preload: preload,
    create: create,
  },
};

window.addEventListener("load", () => {
  game = new Phaser.Game(config);
});

/**
 * @type {Phaser.Scene}
 */
let scn;

function init() {}

function preload() {
  scn = game.scene.getScene("default");
}

function create() {
  const circleColor = 0xfefefe;
  const bgColor = 0xf56954;
  const rectColor = 0x052b49;
  const size = 512;

  /**
   * @type {Phaser.GameObjects.Graphics}
   */
  const bgRect = this.add.graphics();
  bgRect.beginPath();
  bgRect.fillStyle(bgColor);
  bgRect.fillRect(-size / 2, -size / 2, size, size);
  bgRect.setPosition(size / 2, size / 2);

  bgRect.closePath();

  const circle = this.add.graphics();
  circle.fillStyle(circleColor);
  circle.fillCircle(0, 0, (size * 0.43) / 2);
  circle.setPosition(size * 0.58, size * 0.44);
  circle.closePath();

  /**
   * @type {Phaser.GameObjects.Graphics}
   */
  const rect = this.add.graphics();
  rect.fillStyle(rectColor);
  rect.fillRect(0, 0, 0.1 * size, 0.58 * size);
  rect.setPosition(0.21 * size, 0.21 * size);
  rect.closePath();

  const animate = () => {
    rect.setScale(0, 0);
    // bgRect animation
    bgRect.setScale(0);
    bgRect.setAlpha(0);
    scn.add.tween({
      targets: bgRect,
      scaleX: 1,
      scaleY: 1,
      alpha: 1,
      duration: 400,
      ease: "Elastic",
      delay: 200,
      easeParams: [1.1, 0.8],
    });

    // Circle animation
    circle.setScale(0);
    scn.add.tween({
      targets: circle,
      scaleX: 1,
      scaleY: 1,
      duration: 300,
      ease: "Elastic",
      delay: 400,
      easeParams: [1.1, 0.9],
    });

    // rect animation
    scn.add.tween({
      targets: rect,
      scaleX: 1,
      scaleY: 1,
      duration: 300,
      ease: "Elastic",
      easeParams: [1.1, 0.9],
      delay: 500,
    });
  };
  const logoContainer = new Phaser.GameObjects.Container(scn, 0, 0, [
    bgRect,
    rect,
    circle,
  ]);
  const children = logoContainer.getAll();
  children.forEach((c) => {
    c.x -= size / 2;
    c.y -= size / 2;
  });
  logoContainer.setPosition(config.width / 2, config.height / 2);
  logoContainer.addToDisplayList();
  animate();

  const animateContainer = () => {
    scn.add.tween({
      targets: logoContainer,
      scaleX: 0.5,
      scaleY: 0.5,
      duration: 600,
      ease: Phaser.Math.Easing.Quintic.Out,
      delay: 1000,
    });

    scn.add.tween({
      targets: logoContainer,
      duration: 700,
      y: "-=100",
      ease: Phaser.Math.Easing.Quintic.Out,
      delay: 1500,
    });
  };
  animateContainer();

  const supportersContainer = new Phaser.GameObjects.Container(scn);
  // WebFont.load({
  //   google: {
  //     families: ["Freckle Face", "Finger Paint", "Nosifer"],
  //   },
  //   active: function () {
  //     console.log("webfontactivated");
  //   },
  // });
  supporters.forEach((s, idx) => {
    const supporterText = new Phaser.GameObjects.Text(scn, 0, idx * 20, s, {
      align: "center",
      color: 0x0a0a0a,
    });
    supporterText.setFontFamily("Quantico-Bold");
    supporterText.setFontSize(30);
    supporterText.setAlpha(0);
    supporterText.setScale(0);
    supporterText.setPosition(
      config.width / 2 - supporterText.width / 2,
      (idx * (supporterText.height + 50)) / 2
    );
    supportersContainer.add(supporterText);
  });
  supportersContainer.setPosition(0, config.height / 2 + 50);
  supportersContainer.addToDisplayList();

  const animateText = (delay = 0) => {
    setTimeout(() => {
      supportersContainer.getAll().forEach((s, idx) => {
        scn.add.tween({
          targets: s,
          duration: 170,
          alpha: 1,
          scaleX: 1,
          scaleY: 1,
          ease: Phaser.Math.Easing.Quartic.Out,
          delay: idx * 100,
        });
      });
    }, delay);
  };
  animateText(2000);
  // logoContainer.setPosition(200, 200);
}
