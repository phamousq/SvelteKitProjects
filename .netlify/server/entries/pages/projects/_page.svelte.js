import { P as push, S as ensure_array_like, W as attr, X as stringify, Y as escape_html, R as pop } from "../../../chunks/index.js";
function _page($$payload, $$props) {
  push();
  let routes = [];
  const each_array = ensure_array_like(routes);
  $$payload.out += `<div style="padding: 20px;"><ol class="svelte-zqzsig"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let route = each_array[$$index];
    $$payload.out += `<li class="svelte-zqzsig"><a${attr("href", `/${stringify(route)}`)}>${escape_html(route)}</a></li>`;
  }
  $$payload.out += `<!--]--></ol></div>`;
  pop();
}
export {
  _page as default
};
