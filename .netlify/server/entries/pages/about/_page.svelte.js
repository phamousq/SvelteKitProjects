import { a7 as escape_html, T as pop, Q as push } from "../../../chunks/index.js";
import "clsx";
function _page($$payload, $$props) {
  push();
  let currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  $$payload.out += `<div class="about-page svelte-1nkkice"><h1 class="svelte-1nkkice">About Us</h1> <section class="content svelte-1nkkice"><h2 class="svelte-1nkkice">Welcome to Our Project</h2> <p>This is a demo Svelte application showcasing routing and state management.</p> <h3 class="svelte-1nkkice">Features</h3> <ul class="svelte-1nkkice"><li class="svelte-1nkkice">Dynamic route generation</li> <li class="svelte-1nkkice">State management with Svelte</li> <li class="svelte-1nkkice">Server-side API endpoints</li> <li class="svelte-1nkkice">Responsive design</li></ul></section> <footer class="svelte-1nkkice"><p>© ${escape_html(currentYear)} My Svelte Project. All rights reserved.</p></footer></div>`;
  pop();
}
export {
  _page as default
};
