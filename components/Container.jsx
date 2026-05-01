"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import EditSong from "./EditSong";

import { useRouter } from "next/navigation";

export default function Container({ songs = [], search = "", loading = false }) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingSong, setEditingSong] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const getLyricSnippet = (lyrics, searchTerm) => {
    if (!lyrics || !searchTerm) return null;
    const lines = lyrics.split('\n');
    const lowerSearch = searchTerm.toLowerCase();
    const matchLine = lines.find(line => line.toLowerCase().includes(lowerSearch));
    if (matchLine) {
      return matchLine.trim();
    }
    return null;
  };

  // Check admin from localStorage
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin === "true") {
      setIsAdmin(true);
    }
  }, []);

  // Delete function
  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this bhajan?")) return;

    fetch(`/api/songs/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // Loading Skeleton State
  if (loading || !Array.isArray(songs)) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 py-8 px-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/50 backdrop-blur-sm border border-red-900/5 rounded-[2rem] p-6 flex flex-col md:flex-row items-center md:items-center gap-6 relative overflow-hidden animate-pulse">
            <div className="shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-red-900/10"></div>
            <div className="flex-grow flex flex-col justify-center w-full gap-3 mt-4 md:mt-0 items-center md:items-start">
               <div className="h-6 bg-red-900/10 rounded-full w-3/4"></div>
               <div className="h-4 bg-red-900/5 rounded-full w-1/2"></div>
               <div className="h-3 bg-red-900/5 rounded-full w-1/3 mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (songs.length === 0) {
    return (
      <div className="bg-white/50 backdrop-blur-md border border-red-900/5 rounded-[3rem] p-16 text-center shadow-lg">
        <h3 className="text-[#5D1E1E] text-2xl font-serif font-bold mb-2">No Bhajans Found</h3>
        <p className="text-[#6B5D5D] text-lg">We couldn't find any bhajans matching "{search}".</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 py-8 px-2">
      {songs.map((song, index) => (
        <div
          key={song.id ?? index}
          className="bg-white/80 backdrop-blur-sm border border-red-900/5 rounded-[2rem] p-6 flex flex-col md:flex-row items-center md:items-center gap-6 group cursor-pointer hover:bg-white hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-700 relative overflow-hidden"
          onClick={() => router.push(`/song/${song.id}`)}
        >
          {/* Thumbnail Placeholder */}
          <div className="shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden relative shadow-lg">
             <img 
               src={song.image || `https://images.unsplash.com/photo-1544923246-77307dd654ca?q=80&w=200&h=200&auto=format&fit=crop`} 
               alt={song.title} 
               className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
             />
             <div className="absolute inset-0 bg-red-900/10 group-hover:bg-red-900/0 transition-all"></div>
          </div>
          
          <div className="flex-grow flex flex-col justify-center items-center md:items-start min-w-0 text-center md:text-left w-full">
            <div className="flex items-center justify-between w-full gap-4 mb-2">
              <span className="text-[#C07A2B] font-serif font-black text-2xl opacity-50 group-hover:opacity-100 transition-opacity mx-auto md:mx-0">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              
              {isAdmin && (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingSong(song);
                      setShowEditModal(true);
                    }}
                    className="p-2.5 rounded-full bg-red-100/50 text-red-900 hover:bg-red-900 hover:text-white transition-all shadow-sm border border-red-900/10"
                    title="Edit Bhajan"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(song.id);
                    }}
                    className="p-2.5 rounded-full bg-red-100/50 text-red-900 hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-900/10"
                    title="Delete Bhajan"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>

            <div className="mt-2 flex flex-col items-center md:items-start gap-1.5 w-full">
              <h3 className="text-[#5D1E1E] font-serif font-bold text-xl md:text-2xl truncate group-hover:text-[#C07A2B] transition-colors leading-tight w-full">
                {song.title}
              </h3>
              {search && getLyricSnippet(song.lyrics, search) && (
                <p className="text-[#6B5D5D] text-sm italic border-l-2 border-[#C07A2B] pl-2 line-clamp-1">
                  &ldquo;{getLyricSnippet(song.lyrics, search)}&rdquo;
                </p>
              )}
              <p className="text-[#6B5D5D] text-sm mt-1 flex items-center gap-2 font-medium">
                View Meaning & Lyrics <span className="text-lg group-hover:translate-x-2 transition-transform text-[#C07A2B]">→</span>
              </p>
            </div>
          </div>

        </div>
      ))}

      {/* Edit Modal */}
      {showEditModal && editingSong && (
        <EditSong
          song={editingSong}
          close={() => {
            setShowEditModal(false);
            setEditingSong(null);
          }}
        />
      )}
    </div>
  );
}
