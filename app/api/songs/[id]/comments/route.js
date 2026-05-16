import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const comments = await prisma.comment.findMany({
      where: { songId: id },
      orderBy: { createdAt: "desc" },
    });
    return Response.json({ success: true, comments });
  } catch (error) {
    console.error("[songs/[id]/comments GET] Error:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  try {
    const { id } = await params;
    const { text, author } = await req.json();
    if (!text) {
      return Response.json({ success: false, message: "Comment text is required" }, { status: 400 });
    }
    const comment = await prisma.comment.create({
      data: {
        text,
        author: author || "Anonymous",
        songId: id,
      },
    });
    return Response.json({ success: true, comment });
  } catch (error) {
    console.error("[songs/[id]/comments POST] Error:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
