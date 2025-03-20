import { V as sanitize_props, W as rest_props, Q as push, S as setContext, X as fallback, Y as element, Z as slot, _ as spread_attributes, $ as clsx, a0 as bind_props, T as pop, a1 as copy_payload, a2 as assign_payload, a3 as spread_props, a4 as attr, a5 as sanitize_slots, a6 as getContext, a7 as escape_html, a8 as invalid_default_snippet, a9 as head, aa as store_get, ab as unsubscribe_stores, ac as ensure_array_like, ad as stringify } from "../../chunks/index.js";
import "clsx";
import { s as slide, B as Button$1 } from "../../chunks/Button.js";
import { twMerge, twJoin } from "tailwind-merge";
import * as dom from "@floating-ui/dom";
import { w as writable } from "../../chunks/index3.js";
import { cls, createHeadSnippet } from "@layerstack/tailwind";
import { isVisibleInScrollParent, scrollIntoView as scrollIntoView$1, uniqueId } from "@layerstack/utils";
import { g as getComponentClasses, a as getComponentSettings, s as setButtonGroup, b as settings, c as getSettings, B as Button, h as html, I as Icon } from "../../chunks/Button2.js";
import "../../chunks/TextField.svelte_svelte_type_style_lang.js";
import "@layerstack/utils/object";
import "@layerstack/utils/env";
import "@layerstack/utils/serialize";
import "@layerstack/utils/rollup";
import "@layerstack/utils/date";
import "@layerstack/utils/dateRange";
import "@layerstack/utils/number";
import "@layerstack/utils/routing";
import "@layerstack/utils/array";
import { mdiWhiteBalanceSunny, mdiWeatherNight, mdiUndoVariant, mdiMonitor } from "@mdi/js";
const bgColors = {
  gray: "bg-gray-50 dark:bg-gray-800",
  red: "bg-red-50 dark:bg-gray-800",
  yellow: "bg-yellow-50 dark:bg-gray-800 ",
  green: "bg-green-50 dark:bg-gray-800 ",
  indigo: "bg-indigo-50 dark:bg-gray-800 ",
  purple: "bg-purple-50 dark:bg-gray-800 ",
  pink: "bg-pink-50 dark:bg-gray-800 ",
  blue: "bg-blue-50 dark:bg-gray-800 ",
  light: "bg-gray-50 dark:bg-gray-700",
  dark: "bg-gray-50 dark:bg-gray-800",
  default: "bg-white dark:bg-gray-800",
  dropdown: "bg-white dark:bg-gray-700",
  navbar: "bg-white dark:bg-gray-900",
  navbarUl: "bg-gray-50 dark:bg-gray-800",
  form: "bg-gray-50 dark:bg-gray-700",
  primary: "bg-primary-50 dark:bg-gray-800 ",
  orange: "bg-orange-50 dark:bg-orange-800",
  none: ""
};
function Frame($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "tag",
    "color",
    "rounded",
    "border",
    "shadow",
    "node",
    "use",
    "options",
    "role",
    "transition",
    "params",
    "open"
  ]);
  push();
  const noop = () => {
  };
  setContext("background", true);
  let tag = fallback($$props["tag"], () => $$restProps.href ? "a" : "div", true);
  let color = fallback($$props["color"], "default");
  let rounded = fallback($$props["rounded"], false);
  let border = fallback($$props["border"], false);
  let shadow = fallback($$props["shadow"], false);
  let node = fallback($$props["node"], () => void 0, true);
  let use = fallback($$props["use"], noop);
  let options = fallback($$props["options"], () => ({}), true);
  let role = fallback($$props["role"], () => void 0, true);
  let transition = fallback($$props["transition"], () => void 0, true);
  let params = fallback($$props["params"], () => ({}), true);
  let open = fallback($$props["open"], true);
  const textColors = {
    gray: "text-gray-800 dark:text-gray-300",
    red: "text-red-800 dark:text-red-400",
    yellow: "text-yellow-800 dark:text-yellow-300",
    green: "text-green-800 dark:text-green-400",
    indigo: "text-indigo-800 dark:text-indigo-400",
    purple: "text-purple-800 dark:text-purple-400",
    pink: "text-pink-800 dark:text-pink-400",
    blue: "text-blue-800 dark:text-blue-400",
    light: "text-gray-700 dark:text-gray-300",
    dark: "text-gray-700 dark:text-gray-300",
    default: "text-gray-500 dark:text-gray-400",
    dropdown: "text-gray-700 dark:text-gray-200",
    navbar: "text-gray-700 dark:text-gray-200",
    navbarUl: "text-gray-700 dark:text-gray-400",
    form: "text-gray-900 dark:text-white",
    primary: "text-primary-800 dark:text-primary-400",
    orange: "text-orange-800 dark:text-orange-400",
    none: ""
  };
  const borderColors = {
    gray: "border-gray-300 dark:border-gray-800 divide-gray-300 dark:divide-gray-800",
    red: "border-red-300 dark:border-red-800 divide-red-300 dark:divide-red-800",
    yellow: "border-yellow-300 dark:border-yellow-800 divide-yellow-300 dark:divide-yellow-800",
    green: "border-green-300 dark:border-green-800 divide-green-300 dark:divide-green-800",
    indigo: "border-indigo-300 dark:border-indigo-800 divide-indigo-300 dark:divide-indigo-800",
    purple: "border-purple-300 dark:border-purple-800 divide-purple-300 dark:divide-purple-800",
    pink: "border-pink-300 dark:border-pink-800 divide-pink-300 dark:divide-pink-800",
    blue: "border-blue-300 dark:border-blue-800 divide-blue-300 dark:divide-blue-800",
    light: "border-gray-500 divide-gray-500",
    dark: "border-gray-500 divide-gray-500",
    default: "border-gray-200 dark:border-gray-700 divide-gray-200 dark:divide-gray-700",
    dropdown: "border-gray-100 dark:border-gray-600 divide-gray-100 dark:divide-gray-600",
    navbar: "border-gray-100 dark:border-gray-700 divide-gray-100 dark:divide-gray-700",
    navbarUl: "border-gray-100 dark:border-gray-700 divide-gray-100 dark:divide-gray-700",
    form: "border-gray-300 dark:border-gray-700 divide-gray-300 dark:divide-gray-700",
    primary: "border-primary-500 dark:border-primary-200  divide-primary-500 dark:divide-primary-200 ",
    orange: "border-orange-300 dark:border-orange-800 divide-orange-300 dark:divide-orange-800",
    none: ""
  };
  let divClass;
  color = color ?? "default";
  setContext("color", color);
  divClass = twMerge(bgColors[color], textColors[color], rounded && "rounded-lg", border && "border", borderColors[color], shadow && "shadow-md", $$sanitized_props.class);
  if (transition && open) {
    $$payload.out += "<!--[-->";
    element(
      $$payload,
      tag,
      () => {
        $$payload.out += `${spread_attributes(
          {
            role,
            ...$$restProps,
            class: clsx(divClass)
          },
          null
        )}`;
      },
      () => {
        $$payload.out += `<!---->`;
        slot($$payload, $$props, "default", {}, null);
        $$payload.out += `<!---->`;
      }
    );
  } else {
    $$payload.out += "<!--[!-->";
    if (open) {
      $$payload.out += "<!--[-->";
      element(
        $$payload,
        tag,
        () => {
          $$payload.out += `${spread_attributes(
            {
              role,
              ...$$restProps,
              class: clsx(divClass)
            },
            null
          )}`;
        },
        () => {
          $$payload.out += `<!---->`;
          slot($$payload, $$props, "default", {}, null);
          $$payload.out += `<!---->`;
        }
      );
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    tag,
    color,
    rounded,
    border,
    shadow,
    node,
    use,
    options,
    role,
    transition,
    params,
    open
  });
  pop();
}
function Popper($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "activeContent",
    "arrow",
    "offset",
    "placement",
    "trigger",
    "triggeredBy",
    "reference",
    "strategy",
    "open",
    "yOnly",
    "middlewares"
  ]);
  push();
  let middleware;
  let activeContent = fallback($$props["activeContent"], false);
  let arrow = fallback($$props["arrow"], true);
  let offset = fallback($$props["offset"], 8);
  let placement = fallback($$props["placement"], "top");
  let trigger = fallback($$props["trigger"], "hover");
  let triggeredBy = fallback($$props["triggeredBy"], () => void 0, true);
  let reference = fallback($$props["reference"], () => void 0, true);
  let strategy = fallback($$props["strategy"], "absolute");
  let open = fallback($$props["open"], false);
  let yOnly = fallback($$props["yOnly"], false);
  let middlewares = fallback($$props["middlewares"], () => [dom.flip(), dom.shift()], true);
  let referenceEl;
  let floatingEl;
  let arrowEl;
  const px = (n) => n ? `${n}px` : "";
  let arrowSide;
  const oppositeSideMap = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  function updatePosition() {
    dom.computePosition(referenceEl, floatingEl, { placement, strategy, middleware }).then(({
      x,
      y,
      middlewareData,
      placement: placement2,
      strategy: strategy2
    }) => {
      floatingEl.style.position = strategy2;
      floatingEl.style.left = yOnly ? "0" : px(x);
      floatingEl.style.top = px(y);
      if (middlewareData.arrow && arrowEl instanceof HTMLDivElement) {
        arrowEl.style.left = px(middlewareData.arrow.x);
        arrowEl.style.top = px(middlewareData.arrow.y);
        arrowSide = oppositeSideMap[placement2.split("-")[0]];
        arrowEl.style[arrowSide] = px(-arrowEl.offsetWidth / 2 - ($$sanitized_props.border ? 1 : 0));
      }
    });
  }
  function init(node, _referenceEl) {
    floatingEl = node;
    let cleanup = dom.autoUpdate(_referenceEl, floatingEl, updatePosition);
    return {
      update(_referenceEl2) {
        cleanup();
        cleanup = dom.autoUpdate(_referenceEl2, floatingEl, updatePosition);
      },
      destroy() {
        cleanup();
      }
    };
  }
  let arrowClass;
  placement && (referenceEl = referenceEl);
  middleware = [
    ...middlewares,
    dom.offset(+offset),
    arrowEl
  ];
  arrowClass = twJoin("absolute pointer-events-none block w-[10px] h-[10px] rotate-45 bg-inherit border-inherit", $$sanitized_props.border && arrowSide === "bottom" && "border-b border-e", $$sanitized_props.border && arrowSide === "top" && "border-t border-s ", $$sanitized_props.border && arrowSide === "right" && "border-t border-e ", $$sanitized_props.border && arrowSide === "left" && "border-b border-s ");
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (!referenceEl) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (referenceEl) {
      $$payload2.out += "<!--[-->";
      Frame($$payload2, spread_props([
        {
          use: init,
          options: referenceEl,
          role: "tooltip",
          tabindex: activeContent ? -1 : void 0
        },
        $$restProps,
        {
          get open() {
            return open;
          },
          set open($$value) {
            open = $$value;
            $$settled = false;
          },
          children: ($$payload3) => {
            $$payload3.out += `<!---->`;
            slot($$payload3, $$props, "default", {}, null);
            $$payload3.out += `<!----> `;
            if (arrow) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<div${attr("class", clsx(arrowClass))}></div>`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]-->`;
          },
          $$slots: { default: true }
        }
      ]));
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, {
    activeContent,
    arrow,
    offset,
    placement,
    trigger,
    triggeredBy,
    reference,
    strategy,
    open,
    yOnly,
    middlewares
  });
  pop();
}
function Dropdown($$payload, $$props) {
  const $$slots = sanitize_slots($$props);
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "activeUrl",
    "open",
    "containerClass",
    "classContainer",
    "headerClass",
    "classHeader",
    "footerClass",
    "classFooter",
    "activeClass",
    "classActive",
    "arrow",
    "trigger",
    "placement",
    "color",
    "shadow",
    "rounded"
  ]);
  push();
  let containerCls, headerCls, ulCls, footerCls;
  let activeUrl = fallback($$props["activeUrl"], () => void 0, true);
  let open = fallback($$props["open"], false);
  let containerClass = fallback($$props["containerClass"], "divide-y z-50");
  let classContainer = fallback($$props["classContainer"], () => void 0, true);
  let headerClass = fallback($$props["headerClass"], "py-1 overflow-hidden rounded-t-lg");
  let classHeader = fallback($$props["classHeader"], () => void 0, true);
  let footerClass = fallback($$props["footerClass"], "py-1 overflow-hidden rounded-b-lg");
  let classFooter = fallback($$props["classFooter"], () => void 0, true);
  let activeClass = fallback($$props["activeClass"], "text-primary-700 dark:text-primary-700 hover:text-primary-900 dark:hover:text-primary-900");
  let classActive = fallback($$props["classActive"], () => void 0, true);
  let arrow = fallback($$props["arrow"], false);
  let trigger = fallback($$props["trigger"], "click");
  let placement = fallback($$props["placement"], "bottom");
  let color = fallback($$props["color"], "dropdown");
  let shadow = fallback($$props["shadow"], true);
  let rounded = fallback($$props["rounded"], true);
  const activeUrlStore = writable("");
  let activeCls = twMerge(activeClass, classActive);
  setContext("DropdownType", { activeClass: activeCls });
  setContext("activeUrl", activeUrlStore);
  activeUrlStore.set(activeUrl ?? "");
  containerCls = twMerge(containerClass, classContainer);
  headerCls = twMerge(headerClass, classHeader);
  ulCls = twMerge("py-1", $$sanitized_props.class);
  footerCls = twMerge(footerClass, classFooter);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Popper($$payload2, spread_props([
      { activeContent: true },
      $$restProps,
      {
        trigger,
        arrow,
        placement,
        shadow,
        rounded,
        color,
        class: containerCls,
        get open() {
          return open;
        },
        set open($$value) {
          open = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          if ($$slots.header) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<div${attr("class", clsx(headerCls))}><!---->`;
            slot($$payload3, $$props, "header", {}, null);
            $$payload3.out += `<!----></div>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> <ul${attr("class", clsx(ulCls))}><!---->`;
          slot($$payload3, $$props, "default", {}, null);
          $$payload3.out += `<!----></ul> `;
          if ($$slots.footer) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<div${attr("class", clsx(footerCls))}><!---->`;
            slot($$payload3, $$props, "footer", {}, null);
            $$payload3.out += `<!----></div>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      }
    ]));
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, {
    activeUrl,
    open,
    containerClass,
    classContainer,
    headerClass,
    classHeader,
    footerClass,
    classFooter,
    activeClass,
    classActive,
    arrow,
    trigger,
    placement,
    color,
    shadow,
    rounded
  });
  pop();
}
function Wrapper($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["tag", "show", "use"]);
  let tag = fallback($$props["tag"], "div");
  let show = $$props["show"];
  let use = fallback($$props["use"], () => {
  });
  if (show) {
    $$payload.out += "<!--[-->";
    element(
      $$payload,
      tag,
      () => {
        $$payload.out += `${spread_attributes({ ...$$restProps }, null)}`;
      },
      () => {
        $$payload.out += `<!---->`;
        slot($$payload, $$props, "default", {}, null);
        $$payload.out += `<!---->`;
      }
    );
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { tag, show, use });
}
function DropdownItem($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["defaultClass", "href", "activeClass"]);
  push();
  let active, liClass;
  let defaultClass = fallback($$props["defaultClass"], "font-medium py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600");
  let href = fallback($$props["href"], () => void 0, true);
  let activeClass = fallback($$props["activeClass"], () => void 0, true);
  const context = getContext("DropdownType") ?? {};
  const activeUrlStore = getContext("activeUrl");
  let sidebarUrl = "";
  activeUrlStore.subscribe((value) => {
    sidebarUrl = value;
  });
  let wrap = true;
  function init(node) {
    wrap = node.parentElement?.tagName === "UL";
  }
  active = sidebarUrl ? href === sidebarUrl : false;
  liClass = twMerge(defaultClass, href ? "block" : "w-full text-left", active && (activeClass ?? context.activeClass), $$sanitized_props.class);
  Wrapper($$payload, {
    tag: "li",
    show: wrap,
    use: init,
    children: ($$payload2) => {
      element(
        $$payload2,
        href ? "a" : "button",
        () => {
          $$payload2.out += `${spread_attributes(
            {
              href,
              type: href ? void 0 : "button",
              role: href ? "link" : "button",
              ...$$restProps,
              class: clsx(liClass)
            },
            null
          )}`;
        },
        () => {
          $$payload2.out += `<!---->`;
          slot($$payload2, $$props, "default", {}, null);
          $$payload2.out += `<!---->`;
        }
      );
    },
    $$slots: { default: true }
  });
  bind_props($$props, { defaultClass, href, activeClass });
  pop();
}
function NavBrand($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["href"]);
  push();
  let href = fallback($$props["href"], "");
  $$payload.out += `<a${spread_attributes(
    {
      href,
      ...$$restProps,
      class: clsx(twMerge("flex items-center", $$sanitized_props.class))
    },
    null
  )}><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></a>`;
  bind_props($$props, { href });
  pop();
}
function ChevronDownOutline($$payload, $$props) {
  push();
  const ctx = getContext("iconCtx") ?? {};
  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };
  let {
    size = ctx.size || "md",
    color = ctx.color || "currentColor",
    title,
    strokeWidth = ctx.strokeWidth || "2",
    desc,
    class: className,
    ariaLabel = "chevron down outline",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let ariaDescribedby = `${title?.id || ""} ${desc?.id || ""}`;
  const hasDescription = !!(title?.id || desc?.id);
  $$payload.out += `<svg${spread_attributes(
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      color,
      ...restProps,
      class: clsx(twMerge("shrink-0", sizes[size], className)),
      "aria-label": ariaLabel,
      "aria-describedby": hasDescription ? ariaDescribedby : void 0,
      viewBox: "0 0 24 24"
    },
    null,
    void 0,
    void 0,
    3
  )}>`;
  if (title?.id && title.title) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<title${attr("id", title.id)}>${escape_html(title.title)}</title>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if (desc?.id && desc.desc) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<desc${attr("id", desc.id)}>${escape_html(desc.desc)}</desc>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${attr("stroke-width", strokeWidth)} d="m8 10 4 4 4-4"></path></svg>`;
  pop();
}
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
    $$payload.out += `<div${attr("class", clsx(cls("Popover absolute z-50 outline-none", settingsClasses.root, className)))}${attr("style", style)} tabindex="-1"><!---->`;
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
function Tooltip($$payload, $$props) {
  const $$slots = sanitize_slots($$props);
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "title",
    "open",
    "offset",
    "delay",
    "underline",
    "cursor",
    "enabled",
    "placement",
    "autoPlacement",
    "matchWidth",
    "classes"
  ]);
  push();
  let hasTitle;
  let title = fallback($$props["title"], "");
  let open = fallback($$props["open"], false);
  let offset = fallback($$props["offset"], 0);
  let delay = fallback($$props["delay"], 500);
  let underline = fallback($$props["underline"], false);
  let cursor = fallback($$props["cursor"], false);
  let enabled = fallback($$props["enabled"], true);
  let placement = fallback($$props["placement"], "bottom");
  let autoPlacement = fallback($$props["autoPlacement"], false);
  let matchWidth = fallback($$props["matchWidth"], false);
  let classes = fallback($$props["classes"], () => ({}), true);
  const settingsClasses = getComponentClasses("Tooltip");
  hasTitle = title || $$slots.title;
  if (enabled && (title || $$slots.title)) {
    $$payload.out += "<!--[-->";
    Popover($$payload, spread_props([
      {
        anchorEl: void 0,
        placement,
        autoPlacement,
        offset,
        matchWidth,
        open,
        class: cls("Tooltip pointer-events-none", settingsClasses.popover, classes.popover)
      },
      $$restProps,
      {
        children: ($$payload2) => {
          $$payload2.out += `<!---->`;
          slot($$payload2, $$props, "title", {}, () => {
            $$payload2.out += `<div${attr("class", clsx(cls("text-xs text-surface-100 bg-surface-content px-2 py-1 rounded whitespace-nowrap", settingsClasses.title, classes.title)))}>${escape_html(title)}</div>`;
          });
          $$payload2.out += `<!---->`;
        },
        $$slots: { default: true }
      }
    ]));
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->  <div${attr("class", clsx(cls("contents", settingsClasses.content, classes.content)))}>`;
  if ($$sanitized_props.class || underline || cursor) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span${attr("class", clsx(cls(hasTitle && underline && "border-b border-dotted", hasTitle && cursor && "cursor-help", settingsClasses.root, classes.root, $$sanitized_props.class)))}><!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!----></span>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, {
    title,
    open,
    offset,
    delay,
    underline,
    cursor,
    enabled,
    placement,
    autoPlacement,
    matchWidth,
    classes
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
    class: cls("Menu", "bg-surface-100 rounded shadow border overflow-auto", settingsClasses.root, classes.root, $$sanitized_props.class),
    style: $$sanitized_props.style,
    children: invalid_default_snippet,
    $$slots: {
      default: ($$payload2, { close }) => {
        $$payload2.out += `<menu${attr("class", clsx(cls("menu-items outline-none max-h-screen", settingsClasses.menu, classes.menu)))}><!---->`;
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
      class: cls("MenuItem", "text-left items-center p-2 hover:bg-surface-content/5 rounded duration-75", selected && classes?.selected, settingsClasses.root, classes?.root, $$sanitized_props.class),
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
function Kbd($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  let control = fallback($$props["control"], false);
  let option = fallback($$props["option"], false);
  let shift = fallback($$props["shift"], false);
  let command = fallback($$props["command"], false);
  let variant = fallback($$props["variant"], "filled");
  $$payload.out += `<kbd${attr("class", clsx(cls("font-sans inline-flex gap-1", variant === "filled" && "border border-b-2 text-surface-content bg-surface-200 rounded py-1 px-1", $$sanitized_props.class)))}>`;
  if (control) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<abbr title="Control" class="no-underline">⌃</abbr>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (option) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<abbr title="Option" class="no-underline">⌥</abbr>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (shift) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<abbr title="Shift" class="no-underline">⇧</abbr>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (command) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<abbr title="Command" class="no-underline">⌘</abbr>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></kbd>`;
  bind_props($$props, { control, option, shift, command, variant });
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
function Switch($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  let id = fallback($$props["id"], () => uniqueId("switch-"), true);
  let name = fallback($$props["name"], "");
  let value = fallback($$props["value"], void 0);
  let checked = fallback($$props["checked"], false);
  let required = fallback($$props["required"], false);
  let disabled = fallback($$props["disabled"], false);
  let size = fallback($$props["size"], "lg");
  let color = fallback($$props["color"], "primary");
  let classes = fallback($$props["classes"], () => ({}), true);
  const settingsClasses = getComponentClasses("Switch");
  $$payload.out += `<div${attr("class", clsx(cls("Switch", "inline-block", settingsClasses.root, classes.root)))}><input${attr("id", id)}${attr("name", name)} type="checkbox"${attr("checked", checked, true)}${attr("value", value)}${attr("class", clsx(cls("peer appearance-none block h-0", settingsClasses.input, classes.input)))}${attr("required", required, true)}${attr("disabled", disabled, true)}> <label${attr("for", id)}${attr("data-checked", checked)}${attr("class", clsx(cls(
    "switch",
    "group border rounded-full grid align-items p-[2px] transition-shadow",
    {
      "w-6 h-4": size === "sm",
      "w-8 h-5": size === "md",
      "w-10 h-6": size === "lg"
    },
    checked && {
      primary: "bg-primary border-primary",
      secondary: "bg-secondary border-secondary",
      accent: "bg-accent border-accent",
      neutral: "bg-neutral border-neutral",
      info: "bg-info border-info",
      success: "bg-success border-success",
      warning: "bg-warning border-warning",
      danger: "bg-danger border-danger"
    }[color],
    {
      primary: "ring-primary/60",
      secondary: "ring-secondary/60",
      accent: "ring-accent/60",
      neutral: "ring-neutral/60",
      info: "ring-info/60",
      success: "ring-success/60",
      warning: "ring-warning/60",
      danger: "ring-danger/60"
    }[color],
    checked === false && "bg-surface-content/20",
    disabled ? "opacity-50" : "cursor-pointer peer-focus-visible:ring-2 ring-offset-1",
    settingsClasses.switch,
    classes.switch,
    $$sanitized_props.class
  )))}><div${attr("data-checked", checked)}${attr("class", clsx(cls("toggle w-1/2 aspect-square h-full rounded-full transition-all duration-200 bg-surface-100 grid items-center justify-center transform", "group-active:w-[60%] aspect-auto", checked && "translate-x-full group-active:translate-x-[65%]", checked === null && "border", settingsClasses.toggle, classes.toggle)))}><!---->`;
  slot($$payload, $$props, "default", { checked, value }, null);
  $$payload.out += `<!----></div></label></div>`;
  bind_props($$props, {
    id,
    name,
    value,
    checked,
    required,
    disabled,
    size,
    color,
    classes
  });
  pop();
}
function ThemeSelect($$payload, $$props) {
  push();
  var $$store_subs;
  let themes;
  const { currentTheme, themes: allThemes } = getSettings();
  let darkThemes = fallback($$props["darkThemes"], () => allThemes?.dark ?? ["dark"], true);
  let lightThemes = fallback($$props["lightThemes"], () => allThemes?.light ?? ["light"], true);
  let keyboardShortcuts = fallback($$props["keyboardShortcuts"], false);
  let open = false;
  themes = store_get($$store_subs ??= {}, "$currentTheme", currentTheme).dark ? darkThemes : lightThemes;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (darkThemes.length > 1 || lightThemes.length > 1) {
      $$payload2.out += "<!--[-->";
      Button($$payload2, {
        iconOnly: true,
        children: ($$payload3) => {
          $$payload3.out += `<div class="grid grid-cols-1 grid-rows-1 overflow-hidden">`;
          Icon($$payload3, {
            data: mdiWhiteBalanceSunny,
            class: "row-[1] col-[1] translate-x-0 dark:-translate-x-full transition-transform duration-300"
          });
          $$payload3.out += `<!----> `;
          Icon($$payload3, {
            data: mdiWeatherNight,
            class: "row-[1] col-[1] translate-x-full dark:translate-x-0 transition-transform duration-300"
          });
          $$payload3.out += `<!----></div> `;
          Menu($$payload3, {
            explicitClose: true,
            resize: "height",
            classes: { root: "w-[400px] max-w-[95vw]" },
            get open() {
              return open;
            },
            set open($$value) {
              open = $$value;
              $$settled = false;
            },
            children: ($$payload4) => {
              const each_array = ensure_array_like(themes);
              $$payload4.out += `<label for="switch-color-scheme" class="grid grid-cols-[1fr,auto,auto] items-center p-2 border-b border-surface-content/10 mb-1 text-sm font-medium sticky top-0 bg-surface-100">Mode `;
              if (store_get($$store_subs ??= {}, "$currentTheme", currentTheme).theme) {
                $$payload4.out += "<!--[-->";
                $$payload4.out += `<span>`;
                Tooltip($$payload4, {
                  title: "Reset to System",
                  offset: 2,
                  children: ($$payload5) => {
                    Button($$payload5, {
                      icon: mdiUndoVariant,
                      color: "primary",
                      size: "sm",
                      class: "mr-1"
                    });
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!----></span>`;
              } else {
                $$payload4.out += "<!--[!-->";
              }
              $$payload4.out += `<!--]--> `;
              Switch($$payload4, {
                id: "switch-color-scheme",
                checked: store_get($$store_subs ??= {}, "$currentTheme", currentTheme).dark,
                class: "my-1",
                children: invalid_default_snippet,
                $$slots: {
                  default: ($$payload5, { checked }) => {
                    if (checked) {
                      $$payload5.out += "<!--[-->";
                      Icon($$payload5, {
                        data: mdiWeatherNight,
                        size: ".8rem",
                        class: "text-primary"
                      });
                    } else {
                      $$payload5.out += "<!--[!-->";
                      Icon($$payload5, {
                        data: mdiWhiteBalanceSunny,
                        size: ".8rem",
                        class: "text-primary"
                      });
                    }
                    $$payload5.out += `<!--]-->`;
                  }
                }
              });
              $$payload4.out += `<!----></label> <div class="grid grid-cols-2 gap-2 p-2"><!--[-->`;
              for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                let themeName = each_array[$$index];
                MenuItem($$payload4, {
                  "data-theme": themeName,
                  class: cls("bg-surface-100 text-surface-content font-semibold border shadow", store_get($$store_subs ??= {}, "$currentTheme", currentTheme).resolvedTheme === themeName && "ring-2 ring-surface-content"),
                  children: ($$payload5) => {
                    $$payload5.out += `<div class="grid gap-1"><div class="w-4 h-4 rounded-full bg-primary"></div> <div class="w-4 h-4 rounded-full bg-secondary"></div></div> ${escape_html(themeName)}`;
                  },
                  $$slots: { default: true }
                });
              }
              $$payload4.out += `<!--]--></div> `;
              if (keyboardShortcuts) {
                $$payload4.out += "<!--[-->";
                $$payload4.out += `<div class="p-2 grid grid-cols-[auto,1fr] gap-2 items-center text-xs sticky bottom-0 bg-surface-100 border-t border-surface-content/10"><span class="font-medium">Toggle scheme:</span> <span>`;
                Kbd($$payload4, { control: true });
                $$payload4.out += `<!----> + `;
                Kbd($$payload4, {
                  children: ($$payload5) => {
                    $$payload5.out += `<!---->T`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!----></span> <span class="font-medium">Next theme:</span> <span>`;
                Kbd($$payload4, { control: true });
                $$payload4.out += `<!----> + `;
                Kbd($$payload4, { shift: true });
                $$payload4.out += `<!----> + `;
                Kbd($$payload4, {
                  children: ($$payload5) => {
                    $$payload5.out += `<!---->T`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!----></span></div>`;
              } else {
                $$payload4.out += "<!--[!-->";
              }
              $$payload4.out += `<!--]-->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload2.out += "<!--[!-->";
      Button($$payload2, {
        iconOnly: true,
        children: ($$payload3) => {
          $$payload3.out += `<div class="grid grid-stack overflow-hidden">`;
          Icon($$payload3, {
            data: mdiWhiteBalanceSunny,
            class: "translate-x-0 dark:-translate-x-full transition-transform duration-300"
          });
          $$payload3.out += `<!----> `;
          Icon($$payload3, {
            data: mdiWeatherNight,
            class: "translate-x-full dark:translate-x-0 transition-transform duration-300"
          });
          $$payload3.out += `<!----></div> `;
          Menu($$payload3, {
            classes: { menu: "p-1" },
            get open() {
              return open;
            },
            set open($$value) {
              open = $$value;
              $$settled = false;
            },
            children: ($$payload4) => {
              MenuItem($$payload4, {
                icon: mdiWhiteBalanceSunny,
                selected: store_get($$store_subs ??= {}, "$currentTheme", currentTheme).theme === "light",
                children: ($$payload5) => {
                  $$payload5.out += `<!---->Light`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              MenuItem($$payload4, {
                icon: mdiWeatherNight,
                selected: store_get($$store_subs ??= {}, "$currentTheme", currentTheme).theme === "dark",
                children: ($$payload5) => {
                  $$payload5.out += `<!---->Dark`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              MenuItem($$payload4, {
                icon: mdiMonitor,
                selected: store_get($$store_subs ??= {}, "$currentTheme", currentTheme).theme == null,
                children: ($$payload5) => {
                  $$payload5.out += `<!---->System`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { darkThemes, lightThemes, keyboardShortcuts });
  pop();
}
function _layout($$payload, $$props) {
  push();
  settings({
    themes: {
      light: ["light", "winter"],
      dark: ["dark", "black"]
    }
  });
  let { children } = $$props;
  let routes = [];
  $$payload.out += `<main class="app">`;
  ThemeInit($$payload);
  $$payload.out += `<!----> <nav class="bg-orange-100 h-15 svelte-1ruyfmk">`;
  NavBrand($$payload, {
    href: "/",
    children: ($$payload2) => {
      $$payload2.out += `<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">SvelteKit Projects</span>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  ThemeSelect($$payload, {});
  $$payload.out += `<!----> `;
  Button$1($$payload, {
    class: "border-red-100",
    children: ($$payload2) => {
      ChevronDownOutline($$payload2, { class: "w-6 h-6 text-black dark:text-white" });
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Dropdown($$payload, {
    children: ($$payload2) => {
      const each_array = ensure_array_like(routes);
      $$payload2.out += `<!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let route = each_array[$$index];
        DropdownItem($$payload2, {
          href: `/${stringify(route)}`,
          class: "text-black dark:text-white",
          children: ($$payload3) => {
            $$payload3.out += `<!---->${escape_html(route.charAt(0).toUpperCase() + route.slice(1))}`;
          },
          $$slots: { default: true }
        });
      }
      $$payload2.out += `<!--]-->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></nav> <main>`;
  children?.($$payload);
  $$payload.out += `<!----></main></main>`;
  pop();
}
export {
  _layout as default
};
