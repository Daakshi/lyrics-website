"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Lyrics from "@/components/Lyrics";
import Footer from "@/components/Footer";

export default function Home() {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch songs from API with search query
  const fetchSongs = useCallback(async (query) => {
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setSongs(data.songs || []);
    } catch (err) {
      console.error("Failed to fetch songs:", err);
      setSongs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch is handled by the debounced search effect on mount

  // Debounced search
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      fetchSongs(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, fetchSongs]);

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <main className="flex-grow">
        <Hero songs={songs} search={search} loading={loading} />
      </main>
      <Footer />
    </>
  );
}