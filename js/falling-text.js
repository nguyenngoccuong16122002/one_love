/* =====================================================
   FALLING BACKGROUND TEXT
===================================================== */

import { CONFIG } from "./config.js";
import { random } from "./utils.js";

function createFallingText(container) {

  const text =
    document.createElement(
      "div"
    );

  text.className =
    "falling-text";


  /*
   * Random message
   */

  const index =
    Math.floor(
      Math.random() *
      CONFIG.fallingMessages.length
    );

  text.textContent =
    CONFIG.fallingMessages[index];


  /*
   * Position
   */

  text.style.left =
    random(0, 95) + "vw";


  /*
   * Size
   */

  text.style.fontSize =
    random(13, 21) + "px";


  /*
   * Duration
   */

  const duration =
    random(5, 10);

  text.style.animationDuration =
    duration + "s";


  /*
   * Delay
   */

  text.style.animationDelay =
    random(0, 1.5) + "s";


  /*
   * Add
   */

  container.appendChild(
    text
  );


  /*
   * Remove
   */

  setTimeout(
    () => {

      text.remove();

    },
    (duration + 2) * 1000
  );

}


/* =====================================================
   FALLING TEXT LOOP
===================================================== */

let fallingInterval = null;

export function startFallingText(container) {

  if (fallingInterval) {
    return;
  }


  /*
   * Initial texts
   */

  for (
    let i = 0;
    i < 15;
    i++
  ) {

    setTimeout(
      () => createFallingText(container),
      i * 180
    );

  }


  /*
   * Continue
   */

  fallingInterval =
    setInterval(
      () => createFallingText(container),
      350
    );

}
