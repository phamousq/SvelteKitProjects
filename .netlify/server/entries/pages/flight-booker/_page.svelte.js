import { Y as attr, T as pop, Q as push } from "../../../chunks/index.js";
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  let today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  let arrival = today;
  let departure = today;
  let valid = departure <= arrival && departure >= today;
  $$payload.out += `<div><h1>Flight Booker</h1> <select><option value="one way">One Way</option><option value="round trip">Round Trip</option></select> <div><p>Departure: <input id="arr" type="date"${attr("value", departure)}${attr("style", !valid ? "background-color: red" : "background-color: white")}></p></div> <div><p>Arrival: <input id="dep" type="date"${attr("value", arrival)}${attr("disabled", true, true)}></p></div> <p></p></div>`;
  pop();
}
export {
  _page as default
};
