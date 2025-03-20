import { Q as push, V as fallback, W as attr, X as clsx, Y as slot, Z as bind_props, T as pop, _ as sanitize_props, $ as invalid_default_snippet, a0 as rest_props, a1 as spread_props, a2 as sanitize_slots, a3 as spread_attributes, a4 as escape_html, a5 as head, a6 as getContext, a7 as store_get, a8 as unsubscribe_stores, a9 as ensure_array_like } from "../../chunks/index.js";
import { g as getComponentClasses, a as getComponentSettings, s as setButtonGroup, b as settings, c as getSettings, B as Button, I as Icon, h as html } from "../../chunks/TextField.svelte_svelte_type_style_lang.js";
import { cls, createHeadSnippet } from "@layerstack/tailwind";
import { isVisibleInScrollParent, scrollIntoView as scrollIntoView$1 } from "@layerstack/utils";
import "clsx";
import "@layerstack/utils/env";
import "@layerstack/utils/object";
import "@layerstack/utils/serialize";
import "@layerstack/utils/rollup";
import "@layerstack/utils/date";
import "@layerstack/utils/dateRange";
import { s as slide } from "../../chunks/index4.js";
import "@layerstack/utils/number";
import { isActive, url } from "@layerstack/utils/routing";
import "@layerstack/utils/array";
import { g as goto } from "../../chunks/client.js";
const scrollIntoView = (node, options) => {
  function update(options2) {
    const condition = typeof options2?.condition === "boolean" ? options2.condition : options2?.condition(node);
    const needed = options2?.onlyIfNeeded ? !isVisibleInScrollParent(node) : true;
    if (condition && needed) {
      setTimeout(() => {
        scrollIntoView$1(node);
      }, options2?.delay ?? 0);
    }
  }
  if (options?.initial !== false) {
    update(options);
  }
  return { update };
};
function Popover($$payload, $$props) {
  push();
  let open = fallback($$props["open"], false);
  let placement = fallback($$props["placement"], void 0);
  let className = fallback($$props["class"], void 0);
  let style = fallback($$props["style"], void 0);
  let autoPlacement = fallback($$props["autoPlacement"], false);
  let anchorEl = fallback($$props["anchorEl"], void 0);
  let offset = fallback($$props["offset"], 0);
  let padding = fallback($$props["padding"], 4);
  let matchWidth = fallback($$props["matchWidth"], false);
  let resize = fallback($$props["resize"], false);
  const settingsClasses = getComponentClasses("Popover");
  function close(reason = "unknown") {
    if (open) {
      open = false;
    }
  }
  if (open) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr("class", clsx(cls("Popover absolute z-50 outline-hidden", settingsClasses.root, className)))}${attr("style", style)} tabindex="-1"><!---->`;
    slot($$payload, $$props, "default", { close: () => close() }, null);
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    open,
    placement,
    class: className,
    style,
    autoPlacement,
    anchorEl,
    offset,
    padding,
    matchWidth,
    resize
  });
  pop();
}
function Menu($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  let open = fallback($$props["open"], false);
  let offset = fallback($$props["offset"], 4);
  let matchWidth = fallback($$props["matchWidth"], false);
  let placement = fallback($$props["placement"], matchWidth ? "bottom-start" : "bottom");
  let autoPlacement = fallback($$props["autoPlacement"], false);
  let resize = fallback($$props["resize"], false);
  let disableTransition = fallback($$props["disableTransition"], false);
  let transition = fallback($$props["transition"], void 0);
  let transitionParams = fallback($$props["transitionParams"], void 0);
  let explicitClose = fallback($$props["explicitClose"], false);
  let moveFocus = fallback($$props["moveFocus"], true);
  let classes = fallback($$props["classes"], () => ({}), true);
  const { classes: settingsClasses, defaults } = getComponentSettings("Menu");
  let menuItemsEl = fallback($$props["menuItemsEl"], void 0);
  transition ?? defaults.transition ?? (disableTransition ? (node, params) => ({}) : slide);
  transitionParams ?? defaults.transitionParams ?? {};
  Popover($$payload, {
    placement,
    autoPlacement,
    offset,
    matchWidth,
    resize,
    open,
    class: cls("Menu", "bg-surface-100 rounded-sm shadow-sm border overflow-auto", settingsClasses.root, classes.root, $$sanitized_props.class),
    style: $$sanitized_props.style,
    children: invalid_default_snippet,
    $$slots: {
      default: ($$payload2, { close }) => {
        $$payload2.out += `<menu${attr("class", clsx(cls("menu-items outline-hidden max-h-screen", settingsClasses.menu, classes.menu)))}><!---->`;
        slot($$payload2, $$props, "default", { close }, null);
        $$payload2.out += `<!----></menu>`;
      }
    }
  });
  bind_props($$props, {
    open,
    offset,
    matchWidth,
    placement,
    autoPlacement,
    resize,
    disableTransition,
    transition,
    transitionParams,
    explicitClose,
    moveFocus,
    classes,
    menuItemsEl
  });
  pop();
}
function MenuItem($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "icon",
    "scrollIntoView",
    "disabled",
    "selected",
    "classes"
  ]);
  push();
  let actions;
  let icon = fallback($$props["icon"], void 0);
  let scrollIntoView$12 = fallback($$props["scrollIntoView"], false);
  let disabled = fallback($$props["disabled"], false);
  let selected = fallback($$props["selected"], false);
  let classes = fallback(
    $$props["classes"],
    () => ({
      root: "text-sm gap-3",
      icon: "text-surface-content/50",
      selected: "font-semibold [:not(.group:hover)>&]:bg-surface-content/5"
    }),
    true
  );
  const settingsClasses = getComponentClasses("MenuItem");
  let scrollOptions;
  setButtonGroup(void 0);
  settings({ ...getSettings(), components: {} });
  scrollOptions = typeof scrollIntoView$12 === "boolean" ? { condition: scrollIntoView$12 } : scrollIntoView$12;
  actions = (node) => [scrollIntoView(node, scrollOptions)];
  Button($$payload, spread_props([
    {
      variant: "none",
      icon,
      classes,
      fullWidth: true,
      actions,
      disabled
    },
    $$restProps,
    {
      class: cls("MenuItem", "text-left items-center p-2 hover:bg-surface-content/5 rounded-sm duration-75", selected && classes?.selected, settingsClasses.root, classes?.root, $$sanitized_props.class),
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  bind_props($$props, {
    icon,
    scrollIntoView: scrollIntoView$12,
    disabled,
    selected,
    classes
  });
  pop();
}
function Toggle($$payload, $$props) {
  push();
  let on = fallback($$props["on"], false);
  function toggle() {
    on = !on;
  }
  function toggleOn() {
    on = true;
  }
  function toggleOff() {
    on = false;
  }
  $$payload.out += `<!---->`;
  slot($$payload, $$props, "default", { on, toggle, toggleOn, toggleOff }, null);
  $$payload.out += `<!---->`;
  bind_props($$props, { on });
  pop();
}
function NavItem($$payload, $$props) {
  const $$slots = sanitize_slots($$props);
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "currentUrl",
    "path",
    "text",
    "icon",
    "classes"
  ]);
  push();
  let isPathActive;
  let currentUrl = $$props["currentUrl"];
  let path = $$props["path"];
  let text = fallback($$props["text"], "");
  let icon = fallback($$props["icon"], null);
  let classes = fallback($$props["classes"], () => ({}), true);
  const settingsClasses = getComponentClasses("NavItem");
  const { showDrawer } = getSettings();
  isPathActive = path ? isActive(currentUrl, path) : false;
  $$payload.out += `<a${spread_attributes(
    {
      ...$$restProps,
      href: url(currentUrl, path),
      class: clsx(cls(
        "NavItem",
        "flex items-center",
        settingsClasses.root,
        isPathActive && [
          "is-active",
          settingsClasses.active,
          classes.active
        ],
        classes.root,
        $$sanitized_props.class
      ))
    },
    null
  )}>`;
  if ($$slots.avatar) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "avatar", {}, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (icon) {
    $$payload.out += "<!--[-->";
    Icon($$payload, {
      data: icon,
      class: cls("mr-3 shrink-0", settingsClasses.icon),
      classes: classes.icon
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> ${escape_html(text)} <!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></a>`;
  bind_props($$props, { currentUrl, path, text, icon, classes });
  pop();
}
function ThemeInit($$payload, $$props) {
  push();
  const darkThemes = getSettings().themes?.dark ?? [];
  let headSnippet = createHeadSnippet(darkThemes);
  head($$payload, ($$payload2) => {
    $$payload2.out += `${html(headSnippet)}`;
  });
  pop();
}
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function _layout($$payload, $$props) {
  push();
  var $$store_subs;
  settings({
    themes: { light: ["light"], dark: ["dark"] },
    components: {
      Button: {
        // same as <Button class="flex-2">
        classes: "flex-2",
        // All component that wrap Button will also use this variant by default,
        variant: "outline"
      },
      Field: {
        // All components based on Field will use this as well.
        labelPlacement: "top"
      },
      TextField: {
        classes: {
          // same as <TextField classes={{ container: '...' }}>
          container: "hover:shadow-none group-focus-within:shadow-none"
        }
      }
    }
  });
  let { children } = $$props;
  let routes = [];
  $$payload.out += `<main class="app">`;
  ThemeInit($$payload);
  $$payload.out += `<!----> <nav class="bg-orange-300 grid grid-cols-3 gap-3 items-center justify-items-start svelte-1ruyfmk">`;
  NavItem($$payload, {
    currentUrl: store_get($$store_subs ??= {}, "$page", page).url,
    path: "/",
    children: ($$payload2) => {
      $$payload2.out += `<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">SvelteKit Projects</span>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Toggle($$payload, {
    children: invalid_default_snippet,
    $$slots: {
      default: ($$payload2, { on: open, toggle, toggleOff }) => {
        Button($$payload2, {
          children: ($$payload3) => {
            $$payload3.out += `<!---->Nav `;
            Menu($$payload3, {
              open,
              matchWidth: true,
              children: ($$payload4) => {
                const each_array = ensure_array_like(routes);
                MenuItem($$payload4, {
                  onclick: () => goto(),
                  children: ($$payload5) => {
                    $$payload5.out += `<!---->Home`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!----> <!--[-->`;
                for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                  let route = each_array[$$index];
                  MenuItem($$payload4, {
                    onclick: () => goto(),
                    children: ($$payload5) => {
                      $$payload5.out += `<!---->${escape_html(route.charAt(0).toUpperCase() + route.slice(1))}`;
                    },
                    $$slots: { default: true }
                  });
                }
                $$payload4.out += `<!--]-->`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          },
          $$slots: { default: true }
        });
      }
    }
  });
  $$payload.out += `<!----></nav> <main>`;
  children?.($$payload);
  $$payload.out += `<!----></main></main>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _layout as default
};
