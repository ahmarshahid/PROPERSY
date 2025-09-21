import { NextResponse } from "next/server";

export const runtime = "edge"; // 或 "nodejs"；如果需要使用 node 包，可以切换为 "nodejs"

function corsHeaders(extra: Record<string, string> = {}) {
  return {
    "Access-Control-Allow-Origin": "*",
    ...extra,
  };
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: Request) {
  const webhook = process.env.N8N_WEBHOOK_URL;

  // 开发阶段打印一下是否读取到了环境变量（生产环境可以删除）
  // 只打印 host，避免完整 URL 被打到日志里
  try {
    const host = webhook ? new URL(webhook).host : "(未定义)";
    // eslint-disable-next-line no-console
    console.log("[n8n-proxy] N8N_WEBHOOK_URL 主机 =", host);
  } catch {
    // 忽略错误
  }

  if (!webhook) {
    return NextResponse.json(
      {
        error: "缺少 N8N_WEBHOOK_URL",
        hint: "请在项目根目录下创建 .env.local 文件，并设置 N8N_WEBHOOK_URL=https://<workspace>.app.n8n.cloud/ai-chat/<workflowId>，然后重新启动开发服务器。",
      },
      { status: 500 }
    );
  }

  const url = new URL(req.url);
  const wantStream = url.searchParams.get("stream") === "1";

  try {
    const contentType = req.headers.get("content-type") || "";
    let body: BodyInit;

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const out = new FormData();
      for (const [k, v] of form.entries()) {
        if (typeof v === "string") out.append(k, v);
        else out.append(k, v, (v as File).name);
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
      headers: contentType.includes("multipart/form-data")
        ? undefined
        : { "content-type": contentType },
      cache: "no-store",
    });

    const resType = upstream.headers.get("content-type") || "";

    if (wantStream) {
      // 流式直通
      return new Response(upstream.body, {
        status: upstream.status,
        headers: corsHeaders({
          "content-type": resType || "text/plain",
        }),
      });
    }

    // 非流式：收完再返回
    if (resType.includes("application/json")) {
      const data = await upstream.json();
      return NextResponse.json(data, { headers: corsHeaders() });
    } else {
      const text = await upstream.text();
      return new Response(text, {
        headers: corsHeaders({ "content-type": resType || "text/plain" }),
      });
    }
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error("[n8n-proxy] 错误:", e);
    return NextResponse.json(
      { error: e?.message || String(e) },
      { status: 500 }
    );
  }
}
