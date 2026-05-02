import YoutubeIcon from './YoutubeIcon';

const Footer = () => {
  return (
    <footer className='w-full border-t border-red-900/10 py-16 px-6 mt-32 bg-[#FDF8F1]'>
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-red-900 rounded-xl flex items-center justify-center text-white text-xl font-serif">V</div>
          <span className="text-2xl font-serif font-bold text-[#5D1E1E]">Vibe with Krishna</span>
        </div>
        
        <p className="text-center text-[#6B5D5D] text-lg max-w-xl leading-relaxed font-medium">
          Spreading the divine essence of Krishna through melodies and meanings. Join our community of devotees.
        </p>

        <div className="flex items-center gap-8 mt-4">
          <a
            href="https://youtube.com/@vibewithkrishna-z4z"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-red-900 font-bold hover:text-[#C07A2B] transition-colors"
          >
            <YoutubeIcon size={24} />
            <span>Watch on Youtube</span>
          </a>
        </div>

        <p className="text-[#6B5D5D]/50 text-sm mt-8 border-t border-red-900/5 pt-8 w-full text-center">
          © 2026 Vibe with Krishna. Dedicating every verse to the Divine.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
