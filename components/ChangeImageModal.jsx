import { useState, useRef } from "react";
import { X, Image as ImageIcon, Link as LinkIcon, Upload } from "lucide-react";

const ChangeImageModal = ({ close, currentImage, onSave }) => {
  const [mode, setMode] = useState("link");
  const [linkUrl, setLinkUrl] = useState(currentImage || "");
  const [fileData, setFileData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1.5 * 1024 * 1024) {
        alert("Please select an image smaller than 1.5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const finalImage = mode === "link" ? linkUrl : fileData;
    if (!finalImage) return;
    
    setIsSaving(true);
    await onSave(finalImage);
    setIsSaving(false);
    close();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[100] p-4 backdrop-blur-md">
      <div className="bg-[#FDF8F1] border border-red-900/10 rounded-[3rem] w-full max-w-md p-6 md:p-10 relative overflow-hidden shadow-2xl animate-fadeInScale">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 blur-3xl rounded-full"></div>
        
        <div className="flex justify-between items-center mb-8 relative">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-red-900 rounded-lg flex items-center justify-center text-white">
                <ImageIcon size={20} />
             </div>
             <h2 className="text-[#5D1E1E] text-2xl font-serif font-bold">Change Image</h2>
          </div>
          <button onClick={close} className="text-red-900/40 hover:text-red-900 transition-colors p-2 hover:bg-red-900/5 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6 relative">
          {/* Tabs */}
          <div className="flex bg-red-900/5 p-1 rounded-2xl">
            <button
              onClick={() => setMode("link")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all ${
                mode === "link" ? "bg-white text-red-900 shadow-sm" : "text-red-900/50 hover:text-red-900"
              }`}
            >
              <LinkIcon size={16} /> Link
            </button>
            <button
              onClick={() => setMode("upload")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all ${
                mode === "upload" ? "bg-white text-red-900 shadow-sm" : "text-red-900/50 hover:text-red-900"
              }`}
            >
              <Upload size={16} /> Upload
            </button>
          </div>

          {/* Link Mode */}
          {mode === "link" && (
            <div className="space-y-2">
              <label className="text-[#6B5D5D] text-sm font-bold ml-4">Image URL</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="https://..."
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full bg-white border border-red-300/30 rounded-2xl p-4 pl-12 text-red-900 font-medium focus:ring-4 focus:ring-amber-500/10 transition-all outline-none"
                />
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-red-900/30" size={20} />
              </div>
            </div>
          )}

          {/* Upload Mode */}
          {mode === "upload" && (
            <div className="space-y-2">
              <label className="text-[#6B5D5D] text-sm font-bold ml-4">Upload File</label>
              <div 
                className="w-full bg-white border-2 border-dashed border-red-300/50 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-red-50/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange}
                />
                {fileData ? (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-red-900/10 mb-2">
                      <img src={fileData} className="w-full h-full object-cover" alt="Preview" />
                    </div>
                    <span className="text-amber-600 text-sm font-medium">Click to change</span>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-red-900/5 rounded-full flex items-center justify-center text-red-900/40">
                      <Upload size={24} />
                    </div>
                    <span className="text-red-900/60 font-medium text-sm">Click to browse files</span>
                  </>
                )}
              </div>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={isSaving || (mode === 'link' ? !linkUrl : !fileData)}
            className="w-full bg-amber-600 text-white font-bold py-4 rounded-full shadow-lg shadow-amber-600/20 hover:bg-amber-700 transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save Image"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeImageModal;
