import { $ as noop, a9 as sanitize_props, aa as rest_props, a2 as fallback, ab as spread_attributes, Z as escape_html, ac as clsx, Y as attr, _ as stringify, a4 as store_get, a6 as unsubscribe_stores, a7 as bind_props, T as pop, Q as push, V as ensure_array_like } from "../../../chunks/index.js";
import { w as writable } from "../../../chunks/index3.js";
import "clsx";
import { twMerge } from "tailwind-merge";
/* empty css                                                  */
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
function linear(t) {
  return t;
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function sineOut(t) {
  return Math.sin(t * Math.PI / 2);
}
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
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
      easing = linear,
      interpolate = get_interpolator
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
        fn = interpolate(
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
      }
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
function _page($$payload, $$props) {
  push();
  let correctCount = 0;
  let incorrectCount = 0;
  let countComplete = correctCount + incorrectCount;
  let percentCorrect = isNaN(+(correctCount / countComplete * 100).toFixed(1)) ? 100 : (correctCount / countComplete * 100).toFixed(1);
  let history = [];
  let source = "";
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
  function formatDate(date) {
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
  function calculateAverageTimeDifference(items = filteredHistory) {
    if (items.length === 0) return "0s";
    const totalMilliseconds = items.reduce(
      (sum, item) => {
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
        return sum + (minutes * 60 + seconds) * 1e3;
      },
      0
    );
    const averageMilliseconds = totalMilliseconds / items.length;
    return formatTimeDifference(averageMilliseconds);
  }
  const lastSevenDaysData = () => {
    const days = [];
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dailyHistory = filterHistoryByDate(history, date);
      days.push({
        date,
        count: dailyHistory.length,
        label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      });
    }
    Object.fromEntries(days.map((x) => [x.label, x.count]));
    return days;
  };
  const each_array = ensure_array_like(filteredHistory);
  const each_array_1 = ensure_array_like(lastSevenDaysData().reverse());
  $$payload.out += `<main><div class="source-input-container svelte-szy1xe" style="padding-top: 10px"><label for="source-input">Source:</label> <input id="source-input" type="text"${attr("value", source)} placeholder="Enter source..." class="source-input svelte-szy1xe"></div> <div class="wrapper svelte-szy1xe"><div><h1 style="font-size: 32px; font-weight: bold;">Question: ${escape_html(dailyQuestionCount)}</h1></div></div> <div class="scoreboard svelte-szy1xe"><button class="counter-box correct svelte-szy1xe" style="flex-grow: 10"><h2>Correct</h2> <p>${escape_html(visibleCorrectCount)}</p></button> <button class="counter-box incorrect svelte-szy1xe" style="flex-grow: 10"><h2>Incorrect</h2> <p>${escape_html(visibleIncorrectCount)}</p></button> <button class="counter-box undo svelte-szy1xe" style="flex-grow: 1"><h2>Undo</h2></button></div> <div style="display: flex; padding-left: 10px; padding-right: 10px">`;
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
  $$payload.out += `<!----></div> <div class="date-navigation svelte-szy1xe"><button class="date-nav-button svelte-szy1xe">&lt; Previous Day</button> <div class="current-date svelte-szy1xe"><button>${escape_html(formatDate(currentDate))}</button></div> <button class="date-nav-button svelte-szy1xe"${attr("disabled", isToday(currentDate), true)}>Next Day ></button></div> `;
  if (filteredHistory.length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="filtered-stats svelte-szy1xe"><p>${escape_html(filteredHistory.length)} questions on ${escape_html(formatDate(currentDate))}: <span class="correct-stat svelte-szy1xe">${escape_html(visibleCorrectCount)}</span> / <span class="incorrect-stat svelte-szy1xe">${escape_html(visibleIncorrectCount)}</span> (${escape_html(visiblePercentCorrect)}%)</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="filtered-stats empty svelte-szy1xe"><p>No entries found for ${escape_html(formatDate(currentDate))}</p></div>`;
  }
  $$payload.out += `<!--]--> <div class="history-table svelte-szy1xe"><table class="svelte-szy1xe"><thead><tr class="svelte-szy1xe"><th class="svelte-szy1xe">#</th><th class="svelte-szy1xe">${escape_html(visiblePercentCorrect)}%</th><th class="svelte-szy1xe">${escape_html(calculateAverageTimeDifference(filteredHistory))}</th><th class="svelte-szy1xe">Notes</th><th class="svelte-szy1xe">Source</th></tr></thead><tbody><!--[-->`;
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let item = each_array[index];
    $$payload.out += `<tr class="svelte-szy1xe"><td class="svelte-szy1xe">${escape_html(index + 1)}</td><td class="svelte-szy1xe">${escape_html(item.result)}</td><td class="svelte-szy1xe">${escape_html(item.timeDifference)}</td><td class="svelte-szy1xe"><textarea class="svelte-szy1xe">`;
    const $$body = escape_html(item.notes);
    if ($$body) {
      $$payload.out += `${$$body}`;
    }
    $$payload.out += `</textarea></td><td class="svelte-szy1xe">${escape_html(item.source || "")}</td></tr>`;
  }
  $$payload.out += `<!--]-->`;
  if (filteredHistory.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<tr class="svelte-szy1xe"><td colspan="5" class="empty-message svelte-szy1xe">No entries for this date.</td></tr>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></tbody></table></div> <div class="wrapper svelte-szy1xe">`;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button class="import-button svelte-szy1xe">Import CSV</button> `;
    if (history.length > 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button class="export-button svelte-szy1xe">Export CSV</button>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div> <div class="wrapper svelte-szy1xe">Total Questions Done: ${escape_html(history.length)}</div> <div class="wrapper svelte-szy1xe">Percent Correct: ${escape_html(percentCorrect)}%</div> <div class="wrapper svelte-szy1xe"><h3>Last 7 Days:</h3> <ul><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let day = each_array_1[$$index_1];
    $$payload.out += `<li>${escape_html(day.label)}: ${escape_html(day.count)}</li>`;
  }
  $$payload.out += `<!--]--></ul></div></main>`;
  pop();
}
export {
  _page as default
};
