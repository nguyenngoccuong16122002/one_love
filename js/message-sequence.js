/* =====================================================
   MESSAGE SEQUENCE

   Renders each line as staggered word-by-word reveal,
   holds it on screen, then dissolves it as one block
   before the next line arrives.
===================================================== */

import { delay } from "./utils.js";


/* =====================================================
   HOLD DURATION

   Longer lines need more time to actually be read, not
   just displayed — scale the on-screen hold by word
   count instead of using one flat duration for every
   line.
===================================================== */

const HOLD_BASE = 2200;
const HOLD_PER_WORD = 150;
const HOLD_MIN = 2200;
const HOLD_MAX = 4500;

function getHoldDuration(wordCount) {

  const raw =
    HOLD_BASE + wordCount * HOLD_PER_WORD;

  return Math.min(
    HOLD_MAX,
    Math.max(HOLD_MIN, raw)
  );

}

async function showMessage(messageEl, text) {

  /*
   * Remove old animation
   */

  messageEl.classList.remove(
    "message-leave",
    "message-shimmer"
  );


  /*
   * Force reflow
   */

  void messageEl.offsetWidth;


  /*
   * Split into words — each one gets its own
   * staggered reveal via the "word" span + --i
   */

  const words =
    text.split(" ");

  messageEl.innerHTML =
    words
      .map(
        (word, i) =>
          `<span class="word" style="--i:${i}">${word}</span>`
      )
      .join(" ");


  /*
   * Soft glow breath once the words have landed
   */

  const wordsRevealedAt =
    (words.length - 1) * 60 + 700;

  setTimeout(
    () => {

      messageEl.classList.add(
        "message-shimmer"
      );

    },
    wordsRevealedAt
  );


  /*
   * Stay on screen — longer for longer lines
   */

  await delay(getHoldDuration(words.length));


  /*
   * Leave
   */

  messageEl.classList.remove(
    "message-shimmer"
  );

  void messageEl.offsetWidth;

  messageEl.classList.add(
    "message-leave"
  );


  /*
   * Wait for leave animation
   */

  await delay(850);

}


/* =====================================================
   PLAY THE WHOLE SEQUENCE
===================================================== */

export async function playMessageSequence(messageEl, messages, { onLastMessage } = {}) {

  for (
    const text
    of messages
  ) {

    if (
      onLastMessage &&
      text === messages[messages.length - 1]
    ) {

      onLastMessage();

    }

    await showMessage(messageEl, text);

  }

}
