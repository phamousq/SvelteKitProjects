import { init } from '../serverless.js';

export const handler = init((() => {
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
		client: {start:"_app/immutable/entry/start.BjpG6gT9.js",app:"_app/immutable/entry/app.Bo6M3rf0.js",imports:["_app/immutable/entry/start.BjpG6gT9.js","_app/immutable/chunks/DIRiyG7j.js","_app/immutable/chunks/BnazEyTV.js","_app/immutable/chunks/BipeiIpp.js","_app/immutable/chunks/CeXdXlz5.js","_app/immutable/entry/app.Bo6M3rf0.js","_app/immutable/chunks/BnazEyTV.js","_app/immutable/chunks/D17CRyhF.js","_app/immutable/chunks/CbHn3HkG.js","_app/immutable/chunks/DbRvPZZN.js","_app/immutable/chunks/Bg9kRutz.js","_app/immutable/chunks/BPirGmvo.js","_app/immutable/chunks/DhYDD0b2.js","_app/immutable/chunks/CupluKUY.js","_app/immutable/chunks/f2E6BF0t.js","_app/immutable/chunks/BipeiIpp.js","_app/immutable/chunks/CeXdXlz5.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js')),
			__memo(() => import('../server/nodes/4.js')),
			__memo(() => import('../server/nodes/5.js')),
			__memo(() => import('../server/nodes/6.js')),
			__memo(() => import('../server/nodes/7.js')),
			__memo(() => import('../server/nodes/8.js')),
			__memo(() => import('../server/nodes/9.js')),
			__memo(() => import('../server/nodes/10.js')),
			__memo(() => import('../server/nodes/11.js')),
			__memo(() => import('../server/nodes/12.js'))
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
				endpoint: __memo(() => import('../server/entries/endpoints/api/routes/_server.ts.js'))
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
})());
