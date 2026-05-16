import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const setting = await prisma.setting.findUnique({
            where: { key: "hero_image" }
        });
        const defaultImage = "https://paintwaint.in/cdn/shop/files/Untitled_53_dff00bc8-73b6-4230-b199-3b1ff8916894.png?v=1729090546";
        return Response.json({ image: setting?.value || defaultImage });
    } catch (error) {
        console.error("Error fetching hero image:", error);
        return Response.json({ error: "Failed to fetch image" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { image } = await req.json();
        if (!image) {
            return Response.json({ error: "Image URL is required" }, { status: 400 });
        }
        const setting = await prisma.setting.upsert({
            where: { key: "hero_image" },
            update: { value: image },
            create: { key: "hero_image", value: image }
        });
        return Response.json({ success: true, image: setting.value });
    } catch (error) {
        console.error("Error updating hero image:", error);
        return Response.json({ error: "Failed to update image" }, { status: 500 });
    }
}
