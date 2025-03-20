import { W as attr, a4 as escape_html, T as pop, Q as push } from "../../../chunks/index.js";
function _page($$payload, $$props) {
  push();
  const zeroPad = (num, places) => String(num).padStart(places, "0");
  let seconds = 0;
  let minutes = Math.floor(seconds / 60);
  let timerSeconds = zeroPad(seconds % 60, 2);
  let timerMinutes = zeroPad(minutes % 60, 2);
  $$payload.out += `<div><h1>Timer</h1> <button>Try it</button> <input type="number"${attr("value", seconds)}> ${escape_html(timerMinutes)}:${escape_html(timerSeconds)}</div>`;
  pop();
}
export {
  _page as default
};
