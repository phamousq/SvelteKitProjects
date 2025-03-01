export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.BDN0Y26o.js",app:"_app/immutable/entry/app.BdT_0TKY.js",imports:["_app/immutable/entry/start.BDN0Y26o.js","_app/immutable/chunks/B3HzTrlJ.js","_app/immutable/chunks/ElgziEz4.js","_app/immutable/chunks/UpVIQojP.js","_app/immutable/chunks/DWpa_j7_.js","_app/immutable/entry/app.BdT_0TKY.js","_app/immutable/chunks/ElgziEz4.js","_app/immutable/chunks/DS91B4iN.js","_app/immutable/chunks/DjjeMIaw.js","_app/immutable/chunks/waHtgrzP.js","_app/immutable/chunks/Bg9kRutz.js","_app/immutable/chunks/D0FFFCxD.js","_app/immutable/chunks/DzMkccrD.js","_app/immutable/chunks/DrQwjIDV.js","_app/immutable/chunks/BhGB-oJm.js","_app/immutable/chunks/UpVIQojP.js","_app/immutable/chunks/DWpa_j7_.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/routes",
				pattern: /^\/api\/routes\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/routes/_server.ts.js'))
			},
			{
				id: "/counter",
				pattern: /^\/counter\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/farenheight2celcius",
				pattern: /^\/farenheight2celcius\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/flight-booker",
				pattern: /^\/flight-booker\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/layers",
				pattern: /^\/layers\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/projects",
				pattern: /^\/projects\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/qbank-companion",
				pattern: /^\/qbank-companion\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/qbank",
				pattern: /^\/qbank\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/test",
				pattern: /^\/test\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/timer",
				pattern: /^\/timer\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
