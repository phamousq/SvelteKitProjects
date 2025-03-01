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
		client: {"start":"_app/immutable/entry/start.Q3bgptjV.js","app":"_app/immutable/entry/app.BXcBT4UU.js","imports":["_app/immutable/entry/start.Q3bgptjV.js","_app/immutable/chunks/entry.uHSwiC3z.js","_app/immutable/chunks/runtime.DJMXGEip.js","_app/immutable/chunks/index.DkAyA3j8.js","_app/immutable/chunks/utils.BFXNdIWR.js","_app/immutable/entry/app.BXcBT4UU.js","_app/immutable/chunks/runtime.DJMXGEip.js","_app/immutable/chunks/render.BykzWnoZ.js","_app/immutable/chunks/utils.C3zNWYze.js","_app/immutable/chunks/template.Zwttk-xh.js","_app/immutable/chunks/disclose-version.Bg9kRutz.js","_app/immutable/chunks/if.DyLolnHQ.js","_app/immutable/chunks/proxy.BQXmlXEo.js","_app/immutable/chunks/this.DFivyEz7.js","_app/immutable/chunks/props.DI7cCwgF.js","_app/immutable/chunks/store.DGxUpW5l.js","_app/immutable/chunks/utils.BFXNdIWR.js","_app/immutable/chunks/index-client.B_2xFVko.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
