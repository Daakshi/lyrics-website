import { prisma } from "@/lib/prisma";

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const formData = await req.formData();
    const title = formData.get("title");
    const lyrics = formData.get("lyrics");
    const artist = formData.get("artist") || "";
    let imageUrl = formData.get("image") || "";
    const imageFile = formData.get("imageFile");

    // Vercel has a read-only filesystem — store images as base64 data-URLs.
    if (imageFile && typeof imageFile === "object" && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");
      const mimeType = imageFile.type || "image/jpeg";
      imageUrl = `data:${mimeType};base64,${base64}`;
    }

    const song = await prisma.song.update({
      where: { id },
      data: {
        title: title || "",
        lyrics: lyrics || "",
        artist: artist,
        // Only update image if a new file or URL was supplied
        ...(imageUrl ? { image: imageUrl } : {}),
      },
    });

    return Response.json({ success: true, song });
  } catch (error) {
    console.error("[songs/[id] PUT] Error:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await prisma.song.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    console.error("[songs/[id] DELETE] Error:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
