/* =====================================================
   MESSAGE SEQUENCE

   Renders each line as staggered word-by-word reveal,
   holds it on screen, then dissolves it as one block
   before the next line arrives.
===================================================== */

import { delay } from "./utils.js";

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
   * Stay on screen
   */

  await delay(3000);


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
