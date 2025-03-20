import { S as setContext, a6 as getContext, a5 as sanitize_slots, V as sanitize_props, Q as push, X as fallback, ag as add_styles, a4 as attr, ai as merge_styles, ah as to_class, $ as clsx, Z as slot, ac as ensure_array_like, a7 as escape_html, a0 as bind_props, T as pop, _ as spread_attributes, ad as stringify, W as rest_props, Y as element, a3 as spread_props } from "./index.js";
import { cls } from "@layerstack/tailwind";
import { uniqueId } from "@layerstack/utils";
import { w as writable, d as derived } from "./index3.js";
import { buildFormatters } from "@layerstack/utils/format";
import { getAllKnownLocales, localeStore } from "@layerstack/utils/locale";
import "./TextField.svelte_svelte_type_style_lang.js";
import { browser } from "@layerstack/utils/env";
import { isLiteralObject } from "@layerstack/utils/object";
import "@layerstack/utils/serialize";
import "@layerstack/utils/rollup";
import "clsx";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
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
function createLocaleStores(settings2) {
  if (settings2.locale && settings2.localeSettings && settings2.format) {
    return {
      locale: settings2.locale,
      localeSettings: settings2.localeSettings,
      format: settings2.format
    };
  }
  let allLocales = getAllKnownLocales(settings2.localeFormats);
  let locale = localeStore(settings2.forceLocale, settings2.fallbackLocale);
  let localeSettings = derived(locale, ($locale) => {
    let settings3 = allLocales[$locale];
    if (settings3) {
      return settings3;
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
function settings(settings2 = {}) {
  const lightThemes = settings2.themes ? settings2.themes.light ?? [] : ["light"];
  const darkThemes = settings2.themes ? settings2.themes.dark ?? [] : ["dark"];
  const currentTheme = (
    // In some cases, `settings` is called again from inside a component. Don't create a new theme store in this case.
    settings2.currentTheme ?? createThemeStore({
      dark: darkThemes
    })
  );
  const localeStores = createLocaleStores(settings2);
  const showDrawer = createShowDrawer();
  return setContext(settingsKey, {
    ...settings2,
    themes: {
      light: lightThemes,
      dark: darkThemes
    },
    currentTheme,
    componentSettingsCache: {},
    showDrawer,
    ...localeStores
  });
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
function resolveComponentSettings(settings2, name) {
  const { classes: themeClasses, ...defaultProps } = settings2?.components?.[name] ?? {};
  const classes = resolveComponentClasses(themeClasses);
  const output = {
    defaults: defaultProps ?? {},
    classes
  };
  return output;
}
function getComponentSettings(name) {
  const settings2 = getSettings();
  const existing = settings2.componentSettingsCache[name];
  if (existing) {
    return existing;
  }
  const output = resolveComponentSettings(settings2, name);
  settings2.componentSettingsCache[name] = output;
  return output;
}
function resolveComponentClasses(theme) {
  return typeof theme === "string" ? { root: theme } : theme ?? {};
}
function getComponentClasses(name) {
  const settings2 = getSettings();
  return resolveComponentClasses(settings2?.components?.[name]?.classes);
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
  let data = fallback($$props["data"], void 0);
  let svg = fallback($$props["svg"], void 0);
  let svgUrl = fallback($$props["svgUrl"], void 0);
  let title = fallback($$props["title"], void 0);
  let desc = fallback($$props["desc"], void 0);
  let titleId = fallback($$props["titleId"], () => title ? uniqueId("title-") : "", true);
  let descId = fallback($$props["descId"], () => desc ? uniqueId("desc-") : "", true);
  let classes = fallback($$props["classes"], () => ({}), true);
  const settingsClasses = getComponentClasses("Icon");
  isLabelled = title || desc;
  if (typeof data === "object" && data && "icon" in data) {
    const [
      _width,
      _height,
      _ligatures,
      _unicode,
      _path
    ] = data.icon;
    viewBox = `0 0 ${_width} ${_height}`;
    path = _path;
    width = "1.0rem";
    height = "1.0rem";
  } else if (typeof data === "string") {
    const dataStr = data.toLowerCase();
    if (dataStr.includes("<svg")) {
      svg = data;
    } else if (dataStr.includes("http")) {
      svgUrl = data;
    } else {
      path = data;
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
    data,
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
function setButtonGroup(value) {
  setContext(buttonGroupKey, value);
}
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
export {
  Button as B,
  Icon as I,
  getComponentSettings as a,
  settings as b,
  getSettings as c,
  getComponentClasses as g,
  html as h,
  setButtonGroup as s
};
