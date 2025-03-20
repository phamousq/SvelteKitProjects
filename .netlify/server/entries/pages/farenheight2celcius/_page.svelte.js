import { a4 as attr, T as pop, Q as push } from "../../../chunks/index.js";
function _page($$payload, $$props) {
  push();
  let farenheight = 32;
  let celcius = +((farenheight - 32) * 5 / 9).toFixed(2);
  $$payload.out += `<div><h1>Farenheight to Celcius</h1> <p>Farenheight <input type="number"${attr("value", farenheight)}> <input type="range" min="32" max="212"${attr("value", farenheight)}></p> <p>Celcius <input type="number"${attr("value", celcius)}> <input type="range"${attr("min", (32 - 32) * 5 / 9)}${attr("max", (212 - 32) * 5 / 9)}${attr("value", celcius)}></p></div>`;
  pop();
}
export {
  _page as default
};
