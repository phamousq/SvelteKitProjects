export const index = 8;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/pages/projects/_page.svelte.js')).default);
export const imports = [
	'_app/immutable/nodes/8.f45wfn33.js',
	'_app/immutable/chunks/Bg9kRutz.js',
	'_app/immutable/chunks/Dpq0jPEp.js',
	'_app/immutable/chunks/BssDwz4v.js',
	'_app/immutable/chunks/BGmShivw.js',
	'_app/immutable/chunks/D2f60b4c.js',
	'_app/immutable/chunks/NpBzvKFW.js',
	'_app/immutable/chunks/BcT-c-Gn.js',
	'_app/immutable/chunks/CN83entu.js',
	'_app/immutable/chunks/Cz5YIeOj.js'
];
export const stylesheets = ['_app/immutable/assets/8.CE7LGu8I.css'];
export const fonts = [];
