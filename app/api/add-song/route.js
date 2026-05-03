import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const lyrics = formData.get("lyrics");
    let imageUrl = formData.get("image") || "";
    const imageFile = formData.get("imageFile");

    // Handle File Upload
    if (imageFile && typeof imageFile === "object" && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });

      const uniqueName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
      const filePath = path.join(uploadDir, uniqueName);
      await writeFile(filePath, buffer);

      imageUrl = `/uploads/${uniqueName}`;
    }

    const song = await prisma.song.create({
      data: {
        title: title || "",
        lyrics: lyrics || "",
        image: imageUrl,
      },
    });

    return Response.json({ success: true, song });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
