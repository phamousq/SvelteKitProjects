import { a7 as escape_html } from "../../chunks/index.js";
import "clsx";
import _page$1 from "./projects/_page.svelte.js";
function _page($$payload) {
  let title = "Welcome to SvelteKit";
  $$payload.out += `<div class="home svelte-av8mn8"><h1 class="svelte-av8mn8">${escape_html(title)}</h1> <p class="svelte-av8mn8">This is a demo application showcasing SvelteKit routing and layouts.</p> `;
  _page$1($$payload);
  $$payload.out += `<!----></div>`;
}
export {
  _page as default
};
