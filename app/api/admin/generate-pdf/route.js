import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { renderToBuffer } from "@react-pdf/renderer";
import ReportDocument from "../../../../components/ReportDocument.js";

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;

    if (!sessionToken) {
      return Response.json({ error: "Not logged in" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const { payload } = await jwtVerify(sessionToken, secret);

    if (payload.email !== process.env.ADMIN_EMAIL) {
      return Response.json({ error: "Not authorized" }, { status: 403 });
    }

    const body = await request.json();
    const { keyword, client, generatedAt, strategy, subreddits } = body;

    if (!keyword || !subreddits) {
      return Response.json({ error: "Missing report data" }, { status: 400 });
    }

    const pdfBuffer = await renderToBuffer(
      ReportDocument({ keyword, client, generatedAt, strategy, subreddits })
    );

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="WolfOfReddit-' + keyword.replace(/\s+/g, "-") + '-report.pdf"',
      },
    });
  } catch (error) {
    return Response.json(
      { error: "PDF generation failed", details: error.message },
      { status: 500 }
    );
  }
}
