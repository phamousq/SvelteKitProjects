import "clsx";
import { Q as push, a2 as fallback, a0 as getContext, X as add_styles, Y as attr, a3 as store_get, a4 as slot, Z as escape_html, _ as stringify, a5 as unsubscribe_stores, a6 as bind_props, T as pop, a7 as sanitize_slots, a8 as sanitize_props, a9 as merge_styles, aa as to_class, ab as clsx, V as ensure_array_like, ac as spread_attributes, ad as rest_props, ae as element, af as spread_props } from "../../../chunks/index.js";
import { L as LayerCake } from "../../../chunks/matchMedia.js";
import { cls } from "@layerstack/tailwind";
import { uniqueId } from "@layerstack/utils";
import { w as writable, d as derived } from "../../../chunks/index3.js";
import { buildFormatters } from "@layerstack/utils/format";
import { getAllKnownLocales, localeStore } from "@layerstack/utils/locale";
import { browser } from "@layerstack/utils/env";
import { isLiteralObject } from "@layerstack/utils/object";
import "@layerstack/utils/serialize";
import "@layerstack/utils/rollup";
import "@layerstack/utils/date";
import "@layerstack/utils/dateRange";
import "@layerstack/utils/number";
import "@layerstack/utils/routing";
import "@layerstack/utils/array";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function Svg($$payload, $$props) {
  push();
  var $$store_subs;
  let element2 = fallback($$props["element"], void 0);
  let innerElement = fallback($$props["innerElement"], void 0);
  let zIndex = fallback($$props["zIndex"], void 0);
  let pointerEvents = fallback($$props["pointerEvents"], void 0);
  let viewBox = fallback($$props["viewBox"], void 0);
  let label = fallback($$props["label"], void 0);
  let labelledBy = fallback($$props["labelledBy"], void 0);
  let describedBy = fallback($$props["describedBy"], void 0);
  let title = fallback($$props["title"], void 0);
  const { containerWidth, containerHeight, padding } = getContext("LayerCake");
  $$payload.out += `<svg${add_styles({
    "z-index": zIndex,
    "pointer-events": pointerEvents === false ? "none" : null
  })} class="layercake-layout-svg svelte-u84d8d"${attr("viewBox", viewBox)}${attr("width", store_get($$store_subs ??= {}, "$containerWidth", containerWidth))}${attr("height", store_get($$store_subs ??= {}, "$containerHeight", containerHeight))}${attr("aria-label", label)}${attr("aria-labelledby", labelledBy)}${attr("aria-describedby", describedBy)}><!---->`;
  slot($$payload, $$props, "title", {}, () => {
    if (title) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<title>${escape_html(title)}</title>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  });
  $$payload.out += `<!----><defs><!---->`;
  slot($$payload, $$props, "defs", {}, null);
  $$payload.out += `<!----></defs><g class="layercake-layout-svg_g"${attr("transform", `translate(${stringify(store_get($$store_subs ??= {}, "$padding", padding).left)}, ${stringify(store_get($$store_subs ??= {}, "$padding", padding).top)})`)}><!---->`;
  slot($$payload, $$props, "default", { element: element2 }, null);
  $$payload.out += `<!----></g></svg>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    element: element2,
    innerElement,
    zIndex,
    pointerEvents,
    viewBox,
    label,
    labelledBy,
    describedBy,
    title
  });
  pop();
}
class CurrentTheme {
  /** The currently selected theme. If using the "system" theme this will be null. */
  theme;
  /** Whether the current theme is a light or dark theme */
  dark;
  constructor(theme, dark) {
    this.theme = theme;
    this.dark = dark;
  }
  /** The theme in use, either the selected theme or the theme chosen based on the "system" setting. */
  get resolvedTheme() {
    if (this.theme) {
      return this.theme;
    } else {
      return this.dark ? "dark" : "light";
    }
  }
}
function createThemeStore(options) {
  let store = writable(new CurrentTheme(null, false));
  if (!browser) {
    return {
      subscribe: store.subscribe,
      setTheme: (themeName) => {
        store.set(new CurrentTheme(themeName, options.dark.includes(themeName)));
      }
    };
  }
  let darkMatcher = window.matchMedia("(prefers-color-scheme: dark)");
  function resolveSystemTheme({ matches }) {
    if (matches && options.dark.length) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    store.set(new CurrentTheme(null, matches));
  }
  function setTheme(themeName) {
    if (themeName === "system") {
      localStorage.removeItem("theme");
      delete document.documentElement.dataset.theme;
      resolveSystemTheme(darkMatcher);
      darkMatcher.addEventListener("change", resolveSystemTheme);
    } else {
      darkMatcher.removeEventListener("change", resolveSystemTheme);
      localStorage.theme = themeName;
      document.documentElement.dataset.theme = themeName;
      let dark = options.dark.includes(themeName);
      if (dark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      store.set(new CurrentTheme(themeName, dark));
    }
  }
  let savedTheme = localStorage.getItem("theme") || "system";
  setTheme(savedTheme);
  return {
    subscribe: store.subscribe,
    setTheme
  };
}
const settingsKey = Symbol();
function createLocaleStores(settings) {
  if (settings.locale && settings.localeSettings && settings.format) {
    return {
      locale: settings.locale,
      localeSettings: settings.localeSettings,
      format: settings.format
    };
  }
  let allLocales = getAllKnownLocales(settings.localeFormats);
  let locale = localeStore(settings.forceLocale, settings.fallbackLocale);
  let localeSettings = derived(locale, ($locale) => {
    let settings2 = allLocales[$locale];
    if (settings2) {
      return settings2;
    }
    return {
      ...allLocales.en,
      locale: $locale
    };
  });
  return {
    locale,
    localeSettings,
    format: derived(localeSettings, buildFormatters)
  };
}
function createShowDrawer() {
  return writable(true);
}
let FALLBACK_SETTINGS = null;
function getFallbackSettings() {
  FALLBACK_SETTINGS = FALLBACK_SETTINGS ?? {
    currentTheme: createThemeStore({ dark: ["dark"] }),
    componentSettingsCache: {},
    showDrawer: createShowDrawer(),
    ...createLocaleStores({})
  };
  return FALLBACK_SETTINGS;
}
function getSettings() {
  try {
    return getContext(settingsKey) ?? getFallbackSettings();
  } catch (error) {
    return getFallbackSettings();
  }
}
function resolveComponentSettings(settings, name) {
  const { classes: themeClasses, ...defaultProps } = settings?.components?.[name] ?? {};
  const classes = resolveComponentClasses(themeClasses);
  const output = {
    defaults: defaultProps ?? {},
    classes
  };
  return output;
}
function getComponentSettings(name) {
  const settings = getSettings();
  const existing = settings.componentSettingsCache[name];
  if (existing) {
    return existing;
  }
  const output = resolveComponentSettings(settings, name);
  settings.componentSettingsCache[name] = output;
  return output;
}
function resolveComponentClasses(theme) {
  return typeof theme === "string" ? { root: theme } : theme ?? {};
}
function getComponentClasses(name) {
  const settings = getSettings();
  return resolveComponentClasses(settings?.components?.[name]?.classes);
}
let cache = /* @__PURE__ */ new Map();
function Icon($$payload, $$props) {
  const $$slots = sanitize_slots($$props);
  const $$sanitized_props = sanitize_props($$props);
  push();
  let isLabelled;
  let size = fallback($$props["size"], "1.5em");
  let width = fallback($$props["width"], size);
  let height = fallback($$props["height"], size);
  let viewBox = fallback($$props["viewBox"], "0 0 24 24");
  let path = fallback($$props["path"], "");
  let data2 = fallback($$props["data"], void 0);
  let svg = fallback($$props["svg"], void 0);
  let svgUrl = fallback($$props["svgUrl"], void 0);
  let title = fallback($$props["title"], void 0);
  let desc = fallback($$props["desc"], void 0);
  let titleId = fallback($$props["titleId"], () => title ? uniqueId("title-") : "", true);
  let descId = fallback($$props["descId"], () => desc ? uniqueId("desc-") : "", true);
  let classes = fallback($$props["classes"], () => ({}), true);
  const settingsClasses = getComponentClasses("Icon");
  isLabelled = title || desc;
  if (typeof data2 === "object" && data2 && "icon" in data2) {
    const [
      _width,
      _height,
      _ligatures,
      _unicode,
      _path
    ] = data2.icon;
    viewBox = `0 0 ${_width} ${_height}`;
    path = _path;
    width = "1.0rem";
    height = "1.0rem";
  } else if (typeof data2 === "string") {
    const dataStr = data2.toLowerCase();
    if (dataStr.includes("<svg")) {
      svg = data2;
    } else if (dataStr.includes("http")) {
      svgUrl = data2;
    } else {
      path = data2;
    }
  }
  if (svgUrl) {
    let promise;
    if (cache.has(svgUrl)) {
      cache.get(svgUrl)?.then((text) => svg = text);
    } else {
      promise = fetch(svgUrl).then((resp) => resp.text()).catch(() => {
        if (svgUrl && typeof svgUrl === "string") {
          cache.delete(svgUrl);
        }
        return "";
      });
      cache.set(svgUrl, promise);
      promise.then((text) => {
        svg = text;
      });
    }
  }
  if (svg?.includes("fontawesome.com")) {
    width = "1.0rem";
    height = "1.0rem";
  }
  if (svg || svgUrl || $$slots.default) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span${add_styles(merge_styles($$sanitized_props.style, {
      width,
      height,
      "--width": width,
      "--height": height
    }))}${attr("class", to_class(clsx(cls("Icon", "icon-container inline-block flex-shrink-0 align-middle fill-current", settingsClasses.root, classes.root, $$sanitized_props.class)), "svelte-uen7q8"))}${attr("role", isLabelled ? "img" : "presentation")}${attr("aria-labelledby", isLabelled ? `${titleId} ${descId}` : void 0)}><!---->`;
    slot($$payload, $$props, "default", {}, () => {
      $$payload.out += `${html(svg ?? "")}`;
    });
    $$payload.out += `<!----></span>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array = ensure_array_like(Array.isArray(path) ? path : [path]);
    $$payload.out += `<svg${attr("width", width)}${attr("height", height)}${attr("viewBox", viewBox)}${attr("class", to_class(clsx(cls("Icon", "inline-block flex-shrink-0 fill-current", settingsClasses.root, classes.root, $$sanitized_props.class)), "svelte-uen7q8"))}${attr("style", $$sanitized_props.style)}${attr("role", isLabelled ? "img" : "presentation")}${attr("aria-labelledby", isLabelled ? `${titleId} ${descId}` : void 0)}>`;
    if (title) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<title${attr("id", titleId)}>${escape_html(title)}</title>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
    if (desc) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<desc${attr("id", descId)}>${escape_html(desc)}</desc>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let d = each_array[i];
      $$payload.out += `<path${attr("d", d)} fill="currentColor"${attr("class", to_class(clsx(cls(Array.isArray(settingsClasses.path) ? settingsClasses.path[i] : settingsClasses.path, Array.isArray(classes.path) ? classes.path[i] : classes.path)), "svelte-uen7q8"))}></path>`;
    }
    $$payload.out += `<!--]--></svg>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    size,
    width,
    height,
    viewBox,
    path,
    data: data2,
    svg,
    svgUrl,
    title,
    desc,
    titleId,
    descId,
    classes
  });
  pop();
}
function ProgressCircle($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  let indeterminate, circumference, strokeDashArray, strokeDashOffset, viewBoxSize, strokeWidth;
  let value = fallback($$props["value"], null);
  let rotate = fallback($$props["rotate"], 0);
  let size = fallback($$props["size"], 40);
  let width = fallback($$props["width"], 4);
  let track = fallback($$props["track"], false);
  let className = fallback($$props["class"], void 0);
  const settingsClasses = getComponentClasses("ProgressCircle");
  const radius = 20;
  indeterminate = value == null;
  circumference = 2 * Math.PI * radius;
  strokeDashArray = Math.round(circumference * 1e3) / 1e3;
  strokeDashOffset = (100 - (value ?? 0)) / 100 * circumference + "px";
  viewBoxSize = radius / (1 - width / size);
  strokeWidth = width / size * viewBoxSize * 2;
  $$payload.out += `<div${spread_attributes(
    {
      ...$$sanitized_props,
      class: clsx(cls("ProgressCircular", "relative inline-flex justify-center items-center align-middle", settingsClasses.root, className)),
      style: `height: ${stringify(size)}px; width: ${stringify(size)}px; ${stringify($$sanitized_props.style)}`
    },
    "svelte-c2dy19",
    { indeterminate }
  )}><svg xmlns="http://www.w3.org/2000/svg"${attr("style", `transform: rotate(${stringify(rotate - (indeterminate ? 0 : 90))}deg)`)}${attr("viewBox", `${stringify(viewBoxSize)}
    ${stringify(viewBoxSize)}
    ${stringify(2 * viewBoxSize)}
    ${stringify(2 * viewBoxSize)}`)} class="svelte-c2dy19">`;
  if (track) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<circle class="track svelte-c2dy19" fill="transparent"${attr("cx", 2 * viewBoxSize)}${attr("cy", 2 * viewBoxSize)}${attr("r", radius)}${attr("stroke-width", strokeWidth)}${attr("stroke-dasharray", strokeDashArray)}${attr("stroke-dashoffset", 0)}></circle>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--><circle class="path svelte-c2dy19" fill="transparent"${attr("cx", 2 * viewBoxSize)}${attr("cy", 2 * viewBoxSize)}${attr("r", radius)}${attr("stroke-width", strokeWidth)}${attr("stroke-dasharray", strokeDashArray)}${attr("stroke-dashoffset", strokeDashOffset)}></circle></svg> <div class="info svelte-c2dy19"><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></div></div>`;
  bind_props($$props, {
    value,
    rotate,
    size,
    width,
    track,
    class: className
  });
  pop();
}
const buttonGroupKey = Symbol();
function getButtonGroup() {
  return getContext(buttonGroupKey);
}
function asIconData(v) {
  return isIconComponentProps(v) ? v.data : v;
}
function isIconComponentProps(v) {
  return isLiteralObject(v) && typeof v["iconName"] === "undefined";
}
function Button($$payload, $$props) {
  const $$slots = sanitize_slots($$props);
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "type",
    "href",
    "target",
    "fullWidth",
    "icon",
    "iconOnly",
    "actions",
    "loading",
    "disabled",
    "rounded",
    "variant",
    "size",
    "color",
    "classes"
  ]);
  push();
  let _class;
  const { classes: settingsClasses, defaults } = getComponentSettings("Button");
  let type = fallback($$props["type"], "button");
  let href = fallback($$props["href"], void 0);
  let target = fallback($$props["target"], void 0);
  let fullWidth = fallback($$props["fullWidth"], false);
  let icon = fallback($$props["icon"], void 0);
  let iconOnly = fallback($$props["iconOnly"], () => icon !== void 0 && !$$slots.default, true);
  let actions = fallback($$props["actions"], void 0);
  let loading = fallback($$props["loading"], false);
  let disabled = fallback($$props["disabled"], false);
  let rounded = fallback($$props["rounded"], void 0);
  let variant = fallback($$props["variant"], void 0);
  let size = fallback($$props["size"], void 0);
  let color = fallback($$props["color"], void 0);
  let classes = fallback($$props["classes"], () => ({}), true);
  const groupContext = getButtonGroup();
  variant = variant ?? groupContext?.variant ?? defaults.variant ?? "default";
  size = size ?? groupContext?.size ?? defaults.size ?? "md";
  color = color ?? groupContext?.color ?? defaults.color ?? "default";
  rounded = rounded ?? groupContext?.rounded ?? defaults.rounded ?? (iconOnly ? "full" : true);
  _class = cls(
    "Button",
    "transition duration-200 ring-surface-content/60 touch-manipulation",
    "focus:outline-none focus-visible:ring-1",
    fullWidth ? "flex w-full" : "inline-flex",
    loading ? "gap-2" : "gap-1",
    variant === "none" || !rounded ? "" : rounded === "full" ? "rounded-full" : "rounded",
    variant !== "none" && [
      "items-center justify-center",
      "font-medium tracking-wider whitespace-nowrap",
      iconOnly ? {
        sm: "text-xs p-1",
        md: "text-sm p-2",
        lg: "text-base p-3"
      }[size] : {
        sm: "text-xs px-2 py-1",
        md: "text-sm px-4 py-2",
        lg: "text-base px-6 py-3"
      }[size]
    ],
    disabled && "opacity-50 pointer-events-none",
    // Variant specific styles
    `variant-${variant}`,
    {
      default: "",
      outline: "border focus-visible:ring-offset-1",
      fill: "focus-visible:ring-offset-1",
      "fill-outline": "border focus-visible:ring-offset-1",
      "fill-light": "",
      text: "p-0",
      none: ""
    }[variant ?? "none"],
    // Variant specific colors
    {
      default: {
        default: [
          "hover:[--bg-color:theme(colors.surface-content/10%)]",
          // '[--text-color:theme(colors.surface-content)]', // inherit
          "[--ring-color:theme(colors.surface-content/60%)]"
        ],
        primary: [
          "hover:[--bg-color:theme(colors.primary/10%)]",
          "[--text-color:theme(colors.primary)]",
          "[--ring-color:theme(colors.primary/60%)]"
        ],
        secondary: [
          "hover:[--bg-color:theme(colors.secondary/10%)]",
          "[--text-color:theme(colors.secondary)]",
          "[--ring-color:theme(colors.secondary/60%)]"
        ],
        accent: [
          "hover:[--bg-color:theme(colors.accent/10%)]",
          "[--text-color:theme(colors.accent)]",
          "[--ring-color:theme(colors.accent/60%)]"
        ],
        neutral: [
          "hover:[--bg-color:theme(colors.neutral/10%)]",
          "[--text-color:theme(colors.neutral)]",
          "[--ring-color:theme(colors.neutral/60%)]"
        ],
        info: [
          "hover:[--bg-color:theme(colors.info/10%)]",
          "[--text-color:theme(colors.info)]",
          "[--ring-color:theme(colors.info/60%)]"
        ],
        success: [
          "hover:[--bg-color:theme(colors.success/10%)]",
          "[--text-color:theme(colors.success)]",
          "[--ring-color:theme(colors.success/60%)]"
        ],
        warning: [
          "hover:[--bg-color:theme(colors.warning/10%)]",
          "[--text-color:theme(colors.warning)]",
          "[--ring-color:theme(colors.warning/60%)]"
        ],
        danger: [
          "hover:[--bg-color:theme(colors.danger/10%)]",
          "[--text-color:theme(colors.danger)]",
          "[--ring-color:theme(colors.danger/60%)]"
        ]
      },
      outline: {
        default: [
          "hover:[--bg-color:theme(colors.surface-content/10%)]",
          "[--border-color:theme(colors.surface-content)]",
          "[--text-color:theme(colors.surface-content)]",
          "[--ring-color:theme(colors.surface-content/60%)]"
        ],
        primary: [
          "hover:[--bg-color:theme(colors.primary/10%)]",
          "[--border-color:theme(colors.primary)]",
          "[--text-color:theme(colors.primary)]",
          "[--ring-color:theme(colors.primary/60%)]"
        ],
        secondary: [
          "hover:[--bg-color:theme(colors.secondary/10%)]",
          "[--border-color:theme(colors.secondary)]",
          "[--text-color:theme(colors.secondary)]",
          "[--ring-color:theme(colors.secondary/60%)]"
        ],
        accent: [
          "hover:[--bg-color:theme(colors.accent/10%)]",
          "[--border-color:theme(colors.accent)]",
          "[--text-color:theme(colors.accent)]",
          "[--ring-color:theme(colors.accent/60%)]"
        ],
        neutral: [
          "hover:[--bg-color:theme(colors.neutral/10%)]",
          "[--border-color:theme(colors.neutral)]",
          "[--text-color:theme(colors.neutral)]",
          "[--ring-color:theme(colors.neutral/60%)]"
        ],
        info: [
          "hover:[--bg-color:theme(colors.info/10%)]",
          "[--border-color:theme(colors.info)]",
          "[--text-color:theme(colors.info)]",
          "[--ring-color:theme(colors.info/60%)]"
        ],
        success: [
          "hover:[--bg-color:theme(colors.success/10%)]",
          "[--border-color:theme(colors.success)]",
          "[--text-color:theme(colors.success)]",
          "[--ring-color:theme(colors.success/60%)]"
        ],
        warning: [
          "hover:[--bg-color:theme(colors.warning/10%)]",
          "[--border-color:theme(colors.warning)]",
          "[--text-color:theme(colors.warning)]",
          "[--ring-color:theme(colors.warning/60%)]"
        ],
        danger: [
          "hover:[--bg-color:theme(colors.danger/10%)]",
          "[--border-color:theme(colors.danger)]",
          "[--text-color:theme(colors.danger)]",
          "[--ring-color:theme(colors.danger/60%)]"
        ]
      },
      fill: {
        default: [
          `[--bg-color:theme(colors.surface-content)]`,
          "hover:[--bg-color:theme(colors.surface-content/80%)]",
          "[--text-color:theme(colors.surface-200)]",
          "[--ring-color:theme(colors.surface-content/60%)]"
        ],
        primary: [
          `[--bg-color:theme(colors.primary)]`,
          "hover:[--bg-color:theme(colors.primary-600)]",
          "[--text-color:theme(colors.primary-content)]",
          "[--ring-color:theme(colors.primary/60%)]"
        ],
        secondary: [
          "[--bg-color:theme(colors.secondary)]",
          "hover:[--bg-color:theme(colors.secondary-600)]",
          "[--text-color:theme(colors.secondary-content)]",
          "[--ring-color:theme(colors.secondary/60%)]"
        ],
        accent: [
          "[--bg-color:theme(colors.accent)]",
          "hover:[--bg-color:theme(colors.accent-600)]",
          "[--text-color:theme(colors.accent-content)]",
          "[--ring-color:theme(colors.accent/60%)]"
        ],
        neutral: [
          "[--bg-color:theme(colors.neutral)]",
          "hover:[--bg-color:theme(colors.neutral-600)]",
          "[--text-color:theme(colors.neutral-content)]",
          "[--ring-color:theme(colors.neutral/60%)]"
        ],
        info: [
          `[--bg-color:theme(colors.info)]`,
          "hover:[--bg-color:theme(colors.info-600)]",
          "[--text-color:theme(colors.info-content)]",
          "[--ring-color:theme(colors.info/60%)]"
        ],
        success: [
          `[--bg-color:theme(colors.success)]`,
          "hover:[--bg-color:theme(colors.success-600)]",
          "[--text-color:theme(colors.success-content)]",
          "[--ring-color:theme(colors.success/60%)]"
        ],
        warning: [
          `[--bg-color:theme(colors.warning)]`,
          "hover:[--bg-color:theme(colors.warning-600)]",
          "[--text-color:theme(colors.warning-content)]",
          "[--ring-color:theme(colors.warning/60%)]"
        ],
        danger: [
          `[--bg-color:theme(colors.danger)]`,
          "hover:[--bg-color:theme(colors.danger-600)]",
          "[--text-color:theme(colors.danger-content)]",
          "[--ring-color:theme(colors.danger/60%)]"
        ]
      },
      "fill-light": {
        default: [
          "[--bg-color:theme(colors.surface-content/10%)]",
          "hover:[--bg-color:theme(colors.surface-content/20%)]",
          "[--text-color:theme(colors.surface-content)]",
          "[--ring-color:theme(colors.surface-content/60%)]"
        ],
        primary: [
          "[--bg-color:theme(colors.primary/10%)]",
          "hover:[--bg-color:theme(colors.primary/20%)]",
          "[--text-color:theme(colors.primary)]",
          "[--ring-color:theme(colors.primary/60%)]"
        ],
        secondary: [
          "[--bg-color:theme(colors.secondary/10%)]",
          "hover:[--bg-color:theme(colors.secondary/20%)]",
          "[--text-color:theme(colors.secondary)]",
          "[--ring-color:theme(colors.secondary/60%)]"
        ],
        accent: [
          "[--bg-color:theme(colors.accent/10%)]",
          "hover:[--bg-color:theme(colors.accent/20%)]",
          "[--text-color:theme(colors.accent)]",
          "[--ring-color:theme(colors.secondary/60%)]"
        ],
        neutral: [
          "[--bg-color:theme(colors.neutral/10%)]",
          "hover:[--bg-color:theme(colors.neutral/20%)]",
          "[--text-color:theme(colors.neutral)]",
          "[--ring-color:theme(colors.neutral/60%)]"
        ],
        info: [
          "[--bg-color:theme(colors.info/10%)]",
          "hover:[--bg-color:theme(colors.info/20%)]",
          "[--text-color:theme(colors.info)]",
          "[--ring-color:theme(colors.info/60%)]"
        ],
        success: [
          "[--bg-color:theme(colors.success/10%)]",
          "hover:[--bg-color:theme(colors.success/20%)]",
          "[--text-color:theme(colors.success)]",
          "[--ring-color:theme(colors.success/60%)]"
        ],
        warning: [
          "[--bg-color:theme(colors.warning/10%)]",
          "hover:[--bg-color:theme(colors.warning/20%)]",
          "[--text-color:theme(colors.warning)]",
          "[--ring-color:theme(colors.warning/60%)]"
        ],
        danger: [
          "[--bg-color:theme(colors.danger/10%)]",
          "hover:[--bg-color:theme(colors.danger/20%)]",
          "[--text-color:theme(colors.danger)]",
          "[--ring-color:theme(colors.danger/60%)]"
        ]
      },
      "fill-outline": {
        default: [
          "[--bg-color:theme(colors.surface-content/10%)]",
          "hover:[--bg-color:theme(colors.surface-content/20%)]",
          "[--border-color:theme(colors.surface-content)]",
          "[--text-color:theme(colors.surface-content)]",
          "[--ring-color:theme(colors.surface-content/60%)]"
        ],
        primary: [
          "[--bg-color:theme(colors.primary/10%)]",
          "hover:[--bg-color:theme(colors.primary/20%)]",
          "[--border-color:theme(colors.primary)]",
          "[--text-color:theme(colors.primary)]",
          "[--ring-color:theme(colors.primary/60%)]"
        ],
        secondary: [
          "[--bg-color:theme(colors.secondary/10%)]",
          "hover:[--bg-color:theme(colors.secondary/20%)]",
          "[--border-color:theme(colors.secondary)]",
          "[--text-color:theme(colors.secondary)]",
          "[--ring-color:theme(colors.secondary/60%)]"
        ],
        accent: [
          "[--bg-color:theme(colors.accent/10%)]",
          "hover:[--bg-color:theme(colors.accent/20%)]",
          "[--border-color:theme(colors.accent)]",
          "[--text-color:theme(colors.accent)]",
          "[--ring-color:theme(colors.accent/60%)]"
        ],
        neutral: [
          "[--bg-color:theme(colors.neutral/10%)]",
          "hover:[--bg-color:theme(colors.neutral/20%)]",
          "[--border-color:theme(colors.neutral)]",
          "[--text-color:theme(colors.neutral)]",
          "[--ring-color:theme(colors.neutral/60%)]"
        ],
        info: [
          "[--bg-color:theme(colors.info/10%)]",
          "hover:[--bg-color:theme(colors.info/20%)]",
          "[--border-color:theme(colors.info)]",
          "[--text-color:theme(colors.info)]",
          "[--ring-color:theme(colors.info/60%)]"
        ],
        success: [
          "[--bg-color:theme(colors.success/10%)]",
          "hover:[--bg-color:theme(colors.success/20%)]",
          "[--border-color:theme(colors.success)]",
          "[--text-color:theme(colors.success)]",
          "[--ring-color:theme(colors.success/60%)]"
        ],
        warning: [
          "[--bg-color:theme(colors.warning/10%)]",
          "hover:[--bg-color:theme(colors.warning/20%)]",
          "[--border-color:theme(colors.warning)]",
          "[--text-color:theme(colors.warning)]",
          "[--ring-color:theme(colors.warning/60%)]"
        ],
        danger: [
          "[--bg-color:theme(colors.danger/10%)]",
          "hover:[--bg-color:theme(colors.danger/20%)]",
          "[--border-color:theme(colors.danger)]",
          "[--text-color:theme(colors.danger)]",
          "[--ring-color:theme(colors.danger/60%)]"
        ]
      },
      text: {
        default: [
          "[--text-color:theme(colors.surface-content)]",
          "hover:[--text-color:theme(colors.surface-content/80%)]",
          "[--ring-color:theme(colors.surface-content/60%)]"
        ],
        primary: [
          "[--text-color:theme(colors.primary)]",
          "hover:[--text-color:theme(colors.primary-700)]",
          "[--ring-color:theme(colors.primary/60%)]"
        ],
        secondary: [
          "[--text-color:theme(colors.secondary)]",
          "hover:[--text-color:theme(colors.secondary-700)]",
          "[--ring-color:theme(colors.secondary/60%)]"
        ],
        accent: [
          "[--text-color:theme(colors.accent)]",
          "hover:[--text-color:theme(colors.accent-700)]",
          "[--ring-color:theme(colors.accent/60%)]"
        ],
        neutral: [
          "[--text-color:theme(colors.neutral)]",
          "hover:[--text-color:theme(colors.neutral-700)]",
          "[--ring-color:theme(colors.neutral/60%)]"
        ],
        info: [
          "[--text-color:theme(colors.info)]",
          "hover:[--text-color:theme(colors.info-700)]",
          "[--ring-color:theme(colors.info/60%)]"
        ],
        success: [
          "[--text-color:theme(colors.success)]",
          "hover:[--text-color:theme(colors.success-700)]",
          "[--ring-color:theme(colors.success/60%)]"
        ],
        warning: [
          "[--text-color:theme(colors.warning)]",
          "hover:[--text-color:theme(colors.warning-700)]",
          "[--ring-color:theme(colors.warning/60%)]"
        ],
        danger: [
          "[--text-color:theme(colors.danger)]",
          "hover:[--text-color:theme(colors.danger-700)]",
          "[--ring-color:theme(colors.danger/60%)]"
        ]
      },
      none: {
        default: "",
        primary: "",
        secondary: "",
        accent: "",
        neutral: "",
        info: "",
        success: "",
        warning: "",
        danger: ""
      }
    }[variant ?? "none"]?.[color ?? "default"],
    // text color
    [
      "default",
      "outline",
      "fill",
      "fill-outline",
      "fill-light",
      "text"
    ].includes(variant ?? "none") && "text-[var(--text-color)]",
    // background color
    [
      "default",
      "outline",
      "fill",
      "fill-outline",
      "fill-light"
    ].includes(variant ?? "none") && "bg-[var(--bg-color)] ",
    // border color
    ["outline", "fill-outline"].includes(variant ?? "none") && "border-[var(--border-color)]",
    // ring color
    [
      "default",
      "outline",
      "fill",
      "fill-outline",
      "fill-light",
      "text"
    ].includes(variant ?? "none") && "ring-[var(--ring-color)]",
    settingsClasses.root,
    classes?.root,
    $$sanitized_props.class
  );
  element(
    $$payload,
    href ? "a" : "button",
    () => {
      $$payload.out += `${spread_attributes(
        {
          href,
          target,
          type,
          ...$$restProps,
          class: clsx(_class),
          style: $$sanitized_props.style ?? "",
          disabled,
          "aria-disabled": disabled ? "true" : "false"
        },
        null
      )}`;
    },
    () => {
      if (loading) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span>`;
        ProgressCircle($$payload, {
          size: 16,
          width: 2,
          class: cls(settingsClasses.loading, classes.loading)
        });
        $$payload.out += `<!----></span>`;
      } else {
        $$payload.out += "<!--[!-->";
        if (icon) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<span>`;
          if (typeof icon === "string" || "icon" in icon) {
            $$payload.out += "<!--[-->";
            Icon($$payload, {
              data: asIconData(icon),
              class: cls("pointer-events-none", settingsClasses.icon, classes.icon)
            });
          } else {
            $$payload.out += "<!--[!-->";
            Icon($$payload, spread_props([
              {
                class: cls("pointer-events-none", settingsClasses.icon, classes.icon)
              },
              icon
            ]));
          }
          $$payload.out += `<!--]--></span>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]--> <!---->`;
      slot($$payload, $$props, "default", {}, null);
      $$payload.out += `<!---->`;
    }
  );
  bind_props($$props, {
    type,
    href,
    target,
    fullWidth,
    icon,
    iconOnly,
    actions,
    loading,
    disabled,
    rounded,
    variant,
    size,
    color,
    classes
  });
  pop();
}
function Line($$payload, $$props) {
  push();
  var $$store_subs;
  let path;
  const { data: data2, xGet, yGet } = getContext("LayerCake");
  let stroke = fallback($$props["stroke"], "#ab00d6");
  path = "M" + store_get($$store_subs ??= {}, "$data", data2).map((d) => {
    return store_get($$store_subs ??= {}, "$xGet", xGet)(d) + "," + store_get($$store_subs ??= {}, "$yGet", yGet)(d);
  }).join("L");
  $$payload.out += `<path class="path-line svelte-g4vsxb"${attr("d", path)}${attr("stroke", stroke)}></path>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { stroke });
  pop();
}
function Area($$payload, $$props) {
  push();
  var $$store_subs;
  let path;
  const { data: data2, xGet, yGet, xScale, yScale, extents } = getContext("LayerCake");
  let fill = fallback($$props["fill"], "#ab00d610");
  let area;
  path = "M" + store_get($$store_subs ??= {}, "$data", data2).map((d) => {
    return store_get($$store_subs ??= {}, "$xGet", xGet)(d) + "," + store_get($$store_subs ??= {}, "$yGet", yGet)(d);
  }).join("L");
  {
    const yRange = store_get($$store_subs ??= {}, "$yScale", yScale).range();
    area = path + ("L" + store_get($$store_subs ??= {}, "$xScale", xScale)(store_get($$store_subs ??= {}, "$extents", extents).x ? store_get($$store_subs ??= {}, "$extents", extents).x[1] : 0) + "," + yRange[0] + "L" + store_get($$store_subs ??= {}, "$xScale", xScale)(store_get($$store_subs ??= {}, "$extents", extents).x ? store_get($$store_subs ??= {}, "$extents", extents).x[0] : 0) + "," + yRange[0] + "Z");
  }
  $$payload.out += `<path class="path-area"${attr("d", area)}${attr("fill", fill)}></path>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { fill });
  pop();
}
function AxisX($$payload, $$props) {
  push();
  var $$store_subs;
  let tickLen, isBandwidth, tickVals, halfBand;
  const { width, height, xScale, yRange } = getContext("LayerCake");
  let tickMarks = fallback($$props["tickMarks"], false);
  let gridlines = fallback($$props["gridlines"], true);
  let tickMarkLength = fallback($$props["tickMarkLength"], 6);
  let baseline = fallback($$props["baseline"], false);
  let snapLabels = fallback($$props["snapLabels"], false);
  let format = fallback($$props["format"], (d) => d);
  let ticks = fallback($$props["ticks"], void 0);
  let tickGutter = fallback($$props["tickGutter"], 0);
  let dx = fallback($$props["dx"], 0);
  let dy = fallback($$props["dy"], 12);
  function textAnchor(i, sl) {
    if (sl === true) {
      if (i === 0) {
        return "start";
      }
      if (i === tickVals.length - 1) {
        return "end";
      }
    }
    return "middle";
  }
  tickLen = tickMarks === true ? tickMarkLength ?? 6 : 0;
  isBandwidth = typeof store_get($$store_subs ??= {}, "$xScale", xScale).bandwidth === "function";
  tickVals = Array.isArray(ticks) ? ticks : isBandwidth ? store_get($$store_subs ??= {}, "$xScale", xScale).domain() : typeof ticks === "function" ? ticks(store_get($$store_subs ??= {}, "$xScale", xScale).ticks()) : store_get($$store_subs ??= {}, "$xScale", xScale).ticks(ticks);
  halfBand = isBandwidth ? store_get($$store_subs ??= {}, "$xScale", xScale).bandwidth() / 2 : 0;
  const each_array = ensure_array_like(tickVals);
  $$payload.out += `<g${attr("class", to_class("axis x-axis", "svelte-134rqt8", { "snapLabels": snapLabels }))}><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let tick = each_array[i];
    if (baseline === true) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<line class="baseline svelte-134rqt8"${attr("y1", store_get($$store_subs ??= {}, "$height", height))}${attr("y2", store_get($$store_subs ??= {}, "$height", height))} x1="0"${attr("x2", store_get($$store_subs ??= {}, "$width", width))}></line>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--><g${attr("class", to_class("tick tick-" + i, "svelte-134rqt8"))}${attr("transform", `translate(${stringify(store_get($$store_subs ??= {}, "$xScale", xScale)(tick))},${stringify(Math.max(...store_get($$store_subs ??= {}, "$yRange", yRange)))})`)}>`;
    if (gridlines === true) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<line class="gridline svelte-134rqt8"${attr("x1", halfBand)}${attr("x2", halfBand)}${attr("y1", -store_get($$store_subs ??= {}, "$height", height))} y2="0"></line>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
    if (tickMarks === true) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<line class="tick-mark svelte-134rqt8"${attr("x1", halfBand)}${attr("x2", halfBand)}${attr("y1", tickGutter)}${attr("y2", tickGutter + tickLen)}></line>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--><text${attr("x", halfBand)}${attr("y", tickGutter + tickLen)}${attr("dx", dx)}${attr("dy", dy)}${attr("text-anchor", textAnchor(i, snapLabels))} class="svelte-134rqt8">${escape_html(format(tick))}</text></g>`;
  }
  $$payload.out += `<!--]--></g>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    tickMarks,
    gridlines,
    tickMarkLength,
    baseline,
    snapLabels,
    format,
    ticks,
    tickGutter,
    dx,
    dy
  });
  pop();
}
function AxisY($$payload, $$props) {
  push();
  var $$store_subs;
  let isBandwidth, tickVals, widestTickLen, tickLen, x1, y, maxTickValPx;
  const { xRange, yScale, width } = getContext("LayerCake");
  let tickMarks = fallback($$props["tickMarks"], false);
  let labelPosition = fallback($$props["labelPosition"], "even");
  let snapBaselineLabel = fallback($$props["snapBaselineLabel"], false);
  let gridlines = fallback($$props["gridlines"], true);
  let tickMarkLength = fallback($$props["tickMarkLength"], void 0);
  let format = fallback($$props["format"], (d) => d);
  let ticks = fallback($$props["ticks"], 4);
  let tickGutter = fallback($$props["tickGutter"], 0);
  let dx = fallback($$props["dx"], 0);
  let dy = fallback($$props["dy"], 0);
  let charPixelWidth = fallback($$props["charPixelWidth"], 7.25);
  function calcStringLength(sum, val) {
    if (val === "," || val === ".") return sum + charPixelWidth * 0.5;
    return sum + charPixelWidth;
  }
  isBandwidth = typeof store_get($$store_subs ??= {}, "$yScale", yScale).bandwidth === "function";
  tickVals = Array.isArray(ticks) ? ticks : isBandwidth ? store_get($$store_subs ??= {}, "$yScale", yScale).domain() : typeof ticks === "function" ? ticks(store_get($$store_subs ??= {}, "$yScale", yScale).ticks()) : store_get($$store_subs ??= {}, "$yScale", yScale).ticks(ticks);
  widestTickLen = Math.max(10, Math.max(...tickVals.map((d) => format(d).toString().split("").reduce(calcStringLength, 0))));
  tickLen = tickMarks === true ? labelPosition === "above" ? tickMarkLength ?? widestTickLen : tickMarkLength ?? 6 : 0;
  x1 = -tickGutter - (labelPosition === "above" ? widestTickLen : tickLen);
  y = isBandwidth ? store_get($$store_subs ??= {}, "$yScale", yScale).bandwidth() / 2 : 0;
  maxTickValPx = Math.max(...tickVals.map(store_get($$store_subs ??= {}, "$yScale", yScale)));
  const each_array = ensure_array_like(tickVals);
  $$payload.out += `<g class="axis y-axis"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let tick = each_array[$$index];
    const tickValPx = store_get($$store_subs ??= {}, "$yScale", yScale)(tick);
    $$payload.out += `<g${attr("class", to_class("tick tick-" + tick, "svelte-1gsclux"))}${attr("transform", `translate(${stringify(store_get($$store_subs ??= {}, "$xRange", xRange)[0])}, ${stringify(tickValPx)})`)}>`;
    if (gridlines === true) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<line class="gridline svelte-1gsclux"${attr("x1", x1)}${attr("x2", store_get($$store_subs ??= {}, "$width", width))}${attr("y1", y)}${attr("y2", y)}></line>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
    if (tickMarks === true) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<line class="tick-mark svelte-1gsclux"${attr("x1", x1)}${attr("x2", x1 + tickLen)}${attr("y1", y)}${attr("y2", y)}></line>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--><text${attr("x", x1)}${attr("y", y)}${attr("dx", dx + (labelPosition === "even" ? -3 : 0))}${attr("text-anchor", labelPosition === "above" ? "start" : "end")}${attr("dy", dy + (labelPosition === "above" || snapBaselineLabel === true && tickValPx === maxTickValPx ? -3 : 4))} class="svelte-1gsclux">${escape_html(format(tick))}</text></g>`;
  }
  $$payload.out += `<!--]--></g>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    tickMarks,
    labelPosition,
    snapBaselineLabel,
    gridlines,
    tickMarkLength,
    format,
    ticks,
    tickGutter,
    dx,
    dy,
    charPixelWidth
  });
  pop();
}
const data = [
  {
    myX: "1979",
    myY: "7.19"
  },
  {
    myX: "1980",
    myY: "7.83"
  },
  {
    myX: "1981",
    myY: "7.24"
  },
  {
    myX: "1982",
    myY: "7.44"
  },
  {
    myX: "1983",
    myY: "7.51"
  },
  {
    myX: "1984",
    myY: "7.1"
  },
  {
    myX: "1985",
    myY: "6.91"
  },
  {
    myX: "1986",
    myY: "7.53"
  },
  {
    myX: "1987",
    myY: "7.47"
  },
  {
    myX: "1988",
    myY: "7.48"
  },
  {
    myX: "1989",
    myY: "7.03"
  },
  {
    myX: "1990",
    myY: "6.23"
  },
  {
    myX: "1991",
    myY: "6.54"
  },
  {
    myX: "1992",
    myY: "7.54"
  },
  {
    myX: "1993",
    myY: "6.5"
  },
  {
    myX: "1994",
    myY: "7.18"
  },
  {
    myX: "1995",
    myY: "6.12"
  },
  {
    myX: "1996",
    myY: "7.87"
  },
  {
    myX: "1997",
    myY: "6.73"
  },
  {
    myX: "1998",
    myY: "6.55"
  },
  {
    myX: "1999",
    myY: "6.23"
  },
  {
    myX: "2000",
    myY: "6.31"
  },
  {
    myX: "2001",
    myY: "6.74"
  },
  {
    myX: "2002",
    myY: "5.95"
  },
  {
    myX: "2003",
    myY: "6.13"
  },
  {
    myX: "2004",
    myY: "6.04"
  },
  {
    myX: "2005",
    myY: "5.56"
  },
  {
    myX: "2006",
    myY: "5.91"
  },
  {
    myX: "2007",
    myY: "4.29"
  },
  {
    myX: "2008",
    myY: "4.72"
  },
  {
    myX: "2009",
    myY: "5.38"
  },
  {
    myX: "2010",
    myY: "4.92"
  },
  {
    myX: "2011",
    myY: "4.61"
  },
  {
    myX: "2012",
    myY: "3.62"
  },
  {
    myX: "2013",
    myY: "5.35"
  },
  {
    myX: "2014",
    myY: "5.28"
  },
  {
    myX: "2015",
    myY: "4.63"
  },
  {
    myX: "2016",
    myY: "4.72"
  }
];
function _page($$payload, $$props) {
  push();
  const xKey = "myX";
  const yKey = "myY";
  data.forEach((d) => {
    d[yKey] = +d[yKey];
  });
  $$payload.out += `<main><div class="chart-container svelte-1xiitt5">`;
  LayerCake($$payload, {
    padding: { top: 8, right: 10, bottom: 20, left: 25 },
    x: xKey,
    y: yKey,
    yDomain: [0, null],
    data,
    children: ($$payload2) => {
      Svg($$payload2, {
        children: ($$payload3) => {
          AxisX($$payload3, {});
          $$payload3.out += `<!----> `;
          AxisY($$payload3, { ticks: 4 });
          $$payload3.out += `<!----> `;
          Line($$payload3, {});
          $$payload3.out += `<!----> `;
          Area($$payload3, {});
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> `;
  Button($$payload, {
    class: "uppercase",
    variant: "outline",
    color: "primary",
    children: ($$payload2) => {
      $$payload2.out += `<!---->outline`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Button($$payload, {
    onclick: () => {
      console.log("clicked");
    },
    children: ($$payload2) => {
      $$payload2.out += `<!---->Click here`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></main>`;
  pop();
}
export {
  _page as default
};
