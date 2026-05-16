"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send, UserCircle } from "lucide-react";

const Comments = ({ songId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [songId]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/songs/${songId}/comments`);
      const data = await res.json();
      if (data.success) {
        setComments(data.comments);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/songs/${songId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: newComment,
          author: authorName.trim() || "Anonymous",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setComments([data.comment, ...comments]);
        setNewComment("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 mb-12 px-4 animate-fadeInScale">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-red-900/10 rounded-xl text-red-900">
          <MessageSquare size={24} />
        </div>
        <h3 className="text-3xl font-serif font-bold text-[#5D1E1E]">Community Thoughts</h3>
      </div>

      <div className="bg-white/90 backdrop-blur-md rounded-[3rem] p-6 md:p-12 border border-red-900/5 shadow-xl shadow-red-900/5 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/30 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 z-0 pointer-events-none"></div>
        
        <div className="relative z-10">
          <form onSubmit={handleSubmit} className="mb-12 space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Your Name (optional)"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full md:w-64 bg-[#FDF8F1] border border-red-900/10 rounded-2xl px-5 py-3 text-red-900 placeholder-red-900/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium"
                />
              </div>
            </div>
            <div className="relative">
              <textarea
                placeholder="Share your feedback, meaning, or connection to this bhajan..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                className="w-full bg-[#FDF8F1] border border-red-900/10 rounded-3xl px-6 py-5 pr-20 text-red-900 placeholder-red-900/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium resize-none"
              />
              <button
                type="submit"
                disabled={!newComment.trim() || isSubmitting}
                className="absolute bottom-5 right-5 p-3 bg-amber-600 text-white rounded-2xl hover:bg-amber-700 disabled:opacity-50 disabled:hover:bg-amber-600 transition-all shadow-md"
              >
                <Send size={20} />
              </button>
            </div>
          </form>

          <div className="space-y-6">
            {isLoading ? (
              <div className="text-center text-red-900/50 py-8 font-medium animate-pulse">Loading comments...</div>
            ) : comments.length === 0 ? (
              <div className="text-center bg-[#FDF8F1]/50 py-12 rounded-[2rem] border border-red-900/5">
                 <MessageSquare className="mx-auto text-red-900/20 mb-3" size={32} />
                 <p className="text-red-900/60 font-medium">No comments yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="bg-[#FDF8F1] p-6 rounded-3xl border border-red-900/5 hover:border-red-900/10 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-red-900/10 rounded-full flex items-center justify-center text-red-900 shrink-0">
                      <UserCircle size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#5D1E1E] text-sm">{comment.author}</h4>
                      <p className="text-xs text-red-900/40 font-medium">
                        {new Date(comment.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#2D1A1A] leading-relaxed ml-1 md:ml-12 font-medium">{comment.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
