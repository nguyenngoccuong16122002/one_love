/* =====================================================
   SHARED UTILITIES
===================================================== */

export function delay(ms) {

  return new Promise(
    resolve =>
      setTimeout(
        resolve,
        ms
      )
  );

}

export function random(min, max) {

  return (
    Math.random() *
    (max - min) +
    min
  );

}
