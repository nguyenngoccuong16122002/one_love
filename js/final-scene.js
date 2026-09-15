/* =====================================================
   FINAL SCENE

   Flash + sparkle burst, then the heart/final-message
   reveal. Knows nothing about audio — callers can hook
   the reveal moment via onRevealed.
===================================================== */

import { delay, random } from "./utils.js";

function createSparkles() {

  const amount =
    window.innerWidth < 600
      ? 50
      : 75;


  for (
    let i = 0;
    i < amount;
    i++
  ) {

    const sparkle =
      document.createElement(
        "div"
      );

    sparkle.className =
      "sparkle";


    /*
     * Start from center
     */

    sparkle.style.left =
      "50vw";

    sparkle.style.top =
      "50vh";


    /*
     * Random direction
     */

    const angle =
      Math.random() *
      Math.PI *
      2;


    const distance =
      random(100, 450);


    sparkle.style.setProperty(
      "--x",
      Math.cos(angle) *
      distance +
      "px"
    );


    sparkle.style.setProperty(
      "--y",
      Math.sin(angle) *
      distance +
      "px"
    );


    /*
     * Random size
     */

    const size =
      random(3, 8);

    sparkle.style.width =
      size + "px";

    sparkle.style.height =
      size + "px";


    /*
     * Random delay
     */

    sparkle.style.animationDelay =
      random(0, .25) + "s";


    document.body.appendChild(
      sparkle
    );


    /*
     * Cleanup
     */

    setTimeout(
      () => {

        sparkle.remove();

      },
      1800
    );

  }

}

function createFlash(flashEl) {

  flashEl.classList.remove(
    "flash-active"
  );


  void flashEl.offsetWidth;


  flashEl.classList.add(
    "flash-active"
  );

}


/* =====================================================
   PUBLIC ENTRY POINT
===================================================== */

export async function showFinalScene({ messageSection, finalSection, flashEl, onRevealed }) {

  /*
   * Hide message
   */

  messageSection.style.display =
    "none";


  /*
   * Flash
   */

  createFlash(flashEl);


  /*
   * Sparkle explosion
   */

  createSparkles();


  /*
   * Tiny pause
   */

  await delay(250);


  /*
   * Show heart
   */

  finalSection.style.display =
    "flex";


  /*
   * Let the caller react to the reveal
   * (e.g. warm the music back up)
   */

  onRevealed?.();

}
