import "clsx";
import _page$1 from "./projects/_page.svelte.js";
function _page($$payload) {
  $$payload.out += `<div class="home svelte-av8mn8"><h1 class="svelte-av8mn8">Welcome to SvelteKit</h1> <p class="svelte-av8mn8">This is a demo application showcasing SvelteKit routing and layouts.</p> `;
  _page$1($$payload);
  $$payload.out += `<!----></div>`;
}
export {
  _page as default
};
