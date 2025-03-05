import {
	V as ensure_array_like,
	W as head,
	X as add_styles,
	Y as attr,
	Z as escape_html,
	T as pop,
	Q as push,
	_ as stringify
} from '../../chunks/index.js';
function _layout($$payload, $$props) {
	push();
	let { children } = $$props;
	let routes = [];
	const each_array = ensure_array_like(routes);
	head($$payload, ($$payload2) => {
		$$payload2.out += `<link href="https://cdn.jsdelivr.net/npm/daisyui@2.11.0/dist/full.css" rel="stylesheet" type="text/css"> <script src="https://cdn.tailwindcss.com"><\/script>`;
	});
	$$payload.out += `<div class="app svelte-1y4cutp"><nav class="svelte-1y4cutp"><div class="flex justify-between items-center"><div class="dropdown"><button class="btn m-1">`;
	{
		$$payload.out += '<!--[!-->';
		$$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-6 w-6 stroke-current"><title>Open Dropdown</title><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`;
	}
	$$payload.out += `<!--]--></button> <ul${add_styles({
		visibility: 'hidden'
	})} class="dropdown-content menu p-2 shadow bg-base-100 rounded-box"><ul><!--[-->`;
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let route = each_array[$$index];
		$$payload.out += `<li><a${attr('href', `/${stringify(route)}`)} class="btn text-slate-300">${escape_html(route.charAt(0).toUpperCase() + route.slice(1))}</a></li>`;
	}
	$$payload.out += `<!--]--></ul></ul></div></div> <div class="nav-content svelte-1y4cutp"><div class="logo svelte-1y4cutp"><a href="/" class="svelte-1y4cutp">SvelteKit Demo</a></div></div> <div class="dropdown"><button class="btn m-1">`;
	{
		$$payload.out += '<!--[!-->';
		$$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-6 w-6 stroke-current"><title>Open Dropdown</title><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
	}
	$$payload.out += `<!--]--></button></div></nav> <main class="svelte-1y4cutp">`;
	children?.($$payload);
	$$payload.out += `<!----></main></div>`;
	pop();
}
export { _layout as default };
