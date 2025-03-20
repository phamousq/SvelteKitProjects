import "clsx";
import { enablePatches, setAutoFreeze } from "immer";
import { r as readable, w as writable } from "./index3.js";
import { browser } from "@layerstack/utils/env";
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
