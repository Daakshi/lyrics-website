import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Lyrics from "@/components/Lyrics";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const song = await prisma.song.findUnique({ where: { id } });
  
  if (!song) {
    return { title: "Song Not Found" };
  }

  return {
    title: song.title,
    description: song.lyrics?.substring(0, 160) || `Lyrics and meaning for ${song.title}`,
    openGraph: {
      title: `${song.title} | Vibe Krishna`,
      description: song.lyrics?.substring(0, 160) || `Lyrics and meaning for ${song.title}`,
      images: [song.image || "https://paintwaint.in/cdn/shop/files/Untitled_53_dff00bc8-73b6-4230-b199-3b1ff8916894.png?v=1729090546"],
    },
  };
}

export default async function SongPage({ params }) {
  const { id } = await params;

  const song = await prisma.song.findUnique({
    where: { id },
  });

  if (!song) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow py-12">
        <Lyrics song={song} />
      </main>
      <Footer />
    </>
  );
}
