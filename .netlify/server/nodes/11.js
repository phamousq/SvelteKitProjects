

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/test/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/11.DnbD32bH.js","_app/immutable/chunks/Bg9kRutz.js"];
export const stylesheets = [];
export const fonts = [];
