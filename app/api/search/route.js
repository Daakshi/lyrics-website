import { prisma } from "@/lib/prisma";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q") || "";

        const songs = await prisma.song.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {
                        lyrics: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {
                        artist: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                ],
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return Response.json({ songs });
    } catch (error) {
        console.error("Error fetching songs:", error);
        return Response.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}