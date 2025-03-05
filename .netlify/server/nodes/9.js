export const index = 9;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/pages/qbank/_page.svelte.js')).default);
export const imports = [
	'_app/immutable/nodes/9.B_inXaNT.js',
	'_app/immutable/chunks/Bg9kRutz.js',
	'_app/immutable/chunks/Dpq0jPEp.js',
	'_app/immutable/chunks/BssDwz4v.js',
	'_app/immutable/chunks/BGmShivw.js',
	'_app/immutable/chunks/D2f60b4c.js',
	'_app/immutable/chunks/NpBzvKFW.js',
	'_app/immutable/chunks/Bsz5GWQd.js',
	'_app/immutable/chunks/BcT-c-Gn.js',
	'_app/immutable/chunks/CN83entu.js',
	'_app/immutable/chunks/AxV9dbPV.js',
	'_app/immutable/chunks/IiMLUllt.js'
];
export const stylesheets = ['_app/immutable/assets/9.Bbcn6nGe.css'];
export const fonts = [];
