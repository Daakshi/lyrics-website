"use client";

import { useState } from "react";

const AddSong = ({ close }) => {
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleAddSong = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("lyrics", lyrics);
    formData.append("image", image);
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    fetch(`/api/add-song`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setTimeout(() => {
          close();
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-[100] p-4 backdrop-blur-md">
      <div className="bg-[#FDF8F1] border border-red-900/10 rounded-[3rem] w-full max-w-lg p-6 md:p-10 relative overflow-hidden shadow-2xl animate-fadeInScale">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 blur-3xl rounded-full"></div>
        
        <h2 className="text-[#5D1E1E] text-4xl font-serif font-bold mb-8 relative">Add New Bhajan</h2>

        <div className="space-y-6 relative">
          <div className="space-y-2">
            <label className="text-[#6B5D5D] text-sm font-bold ml-4">Bhajan Title</label>
            <input
              type="text"
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-red-300/30 rounded-2xl p-4 text-red-900 font-medium focus:ring-4 focus:ring-amber-500/10 transition-all outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[#6B5D5D] text-sm font-bold ml-4">Lyrics / Meaning</label>
            <textarea
              placeholder="Enter lyrics here..."
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              className="w-full bg-white border border-red-300/30 rounded-2xl p-4 text-red-900 font-medium h-48 resize-none focus:ring-4 focus:ring-amber-500/10 transition-all outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[#6B5D5D] text-sm font-bold ml-4">Image URL (Optional)</label>
            <input
              type="text"
              placeholder="Paste image link here..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-white border border-red-300/30 rounded-2xl p-4 text-red-900 font-medium focus:ring-4 focus:ring-amber-500/10 transition-all outline-none mb-2"
            />
            <div className="relative">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              <label 
                htmlFor="file-upload" 
                className="flex items-center justify-center gap-2 w-full bg-red-100/50 border-2 border-dashed border-red-900/10 rounded-2xl p-4 text-red-900 font-bold cursor-pointer hover:bg-red-100 transition-all"
              >
                {imageFile ? `📎 ${imageFile.name}` : "📁 Upload Image File"}
              </label>
            </div>
          </div>

          <div className="flex gap-4 mt-10">
            <button
              onClick={handleAddSong}
              className="bg-red-900 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-red-900/20 hover:bg-red-800 transition-all flex-1"
            >
              Add Bhajan
            </button>

            <button
              onClick={close}
              className="bg-[#EADCC7] text-red-900 font-bold py-4 px-8 rounded-full hover:bg-red-900/10 transition-all flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSong;