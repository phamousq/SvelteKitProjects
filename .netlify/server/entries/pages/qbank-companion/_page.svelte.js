import { ab as noop, ai as current_component, V as sanitize_props, W as rest_props, a1 as getContext, X as fallback, $ as spread_attributes, a0 as clsx, _ as slot, Y as element, Z as bind_props, T as pop, Q as push, a2 as escape_html, a6 as attr, af as stringify, a8 as store_get, a9 as unsubscribe_stores, aj as store_set, S as setContext, ae as add_styles, a7 as sanitize_slots, aa as invalid_default_snippet, a5 as spread_props, ac as ensure_array_like, a3 as copy_payload, a4 as assign_payload } from "../../../chunks/index.js";
import { twMerge } from "tailwind-merge";
import { l as linear$1, c as cubicOut, a as cubicInOut, b as cubicIn, d as sineOut } from "../../../chunks/index4.js";
import { w as writable, d as derived } from "../../../chunks/index3.js";
import "clsx";
import { L as LayerCake } from "../../../chunks/matchMedia.js";
import { scaleOrdinal, scaleLinear, scaleBand, scaleTime } from "d3-scale";
import { curveLinearClosed, lineRadial, line, pointRadial, areaRadial, area, curveBumpX, curveBumpY, link, stack, stackOffsetExpand, stackOffsetDiverging, stackOffsetNone, arc, pie } from "d3-shape";
import { extent, max, min, bisector, range, quantile, sum } from "d3-array";
import { unique, uniqueId, Logger, localPoint, sortFunc, isLiteralObject, format, greatestAbs, notNull, formatDate, PeriodType } from "@layerstack/utils";
import { cls } from "@layerstack/tailwind";
import "@layerstack/utils/env";
import { objectId } from "@layerstack/utils/object";
import "@layerstack/utils/serialize";
import "@layerstack/utils/rollup";
import { interpolatePath } from "d3-interpolate-path";
import { get, memoize, merge } from "lodash-es";
import { quadtree } from "d3-quadtree";
import { Delaunay } from "d3-delaunay";
import { geoVoronoi } from "d3-geo-voronoi";
import { geoPath, geoTransform } from "d3-geo";
import { path } from "d3-path";
import { quantize, interpolate, interpolateRound } from "d3-interpolate";
import "@dagrejs/dagre";
import "d3-tile";
import "d3-sankey";
import { timeYear, timeMonth, timeDay, timeHour, timeMinute, timeSecond, timeMillisecond, timeWeek } from "d3-time";
import { format as format$1 } from "date-fns";
const now = () => Date.now();
const raf = {
  // don't access requestAnimationFrame eagerly outside method
  // this allows basic testing of user code without JSDOM
  // bunder will eval and remove ternary when the user's app is built
  tick: (
    /** @param {any} _ */
    (_) => noop()
  ),
  now: () => now(),
  tasks: /* @__PURE__ */ new Set()
};
function loop(callback) {
  let task;
  if (raf.tasks.size === 0) ;
  return {
    promise: new Promise((fulfill) => {
      raf.tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      raf.tasks.delete(task);
    }
  };
}
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
async function tick() {
}
const linear = (x) => x;
function fade(node, { delay = 0, duration = 400, easing = linear } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
function Button($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "pill",
    "outline",
    "size",
    "href",
    "type",
    "color",
    "shadow",
    "tag",
    "checked",
    "disabled"
  ]);
  push();
  const group = getContext("group");
  let pill = fallback($$props["pill"], false);
  let outline = fallback($$props["outline"], false);
  let size = fallback($$props["size"], group ? "sm" : "md");
  let href = fallback($$props["href"], () => void 0, true);
  let type = fallback($$props["type"], "button");
  let color = fallback($$props["color"], group ? outline ? "dark" : "alternative" : "primary");
  let shadow = fallback($$props["shadow"], false);
  let tag = fallback($$props["tag"], "button");
  let checked = fallback($$props["checked"], () => void 0, true);
  let disabled = fallback($$props["disabled"], false);
  const colorClasses = {
    alternative: "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 hover:text-primary-700 focus-within:text-primary-700 dark:focus-within:text-white dark:hover:text-white dark:hover:bg-gray-700",
    blue: "text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700",
    dark: "text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700",
    green: "text-white bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700",
    light: "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600",
    primary: "text-white bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700",
    purple: "text-white bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700",
    red: "text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700",
    yellow: "text-white bg-yellow-400 hover:bg-yellow-500 ",
    none: ""
  };
  const colorCheckedClasses = {
    alternative: "text-primary-700 border dark:text-primary-500 bg-gray-100 dark:bg-gray-700 border-gray-300 shadow-gray-300 dark:shadow-gray-800 shadow-inner",
    blue: "text-blue-900 bg-blue-400 dark:bg-blue-500 shadow-blue-700 dark:shadow-blue-800 shadow-inner",
    dark: "text-white bg-gray-500 dark:bg-gray-600 shadow-gray-800 dark:shadow-gray-900 shadow-inner",
    green: "text-green-900 bg-green-400 dark:bg-green-500 shadow-green-700 dark:shadow-green-800 shadow-inner",
    light: "text-gray-900 bg-gray-100 border border-gray-300 dark:bg-gray-500 dark:text-gray-900 dark:border-gray-700 shadow-gray-300 dark:shadow-gray-700 shadow-inner",
    primary: "text-primary-900 bg-primary-400 dark:bg-primary-500 shadow-primary-700 dark:shadow-primary-800 shadow-inner",
    purple: "text-purple-900 bg-purple-400 dark:bg-purple-500 shadow-purple-700 dark:shadow-purple-800 shadow-inner",
    red: "text-red-900 bg-red-400 dark:bg-red-500 shadow-red-700 dark:shadow-red-800 shadow-inner",
    yellow: "text-yellow-900 bg-yellow-300 dark:bg-yellow-400 shadow-yellow-500 dark:shadow-yellow-700 shadow-inner",
    none: ""
  };
  const coloredFocusClasses = {
    alternative: "focus-within:ring-gray-200 dark:focus-within:ring-gray-700",
    blue: "focus-within:ring-blue-300 dark:focus-within:ring-blue-800",
    dark: "focus-within:ring-gray-300 dark:focus-within:ring-gray-700",
    green: "focus-within:ring-green-300 dark:focus-within:ring-green-800",
    light: "focus-within:ring-gray-200 dark:focus-within:ring-gray-700",
    primary: "focus-within:ring-primary-300 dark:focus-within:ring-primary-800",
    purple: "focus-within:ring-purple-300 dark:focus-within:ring-purple-900",
    red: "focus-within:ring-red-300 dark:focus-within:ring-red-900",
    yellow: "focus-within:ring-yellow-300 dark:focus-within:ring-yellow-900",
    none: ""
  };
  const coloredShadowClasses = {
    alternative: "shadow-gray-500/50 dark:shadow-gray-800/80",
    blue: "shadow-blue-500/50 dark:shadow-blue-800/80",
    dark: "shadow-gray-500/50 dark:shadow-gray-800/80",
    green: "shadow-green-500/50 dark:shadow-green-800/80",
    light: "shadow-gray-500/50 dark:shadow-gray-800/80",
    primary: "shadow-primary-500/50 dark:shadow-primary-800/80",
    purple: "shadow-purple-500/50 dark:shadow-purple-800/80",
    red: "shadow-red-500/50 dark:shadow-red-800/80 ",
    yellow: "shadow-yellow-500/50 dark:shadow-yellow-800/80 ",
    none: ""
  };
  const outlineClasses = {
    alternative: "text-gray-900 dark:text-gray-400 hover:text-white border border-gray-800 hover:bg-gray-900 focus-within:bg-gray-900 focus-within:text-white focus-within:ring-gray-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600 dark:focus-within:ring-gray-800",
    blue: "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600",
    dark: "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus-within:bg-gray-900 focus-within:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600",
    green: "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600",
    light: "text-gray-500 hover:text-gray-900 bg-white border border-gray-200 dark:border-gray-600 dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600",
    primary: "text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-700 dark:border-primary-500 dark:text-primary-500 dark:hover:text-white dark:hover:bg-primary-600",
    purple: "text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500",
    red: "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600",
    yellow: "text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400",
    none: ""
  };
  const sizeClasses = {
    xs: "px-3 py-2 text-xs",
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
    xl: "px-6 py-3.5 text-base"
  };
  const hasBorder = () => outline || color === "alternative" || color === "light";
  let buttonClass;
  buttonClass = twMerge("text-center font-medium", group ? "focus-within:ring-2" : "focus-within:ring-4", group && "focus-within:z-10", group || "focus-within:outline-hidden", "inline-flex items-center justify-center " + sizeClasses[size], outline && checked && "border dark:border-gray-900", outline && checked && colorCheckedClasses[color], outline && !checked && outlineClasses[color], !outline && checked && colorCheckedClasses[color], !outline && !checked && colorClasses[color], color === "alternative" && (group && !checked ? "dark:bg-gray-700 dark:text-white dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-600" : "dark:bg-transparent dark:border-gray-600 dark:hover:border-gray-600"), outline && color === "dark" && (group ? checked ? "bg-gray-900 border-gray-800 dark:border-white dark:bg-gray-600" : "dark:text-white border-gray-800 dark:border-white" : "dark:text-gray-400 dark:border-gray-700"), coloredFocusClasses[color], hasBorder() && group && "not-first:-ms-px", group ? pill && "first:rounded-s-full last:rounded-e-full" || "first:rounded-s-lg last:rounded-e-lg" : pill && "rounded-full" || "rounded-lg", shadow && "shadow-lg", shadow && coloredShadowClasses[color], disabled && "cursor-not-allowed opacity-50", $$sanitized_props.class);
  if (href && !disabled) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<a${spread_attributes(
      {
        href,
        ...$$restProps,
        class: clsx(buttonClass),
        role: "button"
      },
      null
    )}><!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!----></a>`;
  } else {
    $$payload.out += "<!--[!-->";
    if (tag === "label") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<label${spread_attributes(
        {
          ...$$restProps,
          class: clsx(buttonClass)
        },
        null
      )}><!---->`;
      slot($$payload, $$props, "default", {}, null);
      $$payload.out += `<!----></label>`;
    } else {
      $$payload.out += "<!--[!-->";
      if (tag === "button") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<button${spread_attributes(
          {
            type,
            ...$$restProps,
            disabled,
            class: clsx(buttonClass)
          },
          null
        )}><!---->`;
        slot($$payload, $$props, "default", {}, null);
        $$payload.out += `<!----></button>`;
      } else {
        $$payload.out += "<!--[!-->";
        element(
          $$payload,
          tag,
          () => {
            $$payload.out += `${spread_attributes(
              {
                ...$$restProps,
                class: clsx(buttonClass)
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
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    pill,
    outline,
    size,
    href,
    type,
    color,
    shadow,
    tag,
    checked,
    disabled
  });
  pop();
}
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring2 = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring2 - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map(
      (_, i) => (
        // @ts-ignore
        tick_spring(ctx, last_value[i], current_value[i], target_value[i])
      )
    );
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
function spring(value, opts = {}) {
  const store = writable(value);
  const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
  let last_time;
  let task;
  let current_token;
  let last_value = (
    /** @type {T} */
    value
  );
  let target_value = (
    /** @type {T | undefined} */
    value
  );
  let inv_mass = 1;
  let inv_mass_recovery_rate = 0;
  let cancel_task = false;
  function set(new_value, opts2 = {}) {
    target_value = new_value;
    const token = current_token = {};
    if (value == null || opts2.hard || spring2.stiffness >= 1 && spring2.damping >= 1) {
      cancel_task = true;
      last_time = raf.now();
      last_value = new_value;
      store.set(value = target_value);
      return Promise.resolve();
    } else if (opts2.soft) {
      const rate = opts2.soft === true ? 0.5 : +opts2.soft;
      inv_mass_recovery_rate = 1 / (rate * 60);
      inv_mass = 0;
    }
    if (!task) {
      last_time = raf.now();
      cancel_task = false;
      task = loop((now2) => {
        if (cancel_task) {
          cancel_task = false;
          task = null;
          return false;
        }
        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
        const elapsed = Math.min(now2 - last_time, 1e3 / 30);
        const ctx = {
          inv_mass,
          opts: spring2,
          settled: true,
          dt: elapsed * 60 / 1e3
        };
        const next_value = tick_spring(ctx, last_value, value, target_value);
        last_time = now2;
        last_value = /** @type {T} */
        value;
        store.set(value = /** @type {T} */
        next_value);
        if (ctx.settled) {
          task = null;
        }
        return !ctx.settled;
      });
    }
    return new Promise((fulfil) => {
      task.promise.then(() => {
        if (token === current_token) fulfil();
      });
    });
  }
  const spring2 = {
    set,
    update: (fn, opts2) => set(fn(
      /** @type {T} */
      target_value,
      /** @type {T} */
      value
    ), opts2),
    subscribe: store.subscribe,
    stiffness,
    damping,
    precision
  };
  return spring2;
}
function get_interpolator(a, b) {
  if (a === b || a !== a) return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = (
      /** @type {Array<any>} */
      b.map((bi, i) => {
        return get_interpolator(
          /** @type {Array<any>} */
          a[i],
          bi
        );
      })
    );
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b) {
      throw new Error("Object cannot be null");
    }
    if (is_date(a) && is_date(b)) {
      const an = a.getTime();
      const bn = b.getTime();
      const delta = bn - an;
      return (t) => new Date(an + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = (
      /** @type {number} */
      b - /** @type {number} */
      a
    );
    return (t) => a + t * delta;
  }
  return () => b;
}
function tweened(value, defaults = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    target_value = new_value;
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    let previous_task = task;
    let started = false;
    let {
      delay = 0,
      duration = 400,
      easing = linear$1,
      interpolate: interpolate2 = get_interpolator
    } = { ...defaults, ...opts };
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = raf.now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start) return true;
      if (!started) {
        fn = interpolate2(
          /** @type {any} */
          value,
          new_value
        );
        if (typeof duration === "function")
          duration = duration(
            /** @type {any} */
            value,
            new_value
          );
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > /** @type {number} */
      duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(
      /** @type {any} */
      target_value,
      /** @type {any} */
      value
    ), opts),
    subscribe: store.subscribe
  };
}
function Progressbar($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "progress",
    "precision",
    "tweenDuration",
    "animate",
    "size",
    "labelInside",
    "labelOutside",
    "easing",
    "color",
    "labelInsideClass",
    "divClass",
    "progressClass",
    "classLabelOutside"
  ]);
  push();
  var $$store_subs;
  let progress = fallback($$props["progress"], "45");
  let precision = fallback($$props["precision"], 0);
  let tweenDuration = fallback($$props["tweenDuration"], 400);
  let animate = fallback($$props["animate"], false);
  let size = fallback($$props["size"], "h-2.5");
  let labelInside = fallback($$props["labelInside"], false);
  let labelOutside = fallback($$props["labelOutside"], "");
  let easing = fallback($$props["easing"], cubicOut);
  let color = fallback($$props["color"], "primary");
  let labelInsideClass = fallback($$props["labelInsideClass"], "text-primary-100 text-xs font-medium text-center p-0.5 leading-none rounded-full");
  let divClass = fallback($$props["divClass"], "w-full bg-gray-200 rounded-full dark:bg-gray-700");
  let progressClass = fallback($$props["progressClass"], "");
  let classLabelOutside = fallback($$props["classLabelOutside"], "");
  const _progress = tweened(0, { duration: animate ? tweenDuration : 0, easing });
  const barColors = {
    primary: "bg-primary-600",
    blue: "bg-blue-600",
    gray: "bg-gray-600 dark:bg-gray-300",
    red: "bg-red-600 dark:bg-red-500",
    green: "bg-green-600 dark:bg-green-500",
    yellow: "bg-yellow-400",
    purple: "bg-purple-600 dark:bg-purple-500",
    indigo: "bg-indigo-600 dark:bg-indigo-500"
  };
  _progress.set(Number(progress));
  if (labelOutside) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${spread_attributes(
      {
        ...$$restProps,
        class: clsx(twMerge("flex justify-between mb-1", classLabelOutside))
      },
      null
    )}><span class="text-base font-medium text-blue-700 dark:text-white">${escape_html(labelOutside)}</span> <span class="text-sm font-medium text-blue-700 dark:text-white">${escape_html(progress)}%</span></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div${attr("class", clsx(twMerge(divClass, size, $$sanitized_props.class)))}>`;
  if (labelInside) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr("class", clsx(twMerge(barColors[color], labelInsideClass)))}${attr("style", `width: ${stringify(store_get($$store_subs ??= {}, "$_progress", _progress))}%`)}>${escape_html(store_get($$store_subs ??= {}, "$_progress", _progress).toFixed(precision))}%</div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${attr("class", clsx(twMerge(barColors[color], size, "rounded-full", progressClass)))}${attr("style", `width: ${stringify(store_get($$store_subs ??= {}, "$_progress", _progress))}%`)}></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    progress,
    precision,
    tweenDuration,
    animate,
    size,
    labelInside,
    labelOutside,
    easing,
    color,
    labelInsideClass,
    divClass,
    progressClass,
    classLabelOutside
  });
  pop();
}
function raise(el) {
  if (el.nextSibling) el.parentNode.appendChild(el);
}
function uniqueStore(initialValues) {
  const store = writable(new Set(initialValues ?? []));
  return {
    ...store,
    add(value) {
      store.update((set) => {
        set.add(value);
        return set;
      });
    },
    addEach(values) {
      store.update((set) => {
        values.forEach((value) => set.add(value));
        return set;
      });
    },
    delete(value) {
      store.update((set) => {
        set.delete(value);
        return set;
      });
    },
    toggle(value) {
      store.update((set) => {
        if (set.has(value)) {
          set.delete(value);
        } else {
          set.add(value);
        }
        return set;
      });
    }
  };
}
function selectionStore(props = {}) {
  const selected = uniqueStore(props.initial ?? []);
  const all = writable(props.all ?? []);
  const single = props.single ?? false;
  const max2 = props.max;
  return derived([selected, all], ([$selected, $all]) => {
    function setSelected(values) {
      selected.update(($selected2) => {
        if (max2 == null || values.length < max2) {
          return new Set(values);
        } else {
          return $selected2;
        }
      });
    }
    function toggleSelected(value) {
      selected.update(($selected2) => {
        if ($selected2.has(value)) {
          return new Set([...$selected2].filter((v) => v != value));
        } else if (single) {
          return /* @__PURE__ */ new Set([value]);
        } else {
          if (max2 == null || $selected2.size < max2) {
            return $selected2.add(value);
          } else {
            return $selected2;
          }
        }
      });
    }
    function toggleAll() {
      let values;
      if (isAllSelected()) {
        values = [...$selected].filter((v) => !$all.includes(v));
      } else {
        values = [...$selected, ...$all];
      }
      selected.set(new Set(values));
    }
    function isSelected(value) {
      return $selected.has(value);
    }
    function isAllSelected() {
      return $all.every((v) => $selected.has(v));
    }
    function isAnySelected() {
      return $all.some((v) => $selected.has(v));
    }
    function isMaxSelected() {
      return max2 != null ? $selected.size >= max2 : false;
    }
    function isDisabled(value) {
      return !isSelected(value) && isMaxSelected();
    }
    function clear() {
      selected.set(/* @__PURE__ */ new Set());
    }
    function reset() {
      selected.set(new Set(props.initial ?? []));
    }
    const selectedArr = [...$selected.values()];
    return {
      selected: single ? selectedArr[0] ?? null : selectedArr,
      setSelected,
      toggleSelected,
      isSelected,
      isDisabled,
      toggleAll,
      isAllSelected,
      isAnySelected,
      isMaxSelected,
      clear,
      reset,
      all
    };
  });
}
function motionStore(value, options) {
  if (options.spring) {
    return spring(value, options.spring === true ? void 0 : options.spring);
  } else if (options.tweened) {
    return tweened(value, options.tweened === true ? void 0 : options.tweened);
  } else {
    return writable(value);
  }
}
function resolveOptions(prop, options) {
  return {
    spring: typeof options.spring === "boolean" || options.spring == null ? options.spring : prop in options.spring ? (
      //@ts-expect-error
      options.spring[prop]
    ) : Object.keys(options.spring).some((key) => ["precision", "damping", "stiffness"].includes(key)) ? options.tweened : false,
    tweened: typeof options.tweened === "boolean" || options.tweened == null ? options.tweened : prop in options.tweened ? (
      //@ts-expect-error
      options.tweened[prop]
    ) : Object.keys(options.tweened).some((key) => ["delay", "duration", "easing"].includes(key)) ? options.tweened : false
  };
}
function motionFinishHandler() {
  let latestIndex = 0;
  const moving = writable(false);
  const handle = function(promise) {
    latestIndex += 1;
    if (!promise) {
      moving.set(false);
      return;
    }
    let thisIndex = latestIndex;
    moving.set(true);
    promise.then(() => {
      if (thisIndex === latestIndex) {
        moving.set(false);
      }
    });
  };
  return {
    subscribe: moving.subscribe,
    handle
  };
}
function accessor(prop) {
  if (Array.isArray(prop)) {
    return (d) => prop.map((p) => accessor(p)(d));
  } else if (typeof prop === "function") {
    return prop;
  } else if (typeof prop === "string" || typeof prop === "number") {
    return (d) => get(d, prop);
  } else {
    return (d) => d;
  }
}
function chartDataArray(data) {
  if (data == null) {
    return [];
  } else if (Array.isArray(data)) {
    return data;
  } else if ("nodes" in data) {
    return data.nodes;
  } else {
    return data.descendants();
  }
}
function defaultChartPadding(axis, legend) {
  if (axis === false) {
    return void 0;
  } else {
    return {
      top: axis === true || axis === "y" ? 4 : 0,
      left: axis === true || axis === "y" ? 20 : 0,
      bottom: (axis === true || axis === "x" ? 20 : 0) + (legend === true ? 32 : 0),
      right: axis === true || axis === "x" ? 4 : 0
    };
  }
}
function findRelatedData(data, original, accessor2) {
  return data.find((d) => {
    return accessor2(d)?.valueOf() === accessor2(original)?.valueOf();
  });
}
function scaleBandInvert(scale) {
  const domain = scale.domain();
  const eachBand = scale.step();
  const paddingOuter = eachBand * (scale.paddingOuter?.() ?? scale.padding());
  return function(value) {
    const index = Math.floor((value - paddingOuter / 2) / eachBand);
    return domain[Math.max(0, Math.min(index, domain.length - 1))];
  };
}
function isScaleBand(scale) {
  return typeof scale.bandwidth === "function";
}
function scaleInvert(scale, value) {
  if (isScaleBand(scale)) {
    return scaleBandInvert(scale)(value);
  } else {
    return scale.invert?.(value);
  }
}
function createScale(scale, domain, range2, context) {
  const scaleCopy = scale.copy();
  if (domain) {
    scaleCopy.domain(domain);
  }
  if (typeof range2 === "function") {
    scaleCopy.range(range2(context));
  } else {
    scaleCopy.range(range2);
  }
  return scaleCopy;
}
const chartContextKey = Symbol();
function chartContext() {
  return getContext(chartContextKey);
}
function setChartContext(context) {
  setContext(chartContextKey, context);
}
function ChartContext($$payload, $$props) {
  push();
  var $$store_subs;
  let addtConfig;
  let x1 = fallback($$props["x1"], void 0);
  let x1Scale = fallback($$props["x1Scale"], void 0);
  let x1Domain = fallback($$props["x1Domain"], void 0);
  let x1Range = fallback($$props["x1Range"], void 0);
  let y1 = fallback($$props["y1"], void 0);
  let y1Scale = fallback($$props["y1Scale"], void 0);
  let y1Domain = fallback($$props["y1Domain"], void 0);
  let y1Range = fallback($$props["y1Range"], void 0);
  let c = fallback($$props["c"], void 0);
  let cScale = fallback($$props["cScale"], void 0);
  let cDomain = fallback($$props["cDomain"], void 0);
  let cRange = fallback($$props["cRange"], void 0);
  const layerCakeContext = getContext("LayerCake");
  const {
    data: contextData,
    width,
    height,
    containerWidth,
    containerHeight,
    xScale,
    yScale
  } = layerCakeContext;
  const _x1 = writable(accessor(x1));
  const _x1Scale = writable(null);
  const _x1Domain = writable(x1Domain);
  const _x1Range = writable(x1Range);
  const _x1Get = writable();
  const _y1 = writable(accessor(y1));
  const _y1Scale = writable(null);
  const _y1Domain = writable(y1Domain);
  const _y1Range = writable(y1Range);
  const _y1Get = writable();
  const _c = writable(accessor(c));
  const _cScale = writable(scaleOrdinal());
  const _cDomain = writable(cDomain);
  const _cRange = writable(cRange);
  const _cGet = writable();
  let radial = fallback($$props["radial"], false);
  const _radial = writable(radial);
  const _addtConfig = writable(addtConfig);
  const config = derived([layerCakeContext.config, _addtConfig], ([$config, $addtConfig]) => {
    return { ...$config, ...$addtConfig };
  });
  const chartContext2 = {
    ...layerCakeContext,
    x1: _x1,
    x1Domain: _x1Domain,
    x1Range: _x1Range,
    x1Scale: _x1Scale,
    x1Get: _x1Get,
    y1: _y1,
    y1Domain: _y1Domain,
    y1Range: _y1Range,
    y1Scale: _y1Scale,
    y1Get: _y1Get,
    c: _c,
    cDomain: _cDomain,
    cRange: _cRange,
    cScale: _cScale,
    cGet: _cGet,
    config,
    radial: _radial
  };
  setChartContext(chartContext2);
  let onresize = fallback($$props["onresize"], void 0);
  let data = fallback($$props["data"], () => [], true);
  store_set(_x1, accessor(x1));
  store_set(_x1Domain, x1Domain ?? extent(chartDataArray(store_get($$store_subs ??= {}, "$contextData", contextData)), store_get($$store_subs ??= {}, "$_x1", _x1)));
  store_set(_x1Scale, x1Scale && x1Range ? createScale(x1Scale, store_get($$store_subs ??= {}, "$_x1Domain", _x1Domain), x1Range, {
    xScale: store_get($$store_subs ??= {}, "$xScale", xScale),
    $width: store_get($$store_subs ??= {}, "$width", width),
    $height: store_get($$store_subs ??= {}, "$height", height)
  }) : null);
  store_set(_x1Range, x1Range);
  store_set(_x1Get, (d) => store_get($$store_subs ??= {}, "$_x1Scale", _x1Scale)?.(store_get($$store_subs ??= {}, "$_x1", _x1)(d)));
  store_set(_y1, accessor(y1));
  store_set(_y1Domain, y1Domain ?? extent(chartDataArray(store_get($$store_subs ??= {}, "$contextData", contextData)), store_get($$store_subs ??= {}, "$_y1", _y1)));
  store_set(_y1Range, y1Range);
  store_set(_y1Scale, y1Scale && y1Range ? createScale(y1Scale, store_get($$store_subs ??= {}, "$_y1Domain", _y1Domain), y1Range, {
    yScale: store_get($$store_subs ??= {}, "$yScale", yScale),
    $width: store_get($$store_subs ??= {}, "$width", width),
    $height: store_get($$store_subs ??= {}, "$height", height)
  }) : null);
  store_set(_y1Get, (d) => store_get($$store_subs ??= {}, "$_y1Scale", _y1Scale)?.(store_get($$store_subs ??= {}, "$_y1", _y1)(d)));
  store_set(_c, accessor(c));
  store_set(_cDomain, cDomain ?? unique(chartDataArray(store_get($$store_subs ??= {}, "$contextData", contextData)).map(store_get($$store_subs ??= {}, "$_c", _c))));
  store_set(_cRange, cRange);
  store_set(_cScale, cRange ? createScale(cScale ?? scaleOrdinal(), store_get($$store_subs ??= {}, "$_cDomain", _cDomain), cRange, {
    $width: store_get($$store_subs ??= {}, "$width", width),
    $height: store_get($$store_subs ??= {}, "$height", height)
  }) : null);
  store_set(_cGet, (d) => store_get($$store_subs ??= {}, "$_cScale", _cScale)?.(store_get($$store_subs ??= {}, "$_c", _c)(d)));
  store_set(_radial, radial);
  addtConfig = {
    ...x1 && { x1 },
    ...x1Domain && { x1Domain },
    ...x1Range && { x1Range },
    ...x1Scale && { x1Scale },
    ...y1 && { y1 },
    ...y1Domain && { y1Domain },
    ...y1Range && { y1Range },
    ...y1Scale && { y1Scale },
    ...c && { c },
    ...cDomain && { cDomain },
    ...cRange && { cRange },
    ...cScale && { cScale }
  };
  store_set(_addtConfig, addtConfig);
  $$payload.out += `<!---->`;
  slot(
    $$payload,
    $$props,
    "default",
    {
      data,
      flatData: chartContext2.data,
      config: store_get($$store_subs ??= {}, "$config", config),
      x1: store_get($$store_subs ??= {}, "$_x1", _x1),
      x1Scale: store_get($$store_subs ??= {}, "$_x1Scale", _x1Scale),
      x1Get: store_get($$store_subs ??= {}, "$_x1Get", _x1Get),
      y1: store_get($$store_subs ??= {}, "$_y1", _y1),
      y1Scale: store_get($$store_subs ??= {}, "$_y1Scale", _y1Scale),
      y1Get: store_get($$store_subs ??= {}, "$_y1Get", _y1Get),
      c: store_get($$store_subs ??= {}, "$_c", _c),
      cScale: store_get($$store_subs ??= {}, "$_cScale", _cScale),
      cGet: store_get($$store_subs ??= {}, "$_cGet", _cGet)
    },
    null
  );
  $$payload.out += `<!---->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    x1,
    x1Scale,
    x1Domain,
    x1Range,
    y1,
    y1Scale,
    y1Domain,
    y1Range,
    c,
    cScale,
    cDomain,
    cRange,
    radial,
    onresize,
    data
  });
  pop();
}
const transformContextKey = Symbol();
const defaultTranslate = writable({ x: 0, y: 0 });
const defaultScale = writable(1);
const defaultContext$1 = {
  mode: "none",
  scale: defaultScale,
  setScale: defaultScale.set,
  translate: defaultTranslate,
  setTranslate: defaultTranslate.set,
  moving: writable(false),
  dragging: writable(false),
  scrollMode: writable("none"),
  setScrollMode: () => {
  },
  reset: () => {
  },
  zoomIn: () => {
  },
  zoomOut: () => {
  },
  translateCenter: () => {
  },
  zoomTo: () => {
  }
};
function transformContext() {
  return getContext(transformContextKey) ?? defaultContext$1;
}
function setTransformContext(transform) {
  setContext(transformContextKey, transform);
}
function TransformContext($$payload, $$props) {
  push();
  var $$store_subs;
  let center;
  const { width, height, padding } = chartContext();
  let mode = fallback($$props["mode"], "none");
  let spring2 = fallback($$props["spring"], void 0);
  let tweened2 = fallback($$props["tweened"], void 0);
  let processTranslate = fallback($$props["processTranslate"], (x, y, deltaX, deltaY) => {
    return { x: x + deltaX, y: y + deltaY };
  });
  let disablePointer = fallback($$props["disablePointer"], false);
  let initialScrollMode = fallback($$props["initialScrollMode"], "none");
  let clickDistance = fallback($$props["clickDistance"], 10);
  let ondragstart = fallback($$props["ondragstart"], void 0);
  let ondragend = fallback($$props["ondragend"], void 0);
  let ontransform = fallback($$props["ontransform"], void 0);
  const dragging = writable(false);
  const scrollMode = writable(initialScrollMode);
  const DEFAULT_TRANSLATE = { x: 0, y: 0 };
  let initialTranslate = fallback($$props["initialTranslate"], void 0);
  const translate = motionStore(initialTranslate ?? DEFAULT_TRANSLATE, { spring: spring2, tweened: tweened2 });
  const DEFAULT_SCALE = 1;
  let initialScale = fallback($$props["initialScale"], void 0);
  const scale = motionStore(initialScale ?? DEFAULT_SCALE, { spring: spring2, tweened: tweened2 });
  function setScrollMode(mode2) {
    store_set(scrollMode, mode2);
  }
  function reset() {
    store_set(translate, initialTranslate ?? DEFAULT_TRANSLATE);
    store_set(scale, initialScale ?? DEFAULT_SCALE);
  }
  function zoomIn() {
    scaleTo(1.25, {
      x: (store_get($$store_subs ??= {}, "$width", width) + store_get($$store_subs ??= {}, "$padding", padding).left) / 2,
      y: (store_get($$store_subs ??= {}, "$height", height) + store_get($$store_subs ??= {}, "$padding", padding).top) / 2
    });
  }
  function zoomOut() {
    scaleTo(0.8, {
      x: (store_get($$store_subs ??= {}, "$width", width) + store_get($$store_subs ??= {}, "$padding", padding).left) / 2,
      y: (store_get($$store_subs ??= {}, "$height", height) + store_get($$store_subs ??= {}, "$padding", padding).top) / 2
    });
  }
  function translateCenter() {
    store_set(translate, { x: 0, y: 0 });
  }
  function zoomTo(center2, rect) {
    const newScale = rect ? store_get($$store_subs ??= {}, "$width", width) < store_get($$store_subs ??= {}, "$height", height) ? store_get($$store_subs ??= {}, "$width", width) / rect.width : store_get($$store_subs ??= {}, "$height", height) / rect.height : 1;
    store_set(translate, {
      x: store_get($$store_subs ??= {}, "$width", width) / 2 - center2.x * newScale,
      y: store_get($$store_subs ??= {}, "$height", height) / 2 - center2.y * newScale
    });
    if (rect) {
      store_set(scale, newScale);
    }
  }
  function scaleTo(value, point, options = void 0) {
    const currentScale = store_get($$store_subs ??= {}, "$scale", scale);
    const newScale = store_get($$store_subs ??= {}, "$scale", scale) * value;
    setScale(newScale, options);
    const invertTransformPoint = {
      x: (point.x - store_get($$store_subs ??= {}, "$padding", padding).left - store_get($$store_subs ??= {}, "$translate", translate).x) / currentScale,
      y: (point.y - store_get($$store_subs ??= {}, "$padding", padding).top - store_get($$store_subs ??= {}, "$translate", translate).y) / currentScale
    };
    const newTranslate = {
      x: point.x - store_get($$store_subs ??= {}, "$padding", padding).left - invertTransformPoint.x * newScale,
      y: point.y - store_get($$store_subs ??= {}, "$padding", padding).top - invertTransformPoint.y * newScale
    };
    setTranslate(newTranslate, options);
  }
  const translating = motionFinishHandler();
  const scaling = motionFinishHandler();
  const moving = derived([dragging, translating, scaling], ([dragging2, translating2, scaling2]) => dragging2 || translating2 || scaling2);
  function setTranslate(point, options) {
    translating.handle(translate.set(point, options));
  }
  function setScale(value, options) {
    scaling.handle(scale.set(value, options));
  }
  setTransformContext({
    mode,
    scale,
    setScale,
    translate,
    setTranslate,
    dragging,
    moving,
    reset,
    zoomIn,
    zoomOut,
    translateCenter,
    zoomTo,
    scrollMode,
    setScrollMode
  });
  center = {
    x: store_get($$store_subs ??= {}, "$width", width) / 2,
    y: store_get($$store_subs ??= {}, "$height", height) / 2
  };
  ({
    x: center.x - store_get($$store_subs ??= {}, "$translate", translate).x,
    y: center.y - store_get($$store_subs ??= {}, "$translate", translate).y
  });
  ontransform?.({
    scale: store_get($$store_subs ??= {}, "$scale", scale),
    translate: store_get($$store_subs ??= {}, "$translate", translate)
  });
  $$payload.out += `<div class="h-full"><!---->`;
  slot(
    $$payload,
    $$props,
    "default",
    {
      transform: {
        scale: store_get($$store_subs ??= {}, "$scale", scale),
        setScale,
        translate: store_get($$store_subs ??= {}, "$translate", translate),
        setTranslate,
        zoomTo,
        reset
      }
    },
    null
  );
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    mode,
    spring: spring2,
    tweened: tweened2,
    processTranslate,
    disablePointer,
    initialScrollMode,
    clickDistance,
    ondragstart,
    ondragend,
    ontransform,
    initialTranslate,
    initialScale,
    translate,
    scale,
    setScrollMode,
    reset,
    zoomIn,
    zoomOut,
    translateCenter,
    zoomTo,
    setTranslate,
    setScale
  });
  pop();
}
const geoContextKey = Symbol();
function geoContext() {
  return getContext(geoContextKey);
}
function setGeoContext(geo) {
  setContext(geoContextKey, geo);
}
function GeoContext($$payload, $$props) {
  push();
  var $$store_subs;
  let fitSizeRange;
  const { width, height } = chartContext();
  let projection = fallback($$props["projection"], void 0);
  let fitGeojson = fallback($$props["fitGeojson"], void 0);
  let fixedAspectRatio = fallback($$props["fixedAspectRatio"], void 0);
  let clipAngle = fallback($$props["clipAngle"], void 0);
  let clipExtent = fallback($$props["clipExtent"], void 0);
  let rotate = fallback($$props["rotate"], void 0);
  let scale = fallback($$props["scale"], void 0);
  let translate = fallback($$props["translate"], void 0);
  let center = fallback($$props["center"], void 0);
  let applyTransform = fallback($$props["applyTransform"], () => [], true);
  let reflectX = fallback($$props["reflectX"], void 0);
  let reflectY = fallback($$props["reflectY"], void 0);
  let geo = fallback($$props["geo"], () => writable(projection?.()), true);
  setGeoContext(geo);
  const {
    scale: transformScale,
    translate: transformTranslate
  } = transformContext();
  fitSizeRange = fixedAspectRatio ? [100, 100 / fixedAspectRatio] : [
    store_get($$store_subs ??= {}, "$width", width),
    store_get($$store_subs ??= {}, "$height", height)
  ];
  if (projection) {
    const _projection = projection();
    if (fitGeojson && "fitSize" in _projection) {
      _projection.fitSize(fitSizeRange, fitGeojson);
    }
    if ("scale" in _projection) {
      if (scale) {
        _projection.scale(scale);
      }
      if (applyTransform.includes("scale")) {
        _projection.scale(store_get($$store_subs ??= {}, "$transformScale", transformScale));
      }
    }
    if ("rotate" in _projection) {
      if (rotate) {
        _projection.rotate([rotate.yaw, rotate.pitch, rotate.roll]);
      }
      if (applyTransform.includes("rotate")) {
        _projection.rotate([
          store_get($$store_subs ??= {}, "$transformTranslate", transformTranslate).x,
          // yaw
          store_get($$store_subs ??= {}, "$transformTranslate", transformTranslate).y
          // pitch
        ]);
      }
    }
    if ("translate" in _projection) {
      if (translate) {
        _projection.translate(translate);
      }
      if (applyTransform.includes("translate")) {
        _projection.translate([
          store_get($$store_subs ??= {}, "$transformTranslate", transformTranslate).x,
          store_get($$store_subs ??= {}, "$transformTranslate", transformTranslate).y
        ]);
      }
    }
    if (center && "center" in _projection) {
      _projection.center(center);
    }
    if (reflectX) {
      _projection.reflectX(reflectX);
    }
    if (reflectY) {
      _projection.reflectY(reflectY);
    }
    if (clipAngle && "clipAngle" in _projection) {
      _projection.clipAngle(clipAngle);
    }
    if (clipExtent && "clipExtent" in _projection) {
      _projection.clipExtent(clipExtent);
    }
    geo.set(_projection);
  }
  $$payload.out += `<!---->`;
  slot(
    $$payload,
    $$props,
    "default",
    {
      projection: store_get($$store_subs ??= {}, "$geo", geo)
    },
    null
  );
  $$payload.out += `<!---->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    projection,
    fitGeojson,
    fixedAspectRatio,
    clipAngle,
    clipExtent,
    rotate,
    scale,
    translate,
    center,
    applyTransform,
    reflectX,
    reflectY,
    geo
  });
  pop();
}
function Svg($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
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
  let center = fallback($$props["center"], false);
  let ignoreTransform = fallback($$props["ignoreTransform"], false);
  const {
    containerWidth,
    containerHeight,
    width,
    height,
    padding
  } = chartContext();
  const { mode, scale, translate } = transformContext();
  let transform = "";
  setRenderContext("svg");
  if (mode === "canvas" && !ignoreTransform) {
    transform = `translate(${store_get($$store_subs ??= {}, "$translate", translate).x},${store_get($$store_subs ??= {}, "$translate", translate).y}) scale(${store_get($$store_subs ??= {}, "$scale", scale)})`;
  } else if (center) {
    transform = `translate(${center === "x" || center === true ? store_get($$store_subs ??= {}, "$width", width) / 2 : 0}, ${center === "y" || center === true ? store_get($$store_subs ??= {}, "$height", height) / 2 : 0})`;
  }
  $$payload.out += `<svg${add_styles({ "z-index": zIndex })}${attr("viewBox", viewBox)}${attr("width", store_get($$store_subs ??= {}, "$containerWidth", containerWidth))}${attr("height", store_get($$store_subs ??= {}, "$containerHeight", containerHeight))}${attr("class", clsx(cls("layercake-layout-svg", "absolute top-0 left-0 overflow-visible", pointerEvents === false && "pointer-events-none", $$sanitized_props.class)))}${attr("aria-label", label)}${attr("aria-labelledby", labelledBy)}${attr("aria-describedby", describedBy)} role="figure"><!---->`;
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
  $$payload.out += `<!----></defs><g class="layercake-layout-svg_g"${attr("transform", `translate(${stringify(store_get($$store_subs ??= {}, "$padding", padding).left)}, ${stringify(store_get($$store_subs ??= {}, "$padding", padding).top)})`)}>`;
  if (transform) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<g${attr("transform", transform)}><!---->`;
    slot($$payload, $$props, "default", { element: element2 }, null);
    $$payload.out += `<!----></g>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { element: element2 }, null);
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]--></g></svg>`;
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
    title,
    center,
    ignoreTransform
  });
  pop();
}
function ClipPath($$payload, $$props) {
  const $$slots = sanitize_slots($$props);
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["id", "useId", "disabled"]);
  push();
  let id = fallback($$props["id"], () => uniqueId("clipPath-"), true);
  let useId = fallback($$props["useId"], void 0);
  let disabled = fallback($$props["disabled"], false);
  $$payload.out += `<defs><clipPath${spread_attributes({ id, ...$$restProps }, null, void 0, void 0, 3)}><!---->`;
  slot($$payload, $$props, "clip", { id }, null);
  $$payload.out += `<!---->`;
  if (useId) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<use${attr("href", `#${stringify(useId)}`)}></use>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></clipPath></defs>`;
  if ($$slots.default) {
    $$payload.out += "<!--[-->";
    if (disabled) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<!---->`;
      slot($$payload, $$props, "default", {}, null);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<g${add_styles({ "clip-path": `url(#${stringify(id)})` })}><!---->`;
      slot(
        $$payload,
        $$props,
        "default",
        {
          id,
          url: `url(#${stringify(id)})`,
          useId
        },
        null
      );
      $$payload.out += `<!----></g>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { id, useId, disabled });
  pop();
}
const DEFAULT_FILL = "rgb(0, 0, 0)";
const CANVAS_STYLES_ELEMENT_ID = "__layerchart_canvas_styles_id";
function getComputedStyles(canvas, { styles, classes } = {}) {
  try {
    let svg = document.getElementById(CANVAS_STYLES_ELEMENT_ID);
    if (!svg) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("id", CANVAS_STYLES_ELEMENT_ID);
      svg.style.display = "none";
      canvas.after(svg);
    }
    svg = svg;
    svg.removeAttribute("style");
    svg.removeAttribute("class");
    if (styles) {
      Object.assign(svg.style, styles);
    }
    if (classes) {
      svg.setAttribute("class", cls(classes).split(" ").filter((s) => !s.startsWith("transition-")).join(" "));
    }
    const computedStyles = window.getComputedStyle(svg);
    return computedStyles;
  } catch (e) {
    console.error("Unable to get computed styles", e);
    return {};
  }
}
function render(ctx, render2, styleOptions = {}) {
  const computedStyles = getComputedStyles(ctx.canvas, styleOptions);
  const paintOrder = computedStyles?.paintOrder === "stroke" ? ["stroke", "fill"] : ["fill", "stroke"];
  if (computedStyles?.opacity) {
    ctx.globalAlpha = Number(computedStyles?.opacity);
  }
  ctx.font = `${computedStyles.fontSize} ${computedStyles.fontFamily}`;
  if (computedStyles.textAnchor === "middle") {
    ctx.textAlign = "center";
  } else if (computedStyles.textAnchor === "end") {
    ctx.textAlign = "right";
  } else {
    ctx.textAlign = computedStyles.textAlign;
  }
  if (computedStyles.strokeDasharray.includes(",")) {
    const dashArray = computedStyles.strokeDasharray.split(",").map((s) => Number(s.replace("px", "")));
    ctx.setLineDash(dashArray);
  }
  paintOrder.forEach((attr2) => {
    if (attr2 === "fill") {
      const fill = styleOptions.styles?.fill && (styleOptions.styles?.fill instanceof CanvasGradient || !styleOptions.styles?.fill?.includes("var")) ? styleOptions.styles.fill : computedStyles?.fill;
      if (fill && !["none", DEFAULT_FILL].includes(fill)) {
        const currentGlobalAlpha = ctx.globalAlpha;
        const fillOpacity = Number(computedStyles?.fillOpacity);
        const opacity = Number(computedStyles?.opacity);
        ctx.globalAlpha = fillOpacity * opacity;
        ctx.fillStyle = fill;
        render2.fill(ctx);
        ctx.globalAlpha = currentGlobalAlpha;
      }
    } else if (attr2 === "stroke") {
      const stroke = styleOptions.styles?.stroke && (styleOptions.styles?.stroke instanceof CanvasGradient || !styleOptions.styles?.stroke?.includes("var")) ? styleOptions.styles?.stroke : computedStyles?.stroke;
      if (stroke && !["none"].includes(stroke)) {
        ctx.lineWidth = typeof computedStyles?.strokeWidth === "string" ? Number(computedStyles?.strokeWidth?.replace("px", "")) : computedStyles?.strokeWidth ?? 1;
        ctx.strokeStyle = stroke;
        render2.stroke(ctx);
      }
    }
  });
}
function renderPathData(ctx, pathData, styleOptions = {}) {
  const path2 = new Path2D(pathData ?? "");
  render(ctx, {
    fill: (ctx2) => ctx2.fill(path2),
    stroke: (ctx2) => ctx2.stroke(path2)
  }, styleOptions);
}
function renderText(ctx, text, coords, styleOptions = {}) {
  if (text) {
    render(ctx, {
      fill: (ctx2) => ctx2.fillText(text.toString(), coords.x, coords.y),
      stroke: (ctx2) => ctx2.strokeText(text.toString(), coords.x, coords.y)
    }, styleOptions);
  }
}
function renderRect(ctx, coords, styleOptions = {}) {
  render(ctx, {
    fill: (ctx2) => ctx2.fillRect(coords.x, coords.y, coords.width, coords.height),
    stroke: (ctx2) => ctx2.strokeRect(coords.x, coords.y, coords.width, coords.height)
  }, styleOptions);
}
function renderCircle(ctx, coords, styleOptions = {}) {
  ctx.beginPath();
  ctx.arc(coords.cx, coords.cy, coords.r, 0, 2 * Math.PI);
  render(ctx, {
    fill: (ctx2) => {
      ctx2.fill();
    },
    stroke: (ctx2) => {
      ctx2.stroke();
    }
  }, styleOptions);
  ctx.closePath();
}
function scaleCanvas(ctx, width, height) {
  const devicePixelRatio = window.devicePixelRatio || 1;
  ctx.canvas.width = width * devicePixelRatio;
  ctx.canvas.height = height * devicePixelRatio;
  ctx.canvas.style.width = `${width}px`;
  ctx.canvas.style.height = `${height}px`;
  ctx.scale(devicePixelRatio, devicePixelRatio);
  return { width: ctx.canvas.width, height: ctx.canvas.height };
}
function _createLinearGradient(ctx, x0, y0, x1, y1, stops) {
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
  stops.forEach(({ offset, color }) => {
    gradient.addColorStop(offset, color);
  });
  return gradient;
}
memoize(_createLinearGradient, (ctx, x0, y0, x1, y1, stops) => {
  const key = JSON.stringify({ x0, y0, x1, y1, stops });
  return key;
});
const canvasContextKey = Symbol();
function getCanvasContext() {
  return getContext(canvasContextKey);
}
function setCanvasContext(context) {
  setContext(canvasContextKey, context);
}
function Canvas($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  var $$store_subs;
  const {
    width,
    height,
    containerWidth,
    containerHeight,
    padding
  } = chartContext();
  let element2 = fallback($$props["element"], void 0);
  let context = fallback($$props["context"], void 0);
  let willReadFrequently = fallback($$props["willReadFrequently"], false);
  let zIndex = fallback($$props["zIndex"], void 0);
  let pointerEvents = fallback($$props["pointerEvents"], void 0);
  let fallback$1 = fallback($$props["fallback"], "");
  let label = fallback($$props["label"], void 0);
  let labelledBy = fallback($$props["labelledBy"], void 0);
  let describedBy = fallback($$props["describedBy"], void 0);
  let center = fallback($$props["center"], false);
  let ignoreTransform = fallback($$props["ignoreTransform"], false);
  let debug = fallback($$props["debug"], false);
  new Logger("Canvas");
  let components = /* @__PURE__ */ new Map();
  let pendingInvalidation = false;
  let frameId;
  const { mode, scale, translate, dragging, moving } = transformContext();
  onDestroy(() => {
    if (frameId) {
      cancelAnimationFrame(frameId);
    }
  });
  function update() {
    if (!context) return;
    scaleCanvas(context, store_get($$store_subs ??= {}, "$containerWidth", containerWidth), store_get($$store_subs ??= {}, "$containerHeight", containerHeight));
    context.clearRect(0, 0, store_get($$store_subs ??= {}, "$containerWidth", containerWidth), store_get($$store_subs ??= {}, "$containerHeight", containerHeight));
    context.translate(store_get($$store_subs ??= {}, "$padding", padding).left ?? 0, store_get($$store_subs ??= {}, "$padding", padding).top ?? 0);
    if (center) {
      const newTranslate = {
        x: center === "x" || center === true ? store_get($$store_subs ??= {}, "$width", width) / 2 : 0,
        y: center === "y" || center === true ? store_get($$store_subs ??= {}, "$height", height) / 2 : 0
      };
      context.translate(newTranslate.x, newTranslate.y);
    } else if (mode === "canvas" && !ignoreTransform) {
      context.translate(store_get($$store_subs ??= {}, "$translate", translate).x, store_get($$store_subs ??= {}, "$translate", translate).y);
      context.scale(store_get($$store_subs ??= {}, "$scale", scale), store_get($$store_subs ??= {}, "$scale", scale));
    }
    components.forEach((c) => {
      if (c.retainState) {
        c.render(context);
      } else {
        context.save();
        c.render(context);
        context.restore();
      }
      store_get($$store_subs ??= {}, "$moving", moving);
      c.events && Object.values(c.events).filter((d) => d).length > 0;
    });
    pendingInvalidation = false;
  }
  const canvasContext = {
    register(component) {
      const key = Symbol();
      components.set(key, component);
      this.invalidate();
      return () => {
        components.delete(key);
        this.invalidate();
      };
    },
    invalidate() {
      if (pendingInvalidation) return;
      pendingInvalidation = true;
      frameId = requestAnimationFrame(update);
    }
  };
  setCanvasContext(canvasContext);
  setRenderContext("canvas");
  {
    store_get($$store_subs ??= {}, "$containerWidth", containerWidth), store_get($$store_subs ??= {}, "$containerHeight", containerHeight) && store_get($$store_subs ??= {}, "$dragging", dragging);
    canvasContext.invalidate();
  }
  $$payload.out += `<canvas${add_styles({ "z-index": zIndex })}${attr("class", clsx(cls("layercake-layout-canvas", "absolute top-0 left-0 w-full h-full", pointerEvents === false && "pointer-events-none", $$sanitized_props.class)))}${attr("aria-label", label)}${attr("aria-labelledby", labelledBy)}${attr("aria-describedby", describedBy)}><!---->`;
  slot($$payload, $$props, "fallback", {}, () => {
    $$payload.out += `${escape_html(fallback$1 || "")}`;
  });
  $$payload.out += `<!----></canvas> <canvas${attr("class", clsx(cls(
    "layerchart-hitcanvas",
    "absolute top-0 left-0 w-full h-full",
    "pointer-events-none",
    // events all handled by main canvas
    // '[image-rendering:pixelated]', // https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering
    "border border-danger",
    !debug && "opacity-0"
  )))}></canvas> <!---->`;
  slot($$payload, $$props, "default", { element: element2, context }, null);
  $$payload.out += `<!---->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    element: element2,
    context,
    willReadFrequently,
    zIndex,
    pointerEvents,
    fallback: fallback$1,
    label,
    labelledBy,
    describedBy,
    center,
    ignoreTransform,
    debug
  });
  pop();
}
function Rect($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "element",
    "x",
    "initialX",
    "y",
    "initialY",
    "width",
    "initialWidth",
    "height",
    "initialHeight",
    "fill",
    "fillOpacity",
    "stroke",
    "strokeWidth",
    "class",
    "onclick",
    "ondblclick",
    "onpointerenter",
    "onpointermove",
    "onpointerleave",
    "onpointerover",
    "onpointerout",
    "spring",
    "tweened"
  ]);
  push();
  var $$store_subs;
  let fillKey, strokeKey;
  let element2 = fallback($$props["element"], void 0);
  let x = fallback($$props["x"], 0);
  let initialX = fallback($$props["initialX"], x);
  let y = fallback($$props["y"], 0);
  let initialY = fallback($$props["initialY"], y);
  let width = $$props["width"];
  let initialWidth = fallback($$props["initialWidth"], width);
  let height = $$props["height"];
  let initialHeight = fallback($$props["initialHeight"], height);
  let fill = fallback($$props["fill"], void 0);
  let fillOpacity = fallback($$props["fillOpacity"], void 0);
  let stroke = fallback($$props["stroke"], void 0);
  let strokeWidth = fallback($$props["strokeWidth"], void 0);
  let className = fallback($$props["class"], void 0);
  let onclick = fallback($$props["onclick"], void 0);
  let ondblclick = fallback($$props["ondblclick"], void 0);
  let onpointerenter = fallback($$props["onpointerenter"], void 0);
  let onpointermove = fallback($$props["onpointermove"], void 0);
  let onpointerleave = fallback($$props["onpointerleave"], void 0);
  let onpointerover = fallback($$props["onpointerover"], void 0);
  let onpointerout = fallback($$props["onpointerout"], void 0);
  let spring2 = fallback($$props["spring"], void 0);
  let tweened2 = fallback($$props["tweened"], void 0);
  let tweened_x = motionStore(initialX, resolveOptions("x", { spring: spring2, tweened: tweened2 }));
  let tweened_y = motionStore(initialY, resolveOptions("y", { spring: spring2, tweened: tweened2 }));
  let tweened_width = motionStore(initialWidth, resolveOptions("width", { spring: spring2, tweened: tweened2 }));
  let tweened_height = motionStore(initialHeight, resolveOptions("height", { spring: spring2, tweened: tweened2 }));
  const renderContext = getRenderContext();
  const canvasContext = getCanvasContext();
  function render2(ctx, styleOverrides) {
    renderRect(
      ctx,
      {
        x: store_get($$store_subs ??= {}, "$tweened_x", tweened_x),
        y: store_get($$store_subs ??= {}, "$tweened_y", tweened_y),
        width: store_get($$store_subs ??= {}, "$tweened_width", tweened_width),
        height: store_get($$store_subs ??= {}, "$tweened_height", tweened_height)
      },
      styleOverrides ? merge({ styles: { strokeWidth } }, styleOverrides) : {
        styles: { fill, fillOpacity, stroke, strokeWidth },
        classes: className
      }
    );
  }
  let canvasUnregister;
  onDestroy(() => {
    if (renderContext === "canvas") {
      canvasUnregister();
    }
  });
  tick().then(() => {
    tweened_x.set(x);
    tweened_y.set(y);
    tweened_width.set(width);
    tweened_height.set(height);
  });
  fillKey = fill && typeof fill === "object" ? objectId(fill) : fill;
  strokeKey = stroke && typeof stroke === "object" ? objectId(stroke) : stroke;
  if (renderContext === "canvas") {
    store_get($$store_subs ??= {}, "$tweened_x", tweened_x) && store_get($$store_subs ??= {}, "$tweened_y", tweened_y) && store_get($$store_subs ??= {}, "$tweened_width", tweened_width) && store_get($$store_subs ??= {}, "$tweened_height", tweened_height) && fillKey && strokeKey && strokeWidth && className;
    canvasContext.invalidate();
  }
  if (renderContext === "canvas") {
    canvasUnregister = canvasContext.register({
      name: "Rect",
      render: render2,
      events: {
        click: onclick,
        dblclick: ondblclick,
        pointerenter: onpointerenter,
        pointermove: onpointermove,
        pointerleave: onpointerleave,
        pointerover: onpointerover,
        pointerout: onpointerout
      }
    });
  }
  if (renderContext === "svg") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<rect${spread_attributes(
      {
        x: store_get($$store_subs ??= {}, "$tweened_x", tweened_x),
        y: store_get($$store_subs ??= {}, "$tweened_y", tweened_y),
        width: store_get($$store_subs ??= {}, "$tweened_width", tweened_width),
        height: store_get($$store_subs ??= {}, "$tweened_height", tweened_height),
        fill,
        "fill-opacity": fillOpacity,
        stroke,
        "stroke-width": strokeWidth,
        class: clsx(cls(fill == null && "fill-surface-content", className)),
        ...$$restProps
      },
      null,
      void 0,
      void 0,
      3
    )}></rect>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    element: element2,
    x,
    initialX,
    y,
    initialY,
    width,
    initialWidth,
    height,
    initialHeight,
    fill,
    fillOpacity,
    stroke,
    strokeWidth,
    class: className,
    onclick,
    ondblclick,
    onpointerenter,
    onpointermove,
    onpointerleave,
    onpointerover,
    onpointerout,
    spring: spring2,
    tweened: tweened2
  });
  pop();
}
function RectClipPath($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "id",
    "x",
    "y",
    "width",
    "height",
    "spring",
    "tweened",
    "disabled"
  ]);
  push();
  let id = fallback($$props["id"], () => uniqueId("clipPath-"), true);
  let x = fallback($$props["x"], 0);
  let y = fallback($$props["y"], 0);
  let width = $$props["width"];
  let height = $$props["height"];
  let spring2 = fallback($$props["spring"], void 0);
  let tweened2 = fallback($$props["tweened"], void 0);
  let disabled = fallback($$props["disabled"], false);
  ClipPath($$payload, {
    id,
    disabled,
    children: invalid_default_snippet,
    $$slots: {
      default: ($$payload2, { url }) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", { id, url }, null);
        $$payload2.out += `<!---->`;
      },
      clip: ($$payload2) => {
        Rect($$payload2, spread_props([
          {
            slot: "clip",
            x,
            y,
            width,
            height,
            spring: spring2,
            tweened: tweened2
          },
          $$restProps
        ]));
      }
    }
  });
  bind_props($$props, {
    id,
    x,
    y,
    width,
    height,
    spring: spring2,
    tweened: tweened2,
    disabled
  });
  pop();
}
function ChartClipPath($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["full", "disabled"]);
  push();
  var $$store_subs;
  const { width, height, padding } = chartContext();
  let full = fallback($$props["full"], false);
  let disabled = fallback($$props["disabled"], false);
  RectClipPath($$payload, spread_props([
    {
      x: full && store_get($$store_subs ??= {}, "$padding", padding).left ? -store_get($$store_subs ??= {}, "$padding", padding).left : 0,
      y: full && store_get($$store_subs ??= {}, "$padding", padding).top ? -store_get($$store_subs ??= {}, "$padding", padding).top : 0,
      width: store_get($$store_subs ??= {}, "$width", width) + (full ? (store_get($$store_subs ??= {}, "$padding", padding)?.left ?? 0) + (store_get($$store_subs ??= {}, "$padding", padding)?.right ?? 0) : 0),
      height: store_get($$store_subs ??= {}, "$height", height) + (full ? (store_get($$store_subs ??= {}, "$padding", padding)?.top ?? 0) + (store_get($$store_subs ??= {}, "$padding", padding)?.bottom ?? 0) : 0),
      disabled
    },
    $$restProps,
    {
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { full, disabled });
  pop();
}
function geoCurvePath(projection, curve, context) {
  const pathContext = path();
  const geoPath$1 = geoPath(projection, curveContext(curve(pathContext)));
  const fn = (object) => {
    geoPath$1(object);
    return context === void 0 ? pathContext + "" : void 0;
  };
  Object.setPrototypeOf(fn, geoPath$1);
  return fn;
}
function curveContext(curve) {
  return {
    beginPath() {
    },
    moveTo(x, y) {
      curve.lineStart();
      curve.point(x, y);
    },
    arc(x, y, radius, startAngle, endAngle, anticlockwise) {
    },
    lineTo(x, y) {
      curve.point(x, y);
    },
    closePath() {
      curve.lineEnd();
    }
  };
}
function geoFitObjectTransform(projection, size, object) {
  const newProjection = projection.fitSize(size, object);
  const translate = newProjection.translate();
  return { translate: { x: translate[0], y: translate[1] }, scale: newProjection.scale() };
}
function GeoPath($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "geojson",
    "fill",
    "stroke",
    "strokeWidth",
    "tooltip",
    "onclick",
    "onpointerenter",
    "onpointermove",
    "onpointerleave",
    "onpointerdown",
    "ontouchmove",
    "curve",
    "class",
    "geoTransform"
  ]);
  push();
  var $$store_subs;
  let _projection, geoPath2;
  let geojson = fallback($$props["geojson"], void 0);
  let fill = fallback($$props["fill"], void 0);
  let stroke = fallback($$props["stroke"], void 0);
  let strokeWidth = fallback($$props["strokeWidth"], void 0);
  let tooltip = fallback($$props["tooltip"], void 0);
  let onclick = fallback($$props["onclick"], void 0);
  let onpointerenter = fallback($$props["onpointerenter"], void 0);
  let onpointermove = fallback($$props["onpointermove"], void 0);
  let onpointerleave = fallback($$props["onpointerleave"], void 0);
  let onpointerdown = fallback($$props["onpointerdown"], void 0);
  let ontouchmove = fallback($$props["ontouchmove"], void 0);
  let curve = fallback($$props["curve"], curveLinearClosed);
  let className = fallback($$props["class"], void 0);
  const geo = geoContext();
  let geoTransform$1 = fallback($$props["geoTransform"], void 0);
  const renderContext = getRenderContext();
  const canvasContext = getCanvasContext();
  function render2(ctx, styleOverrides) {
    if (geojson) {
      const pathData = geoPath2(geojson);
      renderPathData(ctx, pathData, styleOverrides ? merge({ styles: { strokeWidth } }, styleOverrides) : {
        styles: { fill, stroke, strokeWidth },
        classes: className
      });
    }
  }
  function _onClick(e) {
    onclick?.(e, geoPath2);
  }
  function _onPointerEnter(e) {
    onpointerenter?.(e);
    tooltip?.show(e, geojson);
  }
  function _onPointerMove(e) {
    onpointermove?.(e);
    tooltip?.show(e, geojson);
  }
  function _onPointerLeave(e) {
    onpointerleave?.(e);
    tooltip?.hide();
  }
  let canvasUnregister;
  onDestroy(() => {
    if (renderContext === "canvas") {
      canvasUnregister();
    }
  });
  _projection = geoTransform$1 ? geoTransform(geoTransform$1(store_get($$store_subs ??= {}, "$geo", geo))) : store_get($$store_subs ??= {}, "$geo", geo);
  geoPath2 = geoCurvePath(_projection, curve);
  {
    geoPath2 = geoCurvePath(_projection, curve);
  }
  fill && typeof fill === "object" ? objectId(fill) : fill;
  stroke && typeof stroke === "object" ? objectId(stroke) : stroke;
  if (renderContext === "canvas") {
    canvasContext.invalidate();
  }
  if (renderContext === "canvas") {
    canvasUnregister = canvasContext.register({
      name: "GeoPath",
      render: render2,
      events: {
        click: _onClick,
        pointerenter: _onPointerEnter,
        pointermove: _onPointerMove,
        pointerleave: _onPointerLeave,
        pointerdown: onpointerdown,
        touchmove: ontouchmove
      }
    });
  }
  $$payload.out += `<!---->`;
  slot($$payload, $$props, "default", { geoPath: geoPath2 }, () => {
    if (renderContext === "svg") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<path${spread_attributes(
        {
          ...$$restProps,
          d: geojson ? geoPath2(geojson) : "",
          fill,
          stroke,
          "stroke-width": strokeWidth,
          class: clsx(cls(fill == null && "fill-transparent", className))
        },
        null,
        void 0,
        void 0,
        3
      )}></path>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  });
  $$payload.out += `<!---->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    geojson,
    fill,
    stroke,
    strokeWidth,
    tooltip,
    onclick,
    onpointerenter,
    onpointermove,
    onpointerleave,
    onpointerdown,
    ontouchmove,
    curve,
    class: className,
    geoTransform: geoTransform$1
  });
  pop();
}
function Group($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "x",
    "initialX",
    "y",
    "initialY",
    "center",
    "preventTouchMove",
    "onclick",
    "ondblclick",
    "onpointerenter",
    "onpointermove",
    "onpointerleave",
    "onpointerdown",
    "spring",
    "tweened"
  ]);
  push();
  var $$store_subs;
  const { width, height } = chartContext();
  let x = fallback($$props["x"], void 0);
  let initialX = fallback($$props["initialX"], x);
  let y = fallback($$props["y"], void 0);
  let initialY = fallback($$props["initialY"], y);
  let center = fallback($$props["center"], false);
  let preventTouchMove = fallback($$props["preventTouchMove"], false);
  let onclick = fallback($$props["onclick"], void 0);
  let ondblclick = fallback($$props["ondblclick"], void 0);
  let onpointerenter = fallback($$props["onpointerenter"], void 0);
  let onpointermove = fallback($$props["onpointermove"], void 0);
  let onpointerleave = fallback($$props["onpointerleave"], void 0);
  let onpointerdown = fallback($$props["onpointerdown"], void 0);
  let spring2 = fallback($$props["spring"], void 0);
  let tweened2 = fallback($$props["tweened"], void 0);
  let tweened_x = motionStore(initialX, { spring: spring2, tweened: tweened2 });
  let tweened_y = motionStore(initialY, { spring: spring2, tweened: tweened2 });
  let transform = void 0;
  const renderContext = getRenderContext();
  const canvasContext = getCanvasContext();
  function render2(ctx) {
    ctx.translate(store_get($$store_subs ??= {}, "$tweened_x", tweened_x) ?? 0, store_get($$store_subs ??= {}, "$tweened_y", tweened_y) ?? 0);
  }
  let canvasUnregister;
  onDestroy(() => {
    if (renderContext === "canvas") {
      canvasUnregister();
    }
  });
  tick().then(() => {
    tweened_x.set(x ?? (center === "x" || center === true ? store_get($$store_subs ??= {}, "$width", width) / 2 : 0));
    tweened_y.set(y ?? (center === "y" || center === true ? store_get($$store_subs ??= {}, "$height", height) / 2 : 0));
  });
  if (center || x != null || y != null) {
    transform = `translate(${store_get($$store_subs ??= {}, "$tweened_x", tweened_x) ?? 0}px, ${store_get($$store_subs ??= {}, "$tweened_y", tweened_y) ?? 0}px)`;
  }
  if (renderContext === "canvas") {
    store_get($$store_subs ??= {}, "$tweened_x", tweened_x) && store_get($$store_subs ??= {}, "$tweened_y", tweened_y);
    canvasContext.invalidate();
  }
  if (renderContext === "canvas") {
    canvasUnregister = canvasContext.register({
      name: "Group",
      render: render2,
      retainState: true,
      events: {
        click: onclick,
        dblclick: ondblclick,
        pointerenter: onpointerenter,
        pointermove: onpointermove,
        pointerleave: onpointerleave,
        pointerdown: onpointerdown
      }
    });
  }
  if (renderContext === "canvas") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    if (renderContext === "svg") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<g${spread_attributes({ ...$$restProps }, null, void 0, { transform }, 3)}><!---->`;
      slot($$payload, $$props, "default", {}, null);
      $$payload.out += `<!----></g>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div${spread_attributes(
        {
          ...$$restProps,
          class: clsx(cls("absolute", $$restProps.class))
        },
        null,
        void 0,
        { transform }
      )}><!---->`;
      slot($$payload, $$props, "default", {}, null);
      $$payload.out += `<!----></div>`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    x,
    initialX,
    y,
    initialY,
    center,
    preventTouchMove,
    onclick,
    ondblclick,
    onpointerenter,
    onpointermove,
    onpointerleave,
    onpointerdown,
    spring: spring2,
    tweened: tweened2
  });
  pop();
}
function Marker($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "type",
    "id",
    "size",
    "markerWidth",
    "markerHeight",
    "markerUnits",
    "orient",
    "refX",
    "refY",
    "viewBox"
  ]);
  push();
  let type = fallback($$props["type"], void 0);
  let id = fallback($$props["id"], () => uniqueId("marker-"), true);
  let size = fallback($$props["size"], 10);
  let markerWidth = fallback($$props["markerWidth"], size);
  let markerHeight = fallback($$props["markerHeight"], size);
  let markerUnits = fallback($$props["markerUnits"], "userSpaceOnUse");
  let orient = fallback($$props["orient"], "auto-start-reverse");
  let refX = fallback($$props["refX"], () => ["arrow", "triangle"].includes(type ?? "") ? 9 : 5, true);
  let refY = fallback($$props["refY"], 5);
  let viewBox = fallback($$props["viewBox"], "0 0 10 10");
  $$payload.out += `<defs><marker${spread_attributes(
    {
      id,
      markerWidth,
      markerHeight,
      markerUnits,
      orient,
      refX,
      refY,
      viewBox,
      ...$$restProps,
      class: clsx(cls(
        "overflow-visible",
        // stroke
        $$sanitized_props.stroke == null && (["arrow", "circle-stroke", "line"].includes(type ?? "") ? "stroke-[context-stroke]" : type === "circle" ? "stroke-surface-100" : "stroke-none"),
        // extra stroke attrs
        "[stroke-linecap:round] [stroke-linejoin:round]",
        //fill
        $$sanitized_props.fill == null && (["triangle", "dot", "circle"].includes(type ?? "") ? "fill-[context-stroke]" : type === "circle-stroke" ? "fill-surface-100" : "fill-none"),
        $$sanitized_props.class
      ))
    },
    null,
    void 0,
    void 0,
    3
  )}><!---->`;
  slot($$payload, $$props, "default", {}, () => {
    if (type === "triangle") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<path d="M 0 0 L 10 5 L 0 10 z"></path>`;
    } else {
      $$payload.out += "<!--[!-->";
      if (type === "arrow") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<polyline points="0 0, 10 5, 0 10"></polyline>`;
      } else {
        $$payload.out += "<!--[!-->";
        if (type === "circle" || type === "circle-stroke" || type === "dot") {
          $$payload.out += "<!--[-->";
          $$payload.out += `<circle${attr("cx", 5)}${attr("cy", 5)}${attr("r", 5)}></circle>`;
        } else {
          $$payload.out += "<!--[!-->";
          if (type === "line") {
            $$payload.out += "<!--[-->";
            $$payload.out += `<polyline points="5 0, 5 10"></polyline>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]-->`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
  });
  $$payload.out += `<!----></marker></defs>`;
  bind_props($$props, {
    type,
    id,
    size,
    markerWidth,
    markerHeight,
    markerUnits,
    orient,
    refX,
    refY,
    viewBox
  });
  pop();
}
function flattenPathData(pathData, yOverride = 0) {
  let result = pathData;
  result = result.replace(/([MLTQCSAZ])(-?\d*\.?\d+),(-?\d*\.?\d+)/g, (match, command, x, y) => {
    return `${command}${x},${yOverride}`;
  });
  result = result.replace(/([v])(-?\d*\.?\d+)/g, (match, command, l) => {
    return `${command}${0}`;
  });
  return result;
}
function Spline($$payload, $$props) {
  const $$slots = sanitize_slots($$props);
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "data",
    "pathData",
    "x",
    "y",
    "tweened",
    "draw",
    "curve",
    "defined",
    "fill",
    "stroke",
    "strokeWidth",
    "opacity",
    "class",
    "onclick",
    "onpointerenter",
    "onpointermove",
    "onpointerleave",
    "onpointerdown",
    "ontouchmove",
    "onpointerover",
    "onpointerout",
    "marker",
    "markerStart",
    "markerMid",
    "markerEnd"
  ]);
  push();
  var $$store_subs;
  let markerStartId, markerMidId, markerEndId, xAccessor, yAccessor, xOffset, yOffset, tweened_d, fillKey, strokeKey, endPoint;
  const {
    data: contextData,
    xScale,
    yScale,
    x: contextX,
    y: contextY,
    yRange,
    radial,
    config
  } = chartContext();
  let data = fallback($$props["data"], void 0);
  let pathData = fallback($$props["pathData"], void 0);
  let x = fallback($$props["x"], void 0);
  let y = fallback($$props["y"], void 0);
  let tweened2 = fallback($$props["tweened"], void 0);
  let draw = fallback($$props["draw"], void 0);
  let curve = fallback($$props["curve"], void 0);
  let defined = fallback($$props["defined"], void 0);
  let fill = fallback($$props["fill"], void 0);
  let stroke = fallback($$props["stroke"], void 0);
  let strokeWidth = fallback($$props["strokeWidth"], void 0);
  let opacity = fallback($$props["opacity"], void 0);
  let className = fallback($$props["class"], void 0);
  let onclick = fallback($$props["onclick"], void 0);
  let onpointerenter = fallback($$props["onpointerenter"], void 0);
  let onpointermove = fallback($$props["onpointermove"], void 0);
  let onpointerleave = fallback($$props["onpointerleave"], void 0);
  let onpointerdown = fallback($$props["onpointerdown"], void 0);
  let ontouchmove = fallback($$props["ontouchmove"], void 0);
  let onpointerover = fallback($$props["onpointerover"], void 0);
  let onpointerout = fallback($$props["onpointerout"], void 0);
  let marker = fallback($$props["marker"], void 0);
  let markerStart = fallback($$props["markerStart"], marker);
  let markerMid = fallback($$props["markerMid"], marker);
  let markerEnd = fallback($$props["markerEnd"], marker);
  function getScaleValue(data2, scale, accessor2) {
    let value = accessor2(data2);
    if (Array.isArray(value)) {
      value = max(value);
    }
    if (scale.domain().length) {
      return scale(value);
    } else {
      return value;
    }
  }
  function defaultPathData() {
    if (!tweenedOptions) {
      return "";
    } else if (pathData) {
      return flattenPathData(pathData, Math.min(store_get($$store_subs ??= {}, "$yScale", yScale)(0), store_get($$store_subs ??= {}, "$yRange", yRange)[0]));
    } else if (store_get($$store_subs ??= {}, "$config", config).x) {
      const path2 = store_get($$store_subs ??= {}, "$radial", radial) ? lineRadial().angle((d2) => store_get($$store_subs ??= {}, "$xScale", xScale)(xAccessor(d2))).radius((d2) => Math.min(store_get($$store_subs ??= {}, "$yScale", yScale)(0), store_get($$store_subs ??= {}, "$yRange", yRange)[0])) : line().x((d2) => store_get($$store_subs ??= {}, "$xScale", xScale)(xAccessor(d2)) + xOffset).y((d2) => Math.min(store_get($$store_subs ??= {}, "$yScale", yScale)(0), store_get($$store_subs ??= {}, "$yRange", yRange)[0]));
      path2.defined(defined ?? ((d2) => xAccessor(d2) != null && yAccessor(d2) != null));
      if (curve) path2.curve(curve);
      return path2(data ?? store_get($$store_subs ??= {}, "$contextData", contextData));
    }
  }
  let d = "";
  const tweenedOptions = tweened2 ? {
    interpolate: interpolatePath,
    ...typeof tweened2 === "object" ? tweened2 : null
  } : false;
  const renderContext = getRenderContext();
  const canvasContext = getCanvasContext();
  function render2(ctx, styleOverrides) {
    renderPathData(ctx, store_get($$store_subs ??= {}, "$tweened_d", tweened_d), styleOverrides ? merge({ styles: { strokeWidth } }, styleOverrides) : {
      styles: { fill, stroke, strokeWidth, opacity },
      classes: className
    });
  }
  let canvasUnregister;
  onDestroy(() => {
    if (renderContext === "canvas") {
      canvasUnregister();
    }
  });
  let pathEl = void 0;
  const startPoint = writable(void 0);
  markerStartId = markerStart || $$slots["markerStart"] ? uniqueId("marker-") : "";
  markerMidId = markerMid || $$slots["markerMid"] ? uniqueId("marker-") : "";
  markerEndId = markerEnd || $$slots["markerEnd"] ? uniqueId("marker-") : "";
  xAccessor = x ? accessor(x) : store_get($$store_subs ??= {}, "$contextX", contextX);
  yAccessor = y ? accessor(y) : store_get($$store_subs ??= {}, "$contextY", contextY);
  xOffset = isScaleBand(store_get($$store_subs ??= {}, "$xScale", xScale)) ? store_get($$store_subs ??= {}, "$xScale", xScale).bandwidth() / 2 : 0;
  yOffset = isScaleBand(store_get($$store_subs ??= {}, "$yScale", yScale)) ? store_get($$store_subs ??= {}, "$yScale", yScale).bandwidth() / 2 : 0;
  tweened_d = motionStore(defaultPathData(), { tweened: tweenedOptions });
  {
    const path2 = store_get($$store_subs ??= {}, "$radial", radial) ? lineRadial().angle((d2) => getScaleValue(d2, store_get($$store_subs ??= {}, "$xScale", xScale), xAccessor)).radius((d2) => getScaleValue(d2, store_get($$store_subs ??= {}, "$yScale", yScale), yAccessor)) : line().x((d2) => getScaleValue(d2, store_get($$store_subs ??= {}, "$xScale", xScale), xAccessor) + xOffset).y((d2) => getScaleValue(d2, store_get($$store_subs ??= {}, "$yScale", yScale), yAccessor) + yOffset);
    path2.defined(defined ?? ((d2) => xAccessor(d2) != null && yAccessor(d2) != null));
    if (curve) path2.curve(curve);
    d = pathData ?? path2(data ?? store_get($$store_subs ??= {}, "$contextData", contextData)) ?? "";
    tweened_d.set(d);
  }
  if (draw) {
    store_get($$store_subs ??= {}, "$tweened_d", tweened_d);
  }
  fillKey = fill && typeof fill === "object" ? objectId(fill) : fill;
  strokeKey = stroke && typeof stroke === "object" ? objectId(stroke) : stroke;
  if (renderContext === "canvas") {
    store_get($$store_subs ??= {}, "$tweened_d", tweened_d) && fillKey && strokeKey && strokeWidth && className;
    canvasContext.invalidate();
  }
  if (renderContext === "canvas") {
    canvasUnregister = canvasContext.register({
      name: "Spline",
      render: render2,
      events: {
        click: onclick,
        pointerenter: onpointerenter,
        pointermove: onpointermove,
        pointerleave: onpointerleave,
        pointerdown: onpointerdown,
        pointerover: onpointerover,
        pointerout: onpointerout,
        touchmove: ontouchmove
      }
    });
  }
  endPoint = motionStore(void 0, {
    tweened: draw ? {
      duration: typeof draw === "object" && draw.duration || 800,
      easing: typeof draw === "object" && draw.easing || cubicInOut,
      interpolate(a, b) {
        return (t) => {
          const totalLength = 0;
          const point = pathEl?.getPointAtLength(totalLength * t);
          return point;
        };
      }
    } : false
  });
  {
    if ($$slots.start || $$slots.end) {
      tick().then(() => {
      });
    }
  }
  if (renderContext === "svg") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    {
      $$payload.out += `<path${spread_attributes(
        {
          d: store_get($$store_subs ??= {}, "$tweened_d", tweened_d),
          ...$$restProps,
          class: clsx(cls("path-line", !fill && "fill-none", !stroke && "stroke-surface-content", className)),
          fill,
          stroke,
          "stroke-width": strokeWidth,
          opacity,
          "marker-start": markerStartId ? `url(#${markerStartId})` : void 0,
          "marker-mid": markerMidId ? `url(#${markerMidId})` : void 0,
          "marker-end": markerEndId ? `url(#${markerEndId})` : void 0
        },
        null,
        void 0,
        void 0,
        3
      )}></path><!---->`;
      slot($$payload, $$props, "markerStart", { id: markerStartId }, () => {
        if (markerStart) {
          $$payload.out += "<!--[-->";
          Marker($$payload, spread_props([
            {
              id: markerStartId,
              type: typeof markerStart === "string" ? markerStart : void 0
            },
            typeof markerStart === "object" ? markerStart : null
          ]));
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      });
      $$payload.out += `<!----><!---->`;
      slot($$payload, $$props, "markerMid", { id: markerMidId }, () => {
        Marker($$payload, spread_props([
          {
            id: markerMidId,
            type: typeof markerMid === "string" ? markerMid : void 0
          },
          typeof markerMid === "object" ? markerMid : null
        ]));
      });
      $$payload.out += `<!----><!---->`;
      slot($$payload, $$props, "markerEnd", { id: markerEndId }, () => {
        Marker($$payload, spread_props([
          {
            id: markerEndId,
            type: typeof markerEnd === "string" ? markerEnd : void 0
          },
          typeof markerEnd === "object" ? markerEnd : null
        ]));
      });
      $$payload.out += `<!---->`;
      if ($$slots.start && store_get($$store_subs ??= {}, "$startPoint", startPoint)) {
        $$payload.out += "<!--[-->";
        Group($$payload, {
          x: store_get($$store_subs ??= {}, "$startPoint", startPoint).x,
          y: store_get($$store_subs ??= {}, "$startPoint", startPoint).y,
          children: ($$payload2) => {
            $$payload2.out += `<!---->`;
            slot(
              $$payload2,
              $$props,
              "start",
              {
                point: store_get($$store_subs ??= {}, "$startPoint", startPoint)
              },
              null
            );
            $$payload2.out += `<!---->`;
          },
          $$slots: { default: true }
        });
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
      if ($$slots.end && store_get($$store_subs ??= {}, "$endPoint", endPoint)) {
        $$payload.out += "<!--[-->";
        Group($$payload, {
          x: store_get($$store_subs ??= {}, "$endPoint", endPoint).x,
          y: store_get($$store_subs ??= {}, "$endPoint", endPoint).y,
          children: ($$payload2) => {
            $$payload2.out += `<!---->`;
            slot(
              $$payload2,
              $$props,
              "end",
              {
                point: store_get($$store_subs ??= {}, "$endPoint", endPoint)
              },
              null
            );
            $$payload2.out += `<!---->`;
          },
          $$slots: { default: true }
        });
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    data,
    pathData,
    x,
    y,
    tweened: tweened2,
    draw,
    curve,
    defined,
    fill,
    stroke,
    strokeWidth,
    opacity,
    class: className,
    onclick,
    onpointerenter,
    onpointermove,
    onpointerleave,
    onpointerdown,
    ontouchmove,
    onpointerover,
    onpointerout,
    marker,
    markerStart,
    markerMid,
    markerEnd
  });
  pop();
}
function Voronoi($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "data",
    "classes",
    "onclick",
    "onpointerenter",
    "onpointermove",
    "onpointerleave",
    "onpointerdown"
  ]);
  push();
  var $$store_subs;
  let points, boundWidth, boundHeight;
  const {
    flatData,
    xGet,
    yGet,
    x: xContext,
    y: yContext,
    width,
    height,
    radial
  } = chartContext();
  const geo = geoContext();
  let data = fallback($$props["data"], void 0);
  let classes = fallback($$props["classes"], () => ({}), true);
  let onclick = fallback($$props["onclick"], void 0);
  let onpointerenter = fallback($$props["onpointerenter"], void 0);
  let onpointermove = fallback($$props["onpointermove"], void 0);
  let onpointerleave = fallback($$props["onpointerleave"], void 0);
  let onpointerdown = fallback($$props["onpointerdown"], void 0);
  points = (data ?? store_get($$store_subs ??= {}, "$flatData", flatData)).map((d) => {
    const xValue = store_get($$store_subs ??= {}, "$geo", geo) ? store_get($$store_subs ??= {}, "$xContext", xContext)(d) : store_get($$store_subs ??= {}, "$xGet", xGet)(d);
    const yValue = store_get($$store_subs ??= {}, "$geo", geo) ? store_get($$store_subs ??= {}, "$yContext", yContext)(d) : store_get($$store_subs ??= {}, "$yGet", yGet)(d);
    const x = Array.isArray(xValue) ? min(xValue) : xValue;
    const y = Array.isArray(yValue) ? min(yValue) : yValue;
    let point;
    if (store_get($$store_subs ??= {}, "$radial", radial)) {
      const radialPoint = pointRadial(x, y);
      point = [
        radialPoint[0] + store_get($$store_subs ??= {}, "$width", width) / 2,
        radialPoint[1] + store_get($$store_subs ??= {}, "$height", height) / 2
      ];
    } else {
      point = [x, y];
    }
    point.data = d;
    return point;
  });
  boundWidth = Math.max(store_get($$store_subs ??= {}, "$width", width), 0);
  boundHeight = Math.max(store_get($$store_subs ??= {}, "$height", height), 0);
  $$payload.out += `<g${spread_attributes(
    {
      ...$$restProps,
      class: clsx(cls(classes.root, $$sanitized_props.class))
    },
    null,
    void 0,
    void 0,
    3
  )}>`;
  if (store_get($$store_subs ??= {}, "$geo", geo)) {
    $$payload.out += "<!--[-->";
    const polygons = geoVoronoi().polygons(points);
    const each_array = ensure_array_like(polygons.features);
    $$payload.out += `<!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let feature = each_array[$$index];
      GeoPath($$payload, {
        geojson: feature,
        class: cls("fill-transparent stroke-transparent", classes.path),
        onclick: (e) => onclick?.(e, { data: feature.properties.site.data, feature }),
        onpointerenter: (e) => onpointerenter?.(e, { data: feature.properties.site.data, feature }),
        onpointermove: (e) => onpointermove?.(e, { data: feature.properties.site.data, feature }),
        onpointerdown: (e) => onpointerdown?.(e, { data: feature.properties.site.data, feature }),
        onpointerleave,
        ontouchmove: (e) => {
          e.preventDefault();
        }
      });
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    const voronoi = Delaunay.from(points).voronoi([0, 0, boundWidth, boundHeight]);
    const each_array_1 = ensure_array_like(points);
    $$payload.out += `<!--[-->`;
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      let point = each_array_1[i];
      const pathData = voronoi.renderCell(i);
      if (pathData) {
        $$payload.out += "<!--[-->";
        Spline($$payload, {
          pathData,
          class: cls("fill-transparent stroke-transparent", classes.path),
          onclick: (e) => onclick?.(e, { data: point.data, point }),
          onpointerenter: (e) => onpointerenter?.(e, { data: point.data, point }),
          onpointermove: (e) => onpointermove?.(e, { data: point.data, point }),
          onpointerleave,
          onpointerdown: (e) => onpointerdown?.(e, { data: point.data, point }),
          ontouchmove: (e) => {
            e.preventDefault();
          }
        });
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></g>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    data,
    classes,
    onclick,
    onpointerenter,
    onpointermove,
    onpointerleave,
    onpointerdown
  });
  pop();
}
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}
function cartesianToPolar(x, y) {
  let radians = Math.atan2(y, x);
  radians += Math.PI / 2;
  if (radians < 0) {
    radians += 2 * Math.PI;
  }
  return {
    radius: Math.sqrt(x ** 2 + y ** 2),
    radians
  };
}
function quadtreeRects(quadtree2, showLeaves = true) {
  const rects = [];
  quadtree2.visit((node, x0, y0, x1, y1) => {
    if (showLeaves || Array.isArray(node)) {
      rects.push({ x: x0, y: y0, width: x1 - x0, height: y1 - y0 });
    }
  });
  return rects;
}
const tooltipContextKey = Symbol();
const defaultContext = writable({
  x: 0,
  y: 0,
  data: null,
  show: () => {
  },
  hide: () => {
  },
  mode: "manual"
});
function tooltipContext() {
  return getContext(tooltipContextKey) ?? defaultContext;
}
function setTooltipContext(tooltip) {
  setContext(tooltipContextKey, tooltip);
}
function TooltipContext($$payload, $$props) {
  push();
  var $$store_subs;
  let bisectX, bisectY, triggerPointerEvents;
  const {
    flatData,
    x,
    xScale,
    xGet,
    xRange,
    y,
    yScale,
    yGet,
    yRange,
    width,
    height,
    containerWidth,
    containerHeight,
    padding,
    radial
  } = chartContext();
  let mode = fallback($$props["mode"], "manual");
  let findTooltipData = fallback($$props["findTooltipData"], "closest");
  let raiseTarget = fallback($$props["raiseTarget"], false);
  let locked = fallback($$props["locked"], false);
  let radius = fallback($$props["radius"], Infinity);
  let debug = fallback($$props["debug"], false);
  let onclick = fallback($$props["onclick"], () => {
  });
  let tooltip = fallback(
    $$props["tooltip"],
    () => writable({
      x: 0,
      y: 0,
      data: null,
      show: showTooltip,
      hide: hideTooltip,
      mode
    }),
    true
  );
  setTooltipContext(tooltip);
  let hideDelay = fallback($$props["hideDelay"], 0);
  let hideTimeoutId;
  let tooltipContextNode;
  function findData(previousValue, currentValue, valueAtPoint, accessor2) {
    switch (findTooltipData) {
      case "closest":
        if (currentValue === void 0) {
          return previousValue;
        } else if (previousValue === void 0) {
          return currentValue;
        } else {
          return Number(valueAtPoint) - Number(accessor2(previousValue)) > Number(accessor2(currentValue)) - Number(valueAtPoint) ? currentValue : previousValue;
        }
      case "left":
        return previousValue;
      case "right":
      default:
        return currentValue;
    }
  }
  function showTooltip(e, tooltipData) {
    if (hideTimeoutId) {
      clearTimeout(hideTimeoutId);
    }
    if (locked) {
      return;
    }
    const containerNode = e.target.closest(".layercake-container");
    const point = localPoint(e, containerNode);
    if (tooltipData == null && // mode !== 'manual' but support annotations
    (point.x < tooltipContextNode.offsetLeft || point.x > tooltipContextNode.offsetLeft + tooltipContextNode.offsetWidth || point.y < tooltipContextNode.offsetTop || point.y > tooltipContextNode.offsetTop + tooltipContextNode.offsetHeight)) {
      hideTooltip();
      return;
    }
    if (tooltipData == null) {
      switch (mode) {
        case "bisect-x": {
          let xValueAtPoint;
          if (store_get($$store_subs ??= {}, "$radial", radial)) {
            const { radians } = cartesianToPolar(point.x - store_get($$store_subs ??= {}, "$width", width) / 2, point.y - store_get($$store_subs ??= {}, "$height", height) / 2);
            xValueAtPoint = scaleInvert(store_get($$store_subs ??= {}, "$xScale", xScale), radians);
          } else {
            xValueAtPoint = scaleInvert(store_get($$store_subs ??= {}, "$xScale", xScale), point.x - store_get($$store_subs ??= {}, "$padding", padding).left);
          }
          const index = bisectX(store_get($$store_subs ??= {}, "$flatData", flatData), xValueAtPoint, 1);
          const previousValue = store_get($$store_subs ??= {}, "$flatData", flatData)[index - 1];
          const currentValue = store_get($$store_subs ??= {}, "$flatData", flatData)[index];
          tooltipData = findData(previousValue, currentValue, xValueAtPoint, store_get($$store_subs ??= {}, "$x", x));
          break;
        }
        case "bisect-y": {
          const yValueAtPoint = scaleInvert(store_get($$store_subs ??= {}, "$yScale", yScale), point.y - store_get($$store_subs ??= {}, "$padding", padding).top);
          const index = bisectY(store_get($$store_subs ??= {}, "$flatData", flatData), yValueAtPoint, 1);
          const previousValue = store_get($$store_subs ??= {}, "$flatData", flatData)[index - 1];
          const currentValue = store_get($$store_subs ??= {}, "$flatData", flatData)[index];
          tooltipData = findData(previousValue, currentValue, yValueAtPoint, store_get($$store_subs ??= {}, "$y", y));
          break;
        }
        case "bisect-band": {
          const xValueAtPoint = scaleInvert(store_get($$store_subs ??= {}, "$xScale", xScale), point.x);
          const yValueAtPoint = scaleInvert(store_get($$store_subs ??= {}, "$yScale", yScale), point.y);
          if (isScaleBand(store_get($$store_subs ??= {}, "$xScale", xScale))) {
            const bandData = store_get($$store_subs ??= {}, "$flatData", flatData).filter((d) => store_get($$store_subs ??= {}, "$x", x)(d) === xValueAtPoint).sort(sortFunc(store_get($$store_subs ??= {}, "$y", y)));
            const index = bisectY(bandData, yValueAtPoint, 1);
            const previousValue = bandData[index - 1];
            const currentValue = bandData[index];
            tooltipData = findData(previousValue, currentValue, yValueAtPoint, store_get($$store_subs ??= {}, "$y", y));
          } else if (isScaleBand(store_get($$store_subs ??= {}, "$yScale", yScale))) {
            const bandData = store_get($$store_subs ??= {}, "$flatData", flatData).filter((d) => store_get($$store_subs ??= {}, "$y", y)(d) === yValueAtPoint).sort(sortFunc(store_get($$store_subs ??= {}, "$x", x)));
            const index = bisectX(bandData, xValueAtPoint, 1);
            const previousValue = bandData[index - 1];
            const currentValue = bandData[index];
            tooltipData = findData(previousValue, currentValue, xValueAtPoint, store_get($$store_subs ??= {}, "$x", x));
          } else ;
          break;
        }
        case "quadtree": {
          tooltipData = quadtree$1.find(point.x, point.y, radius);
          break;
        }
      }
    }
    if (tooltipData) {
      if (raiseTarget) {
        raise(e.target);
      }
      store_set(tooltip, {
        ...store_get($$store_subs ??= {}, "$tooltip", tooltip),
        x: point.x,
        y: point.y,
        data: tooltipData
      });
    } else {
      hideTooltip();
    }
  }
  function hideTooltip() {
    if (locked) {
      return;
    }
    hideTimeoutId = setTimeout(
      () => {
        {
          store_set(tooltip, {
            ...store_get($$store_subs ??= {}, "$tooltip", tooltip),
            data: null
          });
        }
      },
      hideDelay
    );
  }
  let quadtree$1;
  let rects = [];
  bisectX = bisector((d) => {
    const value = store_get($$store_subs ??= {}, "$x", x)(d);
    if (Array.isArray(value)) {
      return value[0];
    } else {
      return value;
    }
  }).left;
  bisectY = bisector((d) => {
    const value = store_get($$store_subs ??= {}, "$y", y)(d);
    if (Array.isArray(value)) {
      return value[0];
    } else {
      return value;
    }
  }).left;
  if (mode === "quadtree") {
    quadtree$1 = quadtree().extent([
      [0, 0],
      [
        store_get($$store_subs ??= {}, "$width", width),
        store_get($$store_subs ??= {}, "$height", height)
      ]
    ]).x((d) => {
      const value = store_get($$store_subs ??= {}, "$xGet", xGet)(d);
      if (Array.isArray(value)) {
        return min(value);
      } else {
        return value;
      }
    }).y((d) => {
      const value = store_get($$store_subs ??= {}, "$yGet", yGet)(d);
      if (Array.isArray(value)) {
        return min(value);
      } else {
        return value;
      }
    }).addAll(store_get($$store_subs ??= {}, "$flatData", flatData));
  }
  if (mode === "bounds" || mode === "band") {
    rects = store_get($$store_subs ??= {}, "$flatData", flatData).map((d) => {
      const xValue = store_get($$store_subs ??= {}, "$xGet", xGet)(d);
      const yValue = store_get($$store_subs ??= {}, "$yGet", yGet)(d);
      const x2 = Array.isArray(xValue) ? xValue[0] : xValue;
      const y2 = Array.isArray(yValue) ? yValue[0] : yValue;
      const xOffset = isScaleBand(store_get($$store_subs ??= {}, "$xScale", xScale)) ? store_get($$store_subs ??= {}, "$xScale", xScale).padding() * store_get($$store_subs ??= {}, "$xScale", xScale).step() / 2 : 0;
      const yOffset = isScaleBand(store_get($$store_subs ??= {}, "$yScale", yScale)) ? store_get($$store_subs ??= {}, "$yScale", yScale).padding() * store_get($$store_subs ??= {}, "$yScale", yScale).step() / 2 : 0;
      const fullWidth = max(store_get($$store_subs ??= {}, "$xRange", xRange)) - min(store_get($$store_subs ??= {}, "$xRange", xRange));
      const fullHeight = max(store_get($$store_subs ??= {}, "$yRange", yRange)) - min(store_get($$store_subs ??= {}, "$yRange", yRange));
      if (mode === "band") {
        return {
          x: isScaleBand(store_get($$store_subs ??= {}, "$xScale", xScale)) ? x2 - xOffset : min(store_get($$store_subs ??= {}, "$xRange", xRange)),
          y: isScaleBand(store_get($$store_subs ??= {}, "$yScale", yScale)) ? y2 - yOffset : min(store_get($$store_subs ??= {}, "$yRange", yRange)),
          width: isScaleBand(store_get($$store_subs ??= {}, "$xScale", xScale)) ? store_get($$store_subs ??= {}, "$xScale", xScale).step() : fullWidth,
          height: isScaleBand(store_get($$store_subs ??= {}, "$yScale", yScale)) ? store_get($$store_subs ??= {}, "$yScale", yScale).step() : fullHeight,
          data: d
        };
      } else if (mode === "bounds") {
        return {
          x: isScaleBand(store_get($$store_subs ??= {}, "$xScale", xScale)) || Array.isArray(xValue) ? x2 - xOffset : min(store_get($$store_subs ??= {}, "$xRange", xRange)),
          // y: isScaleBand($yScale) || Array.isArray(yValue) ? y - yOffset : min($yRange),
          y: y2 - yOffset,
          width: Array.isArray(xValue) ? xValue[1] - xValue[0] : isScaleBand(store_get($$store_subs ??= {}, "$xScale", xScale)) ? store_get($$store_subs ??= {}, "$xScale", xScale).step() : min(store_get($$store_subs ??= {}, "$xRange", xRange)) + x2,
          height: Array.isArray(yValue) ? yValue[1] - yValue[0] : isScaleBand(store_get($$store_subs ??= {}, "$yScale", yScale)) ? store_get($$store_subs ??= {}, "$yScale", yScale).step() : (
            // @ts-expect-error
            max(store_get($$store_subs ??= {}, "$yRange", yRange)) - y2
          ),
          data: d
        };
      }
    }).sort(sortFunc("x"));
  }
  triggerPointerEvents = [
    "bisect-x",
    "bisect-y",
    "bisect-band",
    "quadtree"
  ].includes(mode);
  $$payload.out += `<div${add_styles({
    top: `${stringify(store_get($$store_subs ??= {}, "$padding", padding).top)}px`,
    left: `${stringify(store_get($$store_subs ??= {}, "$padding", padding).left)}px`,
    width: `${stringify(store_get($$store_subs ??= {}, "$width", width))}px`,
    height: `${stringify(store_get($$store_subs ??= {}, "$height", height))}px`
  })}${attr("class", clsx(cls("TooltipContext absolute touch-none", debug && triggerPointerEvents && "bg-danger/10 outline outline-danger")))}><div${add_styles({
    top: `-${stringify(store_get($$store_subs ??= {}, "$padding", padding).top ?? 0)}px`,
    left: `-${stringify(store_get($$store_subs ??= {}, "$padding", padding).left ?? 0)}px`,
    width: `${stringify(store_get($$store_subs ??= {}, "$containerWidth", containerWidth))}px`,
    height: `${stringify(store_get($$store_subs ??= {}, "$containerHeight", containerHeight))}px`
  })} class="absolute"><!---->`;
  slot(
    $$payload,
    $$props,
    "default",
    {
      tooltip: store_get($$store_subs ??= {}, "$tooltip", tooltip)
    },
    null
  );
  $$payload.out += `<!----> `;
  if (mode === "voronoi") {
    $$payload.out += "<!--[-->";
    Svg($$payload, {
      children: ($$payload2) => {
        Voronoi($$payload2, {
          onpointerenter: (e, { data }) => {
            showTooltip(e, data);
          },
          onpointermove: (e, { data }) => {
            showTooltip(e, data);
          },
          onpointerleave: hideTooltip,
          onpointerdown: (e) => {
            if (e.target?.hasPointerCapture(e.pointerId)) {
              e.target.releasePointerCapture(e.pointerId);
            }
          },
          onclick: (e, { data }) => {
            onclick(e, { data });
          },
          classes: {
            path: cls(debug && "fill-danger/10 stroke-danger")
          }
        });
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
    if (mode === "bounds" || mode === "band") {
      $$payload.out += "<!--[-->";
      Svg($$payload, {
        children: ($$payload2) => {
          const each_array = ensure_array_like(rects);
          $$payload2.out += `<g class="tooltip-rects"><!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let rect = each_array[$$index];
            $$payload2.out += `<rect${attr("x", rect.x)}${attr("y", rect.y)}${attr("width", rect.width)}${attr("height", rect.height)}${attr("class", clsx(cls(debug ? "fill-danger/10 stroke-danger" : "fill-transparent")))}></rect>`;
          }
          $$payload2.out += `<!--]--></g>`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload.out += "<!--[!-->";
      if (mode === "quadtree" && debug) {
        $$payload.out += "<!--[-->";
        Svg($$payload, {
          pointerEvents: false,
          children: ($$payload2) => {
            ChartClipPath($$payload2, {
              children: ($$payload3) => {
                const each_array_1 = ensure_array_like(quadtreeRects(quadtree$1, false));
                $$payload3.out += `<g class="tooltip-quadtree"><!--[-->`;
                for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                  let rect = each_array_1[$$index_1];
                  $$payload3.out += `<rect${attr("x", rect.x)}${attr("y", rect.y)}${attr("width", rect.width)}${attr("height", rect.height)}${attr("class", clsx(cls(debug ? "fill-danger/10 stroke-danger" : "fill-transparent")))}></rect>`;
                }
                $$payload3.out += `<!--]--></g>`;
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    mode,
    findTooltipData,
    raiseTarget,
    locked,
    radius,
    debug,
    onclick,
    tooltip,
    hideDelay
  });
  pop();
}
const brushContextKey = Symbol();
function setBrushContext(brush) {
  setContext(brushContextKey, brush);
}
function BrushContext($$payload, $$props) {
  push();
  var $$store_subs;
  let xDomainMin, xDomainMax, yDomainMin, yDomainMax, top, bottom, left, right, _range;
  const {
    xScale,
    yScale,
    width,
    height,
    padding,
    containerWidth,
    containerHeight,
    config
  } = chartContext();
  let axis = fallback($$props["axis"], "x");
  let handleSize = fallback($$props["handleSize"], 5);
  let resetOnEnd = fallback($$props["resetOnEnd"], false);
  let xDomain = fallback($$props["xDomain"], () => store_get($$store_subs ??= {}, "$xScale", xScale).domain(), true);
  let yDomain = fallback($$props["yDomain"], () => store_get($$store_subs ??= {}, "$yScale", yScale).domain(), true);
  let mode = fallback($$props["mode"], "integrated");
  let disabled = fallback($$props["disabled"], false);
  const originalXDomain = store_get($$store_subs ??= {}, "$config", config).xDomain;
  const originalYDomain = store_get($$store_subs ??= {}, "$config", config).yDomain;
  let range2 = fallback($$props["range"], void 0);
  let handle = fallback($$props["handle"], void 0);
  let classes = fallback($$props["classes"], () => ({}), true);
  let onchange = fallback($$props["onchange"], () => {
  });
  let onbrushstart = fallback($$props["onbrushstart"], () => {
  });
  let onbrushend = fallback($$props["onbrushend"], () => {
  });
  let onreset = fallback($$props["onreset"], () => {
  });
  let brush = fallback(
    $$props["brush"],
    () => writable({
      xDomain: null,
      yDomain: null,
      isActive: false,
      range: { x: 0, y: 0, width: 0, height: 0 },
      handleSize: 0
    }),
    true
  );
  setBrushContext(brush);
  new Logger("BrushContext");
  let isActive = false;
  [xDomainMin, xDomainMax] = extent(store_get($$store_subs ??= {}, "$xScale", xScale).domain());
  [yDomainMin, yDomainMax] = extent(store_get($$store_subs ??= {}, "$yScale", yScale).domain());
  top = store_get($$store_subs ??= {}, "$yScale", yScale)(yDomain?.[1]);
  bottom = store_get($$store_subs ??= {}, "$yScale", yScale)(yDomain?.[0]);
  left = store_get($$store_subs ??= {}, "$xScale", xScale)(xDomain?.[0]);
  right = store_get($$store_subs ??= {}, "$xScale", xScale)(xDomain?.[1]);
  _range = {
    x: axis === "both" || axis === "x" ? left : 0,
    y: axis === "both" || axis === "y" ? top : 0,
    width: axis === "both" || axis === "x" ? right - left : store_get($$store_subs ??= {}, "$width", width),
    height: axis === "both" || axis === "y" ? bottom - top : store_get($$store_subs ??= {}, "$height", height)
  };
  if (mode === "separated") {
    const isXAxisActive = xDomain?.[0]?.valueOf() !== originalXDomain?.[0]?.valueOf() || xDomain?.[1]?.valueOf() !== originalXDomain?.[1]?.valueOf();
    const isYAxisActive = yDomain?.[0]?.valueOf() !== originalYDomain?.[0]?.valueOf() || yDomain?.[1]?.valueOf() !== originalYDomain?.[1]?.valueOf();
    isActive = axis === "x" ? isXAxisActive : axis == "y" ? isYAxisActive : isXAxisActive || isYAxisActive;
  }
  store_set(brush, {
    xDomain,
    yDomain,
    isActive,
    range: _range,
    handleSize
  });
  if (disabled) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${add_styles({
      top: `${stringify(store_get($$store_subs ??= {}, "$padding", padding).top)}px`,
      left: `${stringify(store_get($$store_subs ??= {}, "$padding", padding).left)}px`,
      width: `${stringify(store_get($$store_subs ??= {}, "$width", width))}px`,
      height: `${stringify(store_get($$store_subs ??= {}, "$height", height))}px`
    })}${attr("class", clsx(cls("BrushContext absolute touch-none")))}><div${add_styles({
      top: `-${stringify(store_get($$store_subs ??= {}, "$padding", padding).top ?? 0)}px`,
      left: `-${stringify(store_get($$store_subs ??= {}, "$padding", padding).left ?? 0)}px`,
      width: `${stringify(store_get($$store_subs ??= {}, "$containerWidth", containerWidth))}px`,
      height: `${stringify(store_get($$store_subs ??= {}, "$containerHeight", containerHeight))}px`
    })} class="absolute"><!---->`;
    slot(
      $$payload,
      $$props,
      "default",
      {
        brush: store_get($$store_subs ??= {}, "$brush", brush)
      },
      null
    );
    $$payload.out += `<!----></div> `;
    if (isActive) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div${spread_attributes(
        {
          ...range2,
          class: clsx(cls("range", "absolute bg-surface-content/10 cursor-move select-none", "z-10", classes.range, range2?.class))
        },
        null,
        void 0,
        {
          left: `${stringify(_range.x)}px`,
          top: `${stringify(_range.y)}px`,
          width: `${stringify(_range.width)}px`,
          height: `${stringify(_range.height)}px`
        }
      )}></div> `;
      if (axis === "both" || axis === "y") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div${spread_attributes(
          {
            ...handle,
            class: clsx(cls("handle top", "cursor-ns-resize select-none", "range absolute", "z-10", classes.handle, handle?.class))
          },
          null,
          void 0,
          {
            left: `${stringify(_range.x)}px`,
            top: `${stringify(_range.y)}px`,
            width: `${stringify(_range.width)}px`,
            height: `${stringify(handleSize)}px`
          }
        )}></div> <div${spread_attributes(
          {
            ...handle,
            class: clsx(cls("handle bottom", "cursor-ns-resize select-none", "range absolute", "z-10", classes.handle, handle?.class))
          },
          null,
          void 0,
          {
            left: `${stringify(_range.x)}px`,
            top: `${stringify(bottom - handleSize)}px`,
            width: `${stringify(_range.width)}px`,
            height: `${stringify(handleSize)}px`
          }
        )}></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (axis === "both" || axis === "x") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div${spread_attributes(
          {
            ...handle,
            class: clsx(cls("handle left", "cursor-ew-resize select-none", "range absolute", "z-10", classes.handle, handle?.class))
          },
          null,
          void 0,
          {
            left: `${stringify(_range.x)}px`,
            top: `${stringify(_range.y)}px`,
            width: `${stringify(handleSize)}px`,
            height: `${stringify(_range.height)}px`
          }
        )}></div> <div${spread_attributes(
          {
            ...handle,
            class: clsx(cls("handle right", "cursor-ew-resize select-none", "range absolute", "z-10", classes.handle, handle?.class))
          },
          null,
          void 0,
          {
            left: `${stringify(right - handleSize + 1)}px`,
            top: `${stringify(_range.y)}px`,
            width: `${stringify(handleSize)}px`,
            height: `${stringify(_range.height)}px`
          }
        )}></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    axis,
    handleSize,
    resetOnEnd,
    xDomain,
    yDomain,
    mode,
    disabled,
    range: range2,
    handle,
    classes,
    onchange,
    onbrushstart,
    onbrushend,
    onreset,
    brush
  });
  pop();
}
const renderContextKey = Symbol();
function getRenderContext() {
  return getContext(renderContextKey);
}
function setRenderContext(context) {
  setContext(renderContextKey, context);
}
function Chart($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "data",
    "x",
    "xRange",
    "y",
    "yScale",
    "yRange",
    "x1",
    "x1Scale",
    "x1Domain",
    "x1Range",
    "y1",
    "y1Scale",
    "y1Domain",
    "y1Range",
    "c",
    "cScale",
    "cDomain",
    "cRange",
    "xBaseline",
    "yBaseline",
    "radial",
    "geo",
    "geoProjection",
    "tooltip",
    "tooltipContext",
    "transform",
    "transformContext",
    "brush",
    "brushContext",
    "onresize",
    "ondragstart",
    "ondragend",
    "ontransform"
  ]);
  push();
  var $$store_subs;
  let yReverse, _x, _y, _yRange;
  let data = fallback($$props["data"], () => [], true);
  let x = fallback($$props["x"], void 0);
  let xRange = fallback($$props["xRange"], void 0);
  let y = fallback($$props["y"], void 0);
  let yScale = fallback($$props["yScale"], void 0);
  let yRange = fallback($$props["yRange"], void 0);
  let x1 = fallback($$props["x1"], void 0);
  let x1Scale = fallback($$props["x1Scale"], void 0);
  let x1Domain = fallback($$props["x1Domain"], void 0);
  let x1Range = fallback($$props["x1Range"], void 0);
  let y1 = fallback($$props["y1"], void 0);
  let y1Scale = fallback($$props["y1Scale"], void 0);
  let y1Domain = fallback($$props["y1Domain"], void 0);
  let y1Range = fallback($$props["y1Range"], void 0);
  let c = fallback($$props["c"], void 0);
  let cScale = fallback($$props["cScale"], void 0);
  let cDomain = fallback($$props["cDomain"], void 0);
  let cRange = fallback($$props["cRange"], void 0);
  let xBaseline = fallback($$props["xBaseline"], null);
  let xDomain = void 0;
  let yBaseline = fallback($$props["yBaseline"], null);
  let yDomain = void 0;
  let radial = fallback($$props["radial"], false);
  let geo = fallback($$props["geo"], void 0);
  let geoProjection = fallback($$props["geoProjection"], void 0);
  let tooltip = fallback($$props["tooltip"], void 0);
  let tooltipContext2 = fallback($$props["tooltipContext"], void 0);
  let transform = fallback($$props["transform"], void 0);
  let transformContext2 = fallback($$props["transformContext"], void 0);
  let brush = fallback($$props["brush"], void 0);
  let brushContext = fallback($$props["brushContext"], void 0);
  let onresize = fallback($$props["onresize"], void 0);
  let ondragstart = fallback($$props["ondragstart"], void 0);
  let ondragend = fallback($$props["ondragend"], void 0);
  let ontransform = fallback($$props["ontransform"], void 0);
  if (xBaseline != null && Array.isArray(data)) {
    const xValues = data.flatMap(accessor(x));
    xDomain = [
      min([xBaseline, ...xValues]),
      max([xBaseline, ...xValues])
    ];
  }
  if (yBaseline != null && Array.isArray(data)) {
    const yValues = data.flatMap(accessor(y));
    yDomain = [
      min([yBaseline, ...yValues]),
      max([yBaseline, ...yValues])
    ];
  }
  yReverse = yScale ? !isScaleBand(yScale) : true;
  _x = x;
  _y = y;
  _yRange = yRange ?? (radial ? ({ height }) => [0, height / 2] : void 0);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    LayerCake($$payload2, spread_props([
      {
        data,
        x: _x,
        xDomain,
        xRange: xRange ?? (radial ? [0, 2 * Math.PI] : void 0),
        y: _y,
        yScale,
        yDomain,
        yRange: _yRange,
        yReverse,
        xDomainSort: false,
        yDomainSort: false,
        zDomainSort: false,
        rDomainSort: false
      },
      $$restProps,
      {
        children: invalid_default_snippet,
        $$slots: {
          default: ($$payload3, {
            aspectRatio,
            containerHeight,
            containerWidth,
            height,
            width,
            element: element2,
            x: x2,
            xScale,
            xGet,
            y: y2,
            yScale: yScale2,
            yGet,
            z,
            zScale,
            zGet,
            r,
            rScale,
            rGet,
            padding
          }) => {
            const initialTransform = geo?.applyTransform?.includes("translate") && geo?.fitGeojson && geo?.projection ? geoFitObjectTransform(geo.projection(), [width, height], geo.fitGeojson) : void 0;
            ChartContext($$payload3, {
              data,
              radial,
              x1,
              x1Scale,
              x1Domain,
              x1Range,
              y1,
              y1Scale,
              y1Domain,
              y1Range,
              c,
              cScale,
              cDomain,
              cRange,
              onresize,
              children: invalid_default_snippet,
              $$slots: {
                default: ($$payload4, {
                  data: data2,
                  flatData,
                  config,
                  x1: x12,
                  x1Scale: x1Scale2,
                  x1Get,
                  y1: y12,
                  y1Scale: y1Scale2,
                  y1Get,
                  c: c2,
                  cScale: cScale2,
                  cGet
                }) => {
                  $$payload4.out += `<!---->`;
                  {
                    TransformContext($$payload4, spread_props([
                      {
                        mode: transform?.mode ?? geo?.applyTransform?.length ? "manual" : "none",
                        initialTranslate: initialTransform?.translate,
                        initialScale: initialTransform?.scale,
                        processTranslate: geo ? (x3, y3, deltaX, deltaY) => {
                          if (geo.applyTransform?.includes("rotate")) {
                            const projectionScale = store_get($$store_subs ??= {}, "$geoProjection", geoProjection).scale();
                            const sensitivity = 75;
                            return {
                              x: x3 + deltaX * (sensitivity / projectionScale),
                              y: y3 + deltaY * (sensitivity / projectionScale) * -1
                            };
                          } else {
                            return { x: x3 + deltaX, y: y3 + deltaY };
                          }
                        } : void 0
                      },
                      transform,
                      {
                        ondragstart,
                        ontransform,
                        ondragend,
                        children: invalid_default_snippet,
                        $$slots: {
                          default: ($$payload5, { transform: _transform }) => {
                            GeoContext($$payload5, spread_props([
                              geo,
                              {
                                get geo() {
                                  return geoProjection;
                                },
                                set geo($$value) {
                                  geoProjection = $$value;
                                  $$settled = false;
                                },
                                children: invalid_default_snippet,
                                $$slots: {
                                  default: ($$payload6, { projection }) => {
                                    const brushProps = typeof brush === "object" ? brush : { disabled: !brush };
                                    BrushContext($$payload6, spread_props([
                                      brushProps,
                                      {
                                        get brush() {
                                          return brushContext;
                                        },
                                        set brush($$value) {
                                          brushContext = $$value;
                                          $$settled = false;
                                        },
                                        children: invalid_default_snippet,
                                        $$slots: {
                                          default: ($$payload7, { brush: brush2 }) => {
                                            const tooltipProps = typeof tooltip === "object" ? tooltip : {};
                                            TooltipContext($$payload7, spread_props([
                                              tooltipProps,
                                              {
                                                get tooltip() {
                                                  return tooltipContext2;
                                                },
                                                set tooltip($$value) {
                                                  tooltipContext2 = $$value;
                                                  $$settled = false;
                                                },
                                                children: invalid_default_snippet,
                                                $$slots: {
                                                  default: ($$payload8, { tooltip: tooltip2 }) => {
                                                    $$payload8.out += `<!---->`;
                                                    slot(
                                                      $$payload8,
                                                      $$props,
                                                      "default",
                                                      {
                                                        aspectRatio,
                                                        containerHeight,
                                                        containerWidth,
                                                        height,
                                                        width,
                                                        element: element2,
                                                        projection,
                                                        transform: _transform,
                                                        tooltip: tooltip2,
                                                        brush: brush2,
                                                        x: x2,
                                                        xScale,
                                                        xGet,
                                                        y: y2,
                                                        yScale: yScale2,
                                                        yGet,
                                                        z,
                                                        zScale,
                                                        zGet,
                                                        r,
                                                        rScale,
                                                        rGet,
                                                        x1: x12,
                                                        x1Scale: x1Scale2,
                                                        x1Get,
                                                        y1: y12,
                                                        y1Scale: y1Scale2,
                                                        y1Get,
                                                        c: c2,
                                                        cScale: cScale2,
                                                        cGet,
                                                        padding,
                                                        data: data2,
                                                        flatData,
                                                        config
                                                      },
                                                      null
                                                    );
                                                    $$payload8.out += `<!---->`;
                                                  }
                                                }
                                              }
                                            ]));
                                          }
                                        }
                                      }
                                    ]));
                                  }
                                }
                              }
                            ]));
                          }
                        }
                      }
                    ]));
                  }
                  $$payload4.out += `<!---->`;
                }
              }
            });
          }
        }
      }
    ]));
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    data,
    x,
    xRange,
    y,
    yScale,
    yRange,
    x1,
    x1Scale,
    x1Domain,
    x1Range,
    y1,
    y1Scale,
    y1Domain,
    y1Range,
    c,
    cScale,
    cDomain,
    cRange,
    xBaseline,
    yBaseline,
    radial,
    geo,
    geoProjection,
    tooltip,
    tooltipContext: tooltipContext2,
    transform,
    transformContext: transformContext2,
    brush,
    brushContext,
    onresize,
    ondragstart,
    ondragend,
    ontransform
  });
  pop();
}
function Area($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "data",
    "pathData",
    "x",
    "y0",
    "y1",
    "tweened",
    "clipPath",
    "curve",
    "defined",
    "line",
    "fill",
    "fillOpacity",
    "stroke",
    "strokeWidth",
    "class",
    "onclick",
    "onpointerenter",
    "onpointermove",
    "onpointerleave"
  ]);
  push();
  var $$store_subs;
  let xAccessor, y0Accessor, y1Accessor, xOffset, yOffset, tweened_d;
  const {
    data: contextData,
    xScale,
    yScale,
    x: contextX,
    y,
    yDomain,
    yRange,
    radial,
    config
  } = chartContext();
  let data = fallback($$props["data"], void 0);
  let pathData = fallback($$props["pathData"], void 0);
  let x = fallback($$props["x"], void 0);
  let y0 = fallback($$props["y0"], void 0);
  let y1 = fallback($$props["y1"], void 0);
  let tweened2 = fallback($$props["tweened"], void 0);
  let clipPath = fallback($$props["clipPath"], void 0);
  let curve = fallback($$props["curve"], void 0);
  let defined = fallback($$props["defined"], void 0);
  let line2 = fallback($$props["line"], false);
  let fill = fallback($$props["fill"], void 0);
  let fillOpacity = fallback($$props["fillOpacity"], void 0);
  let stroke = fallback($$props["stroke"], void 0);
  let strokeWidth = fallback($$props["strokeWidth"], void 0);
  let className = fallback($$props["class"], void 0);
  let onclick = fallback($$props["onclick"], void 0);
  let onpointerenter = fallback($$props["onpointerenter"], void 0);
  let onpointermove = fallback($$props["onpointermove"], void 0);
  let onpointerleave = fallback($$props["onpointerleave"], void 0);
  function defaultPathData() {
    const path2 = store_get($$store_subs ??= {}, "$radial", radial) ? areaRadial().angle((d) => store_get($$store_subs ??= {}, "$xScale", xScale)(xAccessor(d))).innerRadius((d) => Math.min(store_get($$store_subs ??= {}, "$yScale", yScale)(0), store_get($$store_subs ??= {}, "$yRange", yRange)[0])).outerRadius((d) => Math.min(store_get($$store_subs ??= {}, "$yScale", yScale)(0), store_get($$store_subs ??= {}, "$yRange", yRange)[0])) : area().x((d) => store_get($$store_subs ??= {}, "$xScale", xScale)(xAccessor(d)) + xOffset).y0((d) => Math.min(store_get($$store_subs ??= {}, "$yScale", yScale)(0), store_get($$store_subs ??= {}, "$yRange", yRange)[0])).y1((d) => Math.min(store_get($$store_subs ??= {}, "$yScale", yScale)(0), store_get($$store_subs ??= {}, "$yRange", yRange)[0]));
    path2.defined(defined ?? ((d) => xAccessor(d) != null && y1Accessor(d) != null));
    if (curve) path2.curve(curve);
    return path2(data ?? store_get($$store_subs ??= {}, "$contextData", contextData));
  }
  const tweenedOptions = tweened2 ? {
    interpolate: interpolatePath,
    ...typeof tweened2 === "object" ? tweened2 : null
  } : false;
  const renderContext = getRenderContext();
  const canvasContext = getCanvasContext();
  function render2(ctx, styleOverrides) {
    renderPathData(ctx, store_get($$store_subs ??= {}, "$tweened_d", tweened_d), styleOverrides ? merge({ styles: { strokeWidth } }, styleOverrides) : {
      styles: { fill, fillOpacity, stroke, strokeWidth },
      classes: className
    });
  }
  let canvasUnregister;
  onDestroy(() => {
    if (renderContext === "canvas") {
      canvasUnregister();
    }
  });
  xAccessor = x ? accessor(x) : store_get($$store_subs ??= {}, "$contextX", contextX);
  y0Accessor = y0 ? accessor(y0) : (d) => min(store_get($$store_subs ??= {}, "$yDomain", yDomain));
  y1Accessor = y1 ? accessor(y1) : store_get($$store_subs ??= {}, "$y", y);
  xOffset = isScaleBand(store_get($$store_subs ??= {}, "$xScale", xScale)) ? store_get($$store_subs ??= {}, "$xScale", xScale).bandwidth() / 2 : 0;
  yOffset = isScaleBand(store_get($$store_subs ??= {}, "$yScale", yScale)) ? store_get($$store_subs ??= {}, "$yScale", yScale).bandwidth() / 2 : 0;
  tweened_d = motionStore(defaultPathData(), { tweened: tweenedOptions });
  {
    const path2 = store_get($$store_subs ??= {}, "$radial", radial) ? areaRadial().angle((d2) => store_get($$store_subs ??= {}, "$xScale", xScale)(xAccessor(d2))).innerRadius((d2) => store_get($$store_subs ??= {}, "$yScale", yScale)(y0Accessor(d2))).outerRadius((d2) => store_get($$store_subs ??= {}, "$yScale", yScale)(y1Accessor(d2))) : area().x((d2) => store_get($$store_subs ??= {}, "$xScale", xScale)(xAccessor(d2)) + xOffset).y0((d2) => {
      let value = max(store_get($$store_subs ??= {}, "$yRange", yRange));
      if (y0) {
        value = store_get($$store_subs ??= {}, "$yScale", yScale)(y0Accessor(d2));
      } else if (Array.isArray(store_get($$store_subs ??= {}, "$config", config).y) && store_get($$store_subs ??= {}, "$config", config).y[0] === 0) {
        value = store_get($$store_subs ??= {}, "$yScale", yScale)(store_get($$store_subs ??= {}, "$y", y)(d2)[0]);
      }
      return value + yOffset;
    }).y1((d2) => {
      let value = max(store_get($$store_subs ??= {}, "$yRange", yRange));
      if (y1) {
        value = store_get($$store_subs ??= {}, "$yScale", yScale)(y1Accessor(d2));
      } else if (Array.isArray(store_get($$store_subs ??= {}, "$config", config).y) && store_get($$store_subs ??= {}, "$config", config).y[1] === 1) {
        value = store_get($$store_subs ??= {}, "$yScale", yScale)(store_get($$store_subs ??= {}, "$y", y)(d2)[1]);
      } else {
        value = store_get($$store_subs ??= {}, "$yScale", yScale)(store_get($$store_subs ??= {}, "$y", y)(d2));
      }
      return value + yOffset;
    });
    path2.defined(defined ?? ((d2) => xAccessor(d2) != null && y1Accessor(d2) != null));
    if (curve) path2.curve(curve);
    const d = pathData ?? path2(data ?? store_get($$store_subs ??= {}, "$contextData", contextData));
    tweened_d.set(d ?? "");
  }
  fill && typeof fill === "object" ? objectId(fill) : fill;
  stroke && typeof stroke === "object" ? objectId(stroke) : stroke;
  if (renderContext === "canvas") {
    canvasContext.invalidate();
  }
  if (renderContext === "canvas") {
    canvasUnregister = canvasContext.register({
      name: "Area",
      render: render2,
      events: {
        click: onclick,
        pointerenter: onpointerenter,
        pointermove: onpointermove,
        pointerleave: onpointerleave
      }
    });
    tweened_d.subscribe(() => {
      canvasContext.invalidate();
    });
  }
  if (line2) {
    $$payload.out += "<!--[-->";
    Spline($$payload, spread_props([
      { data, x, y: y1, curve, defined, tweened: tweened2 },
      typeof line2 === "object" ? line2 : null
    ]));
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if (renderContext === "svg") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<path${spread_attributes(
      {
        d: store_get($$store_subs ??= {}, "$tweened_d", tweened_d),
        "clip-path": clipPath,
        fill,
        "fill-opacity": fillOpacity,
        stroke,
        "stroke-width": strokeWidth,
        ...$$restProps,
        class: clsx(cls("path-area", className))
      },
      null,
      void 0,
      void 0,
      3
    )}></path>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    data,
    pathData,
    x,
    y0,
    y1,
    tweened: tweened2,
    clipPath,
    curve,
    defined,
    line: line2,
    fill,
    fillOpacity,
    stroke,
    strokeWidth,
    class: className,
    onclick,
    onpointerenter,
    onpointermove,
    onpointerleave
  });
  pop();
}
function Line($$payload, $$props) {
  const $$slots = sanitize_slots($$props);
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "x1",
    "initialX1",
    "y1",
    "initialY1",
    "x2",
    "initialX2",
    "y2",
    "initialY2",
    "fill",
    "stroke",
    "strokeWidth",
    "class",
    "onclick",
    "onpointerenter",
    "onpointermove",
    "onpointerleave",
    "marker",
    "markerStart",
    "markerEnd",
    "spring",
    "tweened"
  ]);
  push();
  var $$store_subs;
  let markerStartId, markerEndId, fillKey, strokeKey;
  let x1 = $$props["x1"];
  let initialX1 = fallback($$props["initialX1"], x1);
  let y1 = $$props["y1"];
  let initialY1 = fallback($$props["initialY1"], y1);
  let x2 = $$props["x2"];
  let initialX2 = fallback($$props["initialX2"], x2);
  let y2 = $$props["y2"];
  let initialY2 = fallback($$props["initialY2"], y2);
  let fill = fallback($$props["fill"], void 0);
  let stroke = fallback($$props["stroke"], void 0);
  let strokeWidth = fallback($$props["strokeWidth"], void 0);
  let className = fallback($$props["class"], void 0);
  let onclick = fallback($$props["onclick"], void 0);
  let onpointerenter = fallback($$props["onpointerenter"], void 0);
  let onpointermove = fallback($$props["onpointermove"], void 0);
  let onpointerleave = fallback($$props["onpointerleave"], void 0);
  let marker = fallback($$props["marker"], void 0);
  let markerStart = fallback($$props["markerStart"], marker);
  let markerEnd = fallback($$props["markerEnd"], marker);
  let spring2 = fallback($$props["spring"], void 0);
  let tweened2 = fallback($$props["tweened"], void 0);
  let tweened_x1 = motionStore(initialX1, { spring: spring2, tweened: tweened2 });
  let tweened_y1 = motionStore(initialY1, { spring: spring2, tweened: tweened2 });
  let tweened_x2 = motionStore(initialX2, { spring: spring2, tweened: tweened2 });
  let tweened_y2 = motionStore(initialY2, { spring: spring2, tweened: tweened2 });
  const renderContext = getRenderContext();
  const canvasContext = getCanvasContext();
  function render2(ctx, styleOverrides) {
    const pathData = `M ${store_get($$store_subs ??= {}, "$tweened_x1", tweened_x1)},${store_get($$store_subs ??= {}, "$tweened_y1", tweened_y1)} L ${store_get($$store_subs ??= {}, "$tweened_x2", tweened_x2)},${store_get($$store_subs ??= {}, "$tweened_y2", tweened_y2)}`;
    renderPathData(ctx, pathData, styleOverrides ? merge({ styles: { strokeWidth } }, styleOverrides) : {
      styles: { fill, stroke, strokeWidth },
      classes: className
    });
  }
  let canvasUnregister;
  onDestroy(() => {
    if (renderContext === "canvas") {
      canvasUnregister();
    }
  });
  markerStartId = markerStart || $$slots["markerStart"] ? uniqueId("marker-") : "";
  markerEndId = markerEnd || $$slots["markerEnd"] ? uniqueId("marker-") : "";
  tick().then(() => {
    tweened_x1.set(x1);
    tweened_y1.set(y1);
    tweened_x2.set(x2);
    tweened_y2.set(y2);
  });
  fillKey = fill && typeof fill === "object" ? objectId(fill) : fill;
  strokeKey = stroke && typeof stroke === "object" ? objectId(stroke) : stroke;
  if (renderContext === "canvas") {
    store_get($$store_subs ??= {}, "$tweened_x1", tweened_x1) && store_get($$store_subs ??= {}, "$tweened_y1", tweened_y1) && store_get($$store_subs ??= {}, "$tweened_x2", tweened_x2) && store_get($$store_subs ??= {}, "$tweened_y2", tweened_y2) && fillKey && strokeKey && strokeWidth && className;
    canvasContext.invalidate();
  }
  if (renderContext === "canvas") {
    canvasUnregister = canvasContext.register({
      name: "Line",
      render: render2,
      events: {
        click: onclick,
        pointerenter: onpointerenter,
        pointermove: onpointermove,
        pointerleave: onpointerleave
      }
    });
  }
  if (renderContext === "svg") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<line${spread_attributes(
      {
        x1: store_get($$store_subs ??= {}, "$tweened_x1", tweened_x1),
        y1: store_get($$store_subs ??= {}, "$tweened_y1", tweened_y1),
        x2: store_get($$store_subs ??= {}, "$tweened_x2", tweened_x2),
        y2: store_get($$store_subs ??= {}, "$tweened_y2", tweened_y2),
        fill,
        stroke,
        "stroke-width": strokeWidth,
        "marker-start": markerStartId ? `url(#${markerStartId})` : void 0,
        "marker-end": markerEndId ? `url(#${markerEndId})` : void 0,
        class: clsx(cls(stroke === void 0 && "stroke-surface-content", className)),
        ...$$restProps
      },
      null,
      void 0,
      void 0,
      3
    )}></line><!---->`;
    slot($$payload, $$props, "markerStart", { id: markerStartId }, () => {
      if (markerStart) {
        $$payload.out += "<!--[-->";
        Marker($$payload, spread_props([
          {
            id: markerStartId,
            type: typeof markerStart === "string" ? markerStart : void 0
          },
          typeof markerStart === "object" ? markerStart : null
        ]));
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    });
    $$payload.out += `<!----><!---->`;
    slot($$payload, $$props, "markerEnd", { id: markerEndId }, () => {
      Marker($$payload, spread_props([
        {
          id: markerEndId,
          type: typeof markerEnd === "string" ? markerEnd : void 0
        },
        typeof markerEnd === "object" ? markerEnd : null
      ]));
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    x1,
    initialX1,
    y1,
    initialY1,
    x2,
    initialX2,
    y2,
    initialY2,
    fill,
    stroke,
    strokeWidth,
    class: className,
    onclick,
    onpointerenter,
    onpointermove,
    onpointerleave,
    marker,
    markerStart,
    markerEnd,
    spring: spring2,
    tweened: tweened2
  });
  pop();
}
function Circle($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "cx",
    "initialCx",
    "cy",
    "initialCy",
    "r",
    "initialR",
    "spring",
    "tweened",
    "fill",
    "fillOpacity",
    "stroke",
    "strokeWidth",
    "class",
    "onclick",
    "onpointerdown",
    "onpointerenter",
    "onpointermove",
    "onpointerleave"
  ]);
  push();
  var $$store_subs;
  let fillKey, strokeKey;
  let cx = fallback($$props["cx"], 0);
  let initialCx = fallback($$props["initialCx"], cx);
  let cy = fallback($$props["cy"], 0);
  let initialCy = fallback($$props["initialCy"], cy);
  let r = fallback($$props["r"], 1);
  let initialR = fallback($$props["initialR"], r);
  let spring2 = fallback($$props["spring"], void 0);
  let tweened2 = fallback($$props["tweened"], void 0);
  let fill = fallback($$props["fill"], void 0);
  let fillOpacity = fallback($$props["fillOpacity"], void 0);
  let stroke = fallback($$props["stroke"], void 0);
  let strokeWidth = fallback($$props["strokeWidth"], void 0);
  let className = fallback($$props["class"], void 0);
  let onclick = fallback($$props["onclick"], void 0);
  let onpointerdown = fallback($$props["onpointerdown"], void 0);
  let onpointerenter = fallback($$props["onpointerenter"], void 0);
  let onpointermove = fallback($$props["onpointermove"], void 0);
  let onpointerleave = fallback($$props["onpointerleave"], void 0);
  let tweened_cx = motionStore(initialCx, { spring: spring2, tweened: tweened2 });
  let tweened_cy = motionStore(initialCy, { spring: spring2, tweened: tweened2 });
  let tweened_r = motionStore(initialR, { spring: spring2, tweened: tweened2 });
  const renderContext = getRenderContext();
  const canvasContext = getCanvasContext();
  function render2(ctx, styleOverrides) {
    renderCircle(
      ctx,
      {
        cx: store_get($$store_subs ??= {}, "$tweened_cx", tweened_cx),
        cy: store_get($$store_subs ??= {}, "$tweened_cy", tweened_cy),
        r: store_get($$store_subs ??= {}, "$tweened_r", tweened_r)
      },
      styleOverrides ? merge({ styles: { strokeWidth } }, styleOverrides) : {
        styles: { fill, fillOpacity, stroke, strokeWidth },
        classes: className
      }
    );
  }
  let canvasUnregister;
  onDestroy(() => {
    if (renderContext === "canvas") {
      canvasUnregister();
    }
  });
  tick().then(() => {
    tweened_cx.set(cx);
    tweened_cy.set(cy);
    tweened_r.set(r);
  });
  fillKey = fill && typeof fill === "object" ? objectId(fill) : fill;
  strokeKey = stroke && typeof stroke === "object" ? objectId(stroke) : stroke;
  if (renderContext === "canvas") {
    store_get($$store_subs ??= {}, "$tweened_cx", tweened_cx) && store_get($$store_subs ??= {}, "$tweened_cy", tweened_cy) && store_get($$store_subs ??= {}, "$tweened_r", tweened_r) && fillKey && fillOpacity && strokeKey && strokeWidth && className;
    canvasContext.invalidate();
  }
  if (renderContext === "canvas") {
    canvasUnregister = canvasContext.register({
      name: "Circle",
      render: render2,
      events: {
        click: onclick,
        pointerdown: onpointerdown,
        pointerenter: onpointerenter,
        pointermove: onpointermove,
        pointerleave: onpointerleave
      }
    });
  }
  if (renderContext === "svg") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<circle${spread_attributes(
      {
        cx: store_get($$store_subs ??= {}, "$tweened_cx", tweened_cx),
        cy: store_get($$store_subs ??= {}, "$tweened_cy", tweened_cy),
        r: store_get($$store_subs ??= {}, "$tweened_r", tweened_r),
        fill,
        "fill-opacity": fillOpacity,
        stroke,
        "stroke-width": strokeWidth,
        class: clsx(cls(fill == null && "fill-surface-content", className)),
        ...$$restProps
      },
      null,
      void 0,
      void 0,
      3
    )}></circle>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    cx,
    initialCx,
    cy,
    initialCy,
    r,
    initialR,
    spring: spring2,
    tweened: tweened2,
    fill,
    fillOpacity,
    stroke,
    strokeWidth,
    class: className,
    onclick,
    onpointerdown,
    onpointerenter,
    onpointermove,
    onpointerleave
  });
  pop();
}
function Rule($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["x", "xOffset", "y", "yOffset"]);
  push();
  var $$store_subs;
  let xRangeMin, xRangeMax, yRangeMin, yRangeMax, showRule;
  const { xScale, yScale, xRange, yRange, radial } = chartContext();
  let x = fallback($$props["x"], false);
  let xOffset = fallback($$props["xOffset"], 0);
  let y = fallback($$props["y"], false);
  let yOffset = fallback($$props["yOffset"], 0);
  [xRangeMin, xRangeMax] = extent(store_get($$store_subs ??= {}, "$xRange", xRange));
  [yRangeMin, yRangeMax] = extent(store_get($$store_subs ??= {}, "$yRange", yRange));
  showRule = (value, axis) => {
    switch (typeof value) {
      case "boolean":
        return value;
      case "string":
        return true;
      default:
        if (axis === "x") {
          return store_get($$store_subs ??= {}, "$xScale", xScale)(value) >= xRangeMin && store_get($$store_subs ??= {}, "$xScale", xScale)(value) <= xRangeMax;
        } else {
          return store_get($$store_subs ??= {}, "$yScale", yScale)(value) >= yRangeMin && store_get($$store_subs ??= {}, "$yScale", yScale)(value) <= yRangeMax;
        }
    }
  };
  $$payload.out += `<g class="rule">`;
  if (showRule(x, "x")) {
    $$payload.out += "<!--[-->";
    const xCoord = x === true || x === "left" ? xRangeMin : x === "right" ? xRangeMax : store_get($$store_subs ??= {}, "$xScale", xScale)(x) + xOffset;
    if (store_get($$store_subs ??= {}, "$radial", radial)) {
      $$payload.out += "<!--[-->";
      const [x1, y1] = pointRadial(xCoord, Number(yRangeMin));
      const [x2, y2] = pointRadial(xCoord, Number(yRangeMax));
      Line($$payload, spread_props([
        { x1, y1, x2, y2 },
        $$restProps,
        {
          class: cls("stroke-surface-content/10", $$sanitized_props.class)
        }
      ]));
    } else {
      $$payload.out += "<!--[!-->";
      Line($$payload, spread_props([
        {
          x1: xCoord,
          x2: xCoord,
          y1: store_get($$store_subs ??= {}, "$yRange", yRange)[0] || 0,
          y2: store_get($$store_subs ??= {}, "$yRange", yRange)[1] || 0
        },
        $$restProps,
        {
          class: cls("stroke-surface-content/50", $$sanitized_props.class)
        }
      ]));
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if (showRule(y, "y")) {
    $$payload.out += "<!--[-->";
    if (store_get($$store_subs ??= {}, "$radial", radial)) {
      $$payload.out += "<!--[-->";
      Circle($$payload, {
        r: y === true || y === "bottom" ? yRangeMax : y === "top" ? yRangeMin : store_get($$store_subs ??= {}, "$yScale", yScale)(y) + yOffset,
        class: cls("fill-none stroke-surface-content/50", $$sanitized_props.class)
      });
    } else {
      $$payload.out += "<!--[!-->";
      Line($$payload, spread_props([
        {
          x1: store_get($$store_subs ??= {}, "$xRange", xRange)[0] || 0,
          x2: store_get($$store_subs ??= {}, "$xRange", xRange)[1] || 0,
          y1: y === true || y === "bottom" ? yRangeMax : y === "top" ? yRangeMin : store_get($$store_subs ??= {}, "$yScale", yScale)(y) + yOffset,
          y2: y === true || y === "bottom" ? yRangeMax : y === "top" ? yRangeMin : store_get($$store_subs ??= {}, "$yScale", yScale)(y) + yOffset
        },
        $$restProps,
        {
          class: cls("stroke-surface-content/50", $$sanitized_props.class)
        }
      ]));
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></g>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { x, xOffset, y, yOffset });
  pop();
}
const MEASUREMENT_ELEMENT_ID = "__text_measurement_id";
function _getStringWidth(str, style) {
  try {
    let textEl = document.getElementById(MEASUREMENT_ELEMENT_ID);
    if (!textEl) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.style.width = "0";
      svg.style.height = "0";
      svg.style.position = "absolute";
      svg.style.top = "-100%";
      svg.style.left = "-100%";
      textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
      textEl.setAttribute("id", MEASUREMENT_ELEMENT_ID);
      svg.appendChild(textEl);
      document.body.appendChild(svg);
    }
    Object.assign(textEl.style, style);
    textEl.textContent = str;
    return textEl.getComputedTextLength();
  } catch (e) {
    return null;
  }
}
const getStringWidth = memoize(_getStringWidth, (str, style) => `${str}_${JSON.stringify(style)}`);
function Text($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "value",
    "width",
    "x",
    "initialX",
    "y",
    "initialY",
    "dx",
    "dy",
    "lineHeight",
    "capHeight",
    "scaleToFit",
    "textAnchor",
    "verticalAnchor",
    "rotate",
    "fill",
    "fillOpacity",
    "stroke",
    "strokeWidth",
    "class",
    "spring",
    "tweened"
  ]);
  push();
  var $$store_subs;
  let words, lines, rotateTransform, transform, fillKey, strokeKey;
  let value = fallback($$props["value"], 0);
  let width = fallback($$props["width"], void 0);
  let x = fallback($$props["x"], 0);
  let initialX = fallback($$props["initialX"], x);
  let y = fallback($$props["y"], 0);
  let initialY = fallback($$props["initialY"], y);
  let dx = fallback($$props["dx"], 0);
  let dy = fallback($$props["dy"], 0);
  let lineHeight = fallback($$props["lineHeight"], "1em");
  let capHeight = fallback($$props["capHeight"], "0.71em");
  let scaleToFit = fallback($$props["scaleToFit"], false);
  let textAnchor = fallback($$props["textAnchor"], "start");
  let verticalAnchor = fallback($$props["verticalAnchor"], "end");
  let rotate = fallback($$props["rotate"], void 0);
  let fill = fallback($$props["fill"], void 0);
  let fillOpacity = fallback($$props["fillOpacity"], void 0);
  let stroke = fallback($$props["stroke"], void 0);
  let strokeWidth = fallback($$props["strokeWidth"], void 0);
  let className = fallback($$props["class"], void 0);
  let wordsByLines = [];
  let wordsWithWidth = [];
  let spaceWidth = 0;
  let style = void 0;
  function getPixelValue(cssValue) {
    if (typeof cssValue === "number") {
      return cssValue;
    }
    const [match, value2, units] = cssValue.match(/([\d.]+)(\D+)/);
    const number = Number(value2);
    switch (units) {
      case "px":
        return number;
      case "em":
      case "rem":
        return number * 16;
      default:
        return 0;
    }
  }
  let startDy = 0;
  let scaleTransform = "";
  function isValidXOrY(xOrY) {
    return (
      // number that is not NaN or Infinity
      typeof xOrY === "number" && Number.isFinite(xOrY) || // for percentage
      typeof xOrY === "string"
    );
  }
  let spring2 = fallback($$props["spring"], void 0);
  let tweened2 = fallback($$props["tweened"], void 0);
  let tweened_x = motionStore(initialX, { spring: spring2, tweened: tweened2 });
  let tweened_y = motionStore(initialY, { spring: spring2, tweened: tweened2 });
  const renderContext = getRenderContext();
  const canvasContext = getCanvasContext();
  function render2(ctx, styleOverrides) {
    wordsByLines.forEach((line2, index) => {
      renderText(
        ctx,
        line2.words.join(" "),
        {
          x: getPixelValue(store_get($$store_subs ??= {}, "$tweened_x", tweened_x)) + getPixelValue(dx),
          y: getPixelValue(store_get($$store_subs ??= {}, "$tweened_y", tweened_y)) + getPixelValue(dy) + (index === 0 ? startDy : getPixelValue(lineHeight))
        },
        styleOverrides ? merge({ styles: { strokeWidth } }, styleOverrides) : {
          styles: {
            fill,
            fillOpacity,
            stroke,
            strokeWidth,
            paintOrder: "stroke",
            textAnchor
          },
          classes: cls(fill === void 0 && "fill-surface-content", className)
        }
      );
    });
  }
  let canvasUnregister;
  onDestroy(() => {
    if (renderContext === "canvas") {
      canvasUnregister();
    }
  });
  words = value != null ? value.toString().split(/(?:(?!\u00A0+)\s+)/) : [];
  wordsWithWidth = words.map((word) => ({
    word,
    width: getStringWidth(word, style) || 0
  }));
  spaceWidth = getStringWidth(" ", style) || 0;
  wordsByLines = wordsWithWidth.reduce(
    (result, item) => {
      const currentLine = result[result.length - 1];
      if (currentLine && (width == null || scaleToFit || (currentLine.width || 0) + item.width + spaceWidth < width)) {
        currentLine.words.push(item.word);
        currentLine.width = currentLine.width || 0;
        currentLine.width += item.width + spaceWidth;
      } else {
        const newLine = { words: [item.word], width: item.width };
        result.push(newLine);
      }
      return result;
    },
    []
  );
  lines = wordsByLines.length;
  if (verticalAnchor === "start") {
    startDy = getPixelValue(capHeight);
  } else if (verticalAnchor === "middle") {
    startDy = (lines - 1) / 2 * -getPixelValue(lineHeight) + getPixelValue(capHeight) / 2;
  } else {
    startDy = (lines - 1) * -getPixelValue(lineHeight);
  }
  if (scaleToFit && lines > 0 && typeof x == "number" && typeof y == "number" && typeof width == "number") {
    const lineWidth = wordsByLines[0].width || 1;
    const sx = width / lineWidth;
    const sy = sx;
    const originX = x - sx * x;
    const originY = y - sy * y;
    scaleTransform = `matrix(${sx}, 0, 0, ${sy}, ${originX}, ${originY})`;
  } else {
    scaleTransform = "";
  }
  rotateTransform = rotate ? `rotate(${rotate}, ${x}, ${y})` : "";
  transform = `${scaleTransform} ${rotateTransform}`;
  tick().then(() => {
    tweened_x.set(x);
    tweened_y.set(y);
  });
  fillKey = fill && typeof fill === "object" ? objectId(fill) : fill;
  strokeKey = stroke && typeof stroke === "object" ? objectId(stroke) : stroke;
  if (renderContext === "canvas") {
    value && store_get($$store_subs ??= {}, "$tweened_x", tweened_x) && store_get($$store_subs ??= {}, "$tweened_y", tweened_y) && fillKey && strokeKey && strokeWidth && className;
    canvasContext.invalidate();
  }
  if (renderContext === "canvas") {
    canvasUnregister = canvasContext.register({ name: "Text", render: render2 });
  }
  if (renderContext === "svg") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<svg${attr("x", dx)}${attr("y", dy)} class="overflow-visible [paint-order:stroke]">`;
    if (isValidXOrY(x) && isValidXOrY(y)) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(wordsByLines);
      $$payload.out += `<text${spread_attributes(
        {
          x: store_get($$store_subs ??= {}, "$tweened_x", tweened_x),
          y: store_get($$store_subs ??= {}, "$tweened_y", tweened_y),
          transform,
          "text-anchor": textAnchor,
          ...$$restProps,
          fill,
          "fill-opacity": fillOpacity,
          stroke,
          "stroke-width": strokeWidth,
          class: clsx(cls(fill === void 0 && "fill-surface-content", className))
        },
        null,
        void 0,
        void 0,
        3
      )}><!--[-->`;
      for (let index = 0, $$length = each_array.length; index < $$length; index++) {
        let line2 = each_array[index];
        $$payload.out += `<tspan${attr("x", store_get($$store_subs ??= {}, "$tweened_x", tweened_x))}${attr("dy", index === 0 ? startDy : lineHeight)}>${escape_html(line2.words.join(" "))}</tspan>`;
      }
      $$payload.out += `<!--]--></text>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></svg>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    value,
    width,
    x,
    initialX,
    y,
    initialY,
    dx,
    dy,
    lineHeight,
    capHeight,
    scaleToFit,
    textAnchor,
    verticalAnchor,
    rotate,
    fill,
    fillOpacity,
    stroke,
    strokeWidth,
    class: className,
    spring: spring2,
    tweened: tweened2
  });
  pop();
}
function Axis($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  var $$store_subs;
  let orientation, _scale, xRangeMin, xRangeMax, yRangeMin, yRangeMax, tickVals, resolvedLabelProps;
  const {
    xScale,
    yScale,
    xRange,
    yRange,
    width,
    height,
    padding
  } = chartContext();
  let placement = $$props["placement"];
  let label = fallback($$props["label"], "");
  let labelPlacement = fallback($$props["labelPlacement"], "middle");
  let labelProps = fallback($$props["labelProps"], void 0);
  let rule = fallback($$props["rule"], false);
  let grid = fallback($$props["grid"], false);
  let ticks = fallback($$props["ticks"], void 0);
  let tickLength = fallback($$props["tickLength"], 4);
  let format$12 = fallback($$props["format"], void 0);
  let tickLabelProps = fallback($$props["tickLabelProps"], void 0);
  let spring2 = fallback($$props["spring"], void 0);
  let tweened2 = fallback($$props["tweened"], void 0);
  let transitionIn = fallback($$props["transitionIn"], tweened2 ? fade : () => {
    return {};
  });
  let transitionInParams = fallback($$props["transitionInParams"], () => ({ easing: cubicIn }), true);
  let scale = fallback($$props["scale"], void 0);
  let classes = fallback($$props["classes"], () => ({}), true);
  function getCoords(tick2) {
    switch (placement) {
      case "top":
        return {
          x: _scale(tick2) + (isScaleBand(_scale) ? _scale.bandwidth() / 2 : 0),
          y: yRangeMin
        };
      case "bottom":
        return {
          x: _scale(tick2) + (isScaleBand(_scale) ? _scale.bandwidth() / 2 : 0),
          y: yRangeMax
        };
      case "left":
        return {
          x: xRangeMin,
          y: _scale(tick2) + (isScaleBand(_scale) ? _scale.bandwidth() / 2 : 0)
        };
      case "right":
        return {
          x: xRangeMax,
          y: _scale(tick2) + (isScaleBand(_scale) ? _scale.bandwidth() / 2 : 0)
        };
      case "angle":
        return { x: _scale(tick2), y: yRangeMax };
      case "radius":
        return { x: xRangeMin, y: _scale(tick2) };
    }
  }
  function getDefaultTickLabelProps(tick2) {
    switch (placement) {
      case "top":
        return {
          textAnchor: "middle",
          verticalAnchor: "end",
          dy: -tickLength - 2
          // manually adjusted until Text supports custom styles
        };
      case "bottom":
        return {
          textAnchor: "middle",
          verticalAnchor: "start",
          dy: tickLength
          // manually adjusted until Text supports custom styles
        };
      case "left":
        return {
          textAnchor: "end",
          verticalAnchor: "middle",
          dx: -tickLength,
          dy: -2
          // manually adjusted until Text supports custom styles
        };
      case "right":
        return {
          textAnchor: "start",
          verticalAnchor: "middle",
          dx: tickLength,
          dy: -2
          // manually adjusted until Text supports custom styles
        };
      case "angle":
        const xValue = _scale(tick2);
        return {
          textAnchor: xValue === 0 || Math.abs(xValue - Math.PI) < 0.01 || // ~180deg
          Math.abs(xValue - Math.PI * 2) < 0.01 ? (
            // ~360deg
            "middle"
          ) : xValue > Math.PI ? "end" : "start",
          // angle in radians
          // ~360deg
          verticalAnchor: "middle",
          dx: Math.sin(xValue) * (tickLength + 2),
          dy: -Math.cos(xValue) * (tickLength + 4)
          // manually adjusted until Text supports custom styles
        };
      case "radius":
        return {
          textAnchor: "middle",
          verticalAnchor: "middle",
          dx: 2,
          dy: -2
          // manually adjusted until Text supports custom styles
        };
    }
  }
  orientation = placement === "angle" ? "angle" : placement === "radius" ? "radius" : ["top", "bottom"].includes(placement) ? "horizontal" : "vertical";
  _scale = scale ?? (["horizontal", "angle"].includes(orientation) ? store_get($$store_subs ??= {}, "$xScale", xScale) : store_get($$store_subs ??= {}, "$yScale", yScale));
  [xRangeMin, xRangeMax] = extent(store_get($$store_subs ??= {}, "$xRange", xRange));
  [yRangeMin, yRangeMax] = extent(store_get($$store_subs ??= {}, "$yRange", yRange));
  tickVals = Array.isArray(ticks) ? ticks : typeof ticks === "function" ? ticks(_scale) : isLiteralObject(ticks) ? _scale.ticks(ticks.interval) : isScaleBand(_scale) ? ticks ? _scale.domain().filter((v, i) => i % ticks === 0) : _scale.domain() : _scale.ticks(ticks ?? (placement === "left" || placement === "right" ? 4 : void 0));
  resolvedLabelProps = {
    value: label,
    x: placement === "left" || orientation === "horizontal" && labelPlacement === "start" ? -store_get($$store_subs ??= {}, "$padding", padding).left : placement === "right" || orientation === "horizontal" && labelPlacement === "end" ? store_get($$store_subs ??= {}, "$width", width) + store_get($$store_subs ??= {}, "$padding", padding).right : store_get($$store_subs ??= {}, "$width", width) / 2,
    y: placement === "top" || orientation === "vertical" && labelPlacement === "start" ? -store_get($$store_subs ??= {}, "$padding", padding).top : orientation === "vertical" && labelPlacement === "middle" ? store_get($$store_subs ??= {}, "$height", height) / 2 : placement === "bottom" || labelPlacement === "end" ? store_get($$store_subs ??= {}, "$height", height) + store_get($$store_subs ??= {}, "$padding", padding).bottom : 0,
    textAnchor: labelPlacement === "middle" ? "middle" : placement === "right" || orientation === "horizontal" && labelPlacement === "end" ? "end" : "start",
    verticalAnchor: placement === "top" || orientation === "vertical" && labelPlacement === "start" || placement === "left" && labelPlacement === "middle" ? "start" : "end",
    rotate: orientation === "vertical" && labelPlacement === "middle" ? -90 : 0,
    capHeight: ".5rem",
    // text-[10px]
    ...labelProps,
    class: cls("label text-[10px] stroke-surface-100 [stroke-width:2px] font-light", classes.label, labelProps?.class)
  };
  const each_array = ensure_array_like(tickVals);
  $$payload.out += `<g${attr("class", clsx(cls("Axis placement-{placement}", classes.root, $$sanitized_props.class)))}>`;
  if (rule !== false) {
    $$payload.out += "<!--[-->";
    const ruleProps = typeof rule === "object" ? rule : null;
    Rule($$payload, spread_props([
      {
        x: placement === "left" || placement === "right" ? placement : placement === "angle",
        y: placement === "top" || placement === "bottom" ? placement : placement === "radius",
        tweened: tweened2,
        spring: spring2
      },
      ruleProps,
      {
        class: cls("rule stroke-surface-content/50", classes.rule, ruleProps?.class)
      }
    ]));
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if (label) {
    $$payload.out += "<!--[-->";
    Text($$payload, spread_props([resolvedLabelProps]));
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--><!--[-->`;
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let tick2 = each_array[index];
    const tickCoords = getCoords(tick2);
    const [radialTickCoordsX, radialTickCoordsY] = pointRadial(tickCoords.x, tickCoords.y);
    const [radialTickMarkCoordsX, radialTickMarkCoordsY] = pointRadial(tickCoords.x, tickCoords.y + tickLength);
    const resolvedTickLabelProps = {
      x: orientation === "angle" ? radialTickCoordsX : tickCoords.x,
      y: orientation === "angle" ? radialTickCoordsY : tickCoords.y,
      value: format(tick2, format$12 ?? _scale.tickFormat?.() ?? ((v) => v)),
      ...getDefaultTickLabelProps(tick2),
      tweened: tweened2,
      spring: spring2,
      ...tickLabelProps,
      class: cls("tickLabel text-[10px] stroke-surface-100 [stroke-width:2px] font-light", classes.tickLabel, tickLabelProps?.class)
    };
    $$payload.out += `<g>`;
    if (grid !== false) {
      $$payload.out += "<!--[-->";
      const ruleProps = typeof grid === "object" ? grid : null;
      Rule($$payload, spread_props([
        {
          x: orientation === "horizontal" || orientation === "angle" ? tick2 : false,
          y: orientation === "vertical" || orientation === "radius" ? tick2 : false,
          tweened: tweened2,
          spring: spring2
        },
        ruleProps,
        {
          class: cls("grid stroke-surface-content/10", classes.rule, ruleProps?.class)
        }
      ]));
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
    if (orientation === "horizontal") {
      $$payload.out += "<!--[-->";
      Line($$payload, {
        x1: tickCoords.x,
        y1: tickCoords.y,
        x2: tickCoords.x,
        y2: tickCoords.y + (placement === "top" ? -tickLength : tickLength),
        tweened: tweened2,
        spring: spring2,
        class: cls("tick stroke-surface-content/50", classes.tick)
      });
    } else {
      $$payload.out += "<!--[!-->";
      if (orientation === "vertical") {
        $$payload.out += "<!--[-->";
        Line($$payload, {
          x1: tickCoords.x,
          y1: tickCoords.y,
          x2: tickCoords.x + (placement === "left" ? -tickLength : tickLength),
          y2: tickCoords.y,
          tweened: tweened2,
          spring: spring2,
          class: cls("tick stroke-surface-content/50", classes.tick)
        });
      } else {
        $$payload.out += "<!--[!-->";
        if (orientation === "angle") {
          $$payload.out += "<!--[-->";
          Line($$payload, {
            x1: radialTickCoordsX,
            y1: radialTickCoordsY,
            x2: radialTickMarkCoordsX,
            y2: radialTickMarkCoordsY,
            tweened: tweened2,
            spring: spring2,
            class: cls("tick stroke-surface-content/50", classes.tick)
          });
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--><!---->`;
    slot($$payload, $$props, "tickLabel", { labelProps: resolvedTickLabelProps, index }, () => {
      Text($$payload, spread_props([resolvedTickLabelProps]));
    });
    $$payload.out += `<!----></g>`;
  }
  $$payload.out += `<!--]--></g>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    placement,
    label,
    labelPlacement,
    labelProps,
    rule,
    grid,
    ticks,
    tickLength,
    format: format$12,
    tickLabelProps,
    spring: spring2,
    tweened: tweened2,
    transitionIn,
    transitionInParams,
    scale,
    classes
  });
  pop();
}
function Grid($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  var $$store_subs;
  let xTickVals, yTickVals, xBandOffset, yBandOffset;
  const { xScale, yScale, radial } = chartContext();
  let x = fallback($$props["x"], false);
  let y = fallback($$props["y"], false);
  let xTicks = fallback($$props["xTicks"], void 0);
  let yTicks = fallback($$props["yTicks"], () => !isScaleBand(store_get($$store_subs ??= {}, "$yScale", yScale)) ? 4 : void 0, true);
  let bandAlign = fallback($$props["bandAlign"], "center");
  let radialY = fallback($$props["radialY"], "circle");
  let spring2 = fallback($$props["spring"], void 0);
  let tweened2 = fallback($$props["tweened"], void 0);
  let transitionIn = fallback($$props["transitionIn"], tweened2 ? fade : () => {
    return {};
  });
  let transitionInParams = fallback($$props["transitionInParams"], () => ({ easing: cubicIn }), true);
  let classes = fallback($$props["classes"], () => ({}), true);
  function getTickVals(scale, ticks) {
    return Array.isArray(ticks) ? ticks : typeof ticks === "function" ? ticks(scale) : isScaleBand(scale) ? ticks ? scale.domain().filter((v, i) => i % ticks === 0) : scale.domain() : scale.ticks?.(ticks);
  }
  xTickVals = getTickVals(store_get($$store_subs ??= {}, "$xScale", xScale), xTicks);
  yTickVals = getTickVals(store_get($$store_subs ??= {}, "$yScale", yScale), yTicks);
  xBandOffset = isScaleBand(store_get($$store_subs ??= {}, "$xScale", xScale)) ? bandAlign === "between" ? -(store_get($$store_subs ??= {}, "$xScale", xScale).padding() * store_get($$store_subs ??= {}, "$xScale", xScale).step()) / 2 : store_get(
    $$store_subs ??= {},
    // before
    "$xScale",
    xScale
  ).step() / 2 - store_get($$store_subs ??= {}, "$xScale", xScale).padding() * store_get($$store_subs ??= {}, "$xScale", xScale).step() / 2 : 0;
  yBandOffset = isScaleBand(store_get($$store_subs ??= {}, "$yScale", yScale)) ? bandAlign === "between" ? -(store_get($$store_subs ??= {}, "$yScale", yScale).padding() * store_get($$store_subs ??= {}, "$yScale", yScale).step()) / 2 : store_get(
    $$store_subs ??= {},
    // before
    "$yScale",
    yScale
  ).step() / 2 - store_get($$store_subs ??= {}, "$yScale", yScale).padding() * store_get($$store_subs ??= {}, "$yScale", yScale).step() / 2 : 0;
  $$payload.out += `<g${attr("class", clsx(cls("Grid", classes.root, $$sanitized_props.class)))}>`;
  if (x) {
    $$payload.out += "<!--[-->";
    const splineProps = typeof x === "object" ? x : null;
    const each_array = ensure_array_like(xTickVals);
    $$payload.out += `<g><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let x2 = each_array[$$index];
      if (store_get($$store_subs ??= {}, "$radial", radial)) {
        $$payload.out += "<!--[-->";
        Spline($$payload, spread_props([
          {
            data: yTickVals.map((y2) => ({ x: x2, y: y2 })),
            x: "x",
            y: "y",
            xOffset: xBandOffset,
            curve: curveLinearClosed,
            tweened: tweened2,
            spring: spring2
          },
          splineProps,
          {
            class: cls("stroke-surface-content/10", classes.line, splineProps?.class)
          }
        ]));
      } else {
        $$payload.out += "<!--[!-->";
        Rule($$payload, spread_props([
          { x: x2, xOffset: xBandOffset, tweened: tweened2, spring: spring2 },
          splineProps,
          {
            class: cls("stroke-surface-content/10", classes.line, splineProps?.class)
          }
        ]));
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
    if (isScaleBand(store_get($$store_subs ??= {}, "$xScale", xScale)) && bandAlign === "between" && !store_get($$store_subs ??= {}, "$radial", radial) && xTickVals.length) {
      $$payload.out += "<!--[-->";
      Rule($$payload, spread_props([
        {
          x: xTickVals[xTickVals.length - 1],
          xOffset: xBandOffset + store_get($$store_subs ??= {}, "$xScale", xScale).step(),
          tweened: tweened2,
          spring: spring2
        },
        splineProps,
        {
          class: cls("stroke-surface-content/10", classes.line, splineProps?.class)
        }
      ]));
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></g>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if (y) {
    $$payload.out += "<!--[-->";
    const splineProps = typeof y === "object" ? y : null;
    const each_array_1 = ensure_array_like(yTickVals);
    $$payload.out += `<g><!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let y2 = each_array_1[$$index_1];
      if (store_get($$store_subs ??= {}, "$radial", radial)) {
        $$payload.out += "<!--[-->";
        if (radialY === "circle") {
          $$payload.out += "<!--[-->";
          Circle($$payload, spread_props([
            {
              r: store_get($$store_subs ??= {}, "$yScale", yScale)(y2),
              tweened: tweened2,
              spring: spring2
            },
            splineProps,
            {
              class: cls("fill-none stroke-surface-content/10", classes.line, splineProps?.class)
            }
          ]));
        } else {
          $$payload.out += "<!--[!-->";
          Spline($$payload, spread_props([
            {
              data: xTickVals.map((x2) => ({ x: x2, y: y2 })),
              x: "x",
              y: "y",
              yOffset: yBandOffset,
              tweened: tweened2,
              spring: spring2,
              curve: curveLinearClosed
            },
            splineProps,
            {
              class: cls("stroke-surface-content/10", classes.line, splineProps?.class)
            }
          ]));
        }
        $$payload.out += `<!--]-->`;
      } else {
        $$payload.out += "<!--[!-->";
        Rule($$payload, spread_props([
          { y: y2, yOffset: yBandOffset, tweened: tweened2, spring: spring2 },
          splineProps,
          {
            class: cls("stroke-surface-content/10", classes.line, splineProps?.class)
          }
        ]));
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
    if (isScaleBand(store_get($$store_subs ??= {}, "$yScale", yScale)) && bandAlign === "between" && !store_get($$store_subs ??= {}, "$radial", radial) && yTickVals.length) {
      $$payload.out += "<!--[-->";
      Rule($$payload, spread_props([
        {
          y: yTickVals[yTickVals.length - 1],
          yOffset: yBandOffset + store_get($$store_subs ??= {}, "$yScale", yScale).step(),
          tweened: tweened2,
          spring: spring2
        },
        splineProps,
        {
          class: cls("stroke-surface-content/10", classes.line, splineProps?.class)
        }
      ]));
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></g>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></g>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    x,
    y,
    xTicks,
    yTicks,
    bandAlign,
    radialY,
    spring: spring2,
    tweened: tweened2,
    transitionIn,
    transitionInParams,
    classes
  });
  pop();
}
function createDimensionGetter(context, options) {
  const { xScale, yScale, x: xAccessor, y: yAccessor, x1: x1Accessor, y1: y1Accessor, x1Scale, y1Scale } = context;
  return derived([xScale, x1Scale, yScale, y1Scale, xAccessor, yAccessor, x1Accessor, y1Accessor], ([$xScale, $x1Scale, $yScale, $y1Scale, $xAccessor, $yAccessor, $x1Accessor, $y1Accessor]) => {
    const insets = resolveInsets(options?.insets);
    const [minXDomain, maxXDomain] = $xScale.domain();
    const [minYDomain, maxYDomain] = $yScale.domain();
    const _x = accessor(options?.x ?? $xAccessor);
    const _y = accessor(options?.y ?? $yAccessor);
    const _x1 = accessor(options?.x1 ?? $x1Accessor);
    const _y1 = accessor(options?.y1 ?? $y1Accessor);
    return function getter(item) {
      if (isScaleBand($yScale)) {
        const y = firstValue($yScale(_y(item)) ?? 0) + ($y1Scale ? $y1Scale(_y1(item)) : 0) + insets.top;
        const height = Math.max(0, $yScale.bandwidth ? ($y1Scale ? $y1Scale.bandwidth?.() ?? 0 : $yScale.bandwidth()) - insets.bottom - insets.top : 0);
        const xValue = _x(item);
        let left = 0;
        let right = 0;
        if (Array.isArray(xValue)) {
          left = min(xValue);
          right = max(xValue);
        } else if (xValue == null) {
          left = 0;
          right = 0;
        } else if (xValue > 0) {
          left = max([0, minXDomain]);
          right = xValue;
        } else {
          left = xValue;
          right = min([0, maxXDomain]);
        }
        const x = $xScale(left) + insets.left;
        const width = Math.max(0, $xScale(right) - $xScale(left) - insets.left - insets.right);
        return { x, y, width, height };
      } else {
        const x = firstValue($xScale(_x(item))) + ($x1Scale ? $x1Scale(_x1(item)) : 0) + insets.left;
        const width = Math.max(0, $xScale.bandwidth ? ($x1Scale ? $x1Scale.bandwidth?.() ?? 0 : $xScale.bandwidth()) - insets.left - insets.right : 0);
        const yValue = _y(item);
        let top = 0;
        let bottom = 0;
        if (Array.isArray(yValue)) {
          top = max(yValue);
          bottom = min(yValue);
        } else if (yValue == null) {
          top = 0;
          bottom = 0;
        } else if (yValue > 0) {
          top = yValue;
          bottom = max([0, minYDomain]);
        } else {
          top = min([0, maxYDomain]);
          bottom = yValue;
        }
        const y = $yScale(top) + insets.top;
        const height = $yScale(bottom) - $yScale(top) - insets.bottom - insets.top;
        return { x, y, width, height };
      }
    };
  });
}
function firstValue(value) {
  return Array.isArray(value) ? value[0] : value;
}
function resolveInsets(insets) {
  const all = insets?.all ?? 0;
  const x = insets?.x ?? all;
  const y = insets?.y ?? all;
  const left = insets?.left ?? x;
  const right = insets?.right ?? x;
  const top = insets?.top ?? y;
  const bottom = insets?.bottom ?? y;
  return { left, right, bottom, top };
}
function Bar($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "bar",
    "x",
    "y",
    "x1",
    "y1",
    "fill",
    "stroke",
    "strokeWidth",
    "radius",
    "rounded",
    "insets",
    "onclick",
    "onpointerenter",
    "onpointermove",
    "onpointerleave",
    "spring",
    "tweened"
  ]);
  push();
  var $$store_subs;
  let getDimensions, dimensions, isVertical, valueAccessor, value, resolvedValue, _rounded, topLeft, topRight, bottomLeft, bottomRight, width, height, diameter, pathData;
  const { x: xContext, y: yContext, xScale } = chartContext();
  let bar = $$props["bar"];
  let x = fallback($$props["x"], () => store_get($$store_subs ??= {}, "$xContext", xContext), true);
  let y = fallback($$props["y"], () => store_get($$store_subs ??= {}, "$yContext", yContext), true);
  let x1 = fallback($$props["x1"], void 0);
  let y1 = fallback($$props["y1"], void 0);
  let fill = fallback($$props["fill"], void 0);
  let stroke = fallback($$props["stroke"], "black");
  let strokeWidth = fallback($$props["strokeWidth"], 0);
  let radius = fallback($$props["radius"], 0);
  let rounded = fallback($$props["rounded"], "all");
  let insets = fallback($$props["insets"], void 0);
  let onclick = fallback($$props["onclick"], void 0);
  let onpointerenter = fallback($$props["onpointerenter"], void 0);
  let onpointermove = fallback($$props["onpointermove"], void 0);
  let onpointerleave = fallback($$props["onpointerleave"], void 0);
  let spring2 = fallback($$props["spring"], void 0);
  let tweened2 = fallback($$props["tweened"], void 0);
  getRenderContext();
  getCanvasContext();
  if (stroke === null || stroke === void 0) stroke = "black";
  getDimensions = createDimensionGetter(chartContext(), { x, y, x1, y1, insets });
  dimensions = store_get($$store_subs ??= {}, "$getDimensions", getDimensions)(bar) ?? { x: 0, y: 0, width: 0, height: 0 };
  isVertical = isScaleBand(store_get($$store_subs ??= {}, "$xScale", xScale));
  valueAccessor = accessor(isVertical ? y : x);
  value = valueAccessor(bar);
  resolvedValue = Array.isArray(value) ? greatestAbs(value) : value;
  _rounded = rounded === "edge" ? isVertical ? resolvedValue >= 0 ? "top" : "bottom" : resolvedValue >= 0 ? "right" : "left" : rounded;
  topLeft = ["all", "top", "left", "top-left"].includes(_rounded);
  topRight = ["all", "top", "right", "top-right"].includes(_rounded);
  bottomLeft = ["all", "bottom", "left", "bottom-left"].includes(_rounded);
  bottomRight = ["all", "bottom", "right", "bottom-right"].includes(_rounded);
  width = dimensions.width;
  height = dimensions.height;
  diameter = 2 * radius;
  pathData = `M${dimensions.x + radius},${dimensions.y} h${width - diameter}
      ${topRight ? `a${radius},${radius} 0 0 1 ${radius},${radius}` : `h${radius}v${radius}`}
      v${height - diameter}
      ${bottomRight ? `a${radius},${radius} 0 0 1 ${-radius},${radius}` : `v${radius}h${-radius}`}
      h${diameter - width}
      ${bottomLeft ? `a${radius},${radius} 0 0 1 ${-radius},${-radius}` : `h${-radius}v${-radius}`}
      v${diameter - height}
      ${topLeft ? `a${radius},${radius} 0 0 1 ${radius},${-radius}` : `v${-radius}h${radius}`}
      z`.split("\n").join("");
  if (_rounded === "all" || _rounded === "none" || radius === 0) {
    $$payload.out += "<!--[-->";
    Rect($$payload, spread_props([
      {
        fill,
        spring: spring2,
        tweened: tweened2,
        stroke,
        strokeWidth,
        rx: _rounded === "none" ? 0 : radius,
        onclick,
        onpointerenter,
        onpointermove,
        onpointerleave
      },
      dimensions,
      $$restProps
    ]));
  } else {
    $$payload.out += "<!--[!-->";
    Spline($$payload, spread_props([
      {
        pathData,
        fill,
        spring: spring2,
        tweened: tweened2,
        stroke,
        strokeWidth,
        onclick,
        onpointerenter,
        onpointermove,
        onpointerleave
      },
      $$restProps
    ]));
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    bar,
    x,
    y,
    x1,
    y1,
    fill,
    stroke,
    strokeWidth,
    radius,
    rounded,
    insets,
    onclick,
    onpointerenter,
    onpointermove,
    onpointerleave,
    spring: spring2,
    tweened: tweened2
  });
  pop();
}
function asAny(x) {
  return x;
}
function Highlight($$payload, $$props) {
  push();
  var $$store_subs;
  let highlightData;
  const {
    data: contextData,
    flatData,
    x: xContext,
    xDomain,
    xScale,
    xRange,
    y: yContext,
    yDomain,
    yScale,
    yRange,
    cGet,
    config,
    radial
  } = chartContext();
  const tooltip = tooltipContext();
  let data = fallback($$props["data"], void 0);
  let x = fallback($$props["x"], () => store_get($$store_subs ??= {}, "$xContext", xContext), true);
  let y = fallback($$props["y"], () => store_get($$store_subs ??= {}, "$yContext", yContext), true);
  let axis = fallback($$props["axis"], void 0);
  let points = fallback($$props["points"], false);
  let lines = fallback($$props["lines"], false);
  let area2 = fallback($$props["area"], false);
  let bar = fallback($$props["bar"], false);
  let motion = fallback($$props["motion"], true);
  let onareaclick = fallback($$props["onareaclick"], void 0);
  let onbarclick = fallback($$props["onbarclick"], void 0);
  let onpointclick = fallback($$props["onpointclick"], void 0);
  let onpointenter = fallback($$props["onpointenter"], void 0);
  let onpointleave = fallback($$props["onpointleave"], void 0);
  const _x = accessor(x);
  const _y = accessor(y);
  let _points = [];
  let _lines = [];
  let _area = { x: 0, y: 0, width: 0, height: 0 };
  highlightData = data ?? store_get($$store_subs ??= {}, "$tooltip", tooltip).data;
  if (highlightData) {
    const xValue = _x(highlightData);
    const xCoord = Array.isArray(xValue) ? xValue.map((v) => store_get($$store_subs ??= {}, "$xScale", xScale)(v)) : store_get($$store_subs ??= {}, "$xScale", xScale)(xValue);
    const xOffset = isScaleBand(store_get($$store_subs ??= {}, "$xScale", xScale)) && !store_get($$store_subs ??= {}, "$radial", radial) ? store_get($$store_subs ??= {}, "$xScale", xScale).bandwidth() / 2 : 0;
    const yValue = _y(highlightData);
    const yCoord = Array.isArray(yValue) ? yValue.map((v) => store_get($$store_subs ??= {}, "$yScale", yScale)(v)) : store_get($$store_subs ??= {}, "$yScale", yScale)(yValue);
    const yOffset = isScaleBand(store_get($$store_subs ??= {}, "$yScale", yScale)) && !store_get($$store_subs ??= {}, "$radial", radial) ? store_get($$store_subs ??= {}, "$yScale", yScale).bandwidth() / 2 : 0;
    _lines = [];
    const defaultAxis = isScaleBand(store_get($$store_subs ??= {}, "$yScale", yScale)) ? "y" : "x";
    if (axis == null) {
      axis = defaultAxis;
    }
    if (axis === "x" || axis === "both") {
      if (Array.isArray(xCoord)) {
        _lines = [
          ..._lines,
          ...xCoord.filter(notNull).map((xItem, i) => ({
            x1: xItem + xOffset,
            y1: min(store_get($$store_subs ??= {}, "$yRange", yRange)),
            x2: xItem + xOffset,
            y2: max(store_get($$store_subs ??= {}, "$yRange", yRange))
          }))
        ];
      } else if (xCoord) {
        _lines = [
          ..._lines,
          {
            x1: xCoord + xOffset,
            y1: min(store_get($$store_subs ??= {}, "$yRange", yRange)),
            x2: xCoord + xOffset,
            y2: max(store_get($$store_subs ??= {}, "$yRange", yRange))
          }
        ];
      }
      if (Array.isArray(xCoord)) {
        _area.width = max(xCoord) - min(xCoord);
      } else if (isScaleBand(store_get($$store_subs ??= {}, "$xScale", xScale))) {
        _area.width = store_get($$store_subs ??= {}, "$xScale", xScale).step();
      } else {
        const index = store_get($$store_subs ??= {}, "$flatData", flatData).findIndex((d) => Number(_x(d)) === Number(_x(highlightData)));
        const isLastPoint = index + 1 === store_get($$store_subs ??= {}, "$flatData", flatData).length;
        const nextDataPoint = isLastPoint ? max(store_get($$store_subs ??= {}, "$xDomain", xDomain)) : _x(store_get($$store_subs ??= {}, "$flatData", flatData)[index + 1]);
        _area.width = (store_get($$store_subs ??= {}, "$xScale", xScale)(nextDataPoint) ?? 0) - (xCoord ?? 0);
      }
      _area.x = (Array.isArray(xCoord) ? min(xCoord) : xCoord) - (isScaleBand(store_get($$store_subs ??= {}, "$xScale", xScale)) ? store_get($$store_subs ??= {}, "$xScale", xScale).padding() * store_get($$store_subs ??= {}, "$xScale", xScale).step() / 2 : 0);
      if (axis === "x") {
        _area.height = max(store_get($$store_subs ??= {}, "$yRange", yRange));
      }
    }
    if (axis === "y" || axis === "both") {
      if (Array.isArray(yCoord)) {
        _lines = [
          ..._lines,
          ...yCoord.filter(notNull).map((yItem, i) => ({
            x1: min(store_get($$store_subs ??= {}, "$xRange", xRange)),
            y1: yItem + yOffset,
            x2: max(store_get($$store_subs ??= {}, "$xRange", xRange)),
            y2: yItem + yOffset
          }))
        ];
      } else if (yCoord) {
        _lines = [
          ..._lines,
          {
            x1: min(store_get($$store_subs ??= {}, "$xRange", xRange)),
            y1: yCoord + yOffset,
            x2: max(store_get($$store_subs ??= {}, "$xRange", xRange)),
            y2: yCoord + yOffset
          }
        ];
      }
      if (Array.isArray(yCoord)) {
        _area.height = max(yCoord) - min(yCoord);
      } else if (isScaleBand(store_get($$store_subs ??= {}, "$yScale", yScale))) {
        _area.height = store_get($$store_subs ??= {}, "$yScale", yScale).step();
      } else {
        const index = store_get($$store_subs ??= {}, "$flatData", flatData).findIndex((d) => Number(_x(d)) === Number(_x(highlightData)));
        const isLastPoint = index + 1 === store_get($$store_subs ??= {}, "$flatData", flatData).length;
        const nextDataPoint = isLastPoint ? max(store_get($$store_subs ??= {}, "$yDomain", yDomain)) : _x(store_get($$store_subs ??= {}, "$flatData", flatData)[index + 1]);
        _area.height = (store_get($$store_subs ??= {}, "$yScale", yScale)(nextDataPoint) ?? 0) - (yCoord ?? 0);
      }
      _area.y = (Array.isArray(yCoord) ? min(yCoord) : yCoord) - (isScaleBand(store_get($$store_subs ??= {}, "$yScale", yScale)) ? store_get($$store_subs ??= {}, "$yScale", yScale).padding() * store_get($$store_subs ??= {}, "$yScale", yScale).step() / 2 : 0);
      if (axis === "y") {
        _area.width = max(store_get($$store_subs ??= {}, "$xRange", xRange));
      }
    }
    if (Array.isArray(xCoord)) {
      if (Array.isArray(highlightData)) {
        const highlightSeriesPoint = highlightData;
        if (Array.isArray(store_get($$store_subs ??= {}, "$contextData", contextData))) {
          const seriesPointsData = store_get($$store_subs ??= {}, "$contextData", contextData).map((series) => {
            return {
              series,
              point: series.find((d) => _y(d) === _y(highlightSeriesPoint))
            };
          }).filter((d) => d.point);
          _points = seriesPointsData.map((seriesPoint, i) => {
            return {
              x: store_get($$store_subs ??= {}, "$xScale", xScale)(seriesPoint.point[1]) + xOffset,
              y: yCoord + yOffset,
              fill: store_get($$store_subs ??= {}, "$config", config).c ? store_get($$store_subs ??= {}, "$cGet", cGet)(seriesPoint.series) : null,
              data: { x: seriesPoint.point[1], y: yValue }
            };
          });
        }
      } else {
        _points = xCoord.filter(notNull).map((xItem, i) => {
          const $key = store_get($$store_subs ??= {}, "$config", config).x[i];
          return {
            x: xItem + xOffset,
            y: yCoord + yOffset,
            // TODO: is there a better way to expose the series key/value?
            fill: store_get($$store_subs ??= {}, "$config", config).c ? store_get($$store_subs ??= {}, "$cGet", cGet)({ ...highlightData, $key }) : null,
            data: {
              x: xValue,
              // TODO: use highlightData[$key]?
              y: yValue
            }
          };
        });
      }
    } else if (Array.isArray(yCoord)) {
      if (Array.isArray(highlightData)) {
        const highlightSeriesPoint = highlightData;
        if (Array.isArray(store_get($$store_subs ??= {}, "$contextData", contextData))) {
          const seriesPointsData = store_get($$store_subs ??= {}, "$contextData", contextData).map((series) => {
            return {
              series,
              point: series.find((d) => _x(d) === _x(highlightSeriesPoint))
            };
          }).filter((d) => d.point);
          _points = seriesPointsData.map((seriesPoint, i) => ({
            x: xCoord + xOffset,
            y: store_get($$store_subs ??= {}, "$yScale", yScale)(seriesPoint.point[1]) + yOffset,
            fill: store_get($$store_subs ??= {}, "$config", config).c ? store_get($$store_subs ??= {}, "$cGet", cGet)(seriesPoint.series) : null,
            data: { x: xValue, y: seriesPoint.point[1] }
          }));
        }
      } else {
        _points = yCoord.filter(notNull).map((yItem, i) => {
          const $key = store_get($$store_subs ??= {}, "$config", config).y[i];
          return {
            x: xCoord + xOffset,
            y: yItem + yOffset,
            // TODO: is there a better way to expose the series key/value?
            fill: store_get($$store_subs ??= {}, "$config", config).c ? store_get($$store_subs ??= {}, "$cGet", cGet)({ ...highlightData, $key }) : null,
            data: {
              x: xValue,
              y: yValue
              // TODO: use highlightData[$key] ?
            }
          };
        });
      }
    } else if (xCoord != null && yCoord != null) {
      _points = [
        {
          x: xCoord + xOffset,
          y: yCoord + yOffset,
          fill: store_get($$store_subs ??= {}, "$config", config).c ? store_get($$store_subs ??= {}, "$cGet", cGet)(highlightData) : null,
          data: { x: xValue, y: yValue }
        }
      ];
    } else {
      _points = [];
    }
    if (store_get($$store_subs ??= {}, "$radial", radial)) {
      _points = _points.map((p) => {
        const [x2, y2] = pointRadial(p.x, p.y);
        return { ...p, x: x2, y: y2 };
      });
      _lines = _lines.map((l) => {
        const [x1, y1] = pointRadial(l.x1, l.y1);
        const [x2, y2] = pointRadial(l.x2, l.y2);
        return { ...l, x1, y1, x2, y2 };
      });
    }
  }
  if (highlightData) {
    $$payload.out += "<!--[-->";
    if (area2) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<!---->`;
      slot($$payload, $$props, "area", { area: _area }, () => {
        Rect($$payload, spread_props([
          { spring: motion },
          _area,
          typeof area2 === "object" ? area2 : null,
          {
            class: cls(
              // @ts-expect-error
              !area2.fill && "fill-surface-content/5",
              typeof area2 === "object" ? area2.class : null
            ),
            onclick: onareaclick && ((e) => onareaclick(e, { data: highlightData }))
          }
        ]));
      });
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (bar) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<!---->`;
      slot($$payload, $$props, "bar", { bar }, () => {
        Bar($$payload, spread_props([
          { spring: motion, bar: highlightData },
          typeof bar === "object" ? bar : null,
          {
            class: cls(
              // @ts-expect-error
              !bar.fill && "fill-primary",
              typeof bar === "object" ? bar.class : null
            ),
            onclick: onbarclick && ((e) => onbarclick(e, { data: highlightData }))
          }
        ]));
      });
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (lines) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<!---->`;
      slot($$payload, $$props, "lines", { lines: _lines }, () => {
        const each_array = ensure_array_like(_lines);
        $$payload.out += `<!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let line2 = each_array[$$index];
          Line($$payload, spread_props([
            {
              spring: motion,
              x1: line2.x1,
              y1: line2.y1,
              x2: line2.x2,
              y2: line2.y2
            },
            typeof lines === "object" ? lines : null,
            {
              class: cls("stroke-surface-content/20 stroke-2 [stroke-dasharray:2,2] pointer-events-none", typeof lines === "object" ? lines.class : null)
            }
          ]));
        }
        $$payload.out += `<!--]-->`;
      });
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (points) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<!---->`;
      slot($$payload, $$props, "points", { points: _points }, () => {
        const each_array_1 = ensure_array_like(_points);
        $$payload.out += `<!--[-->`;
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let point = each_array_1[$$index_1];
          Circle($$payload, spread_props([
            {
              spring: motion,
              cx: point.x,
              cy: point.y,
              fill: point.fill,
              r: 4,
              strokeWidth: 6
            },
            typeof points === "object" ? points : null,
            {
              class: cls("stroke-white [paint-order:stroke] drop-shadow", !point.fill && (typeof points === "boolean" || !points.fill) && "fill-primary", typeof points === "object" ? points.class : null),
              onpointerdown: onpointclick && ((e) => {
                e.stopPropagation();
              }),
              onclick: onpointclick && ((e) => onpointclick(e, { point, data: highlightData })),
              onpointerenter: onpointenter && ((e) => {
                if (onpointclick) {
                  asAny(e.target).style.cursor = "pointer";
                }
                onpointenter(e, { point, data: highlightData });
              }),
              onpointerleave: onpointleave && ((e) => {
                if (onpointclick) {
                  asAny(e.target).style.cursor = "default";
                }
                onpointleave(e, { point, data: highlightData });
              })
            }
          ]));
        }
        $$payload.out += `<!--]-->`;
      });
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    data,
    x,
    y,
    axis,
    points,
    lines,
    area: area2,
    bar,
    motion,
    onareaclick,
    onbarclick,
    onpointclick,
    onpointenter,
    onpointleave
  });
  pop();
}
function Link($$payload, $$props) {
  const $$slots = sanitize_slots($$props);
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "data",
    "sankey",
    "source",
    "target",
    "orientation",
    "x",
    "y",
    "curve",
    "onclick",
    "onpointerenter",
    "onpointermove",
    "onpointerleave",
    "onpointerover",
    "onpointerout",
    "marker",
    "markerStart",
    "markerMid",
    "markerEnd",
    "tweened"
  ]);
  push();
  var $$store_subs;
  let markerStartId, markerMidId, markerEndId, tweened_d;
  let data = fallback($$props["data"], void 0);
  let sankey = fallback($$props["sankey"], false);
  let source = fallback($$props["source"], sankey ? (d) => [d.source.x1, d.y0] : (d) => d.source);
  let target = fallback($$props["target"], sankey ? (d) => [d.target.x0, d.y1] : (d) => d.target);
  let orientation = fallback($$props["orientation"], sankey ? "horizontal" : "vertical");
  let x = fallback($$props["x"], (d) => sankey ? d[0] : orientation === "horizontal" ? d.y : d.x);
  let y = fallback($$props["y"], (d) => sankey ? d[1] : orientation === "horizontal" ? d.x : d.y);
  let curve = fallback($$props["curve"], orientation === "horizontal" ? curveBumpX : curveBumpY);
  let onclick = fallback($$props["onclick"], void 0);
  let onpointerenter = fallback($$props["onpointerenter"], void 0);
  let onpointermove = fallback($$props["onpointermove"], void 0);
  let onpointerleave = fallback($$props["onpointerleave"], void 0);
  let onpointerover = fallback($$props["onpointerover"], void 0);
  let onpointerout = fallback($$props["onpointerout"], void 0);
  let marker = fallback($$props["marker"], void 0);
  let markerStart = fallback($$props["markerStart"], marker);
  let markerMid = fallback($$props["markerMid"], marker);
  let markerEnd = fallback($$props["markerEnd"], marker);
  let tweened2 = fallback($$props["tweened"], void 0);
  const tweenedOptions = tweened2 ? {
    interpolate: interpolatePath,
    ...typeof tweened2 === "object" ? tweened2 : null
  } : false;
  markerStartId = markerStart || $$slots["markerStart"] ? uniqueId("marker-") : "";
  markerMidId = markerMid || $$slots["markerMid"] ? uniqueId("marker-") : "";
  markerEndId = markerEnd || $$slots["markerEnd"] ? uniqueId("marker-") : "";
  tweened_d = motionStore("", { tweened: tweenedOptions });
  {
    const link$1 = link(curve).source(source).target(target).x(x).y(y);
    const d = link$1(data) ?? "";
    tweened_d.set(d);
  }
  Spline($$payload, spread_props([
    {
      class: "path-link",
      pathData: store_get($$store_subs ??= {}, "$tweened_d", tweened_d),
      fill: "none",
      "marker-start": markerStartId ? `url(#${markerStartId})` : void 0,
      "marker-mid": markerMidId ? `url(#${markerMidId})` : void 0,
      "marker-end": markerEndId ? `url(#${markerEndId})` : void 0,
      onclick,
      onpointerenter,
      onpointermove,
      onpointerleave,
      onpointerover,
      onpointerout
    },
    $$restProps
  ]));
  $$payload.out += `<!----> <!---->`;
  slot($$payload, $$props, "markerStart", { id: markerStartId }, () => {
    if (markerStart) {
      $$payload.out += "<!--[-->";
      Marker($$payload, spread_props([
        {
          id: markerStartId,
          type: typeof markerStart === "string" ? markerStart : void 0
        },
        typeof markerStart === "object" ? markerStart : null
      ]));
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  });
  $$payload.out += `<!----> <!---->`;
  slot($$payload, $$props, "markerMid", { id: markerMidId }, () => {
    Marker($$payload, spread_props([
      {
        id: markerMidId,
        type: typeof markerMid === "string" ? markerMid : void 0
      },
      typeof markerMid === "object" ? markerMid : null
    ]));
  });
  $$payload.out += `<!----> <!---->`;
  slot($$payload, $$props, "markerEnd", { id: markerEndId }, () => {
    Marker($$payload, spread_props([
      {
        id: markerEndId,
        type: typeof markerEnd === "string" ? markerEnd : void 0
      },
      typeof markerEnd === "object" ? markerEnd : null
    ]));
  });
  $$payload.out += `<!---->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    data,
    sankey,
    source,
    target,
    orientation,
    x,
    y,
    curve,
    onclick,
    onpointerenter,
    onpointermove,
    onpointerleave,
    onpointerover,
    onpointerout,
    marker,
    markerStart,
    markerMid,
    markerEnd,
    tweened: tweened2
  });
  pop();
}
function Points($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "data",
    "x",
    "y",
    "r",
    "offsetX",
    "offsetY",
    "links",
    "fill",
    "fillOpacity",
    "stroke",
    "strokeWidth",
    "class"
  ]);
  push();
  var $$store_subs;
  let xAccessor, yAccessor, pointsData, points, _links;
  const context = chartContext();
  const {
    data: contextData,
    x: contextX,
    xScale,
    xGet,
    y: contextY,
    yScale,
    yGet,
    cGet,
    rGet,
    config,
    radial
  } = context;
  let data = fallback($$props["data"], void 0);
  let x = fallback($$props["x"], void 0);
  let y = fallback($$props["y"], void 0);
  let r = fallback($$props["r"], 5);
  let offsetX = fallback($$props["offsetX"], void 0);
  let offsetY = fallback($$props["offsetY"], void 0);
  let links = fallback($$props["links"], false);
  let fill = fallback($$props["fill"], void 0);
  let fillOpacity = fallback($$props["fillOpacity"], void 0);
  let stroke = fallback($$props["stroke"], void 0);
  let strokeWidth = fallback($$props["strokeWidth"], void 0);
  let className = fallback($$props["class"], void 0);
  function getOffset(value, offset, scale) {
    if (typeof offset === "function") {
      return offset(value, context);
    } else if (offset != null) {
      return offset;
    } else if (isScaleBand(scale) && !store_get($$store_subs ??= {}, "$radial", radial)) {
      return scale.bandwidth() / 2;
    } else {
      return 0;
    }
  }
  xAccessor = x ? accessor(x) : store_get($$store_subs ??= {}, "$contextX", contextX);
  yAccessor = y ? accessor(y) : store_get($$store_subs ??= {}, "$contextY", contextY);
  pointsData = data ?? store_get($$store_subs ??= {}, "$contextData", contextData);
  points = pointsData.flatMap((d) => {
    const xValue = xAccessor(d);
    const yValue = yAccessor(d);
    if (Array.isArray(xValue)) {
      return xValue.filter(notNull).map((xValue2) => {
        return {
          x: store_get($$store_subs ??= {}, "$xScale", xScale)(xValue2) + getOffset(store_get($$store_subs ??= {}, "$xScale", xScale)(xValue2), offsetX, store_get($$store_subs ??= {}, "$xScale", xScale)),
          y: store_get($$store_subs ??= {}, "$yScale", yScale)(yValue) + getOffset(store_get($$store_subs ??= {}, "$yScale", yScale)(yValue), offsetY, store_get($$store_subs ??= {}, "$yScale", yScale)),
          r: store_get($$store_subs ??= {}, "$config", config).r ? store_get($$store_subs ??= {}, "$rGet", rGet)(d) : r,
          xValue: xValue2,
          yValue,
          data: d
        };
      });
    } else if (Array.isArray(yValue)) {
      return yValue.filter(notNull).map((yValue2) => {
        return {
          x: store_get($$store_subs ??= {}, "$xScale", xScale)(xValue) + getOffset(store_get($$store_subs ??= {}, "$xScale", xScale)(xValue), offsetX, store_get($$store_subs ??= {}, "$xScale", xScale)),
          y: store_get($$store_subs ??= {}, "$yScale", yScale)(yValue2) + getOffset(store_get($$store_subs ??= {}, "$yScale", yScale)(yValue2), offsetY, store_get($$store_subs ??= {}, "$yScale", yScale)),
          r: store_get($$store_subs ??= {}, "$config", config).r ? store_get($$store_subs ??= {}, "$rGet", rGet)(d) : r,
          xValue,
          yValue: yValue2,
          data: d
        };
      });
    } else if (xValue != null && yValue != null) {
      return {
        x: store_get($$store_subs ??= {}, "$xScale", xScale)(xValue) + getOffset(store_get($$store_subs ??= {}, "$xScale", xScale)(xValue), offsetX, store_get($$store_subs ??= {}, "$xScale", xScale)),
        y: store_get($$store_subs ??= {}, "$yScale", yScale)(yValue) + getOffset(store_get($$store_subs ??= {}, "$yScale", yScale)(yValue), offsetY, store_get($$store_subs ??= {}, "$yScale", yScale)),
        r: store_get($$store_subs ??= {}, "$config", config).r ? store_get($$store_subs ??= {}, "$rGet", rGet)(d) : r,
        xValue,
        yValue,
        data: d
      };
    }
  }).filter((p) => p);
  _links = pointsData.flatMap((d) => {
    const xValue = xAccessor(d);
    const yValue = yAccessor(d);
    if (Array.isArray(xValue)) {
      const [xMin, xMax] = extent(store_get($$store_subs ??= {}, "$xGet", xGet)(d));
      const y2 = store_get($$store_subs ??= {}, "$yGet", yGet)(d) + getOffset(store_get($$store_subs ??= {}, "$yGet", yGet)(d), offsetY, store_get($$store_subs ??= {}, "$yScale", yScale));
      return {
        source: {
          x: xMin + getOffset(xMin, offsetX, store_get($$store_subs ??= {}, "$xScale", xScale)) + (store_get($$store_subs ??= {}, "$config", config).r ? store_get($$store_subs ??= {}, "$rGet", rGet)(d) : r),
          y: y2
        },
        target: {
          x: xMax + getOffset(xMax, offsetX, store_get($$store_subs ??= {}, "$xScale", xScale)) - (store_get($$store_subs ??= {}, "$config", config).r ? store_get($$store_subs ??= {}, "$rGet", rGet)(d) : r),
          y: y2
        }
      };
    } else if (Array.isArray(yValue)) {
      const x2 = store_get($$store_subs ??= {}, "$xGet", xGet)(d) + getOffset(store_get($$store_subs ??= {}, "$xGet", xGet)(d), offsetX, store_get($$store_subs ??= {}, "$xScale", xScale));
      const [yMin, yMax] = extent(store_get($$store_subs ??= {}, "$yGet", yGet)(d));
      return {
        source: {
          x: x2,
          y: yMin + getOffset(yMin, offsetY, store_get($$store_subs ??= {}, "$yScale", yScale))
        },
        target: {
          x: x2,
          y: yMax + getOffset(yMax, offsetY, store_get($$store_subs ??= {}, "$yScale", yScale))
        }
      };
    }
  });
  $$payload.out += `<!---->`;
  slot($$payload, $$props, "default", { points }, () => {
    const each_array_1 = ensure_array_like(points);
    if (links) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(_links);
      $$payload.out += `<!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let link2 = each_array[$$index];
        Link($$payload, spread_props([
          {
            data: link2,
            class: "stroke-surface-content/50"
          },
          typeof links === "object" ? links : null
        ]));
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let point = each_array_1[$$index_1];
      const radialPoint = pointRadial(point.x, point.y);
      Circle($$payload, spread_props([
        {
          cx: store_get($$store_subs ??= {}, "$radial", radial) ? radialPoint[0] : point.x,
          cy: store_get($$store_subs ??= {}, "$radial", radial) ? radialPoint[1] : point.y,
          r: point.r,
          fill: fill ?? (store_get($$store_subs ??= {}, "$config", config).c ? store_get($$store_subs ??= {}, "$cGet", cGet)(point.data) : null),
          fillOpacity,
          stroke,
          strokeWidth,
          class: className
        },
        $$restProps
      ]));
    }
    $$payload.out += `<!--]-->`;
  });
  $$payload.out += `<!---->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    data,
    x,
    y,
    r,
    offsetX,
    offsetY,
    links,
    fill,
    fillOpacity,
    stroke,
    strokeWidth,
    class: className
  });
  pop();
}
function Labels($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "data",
    "value",
    "x",
    "y",
    "placement",
    "offset",
    "format",
    "key"
  ]);
  push();
  var $$store_subs;
  let getTextProps;
  const { xScale, yScale } = chartContext();
  let data = fallback($$props["data"], void 0);
  let value = fallback($$props["value"], void 0);
  let x = fallback($$props["x"], void 0);
  let y = fallback($$props["y"], void 0);
  let placement = fallback($$props["placement"], "outside");
  let offset = fallback($$props["offset"], placement === "center" ? 0 : 4);
  let format$12 = fallback($$props["format"], void 0);
  let key = fallback($$props["key"], (d, i) => i);
  getTextProps = (point) => {
    const pointValue = isScaleBand(store_get($$store_subs ??= {}, "$yScale", yScale)) ? point.xValue : point.yValue;
    const displayValue = value ? accessor(value)(point.data) : isScaleBand(store_get($$store_subs ??= {}, "$yScale", yScale)) ? point.xValue : point.yValue;
    const formattedValue = format(displayValue, format$12 ?? (value ? void 0 : isScaleBand(store_get($$store_subs ??= {}, "$yScale", yScale)) ? store_get($$store_subs ??= {}, "$xScale", xScale).tickFormat?.() : store_get($$store_subs ??= {}, "$yScale", yScale).tickFormat?.()));
    if (isScaleBand(store_get($$store_subs ??= {}, "$yScale", yScale))) {
      if (pointValue < 0) {
        return {
          value: formattedValue,
          x: point.x + (placement === "outside" ? -offset : offset),
          y: point.y,
          textAnchor: placement === "outside" ? "end" : "start",
          verticalAnchor: "middle",
          capHeight: ".6rem"
        };
      } else {
        return {
          value: formattedValue,
          x: point.x + (placement === "outside" ? offset : -offset),
          y: point.y,
          textAnchor: placement === "outside" ? "start" : "end",
          verticalAnchor: "middle",
          capHeight: ".6rem"
        };
      }
    } else {
      if (pointValue < 0) {
        return {
          value: formattedValue,
          x: point.x,
          y: point.y + (placement === "outside" ? offset : -offset),
          capHeight: ".6rem",
          textAnchor: "middle",
          verticalAnchor: placement === "center" ? "middle" : placement === "outside" ? "start" : "end"
        };
      } else {
        return {
          value: formattedValue,
          x: point.x,
          y: point.y + (placement === "outside" ? -offset : offset),
          capHeight: ".6rem",
          textAnchor: "middle",
          verticalAnchor: placement === "center" ? "middle" : placement === "outside" ? "end" : "start"
        };
      }
    }
  };
  $$payload.out += `<g class="Labels">`;
  Points($$payload, {
    data,
    x,
    y,
    children: invalid_default_snippet,
    $$slots: {
      default: ($$payload2, { points }) => {
        const each_array = ensure_array_like(points);
        $$payload2.out += `<!--[-->`;
        for (let i = 0, $$length = each_array.length; i < $$length; i++) {
          let point = each_array[i];
          const textProps = getTextProps(point);
          $$payload2.out += `<!---->`;
          slot($$payload2, $$props, "default", { data: point, textProps }, () => {
            Text($$payload2, spread_props([
              textProps,
              $$restProps,
              {
                class: cls("text-xs", placement === "inside" ? "fill-surface-300 stroke-surface-content" : "fill-surface-content stroke-surface-100", textProps.class, $$sanitized_props.class)
              }
            ]));
          });
          $$payload2.out += `<!---->`;
        }
        $$payload2.out += `<!--]-->`;
      }
    }
  });
  $$payload.out += `<!----></g>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    data,
    value,
    x,
    y,
    placement,
    offset,
    format: format$12,
    key
  });
  pop();
}
function ColorRamp($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["interpolator", "steps", "height", "width"]);
  push();
  let interpolator = $$props["interpolator"];
  let steps = fallback($$props["steps"], 10);
  let height = fallback($$props["height"], "20px");
  let width = fallback($$props["width"], "100%");
  let href = "";
  {
    const canvas = document.createElement("canvas");
    canvas.width = steps;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    for (let i = 0; i < steps; ++i) {
      context.fillStyle = interpolator(i / (steps - 1));
      context.fillRect(i, 0, 1, 1);
    }
    href = canvas.toDataURL();
  }
  $$payload.out += `<image${spread_attributes(
    {
      href,
      preserveAspectRatio: "none",
      height,
      width,
      ...$$restProps
    },
    null,
    void 0,
    void 0,
    3
  )}></image>`;
  bind_props($$props, { interpolator, steps, height, width });
  pop();
}
function Legend($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "scale",
    "title",
    "width",
    "height",
    "ticks",
    "tickFormat",
    "tickValues",
    "tickFontSize",
    "tickLength",
    "placement",
    "orientation",
    "onclick",
    "onpointerenter",
    "onpointerleave",
    "variant",
    "classes"
  ]);
  push();
  var $$store_subs;
  let _scale;
  const { cScale } = chartContext() ?? {};
  let scale = fallback($$props["scale"], void 0);
  let title = fallback($$props["title"], "");
  let width = fallback($$props["width"], 320);
  let height = fallback($$props["height"], 10);
  let ticks = fallback($$props["ticks"], width / 64);
  let tickFormat = fallback($$props["tickFormat"], void 0);
  let tickValues = fallback($$props["tickValues"], void 0);
  let tickFontSize = fallback($$props["tickFontSize"], 10);
  let tickLength = fallback($$props["tickLength"], 4);
  let placement = fallback($$props["placement"], void 0);
  let orientation = fallback($$props["orientation"], "horizontal");
  let onclick = fallback($$props["onclick"], void 0);
  let onpointerenter = fallback($$props["onpointerenter"], void 0);
  let onpointerleave = fallback($$props["onpointerleave"], void 0);
  let variant = fallback($$props["variant"], "ramp");
  let classes = fallback($$props["classes"], () => ({}), true);
  let xScale;
  let interpolator;
  let swatches;
  let tickLabelOffset = 0;
  let tickLine = true;
  _scale = scale ?? (cScale ? store_get($$store_subs ??= {}, "$cScale", cScale) : null);
  if (!_scale) ;
  else if (_scale.interpolate) {
    const n = Math.min(_scale.domain().length, _scale.range().length);
    xScale = _scale.copy().rangeRound(quantize(interpolate(0, width), n));
    interpolator = _scale.copy().domain(quantize(interpolate(0, 1), n));
    tickFormat = tickFormat ?? xScale.tickFormat?.();
  } else if (_scale.interpolator) {
    xScale = Object.assign(_scale.copy().interpolator(interpolateRound(0, width)), {
      range() {
        return [0, width];
      }
    });
    interpolator = _scale.interpolator();
    if (!xScale.ticks) {
      if (tickValues === void 0) {
        const n = Math.round(ticks + 1);
        tickValues = range(n).map((i) => quantile(_scale.domain(), i / (n - 1)));
      }
    }
    tickFormat = tickFormat ?? xScale.tickFormat?.();
  } else if (_scale.invertExtent) {
    const thresholds = _scale.thresholds ? _scale.thresholds() : _scale.quantiles ? _scale.quantiles() : _scale.domain();
    xScale = scaleLinear().domain([-1, _scale.range().length - 1]).rangeRound([0, width]);
    swatches = _scale.range().map((d, i) => {
      return {
        x: xScale(i - 1),
        y: 0,
        width: xScale(i) - xScale(i - 1),
        height,
        fill: d
      };
    });
    tickValues = range(thresholds.length);
    tickFormat = (i) => {
      const value = thresholds[i];
      return $$sanitized_props.tickFormat ? format(value, $$sanitized_props.tickFormat) : value;
    };
  } else {
    xScale = scaleBand().domain(_scale.domain()).rangeRound([0, width]);
    swatches = _scale.domain().map((d) => {
      return {
        x: xScale(d),
        y: 0,
        width: Math.max(0, xScale.bandwidth() - 1),
        height,
        fill: _scale(d)
      };
    });
    tickValues = _scale.domain();
    tickLabelOffset = xScale.bandwidth() / 2;
    tickLine = false;
    tickLength = 0;
  }
  $$payload.out += `<div${spread_attributes(
    {
      ...$$restProps,
      class: clsx(cls(
        "inline-block",
        "z-[1]",
        // stack above tooltip context layers (band rects, voronoi, ...)
        placement && [
          "absolute",
          {
            "top-left": "top-0 left-0",
            top: "top-0 left-1/2 -translate-x-1/2",
            "top-right": "top-0 right-0",
            left: "top-1/2 left-0 -translate-y-1/2",
            center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            right: "top-1/2 right-0 -translate-y-1/2",
            "bottom-left": "bottom-0 left-0",
            bottom: "bottom-0 left-1/2 -translate-x-1/2",
            "bottom-right": "bottom-0 right-0"
          }[placement]
        ],
        $$restProps.class,
        classes.root
      ))
    },
    null
  )}><div${attr("class", clsx(cls("text-[10px] font-semibold", classes.title)))}>${escape_html(title)}</div> <!---->`;
  slot($$payload, $$props, "default", { values: tickValues ?? [], scale: _scale }, () => {
    if (variant === "ramp") {
      $$payload.out += "<!--[-->";
      const each_array_1 = ensure_array_like(tickValues ?? xScale?.ticks?.(ticks) ?? []);
      $$payload.out += `<svg${attr("width", width)}${attr("height", height + tickLength + tickFontSize)}${attr("viewBox", `0 0 ${stringify(width)} ${stringify(height + tickLength + tickFontSize)}`)} class="overflow-visible"><g>`;
      if (interpolator) {
        $$payload.out += "<!--[-->";
        ColorRamp($$payload, { width, height, interpolator });
      } else {
        $$payload.out += "<!--[!-->";
        if (swatches) {
          $$payload.out += "<!--[-->";
          const each_array = ensure_array_like(swatches);
          $$payload.out += `<!--[-->`;
          for (let i = 0, $$length = each_array.length; i < $$length; i++) {
            let swatch = each_array[i];
            $$payload.out += `<rect${spread_attributes({ ...swatch }, null, void 0, void 0, 3)}></rect>`;
          }
          $$payload.out += `<!--]-->`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]--></g><g><!--[-->`;
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        let tick2 = each_array_1[i];
        $$payload.out += `<text${add_styles({ "font-size": tickFontSize })} text-anchor="middle"${attr("x", xScale(tick2) + tickLabelOffset)}${attr("y", height + tickLength + tickFontSize)}${attr("class", clsx(cls("text-[10px] fill-surface-content", classes.label)))}>${escape_html(tickFormat ? format(tick2, tickFormat) : tick2)}</text>`;
        if (tickLine) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<line${attr("x1", xScale(tick2))}${attr("y1", 0)}${attr("x2", xScale(tick2))}${attr("y2", height + tickLength)}${attr("class", clsx(cls("stroke-surface-content", classes.tick)))}></line>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]--></g></svg>`;
    } else {
      $$payload.out += "<!--[!-->";
      if (variant === "swatches") {
        $$payload.out += "<!--[-->";
        const each_array_2 = ensure_array_like(tickValues ?? xScale?.ticks?.(ticks) ?? []);
        $$payload.out += `<div${attr("class", clsx(cls("flex gap-x-4 gap-y-1", orientation === "vertical" && "flex-col", classes.swatches)))}><!--[-->`;
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let tick2 = each_array_2[$$index_2];
          const color = _scale(tick2);
          const item = { value: tick2, color };
          $$payload.out += `<button${attr("class", clsx(cls("flex gap-1", !onclick && "cursor-auto", classes.item?.(item))))}><div${add_styles({ "background-color": color })}${attr("class", clsx(cls("h-4 w-4 rounded-full", classes.swatch)))}></div> <div${attr("class", clsx(cls("text-xs text-surface-content whitespace-nowrap", classes.label)))}>${escape_html(tickFormat ? format(tick2, tickFormat) : tick2)}</div></button>`;
        }
        $$payload.out += `<!--]--></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
  });
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    scale,
    title,
    width,
    height,
    ticks,
    tickFormat,
    tickValues,
    tickFontSize,
    tickLength,
    placement,
    orientation,
    onclick,
    onpointerenter,
    onpointerleave,
    variant,
    classes
  });
  pop();
}
function TooltipHeader($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  let value = fallback($$props["value"], void 0);
  let format$12 = fallback($$props["format"], void 0);
  let color = fallback($$props["color"], void 0);
  let classes = fallback($$props["classes"], () => ({}), true);
  $$payload.out += `<div${attr("class", clsx(cls("TooltipHeader", "font-semibold whitespace-nowrap border-b mb-1 pb-1 flex items-center gap-2", classes.root, $$sanitized_props.class)))}>`;
  if (color) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${add_styles({ "--color": color })}${attr("class", clsx(cls("color", "inline-block size-2 rounded-full bg-[var(--color)]", classes.color)))}></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <!---->`;
  slot($$payload, $$props, "default", {}, () => {
    $$payload.out += `${escape_html(format$12 ? format(value, format$12) : value)}`;
  });
  $$payload.out += `<!----></div>`;
  bind_props($$props, { value, format: format$12, color, classes });
  pop();
}
function TooltipItem($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "label",
    "value",
    "format",
    "valueAlign",
    "color",
    "onclick",
    "onpointerenter",
    "onpointerleave",
    "classes"
  ]);
  push();
  let label = $$props["label"];
  let value = fallback($$props["value"], void 0);
  let format$12 = fallback($$props["format"], void 0);
  let valueAlign = fallback($$props["valueAlign"], "left");
  let color = fallback($$props["color"], void 0);
  let onclick = fallback($$props["onclick"], void 0);
  let onpointerenter = fallback($$props["onpointerenter"], void 0);
  let onpointerleave = fallback($$props["onpointerleave"], void 0);
  let classes = fallback($$props["classes"], () => ({}), true);
  $$payload.out += `<div${spread_attributes(
    {
      class: clsx(cls("contents", classes.root, $$sanitized_props.class)),
      ...$$restProps
    },
    null
  )}><div${attr("class", clsx(cls("label", "flex items-center gap-2 whitespace-nowrap", classes.label)))}>`;
  if (color) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${add_styles({ "--color": color })}${attr("class", clsx(cls("color", "inline-block size-2 rounded-full bg-[var(--color)]", classes.color)))}></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <!---->`;
  slot($$payload, $$props, "label", {}, () => {
    $$payload.out += `${escape_html(label)}`;
  });
  $$payload.out += `<!----></div> <div${attr("class", clsx(cls(
    "value",
    "tabular-nums",
    {
      "text-right": valueAlign === "right",
      "text-center": valueAlign === "center"
    },
    classes.value,
    $$sanitized_props.class
  )))}><!---->`;
  slot($$payload, $$props, "default", {}, () => {
    $$payload.out += `${escape_html(format$12 ? format(value, format$12) : value)}`;
  });
  $$payload.out += `<!----></div></div>`;
  bind_props($$props, {
    label,
    value,
    format: format$12,
    valueAlign,
    color,
    onclick,
    onpointerenter,
    onpointerleave,
    classes
  });
  pop();
}
function TooltipList($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  $$payload.out += `<div${attr("class", clsx(cls("TooltipList", "grid grid-cols-[1fr_auto] gap-x-2 gap-y-1 items-center", $$sanitized_props.class)))}><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></div>`;
  pop();
}
function TooltipSeparator($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  $$payload.out += `<div${attr("class", clsx(cls("rounded bg-surface-content/20 my-1 col-span-full h-px", $$sanitized_props.class)))}></div>`;
  pop();
}
function Tooltip($$payload, $$props) {
  const $$slots = sanitize_slots($$props);
  const $$sanitized_props = sanitize_props($$props);
  push();
  var $$store_subs;
  let x = fallback($$props["x"], "pointer");
  let y = fallback($$props["y"], "pointer");
  let xOffset = fallback($$props["xOffset"], x === "pointer" ? 10 : 0);
  let yOffset = fallback($$props["yOffset"], y === "pointer" ? 10 : 0);
  let anchor = fallback($$props["anchor"], "top-left");
  let contained = fallback($$props["contained"], "container");
  let variant = fallback($$props["variant"], "default");
  let motion = fallback($$props["motion"], true);
  let pointerEvents = fallback($$props["pointerEvents"], false);
  let classes = fallback($$props["classes"], () => ({}), true);
  const {
    padding,
    xScale,
    xGet,
    yScale,
    yGet,
    containerWidth,
    containerHeight
  } = chartContext();
  const tooltip = tooltipContext();
  let tooltipWidth = 0;
  let tooltipHeight = 0;
  const xPos = motionStore(store_get($$store_subs ??= {}, "$tooltip", tooltip).x, { spring: motion });
  const yPos = motionStore(store_get($$store_subs ??= {}, "$tooltip", tooltip).y, { spring: motion });
  function alignValue(value, align, addlOffset, tooltipSize) {
    const alignOffset = align === "center" ? tooltipSize / 2 : align === "end" ? tooltipSize : 0;
    return value + (align === "end" ? -addlOffset : addlOffset) - alignOffset;
  }
  if (store_get($$store_subs ??= {}, "$tooltip", tooltip)?.data) {
    const xBandOffset = isScaleBand(store_get($$store_subs ??= {}, "$xScale", xScale)) ? store_get($$store_subs ??= {}, "$xScale", xScale).step() / 2 - store_get($$store_subs ??= {}, "$xScale", xScale).padding() * store_get($$store_subs ??= {}, "$xScale", xScale).step() / 2 : 0;
    const xValue = typeof x === "number" ? x : x === "data" ? store_get($$store_subs ??= {}, "$xGet", xGet)(store_get($$store_subs ??= {}, "$tooltip", tooltip).data) + store_get($$store_subs ??= {}, "$padding", padding).left + xBandOffset : store_get($$store_subs ??= {}, "$tooltip", tooltip).x;
    let xAlign = "start";
    switch (anchor) {
      case "top-left":
      case "left":
      case "bottom-left":
        xAlign = "start";
        break;
      case "top":
      case "center":
      case "bottom":
        xAlign = "center";
        break;
      case "top-right":
      case "right":
      case "bottom-right":
        xAlign = "end";
        break;
    }
    const yBandOffset = isScaleBand(store_get($$store_subs ??= {}, "$yScale", yScale)) ? store_get($$store_subs ??= {}, "$yScale", yScale).step() / 2 - store_get($$store_subs ??= {}, "$yScale", yScale).padding() * store_get($$store_subs ??= {}, "$yScale", yScale).step() / 2 : 0;
    const yValue = typeof y === "number" ? y : y === "data" ? store_get($$store_subs ??= {}, "$yGet", yGet)(store_get($$store_subs ??= {}, "$tooltip", tooltip).data) + store_get($$store_subs ??= {}, "$padding", padding).top + yBandOffset : store_get($$store_subs ??= {}, "$tooltip", tooltip).y;
    let yAlign = "start";
    switch (anchor) {
      case "top-left":
      case "top":
      case "top-right":
        yAlign = "start";
        break;
      case "left":
      case "center":
      case "right":
        yAlign = "center";
        break;
      case "bottom-left":
      case "bottom":
      case "bottom-right":
        yAlign = "end";
        break;
    }
    const rect = {
      top: alignValue(yValue, yAlign, yOffset, tooltipHeight),
      left: alignValue(xValue, xAlign, xOffset, tooltipWidth),
      // set below
      bottom: 0,
      right: 0
    };
    rect.bottom = rect.top + tooltipHeight;
    rect.right = rect.left + tooltipWidth;
    if (contained === "container") {
      if (typeof x !== "number") {
        if ((xAlign === "start" || xAlign === "center") && rect.right > store_get($$store_subs ??= {}, "$containerWidth", containerWidth)) {
          rect.left = alignValue(xValue, "end", xOffset, tooltipWidth);
        }
        if ((xAlign === "end" || xAlign === "center") && rect.left < store_get($$store_subs ??= {}, "$padding", padding).left) {
          rect.left = alignValue(xValue, "start", xOffset, tooltipWidth);
        }
      }
      rect.right = rect.left + tooltipWidth;
      if (typeof y !== "number") {
        if ((yAlign === "start" || yAlign === "center") && rect.bottom > store_get($$store_subs ??= {}, "$containerHeight", containerHeight)) {
          rect.top = alignValue(yValue, "end", yOffset, tooltipHeight);
        }
        if ((yAlign === "end" || yAlign === "center") && rect.top < store_get($$store_subs ??= {}, "$padding", padding).top) {
          rect.top = alignValue(yValue, "start", yOffset, tooltipHeight);
        }
      }
      rect.bottom = rect.top + tooltipHeight;
    }
    store_set(yPos, rect.top);
    store_set(xPos, rect.left);
  }
  if (store_get($$store_subs ??= {}, "$tooltip", tooltip).data) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${add_styles({
      top: `${stringify(store_get($$store_subs ??= {}, "$yPos", yPos))}px`,
      left: `${stringify(store_get($$store_subs ??= {}, "$xPos", xPos))}px`
    })}${attr("class", clsx(cls("absolute z-50 select-none", !pointerEvents && "pointer-events-none", classes.root)))}><div${attr("class", clsx(cls(
      variant !== "none" && ["text-sm py-1 px-2 h-full rounded elevation-1"],
      {
        default: [
          "bg-surface-100/90 dark:bg-surface-300/90 backdrop-filter backdrop-blur-[2px] text-surface-content",
          "[&_.label]:text-surface-content/75"
        ],
        invert: [
          "bg-surface-content/90 backdrop-filter backdrop-blur-[2px] text-surface-100 border border-surface-content",
          "[&_.label]:text-surface-100/50"
        ],
        none: ""
      }[variant],
      classes.container,
      $$sanitized_props.class
    )))}>`;
    if ($$slots.default) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div${attr("class", clsx(cls(classes.content)))}><!---->`;
      slot(
        $$payload,
        $$props,
        "default",
        {
          data: store_get($$store_subs ??= {}, "$tooltip", tooltip).data
        },
        null
      );
      $$payload.out += `<!----></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    x,
    y,
    xOffset,
    yOffset,
    anchor,
    contained,
    variant,
    motion,
    pointerEvents,
    classes
  });
  pop();
}
function AreaChart($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "data",
    "x",
    "y",
    "xDomain",
    "radial",
    "series",
    "seriesLayout",
    "axis",
    "brush",
    "grid",
    "labels",
    "legend",
    "points",
    "rule",
    "tooltipContext",
    "ontooltipclick",
    "onpointclick",
    "props",
    "renderContext",
    "profile",
    "debug"
  ]);
  push();
  var $$store_subs;
  let isDefaultSeries, stackSeries, visibleSeries, allSeriesData, chartData, xScale, getAreaProps, brushProps;
  let data = fallback($$props["data"], () => [], true);
  let x = fallback($$props["x"], void 0);
  let y = fallback($$props["y"], void 0);
  let xDomain = fallback($$props["xDomain"], void 0);
  let radial = fallback($$props["radial"], false);
  let series = fallback(
    $$props["series"],
    () => [
      {
        key: "default",
        value: y,
        color: "hsl(var(--color-primary))"
      }
    ],
    true
  );
  let seriesLayout = fallback($$props["seriesLayout"], "overlap");
  let axis = fallback($$props["axis"], true);
  let brush = fallback($$props["brush"], false);
  let grid = fallback($$props["grid"], true);
  let labels = fallback($$props["labels"], false);
  let legend = fallback($$props["legend"], false);
  let points = fallback($$props["points"], false);
  let rule = fallback($$props["rule"], true);
  let tooltipContext2 = fallback($$props["tooltipContext"], void 0);
  let ontooltipclick = fallback($$props["ontooltipclick"], () => {
  });
  let onpointclick = fallback($$props["onpointclick"], void 0);
  let props = fallback($$props["props"], () => ({}), true);
  let renderContext = fallback($$props["renderContext"], "svg");
  let profile = fallback($$props["profile"], false);
  let debug = fallback($$props["debug"], false);
  let highlightSeriesKey = null;
  function setHighlightSeriesKey(seriesKey) {
    highlightSeriesKey = seriesKey;
  }
  function getPointsProps(s, i) {
    const pointsProps = {
      data: s.data,
      y: stackSeries ? (d) => d.stackData[i][1] : Array.isArray(s.value) ? s.value[1] : s.value ?? (s.data ? void 0 : s.key),
      fill: s.color,
      ...props.points,
      ...typeof points === "object" ? points : null,
      class: cls("stroke-surface-200 transition-opacity", highlightSeriesKey && highlightSeriesKey !== s.key && "opacity-10", props.points?.class, typeof points === "object" && points.class)
    };
    return pointsProps;
  }
  function getLabelsProps(s, i) {
    const labelsProps = {
      data: s.data,
      y: stackSeries ? (d) => d.stackData[i][1] : Array.isArray(s.value) ? s.value[1] : s.value ?? (s.data ? void 0 : s.key),
      ...props.labels,
      ...typeof labels === "object" ? labels : null,
      class: cls("stroke-surface-200 transition-opacity", highlightSeriesKey && highlightSeriesKey !== s.key && "opacity-10", props.labels?.class, typeof labels === "object" && labels.class)
    };
    return labelsProps;
  }
  const selectedSeries = selectionStore();
  if (profile) {
    console.time("AreaChart render");
  }
  isDefaultSeries = series.length === 1 && series[0].key === "default";
  stackSeries = seriesLayout.startsWith("stack");
  visibleSeries = series.filter((s) => {
    return (
      // @ts-expect-error
      store_get($$store_subs ??= {}, "$selectedSeries", selectedSeries).selected.length === 0 || store_get($$store_subs ??= {}, "$selectedSeries", selectedSeries).isSelected(s.key)
    );
  });
  allSeriesData = visibleSeries.flatMap((s) => s.data?.map((d) => ({ seriesKey: s.key, ...d }))).filter((d) => d);
  chartData = allSeriesData.length ? allSeriesData : chartDataArray(data);
  if (stackSeries) {
    const seriesKeys = visibleSeries.map((s) => s.key);
    const offset = seriesLayout === "stackExpand" ? stackOffsetExpand : seriesLayout === "stackDiverging" ? stackOffsetDiverging : stackOffsetNone;
    const stackData = stack().keys(seriesKeys).value((d, key) => {
      const s = series.find((d2) => d2.key === key);
      return accessor(s.value ?? s.key)(d);
    }).offset(offset)(chartDataArray(data));
    chartData = chartData.map((d, i) => {
      return {
        ...d,
        stackData: stackData.map((sd) => sd[i])
      };
    });
  }
  xScale = $$sanitized_props.xScale ?? (accessor(x)(chartData[0]) instanceof Date ? scaleTime() : scaleLinear());
  getAreaProps = (s, i) => {
    const lineProps = {
      ...props.line,
      ...typeof props.area?.line === "object" ? props.area.line : null,
      ...typeof s.props?.line === "object" ? s.props.line : null
    };
    const areaProps = {
      data: s.data,
      y0: stackSeries ? (d) => d.stackData[i][0] : Array.isArray(s.value) ? s.value[0] : void 0,
      y1: stackSeries ? (d) => d.stackData[i][1] : Array.isArray(s.value) ? s.value[1] : s.value ?? (s.data ? void 0 : s.key),
      fill: s.color,
      fillOpacity: 0.3,
      ...props.area,
      ...s.props,
      class: cls(
        "transition-opacity",
        // Checking `visibleSeries.length > 1` fixes re-animated tweened areas on hover
        visibleSeries.length > 1 && highlightSeriesKey && highlightSeriesKey !== s.key && "opacity-10",
        props.area?.class,
        s.props?.class
      ),
      line: {
        stroke: s.color,
        ...lineProps,
        class: cls("transition-opacity", visibleSeries.length > 1 && highlightSeriesKey && highlightSeriesKey !== s.key && "opacity-10", lineProps.class)
      }
    };
    return areaProps;
  };
  brushProps = {
    ...typeof brush === "object" ? brush : null,
    ...props.brush
  };
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Chart($$payload2, spread_props([
      {
        data: chartData,
        x,
        xDomain,
        xScale,
        y: y ?? (stackSeries ? (d) => visibleSeries.flatMap((s, i) => d.stackData[i]) : visibleSeries.map((s) => s.value ?? s.key)),
        yBaseline: 0,
        yNice: true,
        radial,
        padding: radial ? void 0 : defaultChartPadding(axis, legend)
      },
      $$restProps,
      {
        tooltip: $$sanitized_props.tooltip === false ? false : {
          mode: "bisect-x",
          onclick: ontooltipclick,
          debug,
          ...props.tooltip?.context,
          ...$$sanitized_props.tooltip
        },
        brush: brush && (brush === true || brush.mode == void 0 || brush.mode === "integrated") ? {
          axis: "x",
          resetOnEnd: true,
          xDomain,
          ...brushProps,
          onbrushend: (e) => {
            xDomain = e.xDomain;
            brushProps.onbrushend?.(e);
          }
        } : false,
        get tooltipContext() {
          return tooltipContext2;
        },
        set tooltipContext($$value) {
          tooltipContext2 = $$value;
          $$settled = false;
        },
        children: invalid_default_snippet,
        $$slots: {
          default: ($$payload3, {
            x: x2,
            xScale: xScale2,
            y: y2,
            yScale,
            c,
            cScale,
            width,
            height,
            padding,
            tooltip
          }) => {
            const slotProps = {
              x: x2,
              xScale: xScale2,
              y: y2,
              yScale,
              c,
              cScale,
              width,
              height,
              padding,
              tooltip,
              series,
              visibleSeries,
              getAreaProps,
              getLabelsProps,
              getPointsProps,
              setHighlightSeriesKey
            };
            $$payload3.out += `<!---->`;
            slot($$payload3, $$props, "default", spread_props([{}, slotProps]), () => {
              $$payload3.out += `<!---->`;
              slot($$payload3, $$props, "belowContext", spread_props([{}, slotProps]), null);
              $$payload3.out += `<!----> <!---->`;
              (renderContext === "canvas" ? Canvas : Svg)?.($$payload3, spread_props([
                asAny(renderContext === "canvas" ? props.canvas : props.svg),
                {
                  center: radial,
                  debug,
                  children: ($$payload4) => {
                    $$payload4.out += `<!---->`;
                    slot($$payload4, $$props, "grid", spread_props([{}, slotProps]), () => {
                      if (grid) {
                        $$payload4.out += "<!--[-->";
                        Grid($$payload4, spread_props([
                          { x: radial, y: true },
                          typeof grid === "object" ? grid : null,
                          props.grid
                        ]));
                      } else {
                        $$payload4.out += "<!--[!-->";
                      }
                      $$payload4.out += `<!--]-->`;
                    });
                    $$payload4.out += `<!----> `;
                    ChartClipPath($$payload4, {
                      disabled: !brush,
                      children: ($$payload5) => {
                        $$payload5.out += `<!---->`;
                        slot($$payload5, $$props, "belowMarks", spread_props([{}, slotProps]), null);
                        $$payload5.out += `<!----> <!---->`;
                        slot($$payload5, $$props, "marks", spread_props([{}, slotProps]), () => {
                          const each_array = ensure_array_like(visibleSeries);
                          $$payload5.out += `<!--[-->`;
                          for (let i = 0, $$length = each_array.length; i < $$length; i++) {
                            let s = each_array[i];
                            Area($$payload5, spread_props([getAreaProps(s, i)]));
                          }
                          $$payload5.out += `<!--]-->`;
                        });
                        $$payload5.out += `<!---->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload4.out += `<!----> <!---->`;
                    slot($$payload4, $$props, "aboveMarks", spread_props([{}, slotProps]), null);
                    $$payload4.out += `<!----> <!---->`;
                    slot($$payload4, $$props, "axis", spread_props([{}, slotProps]), () => {
                      if (axis) {
                        $$payload4.out += "<!--[-->";
                        if (axis !== "x") {
                          $$payload4.out += "<!--[-->";
                          Axis($$payload4, spread_props([
                            {
                              placement: radial ? "radius" : "left",
                              format: (value) => {
                                if (seriesLayout === "stackExpand") {
                                  return format(value, "percentRound");
                                } else {
                                  return format(value, void 0, { variant: "short" });
                                }
                              }
                            },
                            typeof axis === "object" ? axis : null,
                            props.yAxis
                          ]));
                        } else {
                          $$payload4.out += "<!--[!-->";
                        }
                        $$payload4.out += `<!--]--> `;
                        if (axis !== "y") {
                          $$payload4.out += "<!--[-->";
                          Axis($$payload4, spread_props([
                            {
                              placement: radial ? "angle" : "bottom",
                              format: (value) => format(value, void 0, { variant: "short" })
                            },
                            typeof axis === "object" ? axis : null,
                            props.xAxis
                          ]));
                        } else {
                          $$payload4.out += "<!--[!-->";
                        }
                        $$payload4.out += `<!--]--> `;
                        if (rule) {
                          $$payload4.out += "<!--[-->";
                          Rule($$payload4, spread_props([
                            { x: 0, y: 0 },
                            typeof rule === "object" ? rule : null,
                            props.rule
                          ]));
                        } else {
                          $$payload4.out += "<!--[!-->";
                        }
                        $$payload4.out += `<!--]-->`;
                      } else {
                        $$payload4.out += "<!--[!-->";
                      }
                      $$payload4.out += `<!--]-->`;
                    });
                    $$payload4.out += `<!----> `;
                    ChartClipPath($$payload4, {
                      disabled: !brush,
                      full: true,
                      children: ($$payload5) => {
                        if (points) {
                          $$payload5.out += "<!--[-->";
                          const each_array_1 = ensure_array_like(visibleSeries);
                          $$payload5.out += `<!--[-->`;
                          for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
                            let s = each_array_1[i];
                            Points($$payload5, spread_props([getPointsProps(s, i)]));
                          }
                          $$payload5.out += `<!--]-->`;
                        } else {
                          $$payload5.out += "<!--[!-->";
                        }
                        $$payload5.out += `<!--]--> <!---->`;
                        slot($$payload5, $$props, "highlight", spread_props([{}, slotProps]), () => {
                          const each_array_2 = ensure_array_like(visibleSeries);
                          $$payload5.out += `<!--[-->`;
                          for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
                            let s = each_array_2[i];
                            const seriesTooltipData = s.data && tooltip.data ? findRelatedData(s.data, tooltip.data, x2) : null;
                            const highlightPointsProps = typeof props.highlight?.points === "object" ? props.highlight.points : null;
                            Highlight($$payload5, spread_props([
                              {
                                data: seriesTooltipData,
                                y: stackSeries ? (d) => d.stackData[i][1] : s.value ?? (s.data ? void 0 : s.key),
                                lines: i == 0,
                                onpointclick: onpointclick ? (e, detail) => onpointclick(e, { ...detail, series: s }) : void 0,
                                onpointenter: () => highlightSeriesKey = s.key,
                                onpointleave: () => highlightSeriesKey = null
                              },
                              props.highlight,
                              {
                                points: {
                                  ...highlightPointsProps,
                                  fill: s.color,
                                  class: cls("transition-opacity", highlightSeriesKey && highlightSeriesKey !== s.key && "opacity-10", highlightPointsProps?.class)
                                }
                              }
                            ]));
                          }
                          $$payload5.out += `<!--]-->`;
                        });
                        $$payload5.out += `<!----> `;
                        if (labels) {
                          $$payload5.out += "<!--[-->";
                          const each_array_3 = ensure_array_like(visibleSeries);
                          $$payload5.out += `<!--[-->`;
                          for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
                            let s = each_array_3[i];
                            Labels($$payload5, spread_props([getLabelsProps(s, i)]));
                          }
                          $$payload5.out += `<!--]-->`;
                        } else {
                          $$payload5.out += "<!--[!-->";
                        }
                        $$payload5.out += `<!--]-->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload4.out += `<!---->`;
                  },
                  $$slots: { default: true }
                }
              ]));
              $$payload3.out += `<!----> <!---->`;
              slot($$payload3, $$props, "aboveContext", spread_props([{}, slotProps]), null);
              $$payload3.out += `<!----> <!---->`;
              slot($$payload3, $$props, "legend", spread_props([{}, slotProps]), () => {
                if (legend) {
                  $$payload3.out += "<!--[-->";
                  Legend($$payload3, spread_props([
                    {
                      scale: isDefaultSeries ? void 0 : scaleOrdinal(series.map((s) => s.key), series.map((s) => s.color)),
                      tickFormat: (key) => series.find((s) => s.key === key)?.label ?? key,
                      placement: "bottom",
                      variant: "swatches",
                      onclick: (e, item) => store_get($$store_subs ??= {}, "$selectedSeries", selectedSeries).toggleSelected(item.value),
                      onpointerenter: (e, item) => highlightSeriesKey = item.value,
                      onpointerleave: (e) => highlightSeriesKey = null
                    },
                    props.legend,
                    typeof legend === "object" ? legend : null,
                    {
                      classes: {
                        item: (item) => visibleSeries.length && !visibleSeries.some((s) => s.key === item.value) ? "opacity-50" : "",
                        ...props.legend?.classes,
                        ...typeof legend === "object" ? legend.classes : null
                      }
                    }
                  ]));
                } else {
                  $$payload3.out += "<!--[!-->";
                }
                $$payload3.out += `<!--]-->`;
              });
              $$payload3.out += `<!----> <!---->`;
              slot($$payload3, $$props, "tooltip", spread_props([{}, slotProps]), () => {
                Tooltip($$payload3, spread_props([
                  props.tooltip?.root,
                  {
                    children: invalid_default_snippet,
                    $$slots: {
                      default: ($$payload4, { data: data2 }) => {
                        TooltipHeader($$payload4, spread_props([
                          { value: x2(data2), format },
                          props.tooltip?.header
                        ]));
                        $$payload4.out += `<!----> `;
                        TooltipList($$payload4, spread_props([
                          props.tooltip?.list,
                          {
                            children: ($$payload5) => {
                              const seriesItems = stackSeries ? [...visibleSeries].reverse() : visibleSeries;
                              const each_array_4 = ensure_array_like(seriesItems);
                              $$payload5.out += `<!--[-->`;
                              for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
                                let s = each_array_4[$$index_4];
                                const seriesTooltipData = s.data ? findRelatedData(s.data, data2, x2) : data2;
                                const valueAccessor = accessor(s.value ?? (s.data ? asAny(y2) : s.key));
                                TooltipItem($$payload5, spread_props([
                                  {
                                    label: s.label ?? (s.key !== "default" ? s.key : "value"),
                                    value: seriesTooltipData ? valueAccessor(seriesTooltipData) : null,
                                    color: s.color,
                                    format,
                                    valueAlign: "right",
                                    onpointerenter: () => highlightSeriesKey = s.key,
                                    onpointerleave: () => highlightSeriesKey = null
                                  },
                                  props.tooltip?.item
                                ]));
                              }
                              $$payload5.out += `<!--]--> `;
                              if (stackSeries && visibleSeries.length > 1) {
                                $$payload5.out += "<!--[-->";
                                TooltipSeparator($$payload5, spread_props([props.tooltip?.separator]));
                                $$payload5.out += `<!----> `;
                                TooltipItem($$payload5, spread_props([
                                  {
                                    label: "total",
                                    value: sum(visibleSeries, (s) => {
                                      const seriesTooltipData = s.data ? s.data.find((d) => x2(d) === x2(data2)) : data2;
                                      const valueAccessor = accessor(s.value ?? (s.data ? asAny(y2) : s.key));
                                      return valueAccessor(seriesTooltipData);
                                    }),
                                    format: "integer",
                                    valueAlign: "right"
                                  },
                                  props.tooltip?.root
                                ]));
                                $$payload5.out += `<!---->`;
                              } else {
                                $$payload5.out += "<!--[!-->";
                              }
                              $$payload5.out += `<!--]-->`;
                            },
                            $$slots: { default: true }
                          }
                        ]));
                        $$payload4.out += `<!---->`;
                      }
                    }
                  }
                ]));
              });
              $$payload3.out += `<!---->`;
            });
            $$payload3.out += `<!---->`;
          }
        }
      }
    ]));
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    data,
    x,
    y,
    xDomain,
    radial,
    series,
    seriesLayout,
    axis,
    brush,
    grid,
    labels,
    legend,
    points,
    rule,
    tooltipContext: tooltipContext2,
    ontooltipclick,
    onpointclick,
    props,
    renderContext,
    profile,
    debug
  });
  pop();
}
function Arc($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "spring",
    "tweened",
    "value",
    "initialValue",
    "domain",
    "range",
    "startAngle",
    "endAngle",
    "innerRadius",
    "outerRadius",
    "cornerRadius",
    "padAngle",
    "fill",
    "fillOpacity",
    "stroke",
    "strokeWidth",
    "class",
    "track",
    "onclick",
    "onpointerenter",
    "onpointermove",
    "onpointerleave",
    "offset",
    "tooltip",
    "data"
  ]);
  push();
  var $$store_subs;
  let scale, _outerRadius, _innerRadius, arc$1, trackArc, trackArcCentroid, boundingBox, angle, xOffset, yOffset;
  let spring2 = fallback($$props["spring"], void 0);
  let tweened2 = fallback($$props["tweened"], void 0);
  let value = fallback($$props["value"], 0);
  let initialValue = fallback($$props["initialValue"], value);
  let tweened_value = motionStore(initialValue, { spring: spring2, tweened: tweened2 });
  let domain = fallback($$props["domain"], () => [0, 100], true);
  let range2 = fallback($$props["range"], () => [0, 360], true);
  let startAngle = fallback($$props["startAngle"], void 0);
  let endAngle = fallback($$props["endAngle"], void 0);
  let innerRadius = fallback($$props["innerRadius"], void 0);
  let outerRadius = fallback($$props["outerRadius"], void 0);
  let cornerRadius = fallback($$props["cornerRadius"], 0);
  let padAngle = fallback($$props["padAngle"], 0);
  let fill = fallback($$props["fill"], void 0);
  let fillOpacity = fallback($$props["fillOpacity"], void 0);
  let stroke = fallback($$props["stroke"], "none");
  let strokeWidth = fallback($$props["strokeWidth"], void 0);
  let className = fallback($$props["class"], void 0);
  let track = fallback($$props["track"], false);
  let onclick = fallback($$props["onclick"], void 0);
  let onpointerenter = fallback($$props["onpointerenter"], void 0);
  let onpointermove = fallback($$props["onpointermove"], void 0);
  let onpointerleave = fallback($$props["onpointerleave"], void 0);
  const { xRange, yRange } = chartContext();
  function getOuterRadius(outerRadius2, chartRadius) {
    if (!outerRadius2) {
      return chartRadius;
    } else if (outerRadius2 > 1) {
      return outerRadius2;
    } else if (outerRadius2 > 0) {
      return chartRadius * outerRadius2;
    } else if (outerRadius2 < 0) {
      return chartRadius + outerRadius2;
    } else {
      return outerRadius2;
    }
  }
  function getInnerRadius(innerRadius2, outerRadius2) {
    if (innerRadius2 == null) {
      return Math.min(...store_get($$store_subs ??= {}, "$yRange", yRange));
    } else if (innerRadius2 > 1) {
      return innerRadius2;
    } else if (innerRadius2 > 0) {
      return outerRadius2 * innerRadius2;
    } else if (innerRadius2 < 0) {
      return outerRadius2 + innerRadius2;
    } else {
      return innerRadius2;
    }
  }
  let trackArcEl = void 0;
  let offset = fallback($$props["offset"], 0);
  let tooltip = fallback($$props["tooltip"], void 0);
  let data = fallback($$props["data"], void 0);
  function onPointerEnter(e) {
    onpointerenter?.(e);
    tooltip?.show(e, data);
  }
  function onPointerMove(e) {
    onpointermove?.(e);
    tooltip?.show(e, data);
  }
  function onPointerLeave(e) {
    onpointerleave?.(e);
    tooltip?.hide();
  }
  tick().then(() => {
    tweened_value.set(value);
  });
  scale = scaleLinear().domain(domain).range(range2);
  _outerRadius = getOuterRadius(outerRadius, (Math.min(store_get($$store_subs ??= {}, "$xRange", xRange)[1], store_get($$store_subs ??= {}, "$yRange", yRange)[0]) ?? 0) / 2);
  _innerRadius = getInnerRadius(innerRadius, _outerRadius);
  arc$1 = arc().innerRadius(_innerRadius).outerRadius(_outerRadius).startAngle(startAngle ?? degreesToRadians(range2[0])).endAngle(endAngle ?? degreesToRadians(scale(store_get($$store_subs ??= {}, "$tweened_value", tweened_value)))).cornerRadius(cornerRadius).padAngle(padAngle);
  trackArc = arc().innerRadius(_innerRadius).outerRadius(_outerRadius).startAngle(startAngle ?? degreesToRadians(range2[0])).endAngle(endAngle ?? degreesToRadians(range2[1])).cornerRadius(cornerRadius).padAngle(padAngle);
  trackArcCentroid = trackArc.centroid();
  boundingBox = trackArcEl ? trackArcEl.getBBox() : {};
  angle = ((startAngle ?? 0) + (endAngle ?? 0)) / 2;
  xOffset = Math.sin(angle) * offset;
  yOffset = -Math.cos(angle) * offset;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (track) {
      $$payload2.out += "<!--[-->";
      Spline($$payload2, spread_props([
        {
          pathData: trackArc(),
          class: "track",
          stroke: "none"
        },
        typeof track === "object" ? track : null,
        {
          get pathEl() {
            return trackArcEl;
          },
          set pathEl($$value) {
            trackArcEl = $$value;
            $$settled = false;
          }
        }
      ]));
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    Spline($$payload2, spread_props([
      {
        pathData: arc$1(),
        transform: `translate(${stringify(xOffset)}, ${stringify(yOffset)})`,
        fill,
        "fill-opacity": fillOpacity,
        stroke,
        "stroke-width": strokeWidth,
        class: className
      },
      $$restProps,
      {
        onclick,
        onpointerenter: onPointerEnter,
        onpointermove: onPointerMove,
        onpointerleave: onPointerLeave,
        ontouchmove: (e) => {
          if (tooltip) {
            e.preventDefault();
          }
        }
      }
    ]));
    $$payload2.out += `<!----> <!---->`;
    slot(
      $$payload2,
      $$props,
      "default",
      {
        value: store_get($$store_subs ??= {}, "$tweened_value", tweened_value),
        centroid: trackArcCentroid,
        boundingBox
      },
      null
    );
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    spring: spring2,
    tweened: tweened2,
    value,
    initialValue,
    domain,
    range: range2,
    startAngle,
    endAngle,
    innerRadius,
    outerRadius,
    cornerRadius,
    padAngle,
    fill,
    fillOpacity,
    stroke,
    strokeWidth,
    class: className,
    track,
    onclick,
    onpointerenter,
    onpointermove,
    onpointerleave,
    offset,
    tooltip,
    data
  });
  pop();
}
function Pie($$payload, $$props) {
  push();
  var $$store_subs;
  let resolved_endAngle, arcs;
  let data = fallback($$props["data"], void 0);
  let range2 = fallback($$props["range"], () => [0, 360], true);
  let startAngle = fallback($$props["startAngle"], void 0);
  let endAngle = fallback($$props["endAngle"], void 0);
  let innerRadius = fallback($$props["innerRadius"], void 0);
  let outerRadius = fallback($$props["outerRadius"], void 0);
  let cornerRadius = fallback($$props["cornerRadius"], 0);
  let padAngle = fallback($$props["padAngle"], 0);
  let spring2 = fallback($$props["spring"], void 0);
  let tweened2 = fallback($$props["tweened"], void 0);
  let offset = fallback($$props["offset"], 0);
  let tooltip = fallback($$props["tooltip"], void 0);
  let sort = fallback($$props["sort"], void 0);
  const {
    data: contextData,
    x,
    y,
    xRange,
    c,
    cScale,
    config
  } = chartContext();
  let tweened_endAngle = motionStore(0, { spring: spring2, tweened: tweened2 });
  let pie$1;
  resolved_endAngle = endAngle ?? degreesToRadians(store_get($$store_subs ??= {}, "$config", config).xRange ? max(store_get($$store_subs ??= {}, "$xRange", xRange)) : max(range2));
  tweened_endAngle.set(resolved_endAngle);
  {
    pie$1 = pie().startAngle(startAngle ?? degreesToRadians(store_get($$store_subs ??= {}, "$config", config).xRange ? min(store_get($$store_subs ??= {}, "$xRange", xRange)) : min(range2))).endAngle(store_get($$store_subs ??= {}, "$tweened_endAngle", tweened_endAngle)).padAngle(padAngle).value(store_get($$store_subs ??= {}, "$x", x));
    if (sort === null) {
      pie$1 = pie$1.sort(null);
    } else if (sort) {
      pie$1 = pie$1.sort(sort);
    }
  }
  arcs = pie$1(data ?? (Array.isArray(store_get($$store_subs ??= {}, "$contextData", contextData)) ? store_get($$store_subs ??= {}, "$contextData", contextData) : []));
  $$payload.out += `<!---->`;
  slot($$payload, $$props, "default", { arcs }, () => {
    const each_array = ensure_array_like(arcs);
    $$payload.out += `<!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let arc2 = each_array[$$index];
      Arc($$payload, {
        startAngle: arc2.startAngle,
        endAngle: arc2.endAngle,
        padAngle: arc2.padAngle,
        innerRadius,
        outerRadius,
        cornerRadius,
        offset,
        fill: store_get($$store_subs ??= {}, "$config", config).c ? store_get($$store_subs ??= {}, "$cScale", cScale)?.(store_get($$store_subs ??= {}, "$c", c)(arc2.data)) : null,
        data: arc2.data,
        tooltip
      });
    }
    $$payload.out += `<!--]-->`;
  });
  $$payload.out += `<!---->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    data,
    range: range2,
    startAngle,
    endAngle,
    innerRadius,
    outerRadius,
    cornerRadius,
    padAngle,
    spring: spring2,
    tweened: tweened2,
    offset,
    tooltip,
    sort
  });
  pop();
}
function PieChart($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "data",
    "key",
    "label",
    "value",
    "c",
    "maxValue",
    "series",
    "legend",
    "range",
    "innerRadius",
    "outerRadius",
    "cornerRadius",
    "padAngle",
    "placement",
    "center",
    "tooltipContext",
    "ontooltipclick",
    "onarcclick",
    "props",
    "renderContext",
    "profile",
    "debug"
  ]);
  push();
  var $$store_subs;
  let keyAccessor, labelAccessor, valueAccessor, cAccessor, allSeriesData, chartData, seriesColors, visibleData;
  let data = fallback($$props["data"], () => [], true);
  let key = fallback($$props["key"], "key");
  let label = fallback($$props["label"], "label");
  let value = fallback($$props["value"], "value");
  let c = fallback($$props["c"], key);
  let maxValue = fallback($$props["maxValue"], void 0);
  let series = fallback(
    $$props["series"],
    () => [
      {
        key: "default",
        value
        /*, color: 'hsl(var(--color-primary))'*/
      }
    ],
    true
  );
  let legend = fallback($$props["legend"], false);
  let range2 = fallback($$props["range"], () => [0, 360], true);
  let innerRadius = fallback($$props["innerRadius"], void 0);
  let outerRadius = fallback($$props["outerRadius"], void 0);
  let cornerRadius = fallback($$props["cornerRadius"], 0);
  let padAngle = fallback($$props["padAngle"], 0);
  let placement = fallback($$props["placement"], "center");
  let center = fallback($$props["center"], placement === "center");
  let tooltipContext2 = fallback($$props["tooltipContext"], void 0);
  let ontooltipclick = fallback($$props["ontooltipclick"], () => {
  });
  let onarcclick = fallback($$props["onarcclick"], () => {
  });
  let props = fallback($$props["props"], () => ({}), true);
  let renderContext = fallback($$props["renderContext"], "svg");
  let profile = fallback($$props["profile"], false);
  let debug = fallback($$props["debug"], false);
  let highlightKey = null;
  function setHighlightKey(key2) {
    highlightKey = key2 ?? null;
  }
  const selectedKeys = selectionStore();
  if (profile) {
    console.time("PieChart render");
  }
  keyAccessor = accessor(key);
  labelAccessor = accessor(label);
  valueAccessor = accessor(value);
  cAccessor = accessor(c);
  allSeriesData = series.flatMap((s) => s.data?.map((d) => ({ seriesKey: s.key, ...d }))).filter((d) => d);
  chartData = allSeriesData.length ? allSeriesData : chartDataArray(data);
  seriesColors = series.map((s) => s.color).filter((d) => d != null);
  visibleData = chartData.filter((d) => {
    const dataKey = keyAccessor(d);
    return (
      // @ts-expect-error
      store_get($$store_subs ??= {}, "$selectedKeys", selectedKeys).selected.length === 0 || store_get($$store_subs ??= {}, "$selectedKeys", selectedKeys).isSelected(dataKey)
    );
  });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Chart($$payload2, spread_props([
      {
        data: visibleData,
        x: value,
        y: key,
        c,
        cDomain: chartData.map(keyAccessor),
        cRange: seriesColors.length ? seriesColors : c !== key ? chartData.map((d) => cAccessor(d)) : [
          "hsl(var(--color-primary))",
          "hsl(var(--color-secondary))",
          "hsl(var(--color-info))",
          "hsl(var(--color-success))",
          "hsl(var(--color-warning))",
          "hsl(var(--color-danger))"
        ],
        padding: { bottom: legend === true ? 32 : 0 }
      },
      $$restProps,
      {
        tooltip: props.tooltip?.context,
        get tooltipContext() {
          return tooltipContext2;
        },
        set tooltipContext($$value) {
          tooltipContext2 = $$value;
          $$settled = false;
        },
        children: invalid_default_snippet,
        $$slots: {
          default: ($$payload3, {
            x,
            xScale,
            y,
            c: c2,
            cScale,
            yScale,
            width,
            height,
            padding,
            tooltip
          }) => {
            const slotProps = {
              key,
              label,
              value,
              x,
              xScale,
              y,
              yScale,
              c: c2,
              cScale,
              width,
              height,
              padding,
              tooltip,
              series,
              visibleData,
              setHighlightKey
            };
            $$payload3.out += `<!---->`;
            slot($$payload3, $$props, "default", spread_props([{}, slotProps]), () => {
              $$payload3.out += `<!---->`;
              slot($$payload3, $$props, "belowContext", spread_props([{}, slotProps]), null);
              $$payload3.out += `<!----> <!---->`;
              (renderContext === "canvas" ? Canvas : Svg)?.($$payload3, spread_props([
                asAny(renderContext === "canvas" ? props.canvas : props.svg),
                {
                  center,
                  debug,
                  children: ($$payload4) => {
                    $$payload4.out += `<!---->`;
                    slot($$payload4, $$props, "belowMarks", spread_props([{}, slotProps]), null);
                    $$payload4.out += `<!----> <!---->`;
                    slot($$payload4, $$props, "marks", spread_props([{}, slotProps]), () => {
                      Group($$payload4, spread_props([
                        {
                          x: placement === "left" ? height / 2 : placement === "right" ? width - height / 2 : void 0,
                          center: ["left", "right"].includes(placement) ? "y" : void 0
                        },
                        props.group,
                        {
                          children: ($$payload5) => {
                            const each_array = ensure_array_like(series);
                            $$payload5.out += `<!--[-->`;
                            for (let i = 0, $$length = each_array.length; i < $$length; i++) {
                              let s = each_array[i];
                              const singleArc = s.data?.length === 1 || chartData.length === 1;
                              if (singleArc) {
                                $$payload5.out += "<!--[-->";
                                const d = s.data?.[0] || chartData[0];
                                Arc($$payload5, spread_props([
                                  {
                                    value: valueAccessor(d),
                                    domain: [
                                      0,
                                      s.maxValue ?? maxValue ?? sum(chartData, valueAccessor)
                                    ],
                                    range: range2,
                                    innerRadius,
                                    outerRadius: (outerRadius ?? 0) < 0 ? i * (outerRadius ?? 0) : outerRadius,
                                    cornerRadius,
                                    padAngle,
                                    fill: s.color ?? cScale?.(c2(d)),
                                    track: {
                                      fill: s.color ?? cScale?.(c2(d)),
                                      "fill-opacity": 0.1
                                    },
                                    tooltip,
                                    data: d,
                                    onclick: (e) => {
                                      onarcclick(e, { data: d, series: s });
                                      ontooltipclick(e, { data: d });
                                    }
                                  },
                                  props.arc,
                                  s.props,
                                  {
                                    class: cls("transition-opacity", highlightKey && highlightKey !== keyAccessor(d) && "opacity-50", props.arc?.class, s.props?.class)
                                  }
                                ]));
                              } else {
                                $$payload5.out += "<!--[!-->";
                                Pie($$payload5, spread_props([
                                  {
                                    data: s.data,
                                    range: range2,
                                    innerRadius,
                                    outerRadius,
                                    cornerRadius,
                                    padAngle
                                  },
                                  props.pie,
                                  {
                                    children: invalid_default_snippet,
                                    $$slots: {
                                      default: ($$payload6, { arcs }) => {
                                        const each_array_1 = ensure_array_like(arcs);
                                        $$payload6.out += `<!--[-->`;
                                        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                                          let arc2 = each_array_1[$$index];
                                          Arc($$payload6, spread_props([
                                            {
                                              startAngle: arc2.startAngle,
                                              endAngle: arc2.endAngle,
                                              outerRadius: series.length > 1 ? i * (outerRadius ?? 0) : outerRadius,
                                              innerRadius,
                                              cornerRadius,
                                              padAngle,
                                              fill: cScale?.(c2(arc2.data)),
                                              data: arc2.data,
                                              tooltip,
                                              onclick: (e) => {
                                                onarcclick(e, { data: arc2.data, series: s });
                                                ontooltipclick(e, { data: arc2.data });
                                              },
                                              class: cls("transition-opacity", highlightKey && highlightKey !== keyAccessor(arc2.data) && "opacity-50")
                                            },
                                            props.arc,
                                            s.props
                                          ]));
                                        }
                                        $$payload6.out += `<!--]-->`;
                                      }
                                    }
                                  }
                                ]));
                              }
                              $$payload5.out += `<!--]-->`;
                            }
                            $$payload5.out += `<!--]-->`;
                          },
                          $$slots: { default: true }
                        }
                      ]));
                    });
                    $$payload4.out += `<!----> <!---->`;
                    slot($$payload4, $$props, "aboveMarks", spread_props([{}, slotProps]), null);
                    $$payload4.out += `<!---->`;
                  },
                  $$slots: { default: true }
                }
              ]));
              $$payload3.out += `<!----> <!---->`;
              slot($$payload3, $$props, "aboveContext", spread_props([{}, slotProps]), null);
              $$payload3.out += `<!----> <!---->`;
              slot($$payload3, $$props, "legend", spread_props([{}, slotProps]), () => {
                if (legend) {
                  $$payload3.out += "<!--[-->";
                  Legend($$payload3, spread_props([
                    {
                      tickFormat: (tick2) => {
                        const item = chartData.find((d) => keyAccessor(d) === tick2);
                        return item ? labelAccessor(item) ?? tick2 : tick2;
                      },
                      placement: "bottom",
                      variant: "swatches",
                      onclick: (e, item) => store_get($$store_subs ??= {}, "$selectedKeys", selectedKeys).toggleSelected(item.value),
                      onpointerenter: (e, item) => highlightKey = item.value,
                      onpointerleave: (e) => highlightKey = null
                    },
                    props.legend,
                    typeof legend === "object" ? legend : null,
                    {
                      classes: {
                        item: (item) => visibleData.length && !visibleData.some((d) => keyAccessor(d) === item.value) ? "opacity-50" : "",
                        ...props.legend?.classes,
                        ...typeof legend === "object" ? legend.classes : null
                      }
                    }
                  ]));
                } else {
                  $$payload3.out += "<!--[!-->";
                }
                $$payload3.out += `<!--]-->`;
              });
              $$payload3.out += `<!----> <!---->`;
              slot($$payload3, $$props, "tooltip", spread_props([{}, slotProps]), () => {
                Tooltip($$payload3, spread_props([
                  props.tooltip?.root,
                  {
                    children: invalid_default_snippet,
                    $$slots: {
                      default: ($$payload4, { data: data2 }) => {
                        TooltipList($$payload4, spread_props([
                          props.tooltip?.list,
                          {
                            children: ($$payload5) => {
                              TooltipItem($$payload5, spread_props([
                                {
                                  label: labelAccessor(data2) || keyAccessor(data2),
                                  value: valueAccessor(data2),
                                  color: cScale?.(c2(data2)),
                                  format,
                                  onpointerenter: () => highlightKey = keyAccessor(data2),
                                  onpointerleave: () => highlightKey = null
                                },
                                props.tooltip?.item
                              ]));
                            },
                            $$slots: { default: true }
                          }
                        ]));
                      }
                    }
                  }
                ]));
              });
              $$payload3.out += `<!---->`;
            });
            $$payload3.out += `<!---->`;
          }
        }
      }
    ]));
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    data,
    key,
    label,
    value,
    c,
    maxValue,
    series,
    legend,
    range: range2,
    innerRadius,
    outerRadius,
    cornerRadius,
    padAngle,
    placement,
    center,
    tooltipContext: tooltipContext2,
    ontooltipclick,
    onarcclick,
    props,
    renderContext,
    profile,
    debug
  });
  pop();
}
[
  {
    predicate: (duration) => duration == null,
    // Unknown
    interval: timeYear.every(1),
    // Better than rendering a lot of items
    format: (date) => date.toString()
  },
  {
    predicate: (duration) => duration.years > 1,
    interval: timeYear.every(1),
    format: (date) => formatDate(date, PeriodType.CalendarYear, { variant: "short" })
  },
  {
    predicate: (duration) => duration.years,
    interval: timeMonth.every(1),
    format: (date) => formatDate(date, PeriodType.Month, { variant: "short" })
  },
  {
    predicate: (duration) => duration.days > 30,
    interval: timeMonth.every(1),
    format: (date) => formatDate(date, PeriodType.Month, { variant: "short" })
  },
  {
    predicate: (duration) => duration.days,
    interval: timeDay.every(1),
    format: (date) => formatDate(date, PeriodType.Day, { variant: "short" })
  },
  {
    predicate: (duration) => duration.hours,
    interval: timeHour.every(1),
    format: (date) => format$1(date, "h:mm a")
  },
  {
    predicate: (duration) => duration.minutes > 10,
    interval: timeMinute.every(10),
    format: (date) => format$1(date, "h:mm a")
  },
  {
    predicate: (duration) => duration.minutes,
    interval: timeMinute.every(1),
    format: (date) => format$1(date, "h:mm a")
  },
  {
    predicate: (duration) => duration.seconds > 10,
    interval: timeSecond.every(10),
    format: (date) => format$1(date, "h:mm:ss")
  },
  {
    predicate: (duration) => duration.seconds,
    interval: timeSecond.every(1),
    format: (date) => format$1(date, "h:mm:ss")
  },
  {
    predicate: (duration) => true,
    // 0 or more milliseconds
    interval: timeMillisecond.every(100),
    format: (date) => format$1(date, "h:mm:ss.SSS")
  }
];
[
  {
    predicate: (duration) => duration == null,
    // Unknown
    interval: timeYear.every(1),
    // Better than rendering a lot of items
    format: (date) => date.toString()
  },
  {
    predicate: (duration) => duration.years,
    interval: timeMonth.every(1),
    format: (date) => formatDate(date, PeriodType.Month, { variant: "short" })
  },
  {
    predicate: (duration) => duration.days > 90,
    interval: timeMonth.every(1),
    format: (date) => formatDate(date, PeriodType.Month, { variant: "short" })
  },
  {
    predicate: (duration) => duration.days > 30,
    interval: timeWeek.every(1),
    format: (date) => formatDate(date, PeriodType.WeekSun, { variant: "short" })
  },
  {
    predicate: (duration) => duration.days > 7,
    interval: timeDay.every(1),
    format: (date) => formatDate(date, PeriodType.Day, { variant: "short" })
  },
  {
    predicate: (duration) => duration.days > 3,
    interval: timeHour.every(8),
    format: (date) => format$1(date, "h:mm a")
  },
  {
    predicate: (duration) => duration.days,
    interval: timeHour.every(1),
    format: (date) => format$1(date, "h:mm a")
  },
  {
    predicate: (duration) => duration.hours,
    interval: timeMinute.every(15),
    format: (date) => format$1(date, "h:mm a")
  },
  {
    predicate: (duration) => duration.minutes > 10,
    interval: timeMinute.every(10),
    format: (date) => format$1(date, "h:mm a")
  },
  {
    predicate: (duration) => duration.minutes > 2,
    interval: timeMinute.every(1),
    format: (date) => format$1(date, "h:mm a")
  },
  {
    predicate: (duration) => duration.minutes,
    interval: timeSecond.every(10),
    format: (date) => format$1(date, "h:mm:ss")
  },
  {
    predicate: (duration) => duration.seconds,
    interval: timeSecond.every(1),
    format: (date) => format$1(date, "h:mm:ss")
  },
  {
    predicate: (duration) => true,
    // 0 or more milliseconds
    interval: timeMillisecond.every(10),
    format: (date) => format$1(date, "h:mm:ss.SSS")
  }
];
function _page($$payload, $$props) {
  push();
  let correctCount = 0;
  let incorrectCount = 0;
  let countComplete = correctCount + incorrectCount;
  let percentCorrect = isNaN(+(correctCount / countComplete * 100).toFixed(1)) ? 100 : (correctCount / countComplete * 100).toFixed(1);
  let history = [];
  let undoHistory = [];
  let source = "";
  let csvLoaded = false;
  let currentNotes = "";
  let currentDate = /* @__PURE__ */ new Date();
  let filteredHistory = filterHistoryByDate(history, currentDate);
  let dailyQuestionCount = filteredHistory.length + 1;
  let visibleCorrectCount = countCorrectInFiltered(filteredHistory);
  let visibleIncorrectCount = countIncorrectInFiltered(filteredHistory);
  let visibleCountComplete = visibleCorrectCount + visibleIncorrectCount;
  let visiblePercentCorrect = isNaN(+(visibleCorrectCount / visibleCountComplete * 100).toFixed(1)) ? 100 : (visibleCorrectCount / visibleCountComplete * 100).toFixed(1);
  function filterHistoryByDate(historyItems, date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return historyItems.filter((item) => {
      const itemDate = new Date(item.datetime);
      return itemDate >= startOfDay && itemDate <= endOfDay;
    });
  }
  function countCorrectInFiltered(filteredItems) {
    return filteredItems.filter((item) => item.result === "Correct").length;
  }
  function countIncorrectInFiltered(filteredItems) {
    return filteredItems.filter((item) => item.result === "Incorrect").length;
  }
  function goToPreviousDay() {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    currentDate = newDate;
  }
  function goToNextDay() {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    if (newDate <= today) {
      currentDate = newDate;
    }
  }
  function goToToday() {
    currentDate = /* @__PURE__ */ new Date();
    currentDate.setHours(0, 0, 0, 0);
  }
  function formatDate2(date) {
    return date.toLocaleDateString(void 0, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
  function isToday(date) {
    const today = /* @__PURE__ */ new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }
  function resetCounts() {
    undoHistory = [
      ...undoHistory,
      {
        type: "reset",
        previousCorrect: correctCount,
        previousIncorrect: incorrectCount,
        previousHistory: history
      }
    ];
    correctCount = 0;
    incorrectCount = 0;
    history = [];
    csvLoaded = false;
  }
  function formatTimeDifference(milliseconds) {
    const seconds = Math.floor(milliseconds / 1e3);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    let formattedTime = "";
    if (minutes > 0) {
      formattedTime += `${minutes}m `;
    }
    formattedTime += `${remainingSeconds}s`;
    return formattedTime;
  }
  function exportCSV() {
    const header = "Datetime,Correctness,Time Taken,Notes,Source";
    const rows = history.map((item) => {
      const datetime = item.datetime || (/* @__PURE__ */ new Date()).toISOString();
      const source2 = item.source || "";
      return `${datetime},${item.result},${item.timeDifference},"${item.notes.replace(/"/g, '""')}","${source2.replace(/"/g, '""')}"`;
    }).join("\n");
    const csvContent = `${header}
${rows}`;
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link2 = document.createElement("a");
    link2.setAttribute("href", encodedUri);
    link2.setAttribute("download", "history.csv");
    document.body.appendChild(link2);
    link2.click();
    document.body.removeChild(link2);
  }
  function importCSV() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".csv";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) {
        document.body.removeChild(fileInput);
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        parseAndLoadCSV(content);
        document.body.removeChild(fileInput);
      };
      reader.readAsText(file);
    };
    fileInput.click();
  }
  function parseAndLoadCSV(content) {
    const lines = content.split("\n");
    if (lines.length > 1) {
      const previousHistory = [...history];
      try {
        const newItems = [];
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          let fields = [];
          let currentField = "";
          let inQuotes = false;
          for (let j = 0; j < lines[i].length; j++) {
            const char = lines[i][j];
            if (char === '"') {
              if (inQuotes && j + 1 < lines[i].length && lines[i][j + 1] === '"') {
                currentField += '"';
                j++;
              } else {
                inQuotes = !inQuotes;
              }
            } else if (char === "," && !inQuotes) {
              fields.push(currentField);
              currentField = "";
            } else {
              currentField += char;
            }
          }
          fields.push(currentField);
          if (fields.length >= 5) {
            const newItem = {
              datetime: fields[0] || (/* @__PURE__ */ new Date()).toISOString(),
              result: fields[1] || "",
              timeDifference: fields[2] || "",
              notes: fields[3] || "",
              source: fields[4] || "",
              question: history.length + newItems.length + 1
            };
            newItems.push(newItem);
          }
        }
        history = [...history, ...newItems];
        let newCorrect = 0;
        let newIncorrect = 0;
        newItems.forEach((item) => {
          if (item.result === "Correct") {
            newCorrect++;
          } else if (item.result === "Incorrect") {
            newIncorrect++;
          }
        });
        correctCount += newCorrect;
        incorrectCount += newIncorrect;
        csvLoaded = true;
        alert(`Successfully imported ${newItems.length} records.`);
      } catch (error) {
        console.error("Error parsing CSV:", error);
        history = previousHistory;
        alert("Error importing CSV. Please check the file format.");
      }
    }
  }
  function calculateAverageTimeDifference(items = filteredHistory) {
    if (items.length === 0) return "0s";
    const totalMilliseconds = items.reduce(
      (sum2, item) => {
        const timeParts = item.timeDifference.split(/m |s/);
        let minutes = 0;
        let seconds = 0;
        if (timeParts.length === 3) {
          minutes = parseInt(timeParts[0]);
          seconds = parseInt(timeParts[1]);
        } else if (timeParts.length === 2 && item.timeDifference.includes("m")) {
          minutes = parseInt(timeParts[0]);
        } else if (timeParts.length === 2 && item.timeDifference.includes("s")) {
          seconds = parseInt(timeParts[0]);
        } else if (timeParts.length === 1) {
          seconds = parseInt(timeParts[0]);
        }
        return sum2 + (minutes * 60 + seconds) * 1e3;
      },
      0
    );
    const averageMilliseconds = totalMilliseconds / items.length;
    return formatTimeDifference(averageMilliseconds);
  }
  let lastSevenDaysData = () => {
    const days = [];
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dailyHistory = filterHistoryByDate(history, date);
      days.push({
        date,
        count: +dailyHistory.length,
        label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      });
    }
    return days;
  };
  let dataSummary = () => {
    const summary = [];
    summary.push({
      correctness: "Correct",
      value: countCorrectInFiltered(filteredHistory)
    });
    summary.push({
      correctness: "Incorrect",
      value: countIncorrectInFiltered(filteredHistory)
    });
    return summary;
  };
  const each_array = ensure_array_like(filteredHistory);
  $$payload.out += `<main><div id="SourceInput" class="input-container svelte-1gonf4x" style="padding-top: 10px"><label for="source-input">Source:</label> <input id="source-input" type="text"${attr("value", source)} placeholder="Enter source..." class="source-input svelte-1gonf4x"></div> <div class="wrapper svelte-1gonf4x" id="QuestionContainer"><div><h1 style="font-size: 32px; font-weight: bold;">Question: ${escape_html(dailyQuestionCount)}</h1></div></div> <div class="input-container svelte-1gonf4x"><label for="source-input">Notes:</label> <input type="text"${attr("value", currentNotes)} placeholder="Enter notes..." class="source-input svelte-1gonf4x" id="notes-input"></div> <div id="Scoreboard" class="scoreboard svelte-1gonf4x"><button class="counter-box correct svelte-1gonf4x" style="flex-grow: 10"><h2>Correct (Enter)</h2> <p>${escape_html(visibleCorrectCount)}</p></button> <button class="counter-box incorrect svelte-1gonf4x" style="flex-grow: 10"><h2>Incorrect (Shift+Enter)</h2> <p>${escape_html(visibleIncorrectCount)}</p></button> <button class="counter-box undo svelte-1gonf4x" style="flex-grow: 1"><h2>Undo (Cmd+z)</h2></button></div> <div style="display: flex; padding-left: 10px; padding-right: 10px">`;
  Progressbar($$payload, {
    progress: visiblePercentCorrect,
    animate: true,
    precision: 0,
    labelInside: true,
    tweenDuration: 500,
    easing: sineOut,
    size: "h-6",
    labelInsideClass: "bg-green-600 text-green-100 text-base font-medium text-center p-1 leading-none rounded-full",
    class: "mb-8"
  });
  $$payload.out += `<!----></div> <div class="date-navigation svelte-1gonf4x">`;
  Button($$payload, {
    color: "blue",
    onclick: goToPreviousDay,
    children: ($$payload2) => {
      $$payload2.out += `<!---->&lt; Previous Day`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> <div class="current-date svelte-1gonf4x">`;
  Button($$payload, {
    color: "alternative",
    onclick: goToToday,
    children: ($$payload2) => {
      $$payload2.out += `<!---->${escape_html(formatDate2(currentDate))}`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> `;
  Button($$payload, {
    color: "blue",
    onclick: goToNextDay,
    disabled: isToday(currentDate),
    children: ($$payload2) => {
      $$payload2.out += `<!---->Next Day >`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> `;
  if (filteredHistory.length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="filtered-stats svelte-1gonf4x"><p>${escape_html(filteredHistory.length)} questions on ${escape_html(formatDate2(currentDate))}: <span class="correct-stat svelte-1gonf4x">${escape_html(visibleCorrectCount)}</span> / <span class="incorrect-stat svelte-1gonf4x">${escape_html(visibleIncorrectCount)}</span> (${escape_html(visiblePercentCorrect)}%)</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="filtered-stats empty svelte-1gonf4x"><p>No entries found for ${escape_html(formatDate2(currentDate))}</p></div>`;
  }
  $$payload.out += `<!--]--> <div class="history-table svelte-1gonf4x"><table class="svelte-1gonf4x"><thead><tr class="svelte-1gonf4x"><th class="svelte-1gonf4x">#</th><th class="svelte-1gonf4x">${escape_html(visiblePercentCorrect)}%</th><th class="svelte-1gonf4x">${escape_html(calculateAverageTimeDifference(filteredHistory))}</th><th class="svelte-1gonf4x">Notes</th><th class="svelte-1gonf4x">Source</th></tr></thead><tbody><!--[-->`;
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let item = each_array[index];
    $$payload.out += `<tr class="svelte-1gonf4x"><td class="svelte-1gonf4x">${escape_html(index + 1)}</td><td class="svelte-1gonf4x">${escape_html(item.result)}</td><td class="svelte-1gonf4x">${escape_html(item.timeDifference)}</td><td class="svelte-1gonf4x"><textarea class="svelte-1gonf4x">`;
    const $$body = escape_html(item.notes);
    if ($$body) {
      $$payload.out += `${$$body}`;
    }
    $$payload.out += `</textarea></td><td class="svelte-1gonf4x">${escape_html(item.source || "")}</td></tr>`;
  }
  $$payload.out += `<!--]-->`;
  if (filteredHistory.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<tr class="svelte-1gonf4x"><td colspan="5" class="empty-message svelte-1gonf4x">No entries for this date.</td></tr>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></tbody></table></div> <div class="wrapper svelte-1gonf4x">`;
  if (history.length > 0) {
    $$payload.out += "<!--[-->";
    Button($$payload, {
      color: "red",
      onclick: resetCounts,
      children: ($$payload2) => {
        $$payload2.out += `<!---->Reset`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> `;
    if (csvLoaded) {
      $$payload.out += "<!--[-->";
      Button($$payload, {
        color: "light",
        onclick: exportCSV,
        children: ($$payload2) => {
          $$payload2.out += `<!---->Export`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    Button($$payload, {
      color: "purple",
      onclick: importCSV,
      children: ($$payload2) => {
        $$payload2.out += `<!---->Import CSV`;
      },
      $$slots: { default: true }
    });
  }
  $$payload.out += `<!--]--></div> <div class="wrapper svelte-1gonf4x">Total Questions Done: ${escape_html(history.length)}</div> <div class="wrapper svelte-1gonf4x">Percent Correct: ${escape_html(percentCorrect)}%</div> <div class="h-[300px] p-4 border rounded">`;
  AreaChart($$payload, {
    data: lastSevenDaysData(),
    x: "date",
    y: "count",
    points: true,
    labels: { offset: 10 }
  });
  $$payload.out += `<!----></div> <div class="h-[300px] p-4 border rounded resize overflow-auto">`;
  PieChart($$payload, {
    data: dataSummary(),
    key: "correctness",
    value: "value"
  });
  $$payload.out += `<!----></div> <h1 class="text-3xl font-bold underline">Hello world!</h1></main>`;
  pop();
}
export {
  _page as default
};
