(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__2f2cfe38._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/FRONTEND/interent/app/api/n8n-proxy/route.ts [app-edge-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OPTIONS",
    ()=>OPTIONS,
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/FRONTEND/interent/node_modules/next/dist/esm/api/server.js [app-edge-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FRONTEND/interent/node_modules/next/dist/esm/server/web/exports/index.js [app-edge-route] (ecmascript)");
;
const runtime = "edge"; // 或 "nodejs"；如果需要使用 node 包，可以切换为 "nodejs"
function corsHeaders(extra = {}) {
    return {
        "Access-Control-Allow-Origin": "*",
        ...extra
    };
}
async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        }
    });
}
async function POST(req) {
    const webhook = process.env.N8N_WEBHOOK_URL;
    // 开发阶段打印一下是否读取到了环境变量（生产环境可以删除）
    // 只打印 host，避免完整 URL 被打到日志里
    try {
        const host = webhook ? new URL(webhook).host : "(未定义)";
        // eslint-disable-next-line no-console
        console.log("[n8n-proxy] N8N_WEBHOOK_URL 主机 =", host);
    } catch  {
    // 忽略错误
    }
    if (!webhook) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "缺少 N8N_WEBHOOK_URL",
            hint: "请在项目根目录下创建 .env.local 文件，并设置 N8N_WEBHOOK_URL=https://<workspace>.app.n8n.cloud/ai-chat/<workflowId>，然后重新启动开发服务器。"
        }, {
            status: 500
        });
    }
    const url = new URL(req.url);
    const wantStream = url.searchParams.get("stream") === "1";
    try {
        const contentType = req.headers.get("content-type") || "";
        let body;
        if (contentType.includes("multipart/form-data")) {
            const form = await req.formData();
            const out = new FormData();
            for (const [k, v] of form.entries()){
                if (typeof v === "string") out.append(k, v);
                else out.append(k, v, v.name);
            }
            body = out;
        } else if (contentType.includes("application/json")) {
            const json = await req.json();
            body = JSON.stringify(json);
        } else {
            body = await req.text();
        }
        // 转发到 n8n，上游尽量保持分块传输
        const upstream = await fetch(webhook, {
            method: "POST",
            body,
            headers: contentType.includes("multipart/form-data") ? undefined : {
                "content-type": contentType
            },
            cache: "no-store"
        });
        const resType = upstream.headers.get("content-type") || "";
        if (wantStream) {
            // 流式直通
            return new Response(upstream.body, {
                status: upstream.status,
                headers: corsHeaders({
                    "content-type": resType || "text/plain"
                })
            });
        }
        // 非流式：收完再返回
        if (resType.includes("application/json")) {
            const data = await upstream.json();
            return __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data, {
                headers: corsHeaders()
            });
        } else {
            const text = await upstream.text();
            return new Response(text, {
                headers: corsHeaders({
                    "content-type": resType || "text/plain"
                })
            });
        }
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error("[n8n-proxy] 错误:", e);
        return __TURBOPACK__imported__module__$5b$project$5d2f$FRONTEND$2f$interent$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: e?.message || String(e)
        }, {
            status: 500
        });
    }
}
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__2f2cfe38._.js.map