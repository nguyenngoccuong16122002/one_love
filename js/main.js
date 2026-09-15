/* =====================================================
   ENTRY POINT

   Wires DOM references to the feature modules and
   drives the top-level experience flow. No feature
   logic lives here — each module owns its own.
===================================================== */

import { CONFIG } from "./config.js";
import { delay } from "./utils.js";
import { initAudioSystem, startAudioTransition, duckMainMusic, warmMainMusic } from "./audio.js";
import { startFallingText } from "./falling-text.js";
import { playMessageSequence } from "./message-sequence.js";
import { showFinalScene } from "./final-scene.js";


/* =====================================================
   DOM
===================================================== */

const startScreen =
  document.getElementById(
    "start-screen"
  );

const startButton =
  document.getElementById(
    "start-btn"
  );

const fallingContainer =
  document.getElementById(
    "falling-container"
  );

const messageSection =
  document.getElementById(
    "message-section"
  );

const messageElement =
  document.getElementById(
    "message"
  );

const finalSection =
  document.getElementById(
    "final-section"
  );

const finalMessage =
  document.getElementById(
    "final-message"
  );

const finalSubtext =
  document.getElementById(
    "final-subtext"
  );

const flash =
  document.getElementById(
    "flash"
  );

const audioToggle =
  document.getElementById(
    "audio-toggle"
  );


/* =====================================================
   SET CONFIG-DRIVEN TEXT
===================================================== */

finalMessage.textContent =
  CONFIG.finalText;

finalSubtext.textContent =
  CONFIG.finalSubtext;


/* =====================================================
   AUDIO
===================================================== */

initAudioSystem(audioToggle);


/* =====================================================
   START EXPERIENCE
===================================================== */

async function startExperience() {

  /*
   * Hide start screen
   */

  startScreen.style.display =
    "none";


  /*
   * Start falling background
   */

  startFallingText(fallingContainer);


  /*
   * Intro pause
   */

  await delay(500);


  /*
   * Show messages one by one — duck the music for the
   * emotional pause on the very last line
   */

  await playMessageSequence(
    messageElement,
    CONFIG.messages,
    {
      onLastMessage: duckMainMusic
    }
  );


  /*
   * Final scene — warm the music back up as the final
   * text reveals itself (matches the CSS finalText
   * animation delay)
   */

  await showFinalScene({
    messageSection,
    finalSection,
    flashEl: flash,
    onRevealed: () => warmMainMusic(1000, 1400)
  });

}


/* =====================================================
   START BUTTON
===================================================== */

startButton.addEventListener(
  "click",
  () => {

    /*
     * 1. Disable button — prevent double click
     */

    startButton.disabled = true;


    /*
     * 2. Start audio transition
     */

    startAudioTransition();


    /*
     * 3. Start confession animation
     *    (timing unchanged)
     */

    startExperience();

  },
  {
    once: true
  }
);


/* =====================================================
   KEYBOARD
===================================================== */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      if (
        startScreen.style.display !==
        "none"
      ) {

        startButton.click();

      }

    }

  }
);


/* =====================================================
   PREVENT DOUBLE TAP ZOOM
===================================================== */

let lastTouchEnd = 0;

document.addEventListener(
  "touchend",
  event => {

    const now =
      Date.now();

    if (
      now - lastTouchEnd <= 300
    ) {

      event.preventDefault();

    }

    lastTouchEnd = now;

  },
  {
    passive: false
  }
);
