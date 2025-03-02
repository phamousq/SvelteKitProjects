import { X as fallback, aj as store_set, S as setContext, a8 as store_get, ae as add_styles, _ as slot, a9 as unsubscribe_stores, Z as bind_props, T as pop, Q as push } from "./index.js";
import { w as writable, d as derived, r as readable } from "./index3.js";
import { InternSet, ascending } from "d3-array";
import { scaleLinear, scaleSqrt } from "d3-scale";
import { rgb } from "d3-color";
import "clsx";
import { enablePatches, setAutoFreeze } from "immer";
import { browser } from "@layerstack/utils/env";
function canBeZero(val) {
  if (val === 0) {
    return true;
  }
  return val;
}
function makeAccessor(acc) {
  if (!canBeZero(acc)) return null;
  if (Array.isArray(acc)) {
    return (d) => acc.map((k) => {
      return typeof k !== "function" ? d[k] : k(d);
    });
  } else if (typeof acc !== "function") {
    return (d) => d[acc];
  }
  return acc;
}
function filterObject(obj, comparisonObj = {}) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => {
      return value !== void 0 && comparisonObj[key] === void 0;
    })
  );
}
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
function calcUniques(data, fields, sortOptions = {}) {
  if (!Array.isArray(data)) {
    throw new TypeError(
      `The first argument of calcUniques() must be an array. You passed in a ${typeof data}. If you got this error using the <LayerCake> component, consider passing a flat array to the \`flatData\` prop. More info: https://layercake.graphics/guide/#flatdata`
    );
  }
  if (Array.isArray(fields) || fields === void 0 || fields === null) {
    throw new TypeError(
      "The second argument of calcUniques() must be an object with field names as keys as accessor functions as values."
    );
  }
  const uniques = {};
  const keys = Object.keys(fields);
  const kl = keys.length;
  let i;
  let j;
  let k;
  let s;
  let acc;
  let val;
  let set;
  const dl = data.length;
  for (i = 0; i < kl; i += 1) {
    set = new InternSet();
    s = keys[i];
    acc = fields[s];
    for (j = 0; j < dl; j += 1) {
      val = acc(data[j]);
      if (Array.isArray(val)) {
        const vl = val.length;
        for (k = 0; k < vl; k += 1) {
          set.add(val[k]);
        }
      } else {
        set.add(val);
      }
    }
    const results = Array.from(set);
    if (sortOptions.sort === true || sortOptions[s] === true) {
      results.sort(ascending);
    }
    uniques[s] = results;
  }
  return uniques;
}
function calcExtents(data, fields) {
  if (!Array.isArray(data)) {
    throw new TypeError(
      `The first argument of calcExtents() must be an array. You passed in a ${typeof data}. If you got this error using the <LayerCake> component, consider passing a flat array to the \`flatData\` prop. More info: https://layercake.graphics/guide/#flatdata`
    );
  }
  if (Array.isArray(fields) || fields === void 0 || fields === null) {
    throw new TypeError(
      "The second argument of calcExtents() must be an object with field names as keys as accessor functions as values."
    );
  }
  const extents = {};
  const keys = Object.keys(fields);
  const kl = keys.length;
  let i;
  let j;
  let k;
  let s;
  let min;
  let max;
  let acc;
  let val;
  const dl = data.length;
  for (i = 0; i < kl; i += 1) {
    s = keys[i];
    acc = fields[s];
    min = null;
    max = null;
    for (j = 0; j < dl; j += 1) {
      val = acc(data[j], j);
      if (Array.isArray(val)) {
        const vl = val.length;
        for (k = 0; k < vl; k += 1) {
          if (val[k] !== false && val[k] !== void 0 && val[k] !== null && Number.isNaN(val[k]) === false) {
            if (min === null || val[k] < min) {
              min = val[k];
            }
            if (max === null || val[k] > max) {
              max = val[k];
            }
          }
        }
      } else if (val !== false && val !== void 0 && val !== null && Number.isNaN(val) === false) {
        if (min === null || val < min) {
          min = val;
        }
        if (max === null || val > max) {
          max = val;
        }
      }
    }
    extents[s] = [min, max];
  }
  return extents;
}
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((k) => {
    return arr2.includes(k);
  });
}
function isOrdinalDomain(scale) {
  if (typeof scale.bandwidth === "function") {
    return true;
  }
  if (arraysEqual(Object.keys(scale), ["domain", "range", "unknown", "copy"])) {
    return true;
  }
  return false;
}
function calcScaleExtents(flatData, getters, activeScales) {
  const scaleGroups = Object.entries(activeScales).reduce(
    (groups, [k, scaleInfo]) => {
      const domainType = isOrdinalDomain(scaleInfo.scale) === true ? "ordinal" : "other";
      if (!groups[domainType]) groups[domainType] = {};
      groups[domainType][k] = getters[k];
      return groups;
    },
    { ordinal: false, other: false }
  );
  let extents = {};
  if (scaleGroups.ordinal) {
    const sortOptions = Object.fromEntries(
      Object.entries(activeScales).map(([k, scaleInfo]) => {
        return [k, scaleInfo.sort];
      })
    );
    extents = calcUniques(flatData, scaleGroups.ordinal, sortOptions);
  }
  if (scaleGroups.other) {
    extents = { ...extents, ...calcExtents(flatData, scaleGroups.other) };
  }
  return extents;
}
function partialDomain(domain = [], directive) {
  if (Array.isArray(directive) === true) {
    return directive.map((d, i) => {
      if (d === null) {
        return domain[i];
      }
      return d;
    });
  }
  return domain;
}
function calcDomain(s) {
  return function domainCalc([$extents, $domain]) {
    if (typeof $domain === "function") {
      $domain = $domain($extents[s]);
    }
    return $extents ? partialDomain($extents[s], $domain) : $domain;
  };
}
const defaultScales = {
  x: scaleLinear,
  y: scaleLinear,
  z: scaleLinear,
  r: scaleSqrt
};
function findScaleType(scale) {
  if (scale.constant) {
    return "symlog";
  }
  if (scale.base) {
    return "log";
  }
  if (scale.exponent) {
    if (scale.exponent() === 0.5) {
      return "sqrt";
    }
    return "pow";
  }
  return "other";
}
function identity(d) {
  return d;
}
function log(sign) {
  return (x) => Math.log(sign * x);
}
function exp(sign) {
  return (x) => sign * Math.exp(x);
}
function symlog(c) {
  return (x) => Math.sign(x) * Math.log1p(Math.abs(x / c));
}
function symexp(c) {
  return (x) => Math.sign(x) * Math.expm1(Math.abs(x)) * c;
}
function pow(exponent) {
  return function powFn(x) {
    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
  };
}
function getPadFunctions(scale) {
  const scaleType = findScaleType(scale);
  if (scaleType === "log") {
    const sign = Math.sign(scale.domain()[0]);
    return { lift: log(sign), ground: exp(sign), scaleType };
  }
  if (scaleType === "pow") {
    const exponent = 1;
    return { lift: pow(exponent), ground: pow(1 / exponent), scaleType };
  }
  if (scaleType === "sqrt") {
    const exponent = 0.5;
    return { lift: pow(exponent), ground: pow(1 / exponent), scaleType };
  }
  if (scaleType === "symlog") {
    const constant = 1;
    return { lift: symlog(constant), ground: symexp(constant), scaleType };
  }
  return { lift: identity, ground: identity, scaleType };
}
function toTitleCase(str) {
  return str.replace(/^\w/, (d) => d.toUpperCase());
}
function f(name, modifier = "") {
  return `scale${toTitleCase(modifier)}${toTitleCase(name)}`;
}
function findScaleName(scale) {
  if (typeof scale.bandwidth === "function") {
    if (typeof scale.paddingInner === "function") {
      return f("band");
    }
    return f("point");
  }
  if (arraysEqual(Object.keys(scale), ["domain", "range", "unknown", "copy"])) {
    return f("ordinal");
  }
  let modifier = "";
  if (scale.interpolator) {
    if (scale.domain().length === 3) {
      modifier = "diverging";
    } else {
      modifier = "sequential";
    }
  }
  if (scale.quantiles) {
    return f("quantile", modifier);
  }
  if (scale.thresholds) {
    return f("quantize", modifier);
  }
  if (scale.constant) {
    return f("symlog", modifier);
  }
  if (scale.base) {
    return f("log", modifier);
  }
  if (scale.exponent) {
    if (scale.exponent() === 0.5) {
      return f("sqrt", modifier);
    }
    return f("pow", modifier);
  }
  if (arraysEqual(Object.keys(scale), ["domain", "range", "invertExtent", "unknown", "copy"])) {
    return f("threshold");
  }
  if (arraysEqual(Object.keys(scale), [
    "invert",
    "range",
    "domain",
    "unknown",
    "copy",
    "ticks",
    "tickFormat",
    "nice"
  ])) {
    return f("identity");
  }
  if (arraysEqual(Object.keys(scale), [
    "invert",
    "domain",
    "range",
    "rangeRound",
    "round",
    "clamp",
    "unknown",
    "copy",
    "ticks",
    "tickFormat",
    "nice"
  ])) {
    return f("radial");
  }
  if (modifier) {
    return f(modifier);
  }
  if (scale.domain()[0] instanceof Date) {
    const d = /* @__PURE__ */ new Date();
    let s;
    d.getDay = () => s = "time";
    d.getUTCDay = () => s = "utc";
    scale.tickFormat(0, "%a")(d);
    return f(s);
  }
  return f("linear");
}
const unpaddable = ["scaleThreshold", "scaleQuantile", "scaleQuantize", "scaleSequentialQuantile"];
function padScale(scale, padding) {
  if (typeof scale.range !== "function") {
    throw new Error("Scale method `range` must be a function");
  }
  if (typeof scale.domain !== "function") {
    throw new Error("Scale method `domain` must be a function");
  }
  if (!Array.isArray(padding) || unpaddable.includes(findScaleName(scale))) {
    return scale.domain();
  }
  if (isOrdinalDomain(scale) === true) {
    return scale.domain();
  }
  const { lift, ground } = getPadFunctions(scale);
  const d0 = scale.domain()[0];
  const isTime = Object.prototype.toString.call(d0) === "[object Date]";
  const [d1, d2] = scale.domain().map((d) => {
    return isTime ? lift(d.getTime()) : lift(d);
  });
  const [r1, r2] = scale.range();
  const paddingLeft = padding[0] || 0;
  const paddingRight = padding[1] || 0;
  const step = (d2 - d1) / (Math.abs(r2 - r1) - paddingLeft - paddingRight);
  return [d1 - paddingLeft * step, paddingRight * step + d2].map((d) => {
    return isTime ? ground(new Date(d)) : ground(d);
  });
}
function calcBaseRange(s, width, height, reverse, percentRange) {
  let min;
  let max;
  if (percentRange === true) {
    min = 0;
    max = 100;
  } else {
    min = s === "r" ? 1 : 0;
    max = s === "y" ? height : s === "r" ? 25 : width;
  }
  return reverse === true ? [max, min] : [min, max];
}
function getDefaultRange(s, width, height, reverse, range, percentRange) {
  return !range ? calcBaseRange(s, width, height, reverse, percentRange) : typeof range === "function" ? range({ width, height }) : range;
}
function createScale(s) {
  return function scaleCreator([
    $scale,
    $extents,
    $domain,
    $padding,
    $nice,
    $reverse,
    $width,
    $height,
    $range,
    $percentScale
  ]) {
    if ($extents === null) {
      return null;
    }
    const defaultRange = getDefaultRange(s, $width, $height, $reverse, $range, $percentScale);
    const scale = $scale === defaultScales[s] ? $scale() : $scale.copy();
    scale.domain($domain);
    if (!scale.interpolator || typeof scale.interpolator === "function" && scale.interpolator().name.startsWith("identity")) {
      scale.range(defaultRange);
    }
    if ($padding) {
      scale.domain(padScale(scale, $padding));
    }
    if ($nice === true || typeof $nice === "number") {
      if (typeof scale.nice === "function") {
        scale.nice(typeof $nice === "number" ? $nice : void 0);
      } else {
        console.error(
          `[Layer Cake] You set \`${s}Nice: true\` but the ${s}Scale does not have a \`.nice\` method. Ignoring...`
        );
      }
    }
    return scale;
  };
}
function createGetter([$acc, $scale]) {
  return (d, i) => {
    const val = $acc(d, i);
    if (Array.isArray(val)) {
      return val.map((v) => $scale(v));
    }
    return $scale(val);
  };
}
function getRange([$scale]) {
  if (typeof $scale === "function") {
    if (typeof $scale.range === "function") {
      return $scale.range();
    }
    console.error("[LayerCake] Your scale doesn't have a `.range` method?");
  }
  return null;
}
const indent = "    ";
function getRgb(clr) {
  const { r, g, b, opacity: o } = rgb(clr);
  if (![r, g, b].every((c) => c >= 0 && c <= 255)) {
    return false;
  }
  return { r, g, b, o };
}
function contrast({ r, g, b }) {
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.6 ? "black" : "white";
}
function printDebug(obj) {
  console.log("/********* LayerCake Debug ************/");
  console.log("Bounding box:");
  printObject(obj.boundingBox);
  console.log("Data:");
  console.log(indent, obj.data);
  if (obj.flatData) {
    console.log("flatData:");
    console.log(indent, obj.flatData);
  }
  console.log("Scales:");
  Object.keys(obj.activeGetters).forEach((g) => {
    printScale(g, obj[`${g}Scale`], obj[g]);
  });
  console.log("/************ End LayerCake Debug ***************/\n");
}
function printObject(obj) {
  Object.entries(obj).forEach(([key, value]) => {
    console.log(`${indent}${key}:`, value);
  });
}
function printScale(s, scale, acc) {
  const scaleName = findScaleName(scale);
  console.log(`${indent}${s}:`);
  console.log(`${indent}${indent}Accessor: "${acc.toString()}"`);
  console.log(`${indent}${indent}Type: ${scaleName}`);
  printValues(scale, "domain");
  printValues(scale, "range", " ");
}
function printValues(scale, method, extraSpace = "") {
  const values = scale[method]();
  const colorValues = colorizeArray(values);
  if (colorValues) {
    printColorArray(colorValues, method, values);
  } else {
    console.log(`${indent}${indent}${toTitleCase(method)}:${extraSpace}`, values);
  }
}
function printColorArray(colorValues, method, values) {
  console.log(
    `${indent}${indent}${toTitleCase(method)}:    %cArray%c(${values.length}) ` + colorValues[0] + "%c ]",
    "color: #1377e4",
    "color: #737373",
    "color: #1478e4",
    ...colorValues[1],
    "color: #1478e4"
  );
}
function colorizeArray(arr) {
  const colors = [];
  const a = arr.map((d, i) => {
    const rgbo = getRgb(d);
    if (rgbo !== false) {
      colors.push(rgbo);
      const space = i === arr.length - 1 ? " " : "";
      return `%c ${d}${space}`;
    }
    return d;
  });
  if (colors.length) {
    return [
      `%c[ ${a.join(", ")}`,
      colors.map(
        (d) => `background-color: rgba(${d.r}, ${d.g}, ${d.b}, ${d.o}); color:${contrast(d)};`
      )
    ];
  }
  return null;
}
function LayerCake($$payload, $$props) {
  push();
  var $$store_subs;
  let yReverseValue, context;
  const printDebug_debounced = debounce(printDebug, 200);
  let ssr = fallback($$props["ssr"], false);
  let pointerEvents = fallback($$props["pointerEvents"], true);
  let position = fallback($$props["position"], "relative");
  let percentRange = fallback($$props["percentRange"], false);
  let width = fallback($$props["width"], void 0);
  let height = fallback($$props["height"], void 0);
  let containerWidth = fallback($$props["containerWidth"], width || 100);
  let containerHeight = fallback($$props["containerHeight"], height || 100);
  let element = fallback($$props["element"], void 0);
  let x = fallback($$props["x"], void 0);
  let y = fallback($$props["y"], void 0);
  let z = fallback($$props["z"], void 0);
  let r = fallback($$props["r"], void 0);
  let data = fallback($$props["data"], () => [], true);
  let xDomain = fallback($$props["xDomain"], void 0);
  let yDomain = fallback($$props["yDomain"], void 0);
  let zDomain = fallback($$props["zDomain"], void 0);
  let rDomain = fallback($$props["rDomain"], void 0);
  let xNice = fallback($$props["xNice"], false);
  let yNice = fallback($$props["yNice"], false);
  let zNice = fallback($$props["zNice"], false);
  let rNice = fallback($$props["rNice"], false);
  let xPadding = fallback($$props["xPadding"], void 0);
  let yPadding = fallback($$props["yPadding"], void 0);
  let zPadding = fallback($$props["zPadding"], void 0);
  let rPadding = fallback($$props["rPadding"], void 0);
  let xScale = fallback($$props["xScale"], () => defaultScales.x, true);
  let yScale = fallback($$props["yScale"], () => defaultScales.y, true);
  let zScale = fallback($$props["zScale"], () => defaultScales.z, true);
  let rScale = fallback($$props["rScale"], () => defaultScales.r, true);
  let xRange = fallback($$props["xRange"], void 0);
  let yRange = fallback($$props["yRange"], void 0);
  let zRange = fallback($$props["zRange"], void 0);
  let rRange = fallback($$props["rRange"], void 0);
  let xReverse = fallback($$props["xReverse"], false);
  let yReverse = fallback($$props["yReverse"], void 0);
  let zReverse = fallback($$props["zReverse"], false);
  let rReverse = fallback($$props["rReverse"], false);
  let xDomainSort = fallback($$props["xDomainSort"], true);
  let yDomainSort = fallback($$props["yDomainSort"], true);
  let zDomainSort = fallback($$props["zDomainSort"], true);
  let rDomainSort = fallback($$props["rDomainSort"], true);
  let padding = fallback($$props["padding"], () => ({}), true);
  let extents = fallback($$props["extents"], () => ({}), true);
  let flatData = fallback($$props["flatData"], void 0);
  let custom = fallback($$props["custom"], () => ({}), true);
  let debug = fallback($$props["debug"], false);
  let verbose = fallback($$props["verbose"], true);
  let isMounted = false;
  const config = {};
  const _percentRange = writable(percentRange);
  const _containerWidth = writable(containerWidth);
  const _containerHeight = writable(containerHeight);
  const _extents = writable(filterObject(extents));
  const _data = writable(data);
  const _flatData = writable(flatData || data);
  const _padding = writable(padding);
  const _x = writable(makeAccessor(x));
  const _y = writable(makeAccessor(y));
  const _z = writable(makeAccessor(z));
  const _r = writable(makeAccessor(r));
  const _xDomain = writable(xDomain);
  const _yDomain = writable(yDomain);
  const _zDomain = writable(zDomain);
  const _rDomain = writable(rDomain);
  const _xNice = writable(xNice);
  const _yNice = writable(yNice);
  const _zNice = writable(zNice);
  const _rNice = writable(rNice);
  const _xReverse = writable(xReverse);
  const _yReverse = writable(yReverseValue);
  const _zReverse = writable(zReverse);
  const _rReverse = writable(rReverse);
  const _xPadding = writable(xPadding);
  const _yPadding = writable(yPadding);
  const _zPadding = writable(zPadding);
  const _rPadding = writable(rPadding);
  const _xRange = writable(xRange);
  const _yRange = writable(yRange);
  const _zRange = writable(zRange);
  const _rRange = writable(rRange);
  const _xScale = writable(xScale);
  const _yScale = writable(yScale);
  const _zScale = writable(zScale);
  const _rScale = writable(rScale);
  const _xDomainSort = writable(xDomainSort);
  const _yDomainSort = writable(yDomainSort);
  const _zDomainSort = writable(zDomainSort);
  const _rDomainSort = writable(rDomainSort);
  const _config = writable(config);
  const _custom = writable(custom);
  const activeGetters_d = derived([_x, _y, _z, _r], ([$x, $y, $z, $r]) => {
    const obj = {};
    if ($x) {
      obj.x = $x;
    }
    if ($y) {
      obj.y = $y;
    }
    if ($z) {
      obj.z = $z;
    }
    if ($r) {
      obj.r = $r;
    }
    return obj;
  });
  const padding_d = derived([_padding, _containerWidth, _containerHeight], ([$padding]) => {
    const defaultPadding = { top: 0, right: 0, bottom: 0, left: 0 };
    return Object.assign(defaultPadding, $padding);
  });
  const box_d = derived([_containerWidth, _containerHeight, padding_d], ([$containerWidth, $containerHeight, $padding]) => {
    const b = {};
    b.top = $padding.top;
    b.right = $containerWidth - $padding.right;
    b.bottom = $containerHeight - $padding.bottom;
    b.left = $padding.left;
    b.width = b.right - b.left;
    b.height = b.bottom - b.top;
    if (verbose === true) {
      if (b.width <= 0 && isMounted === true) ;
      if (b.height <= 0 && isMounted === true) ;
    }
    return b;
  });
  const width_d = derived([box_d], ([$box]) => {
    return $box.width;
  });
  const height_d = derived([box_d], ([$box]) => {
    return $box.height;
  });
  const extents_d = derived(
    [
      _flatData,
      activeGetters_d,
      _extents,
      _xScale,
      _yScale,
      _rScale,
      _zScale,
      _xDomainSort,
      _yDomainSort,
      _zDomainSort,
      _rDomainSort
    ],
    ([
      $flatData,
      $activeGetters,
      $extents,
      $_xScale,
      $_yScale,
      $_rScale,
      $_zScale,
      $_xDomainSort,
      $_yDomainSort,
      $_zDomainSort,
      $_rDomainSort
    ]) => {
      const scaleLookup = {
        x: { scale: $_xScale, sort: $_xDomainSort },
        y: { scale: $_yScale, sort: $_yDomainSort },
        r: { scale: $_rScale, sort: $_rDomainSort },
        z: { scale: $_zScale, sort: $_zDomainSort }
      };
      const getters = filterObject($activeGetters, $extents);
      const activeScales = Object.fromEntries(Object.keys(getters).map((k) => [k, scaleLookup[k]]));
      if (Object.keys(getters).length > 0) {
        const calculatedExtents = calcScaleExtents($flatData, getters, activeScales);
        return { ...calculatedExtents, ...$extents };
      } else {
        return {};
      }
    }
  );
  const xDomain_d = derived([extents_d, _xDomain], calcDomain("x"));
  const yDomain_d = derived([extents_d, _yDomain], calcDomain("y"));
  const zDomain_d = derived([extents_d, _zDomain], calcDomain("z"));
  const rDomain_d = derived([extents_d, _rDomain], calcDomain("r"));
  const xScale_d = derived(
    [
      _xScale,
      extents_d,
      xDomain_d,
      _xPadding,
      _xNice,
      _xReverse,
      width_d,
      height_d,
      _xRange,
      _percentRange
    ],
    createScale("x")
  );
  const xGet_d = derived([_x, xScale_d], createGetter);
  const yScale_d = derived(
    [
      _yScale,
      extents_d,
      yDomain_d,
      _yPadding,
      _yNice,
      _yReverse,
      width_d,
      height_d,
      _yRange,
      _percentRange
    ],
    createScale("y")
  );
  const yGet_d = derived([_y, yScale_d], createGetter);
  const zScale_d = derived(
    [
      _zScale,
      extents_d,
      zDomain_d,
      _zPadding,
      _zNice,
      _zReverse,
      width_d,
      height_d,
      _zRange,
      _percentRange
    ],
    createScale("z")
  );
  const zGet_d = derived([_z, zScale_d], createGetter);
  const rScale_d = derived(
    [
      _rScale,
      extents_d,
      rDomain_d,
      _rPadding,
      _rNice,
      _rReverse,
      width_d,
      height_d,
      _rRange,
      _percentRange
    ],
    createScale("r")
  );
  const rGet_d = derived([_r, rScale_d], createGetter);
  const xDomain_d_possibly_nice = derived(xScale_d, ($xScale_d) => $xScale_d.domain());
  const yDomain_d_possibly_nice = derived(yScale_d, ($yScale_d) => $yScale_d.domain());
  const zDomain_d_possibly_nice = derived(zScale_d, ($zScale_d) => $zScale_d.domain());
  const rDomain_d_possibly_nice = derived(rScale_d, ($rScale_d) => $rScale_d.domain());
  const xRange_d = derived([xScale_d], getRange);
  const yRange_d = derived([yScale_d], getRange);
  const zRange_d = derived([zScale_d], getRange);
  const rRange_d = derived([rScale_d], getRange);
  const aspectRatio_d = derived([width_d, height_d], ([$width, $height]) => {
    return $width / $height;
  });
  yReverseValue = typeof yReverse === "undefined" ? typeof yScale.bandwidth === "function" ? false : true : yReverse;
  if (x) config.x = x;
  if (y) config.y = y;
  if (z) config.z = z;
  if (r) config.r = r;
  if (xDomain) config.xDomain = xDomain;
  if (yDomain) config.yDomain = yDomain;
  if (zDomain) config.zDomain = zDomain;
  if (rDomain) config.rDomain = rDomain;
  if (xRange) config.xRange = xRange;
  if (yRange) config.yRange = yRange;
  if (zRange) config.zRange = zRange;
  if (rRange) config.rRange = rRange;
  store_set(_percentRange, percentRange);
  store_set(_containerWidth, containerWidth);
  store_set(_containerHeight, containerHeight);
  store_set(_extents, filterObject(extents));
  store_set(_data, data);
  store_set(_flatData, flatData || data);
  store_set(_padding, padding);
  store_set(_x, makeAccessor(x));
  store_set(_y, makeAccessor(y));
  store_set(_z, makeAccessor(z));
  store_set(_r, makeAccessor(r));
  store_set(_xDomain, xDomain);
  store_set(_yDomain, yDomain);
  store_set(_zDomain, zDomain);
  store_set(_rDomain, rDomain);
  store_set(_xNice, xNice);
  store_set(_yNice, yNice);
  store_set(_zNice, zNice);
  store_set(_rNice, rNice);
  store_set(_xReverse, xReverse);
  store_set(_yReverse, yReverseValue);
  store_set(_zReverse, zReverse);
  store_set(_rReverse, rReverse);
  store_set(_xPadding, xPadding);
  store_set(_yPadding, yPadding);
  store_set(_zPadding, zPadding);
  store_set(_rPadding, rPadding);
  store_set(_xRange, xRange);
  store_set(_yRange, yRange);
  store_set(_zRange, zRange);
  store_set(_rRange, rRange);
  store_set(_xScale, xScale);
  store_set(_yScale, yScale);
  store_set(_zScale, zScale);
  store_set(_rScale, rScale);
  store_set(_custom, custom);
  store_set(_config, config);
  context = {
    activeGetters: activeGetters_d,
    width: width_d,
    height: height_d,
    percentRange: _percentRange,
    aspectRatio: aspectRatio_d,
    containerWidth: _containerWidth,
    containerHeight: _containerHeight,
    x: _x,
    y: _y,
    z: _z,
    r: _r,
    custom: _custom,
    data: _data,
    xNice: _xNice,
    yNice: _yNice,
    zNice: _zNice,
    rNice: _rNice,
    xDomainSort: _xDomainSort,
    yDomainSort: _yDomainSort,
    zDomainSort: _zDomainSort,
    rDomainSort: _rDomainSort,
    xReverse: _xReverse,
    yReverse: _yReverse,
    zReverse: _zReverse,
    rReverse: _rReverse,
    xPadding: _xPadding,
    yPadding: _yPadding,
    zPadding: _zPadding,
    rPadding: _rPadding,
    padding: padding_d,
    flatData: _flatData,
    extents: extents_d,
    xDomain: xDomain_d_possibly_nice,
    yDomain: yDomain_d_possibly_nice,
    zDomain: zDomain_d_possibly_nice,
    rDomain: rDomain_d_possibly_nice,
    xRange: xRange_d,
    yRange: yRange_d,
    zRange: zRange_d,
    rRange: rRange_d,
    config: _config,
    xScale: xScale_d,
    xGet: xGet_d,
    yScale: yScale_d,
    yGet: yGet_d,
    zScale: zScale_d,
    zGet: zGet_d,
    rScale: rScale_d,
    rGet: rGet_d
  };
  setContext("LayerCake", context);
  if (store_get($$store_subs ??= {}, "$box_d", box_d) && debug === true && (ssr === true || typeof window !== "undefined")) {
    printDebug_debounced({
      data: store_get($$store_subs ??= {}, "$_data", _data),
      flatData: typeof flatData !== "undefined" ? store_get($$store_subs ??= {}, "$_flatData", _flatData) : null,
      boundingBox: store_get($$store_subs ??= {}, "$box_d", box_d),
      activeGetters: store_get($$store_subs ??= {}, "$activeGetters_d", activeGetters_d),
      x: config.x,
      y: config.y,
      z: config.z,
      r: config.r,
      xScale: store_get($$store_subs ??= {}, "$xScale_d", xScale_d),
      yScale: store_get($$store_subs ??= {}, "$yScale_d", yScale_d),
      zScale: store_get($$store_subs ??= {}, "$zScale_d", zScale_d),
      rScale: store_get($$store_subs ??= {}, "$rScale_d", rScale_d)
    });
  }
  if (ssr === true || typeof window !== "undefined") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${add_styles({
      position,
      top: position === "absolute" ? "0" : null,
      right: position === "absolute" ? "0" : null,
      bottom: position === "absolute" ? "0" : null,
      left: position === "absolute" ? "0" : null,
      "pointer-events": pointerEvents === false ? "none" : null
    })} class="layercake-container svelte-vhzpsp"><!---->`;
    slot(
      $$payload,
      $$props,
      "default",
      {
        element,
        width: store_get($$store_subs ??= {}, "$width_d", width_d),
        height: store_get($$store_subs ??= {}, "$height_d", height_d),
        aspectRatio: store_get($$store_subs ??= {}, "$aspectRatio_d", aspectRatio_d),
        containerWidth: store_get($$store_subs ??= {}, "$_containerWidth", _containerWidth),
        containerHeight: store_get($$store_subs ??= {}, "$_containerHeight", _containerHeight),
        activeGetters: store_get($$store_subs ??= {}, "$activeGetters_d", activeGetters_d),
        percentRange: store_get($$store_subs ??= {}, "$_percentRange", _percentRange),
        x: store_get($$store_subs ??= {}, "$_x", _x),
        y: store_get($$store_subs ??= {}, "$_y", _y),
        z: store_get($$store_subs ??= {}, "$_z", _z),
        r: store_get($$store_subs ??= {}, "$_r", _r),
        custom: store_get($$store_subs ??= {}, "$_custom", _custom),
        data: store_get($$store_subs ??= {}, "$_data", _data),
        xNice: store_get($$store_subs ??= {}, "$_xNice", _xNice),
        yNice: store_get($$store_subs ??= {}, "$_yNice", _yNice),
        zNice: store_get($$store_subs ??= {}, "$_zNice", _zNice),
        rNice: store_get($$store_subs ??= {}, "$_rNice", _rNice),
        xDomainSort: store_get($$store_subs ??= {}, "$_xDomainSort", _xDomainSort),
        yDomainSort: store_get($$store_subs ??= {}, "$_yDomainSort", _yDomainSort),
        zDomainSort: store_get($$store_subs ??= {}, "$_zDomainSort", _zDomainSort),
        rDomainSort: store_get($$store_subs ??= {}, "$_rDomainSort", _rDomainSort),
        xReverse: store_get($$store_subs ??= {}, "$_xReverse", _xReverse),
        yReverse: store_get($$store_subs ??= {}, "$_yReverse", _yReverse),
        zReverse: store_get($$store_subs ??= {}, "$_zReverse", _zReverse),
        rReverse: store_get($$store_subs ??= {}, "$_rReverse", _rReverse),
        xPadding: store_get($$store_subs ??= {}, "$_xPadding", _xPadding),
        yPadding: store_get($$store_subs ??= {}, "$_yPadding", _yPadding),
        zPadding: store_get($$store_subs ??= {}, "$_zPadding", _zPadding),
        rPadding: store_get($$store_subs ??= {}, "$_rPadding", _rPadding),
        padding: store_get($$store_subs ??= {}, "$padding_d", padding_d),
        flatData: store_get($$store_subs ??= {}, "$_flatData", _flatData),
        extents: store_get($$store_subs ??= {}, "$extents_d", extents_d),
        xDomain: store_get($$store_subs ??= {}, "$xDomain_d", xDomain_d),
        yDomain: store_get($$store_subs ??= {}, "$yDomain_d", yDomain_d),
        zDomain: store_get($$store_subs ??= {}, "$zDomain_d", zDomain_d),
        rDomain: store_get($$store_subs ??= {}, "$rDomain_d", rDomain_d),
        xRange: store_get($$store_subs ??= {}, "$xRange_d", xRange_d),
        yRange: store_get($$store_subs ??= {}, "$yRange_d", yRange_d),
        zRange: store_get($$store_subs ??= {}, "$zRange_d", zRange_d),
        rRange: store_get($$store_subs ??= {}, "$rRange_d", rRange_d),
        config: store_get($$store_subs ??= {}, "$_config", _config),
        xScale: store_get($$store_subs ??= {}, "$xScale_d", xScale_d),
        xGet: store_get($$store_subs ??= {}, "$xGet_d", xGet_d),
        yScale: store_get($$store_subs ??= {}, "$yScale_d", yScale_d),
        yGet: store_get($$store_subs ??= {}, "$yGet_d", yGet_d),
        zScale: store_get($$store_subs ??= {}, "$zScale_d", zScale_d),
        zGet: store_get($$store_subs ??= {}, "$zGet_d", zGet_d),
        rScale: store_get($$store_subs ??= {}, "$rScale_d", rScale_d),
        rGet: store_get($$store_subs ??= {}, "$rGet_d", rGet_d)
      },
      null
    );
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    ssr,
    pointerEvents,
    position,
    percentRange,
    width,
    height,
    containerWidth,
    containerHeight,
    element,
    x,
    y,
    z,
    r,
    data,
    xDomain,
    yDomain,
    zDomain,
    rDomain,
    xNice,
    yNice,
    zNice,
    rNice,
    xPadding,
    yPadding,
    zPadding,
    rPadding,
    xScale,
    yScale,
    zScale,
    rScale,
    xRange,
    yRange,
    zRange,
    rRange,
    xReverse,
    yReverse,
    zReverse,
    rReverse,
    xDomainSort,
    yDomainSort,
    zDomainSort,
    rDomainSort,
    padding,
    extents,
    flatData,
    custom,
    debug,
    verbose
  });
  pop();
}
enablePatches();
setAutoFreeze(false);
function matchMedia(queryString) {
  if (browser) {
    const query = window.matchMedia(queryString);
    return readable(query.matches, (set) => {
      const listener = (e) => set(e.matches);
      query.addEventListener("change", listener);
      return () => query.removeEventListener("change", listener);
    });
  } else {
    return writable(true);
  }
}
const matchMediaWidth = (width) => matchMedia(`(min-width: ${width}px)`);
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536
};
matchMediaWidth(breakpoints.sm);
matchMediaWidth(breakpoints.md);
matchMediaWidth(breakpoints.lg);
matchMediaWidth(breakpoints.xl);
matchMediaWidth(breakpoints.xxl);
matchMedia(`screen`);
matchMedia(`print`);
matchMedia(`(prefers-color-scheme: dark)`);
matchMedia(`(prefers-color-scheme: light)`);
matchMedia(`(prefers-reduced-motion: reduce)`);
matchMedia(`(orientation: landscape)`);
matchMedia(`(orientation: portrait)`);
export {
  LayerCake as L
};
