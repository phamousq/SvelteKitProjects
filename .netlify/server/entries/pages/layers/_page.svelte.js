import "clsx";
import { Q as push, X as fallback, a6 as getContext, ag as add_styles, a4 as attr, aa as store_get, Z as slot, a7 as escape_html, ad as stringify, ab as unsubscribe_stores, a0 as bind_props, T as pop, ac as ensure_array_like, ah as to_class } from "../../../chunks/index.js";
import { L as LayerCake } from "../../../chunks/ScaledSvg.svelte_svelte_type_style_lang.js";
import { B as Button } from "../../../chunks/Button2.js";
import "@layerstack/tailwind";
import "@layerstack/utils/format";
import "@layerstack/utils/locale";
import "@layerstack/utils";
import "../../../chunks/TextField.svelte_svelte_type_style_lang.js";
import "@layerstack/utils/env";
import "@layerstack/utils/object";
import "@layerstack/utils/serialize";
import "@layerstack/utils/rollup";
import "@layerstack/utils/date";
import "@layerstack/utils/dateRange";
import "@layerstack/utils/number";
import "@layerstack/utils/routing";
import "@layerstack/utils/array";
function Svg($$payload, $$props) {
  push();
  var $$store_subs;
  let element = fallback($$props["element"], void 0);
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
  slot($$payload, $$props, "default", { element }, null);
  $$payload.out += `<!----></g></svg>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    element,
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
