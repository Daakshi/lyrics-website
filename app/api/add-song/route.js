export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();

    const formData = await req.formData();
    const title = formData.get("title");
    const lyrics = formData.get("lyrics");

    // ❌ REMOVE file upload logic (not supported on Vercel)
    const imageUrl = formData.get("image") || "";

    const song = await prisma.song.create({
      data: {
        title: title || "",
        lyrics: lyrics || "",
        image: imageUrl,
      },
    });

    return Response.json({ success: true, song });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}