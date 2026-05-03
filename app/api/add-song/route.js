export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const lyrics = formData.get("lyrics");
    const artist = formData.get("artist") || "";
    let imageUrl = formData.get("image") || "";
    const imageFile = formData.get("imageFile");

    // Vercel has a read-only filesystem — we can't write to public/uploads.
    // Store uploaded images as base64 data-URLs in the DB instead.
    if (imageFile && typeof imageFile === "object" && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");
      const mimeType = imageFile.type || "image/jpeg";
      imageUrl = `data:${mimeType};base64,${base64}`;
    }

    const song = await prisma.song.create({
      data: {
        title: title || "",
        lyrics: lyrics || "",
        artist: artist,
        image: imageUrl,
      },
    });

    return Response.json({ success: true, song });
  } catch (error) {
    console.error("[add-song] Error:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
