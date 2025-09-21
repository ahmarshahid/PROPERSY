(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/FRONTEND_interent_edge-wrapper_e5fde8d9.js",
"[project]/FRONTEND/interent/edge-wrapper.js { MODULE => \"[project]/FRONTEND/interent/node_modules/next/dist/esm/build/templates/edge-app-route.js { INNER_ROUTE_ENTRY => \\\"[project]/FRONTEND/interent/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => \\\\\\\"[project]/FRONTEND/interent/app/api/n8n-proxy/route.ts [app-edge-route] (ecmascript)\\\\\\\" } [app-edge-route] (ecmascript)\\\" } [app-edge-route] (ecmascript)\" } [app-edge-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

self._ENTRIES ||= {};
const modProm = Promise.resolve().then(()=>__turbopack_context__.i('[project]/FRONTEND/interent/node_modules/next/dist/esm/build/templates/edge-app-route.js { INNER_ROUTE_ENTRY => "[project]/FRONTEND/interent/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => \\"[project]/FRONTEND/interent/app/api/n8n-proxy/route.ts [app-edge-route] (ecmascript)\\" } [app-edge-route] (ecmascript)" } [app-edge-route] (ecmascript)'));
modProm.catch(()=>{});
self._ENTRIES["middleware_app/api/n8n-proxy/route"] = new Proxy(modProm, {
    get (modProm, name) {
        if (name === "then") {
            return (res, rej)=>modProm.then(res, rej);
        }
        let result = (...args)=>modProm.then((mod)=>(0, mod[name])(...args));
        result.then = (res, rej)=>modProm.then((mod)=>mod[name]).then(res, rej);
        return result;
    }
});
}),
]);

//# sourceMappingURL=FRONTEND_interent_edge-wrapper_e5fde8d9.js.map