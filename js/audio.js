/* =====================================================
   AUDIO SYSTEM

   Owns all audio state privately (introAudio, mainAudio,
   activeAudio, isMuted, introAudibleAt) — nothing here
   leaks to the global scope. Other modules only talk to
   this file through the exported functions below.
===================================================== */

import { AUDIO_CONFIG } from "./config.js";


/* =====================================================
   AUDIO ELEMENTS
===================================================== */

const introAudio = new Audio(AUDIO_CONFIG.intro.src);
introAudio.loop = true;
introAudio.preload = "auto";
introAudio.volume = 0;

const mainAudio = new Audio(AUDIO_CONFIG.main.src);
mainAudio.loop = true;
mainAudio.preload = "auto";
mainAudio.volume = 0;

let activeAudio = null;
let isMuted = false;
let introAudibleAt = null;


/* =====================================================
   FADE HELPERS
===================================================== */

function fadeAudio(audio, targetVolume, duration) {

  return new Promise(resolve => {

    if (audio._fadeTimer) {
      clearInterval(audio._fadeTimer);
      audio._fadeTimer = null;
    }

    const steps = Math.max(1, Math.round(duration / 50));
    const stepTime = duration / steps;
    const stepAmount = (targetVolume - audio.volume) / steps;

    let count = 0;

    audio._fadeTimer = setInterval(() => {

      count++;

      const next = audio.volume + stepAmount;

      audio.volume = Math.min(1, Math.max(0, next));

      if (count >= steps) {

        clearInterval(audio._fadeTimer);
        audio._fadeTimer = null;

        audio.volume = Math.min(1, Math.max(0, targetVolume));

        resolve();

      }

    }, stepTime);

  });

}

function fadeOutAudio(audio, duration = AUDIO_CONFIG.fadeDuration) {

  return fadeAudio(audio, 0, duration).then(() => {

    audio.pause();

  });

}

function fadeInAudio(audio, targetVolume, duration = AUDIO_CONFIG.fadeDuration) {

  return fadeAudio(audio, targetVolume, duration);

}

function safePlay(audio) {

  try {

    const playPromise = audio.play();

    if (playPromise && typeof playPromise.catch === "function") {

      playPromise.catch(() => {
        /* Autoplay/playback blocked — fail silently, no page error */
      });

    }

  } catch (err) {
    /* Playback unsupported — fail silently */
  }

}

function playIntro() {

  activeAudio = introAudio;

  if (introAudibleAt === null) {
    introAudibleAt = Date.now();
  }

  safePlay(introAudio);

  fadeInAudio(introAudio, AUDIO_CONFIG.intro.volume, 800);

}

function playMainMusic() {

  activeAudio = mainAudio;

  safePlay(mainAudio);

  fadeInAudio(mainAudio, AUDIO_CONFIG.main.volume, AUDIO_CONFIG.fadeDuration);

}


/* =====================================================
   AUDIO TRANSITION (intro -> main)

   The intro may already have been audible for a while
   (real autoplay succeeded, or it was unmuted on an
   earlier interaction) — or it may not have started at
   all yet. Either way, guarantee it gets at least a
   short MIN_INTRO_HOLD window of audible time before
   crossfading into the main track.
===================================================== */

const MIN_INTRO_HOLD = 700;

export function startAudioTransition() {

  const introHasStarted =
    activeAudio === introAudio &&
    !introAudio.paused;

  if (!introHasStarted) {

    playIntro();

  } else if (introAudio.muted) {

    introAudio.muted = false;

  }

  /*
   * Start the main track now too, silently, using the
   * same click gesture — Safari/iOS requires play() to
   * happen inside the gesture, not inside a later timer.
   */

  activeAudio = mainAudio;
  mainAudio.volume = 0;
  safePlay(mainAudio);

  const elapsed =
    introAudibleAt === null
      ? 0
      : Date.now() - introAudibleAt;

  const introHoldTime =
    Math.max(0, MIN_INTRO_HOLD - elapsed);

  setTimeout(
    () => {

      fadeOutAudio(introAudio, AUDIO_CONFIG.fadeDuration);

      fadeInAudio(mainAudio, AUDIO_CONFIG.main.volume, AUDIO_CONFIG.fadeDuration);

    },
    introHoldTime
  );

}


/* =====================================================
   EMOTIONAL BEATS

   Called by the message sequence / final scene at the
   right narrative moments — they don't need to know
   anything about how the audio is implemented.
===================================================== */

export function duckMainMusic() {

  fadeAudio(mainAudio, AUDIO_CONFIG.main.duckVolume, 900);

}

export function warmMainMusic(delayMs = 1000, duration = 1400) {

  setTimeout(
    () => {

      fadeInAudio(mainAudio, AUDIO_CONFIG.main.volume, duration);

    },
    delayMs
  );

}


/* =====================================================
   INTRO AUTOPLAY ATTEMPT

   Real unmuted autoplay is blocked by almost every
   browser without a prior user gesture. As a fallback,
   start the intro MUTED right away (browsers always
   allow muted autoplay) so it's already running the
   instant the page opens — then unmute it on the very
   first interaction anywhere on the page, with no new
   gesture required since playback already started.

   Triggered on window "load" (all assets — images,
   audio metadata, etc. — finished loading) rather than
   as soon as the script runs.
===================================================== */

function attemptIntroAutoplay() {

  try {

    const playPromise = introAudio.play();

    if (playPromise && typeof playPromise.then === "function") {

      playPromise
        .then(() => {

          playIntro();

        })
        .catch(() => {

          introAudio.muted = true;
          introAudio.volume = 0;

          safePlay(introAudio);

        });

    }

  } catch (err) {
    /* Autoplay unsupported — safe to ignore */
  }

}


/* =====================================================
   REVEAL INTRO ON FIRST INTERACTION

   If the browser blocked real autoplay, the intro is
   already playing muted in the background (see above).
   The instant the user touches the page in any way —
   not just the start button — unmute it so it feels
   like it was playing all along.
===================================================== */

function revealIntroOnFirstInteraction() {

  if (activeAudio) {
    return;
  }

  if (introAudio.paused) {
    safePlay(introAudio);
  }

  introAudio.muted = false;

  activeAudio = introAudio;

  if (introAudibleAt === null) {
    introAudibleAt = Date.now();
  }

  fadeInAudio(introAudio, AUDIO_CONFIG.intro.volume, 500);

}


/* =====================================================
   MUTE TOGGLE

   Toggling .muted never pauses playback — the track
   keeps advancing silently, so unmuting always resumes
   exactly where the music already is.
===================================================== */

function createMuteToggleController(audioToggleEl) {

  function updateAudioToggleUI() {

    audioToggleEl.textContent =
      isMuted ? "🔇" : "🔊";

    audioToggleEl.classList.toggle(
      "is-muted",
      isMuted
    );

    audioToggleEl.setAttribute(
      "aria-pressed",
      String(isMuted)
    );

  }

  audioToggleEl.addEventListener(
    "click",
    () => {

      isMuted = !isMuted;

      introAudio.muted = isMuted;
      mainAudio.muted = isMuted;

      updateAudioToggleUI();

    }
  );

}


/* =====================================================
   PUBLIC ENTRY POINT
===================================================== */

export function initAudioSystem(audioToggleEl) {

  createMuteToggleController(audioToggleEl);

  window.addEventListener(
    "load",
    attemptIntroAutoplay
  );

  [
    "pointerdown",
    "touchstart",
    "keydown"
  ].forEach(eventName => {

    document.addEventListener(
      eventName,
      revealIntroOnFirstInteraction,
      {
        once: true,
        passive: true
      }
    );

  });

}
