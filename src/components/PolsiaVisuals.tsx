import React from 'react';

export const PolsiaMascot: React.FC<{ isThinking?: boolean; autoMode?: boolean }> = ({
  isThinking = false,
  autoMode = true,
}) => {
  return (
    <div className="relative inline-flex items-center justify-center select-none">
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={isThinking ? 'animate-pulse' : ''}
      >
        {/* Three Triangular Cat/Crown Ears on Top exactly like Polsia screenshot */}
        <path d="M12 18L18 8L24 18H12Z" fill="#FFFFFF" stroke="#141414" strokeWidth="2.2" strokeLinejoin="miter" />
        <path d="M26 18L32 8L38 18H26Z" fill="#FFFFFF" stroke="#141414" strokeWidth="2.2" strokeLinejoin="miter" />
        <path d="M40 18L46 8L52 18H40Z" fill="#FFFFFF" stroke="#141414" strokeWidth="2.2" strokeLinejoin="miter" />

        {/* Outer Monitor Frame */}
        <rect
          x="8"
          y="18"
          width="48"
          height="40"
          fill="#FFFFFF"
          stroke="#141414"
          strokeWidth="2.2"
        />

        {/* Top Inner Double Bar */}
        <line x1="12" y1="23" x2="52" y2="23" stroke="#141414" strokeWidth="1.8" />

        {/* Inner Face Screen Box */}
        <rect
          x="13"
          y="27"
          width="38"
          height="26"
          fill={autoMode ? '#FAFAFA' : '#F3F4F6'}
          stroke="#141414"
          strokeWidth="1.8"
        />

        {/* Pixel Eyes */}
        <rect x="21" y="34" width="3.5" height="3.5" fill="#141414" />
        <rect x="39.5" y="34" width="3.5" height="3.5" fill="#141414" />

        {/* Cute Square Nose */}
        <rect x="30.25" y="39" width="3.5" height="3.5" fill="#141414" />

        {/* W-shaped Pixel Cat Mouth */}
        <path
          d="M23 45V48H29V45M29 45V48H35V45M35 45V48H41V45"
          stroke="#141414"
          strokeWidth="1.8"
          strokeLinecap="square"
        />
      </svg>
      {autoMode && (
        <span
          title="Modo Automático Activo"
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"
        />
      )}
    </div>
  );
};

export const ProductPrintableThumbnail: React.FC<{
  type: 'montessori' | 'dinosaur' | 'flashcards' | 'busybook' | 'emotions' | 'math';
  bgColor?: string;
}> = ({ type, bgColor = '#F8FAFC' }) => {
  return (
    <div
      className="w-16 h-20 border border-[#141414] flex flex-col items-center justify-between p-1.5 shrink-0 shadow-[2px_2px_0px_#141414]"
      style={{ backgroundColor: bgColor }}
    >
      <div className="w-full flex items-center justify-between border-b border-black/20 pb-0.5">
        <span className="font-mono-code text-[7px] font-semibold tracking-tighter uppercase text-[#141414]">
          PTB·PDF
        </span>
        <span className="font-mono-code text-[7px] text-[#141414]/70">A4</span>
      </div>

      <div className="my-auto flex items-center justify-center">
        {type === 'montessori' && (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#141414" strokeWidth="1.8">
            <path d="M12 3C7 3 4 7 4 12C4 16.5 7.5 20 12 20C16.5 20 20 16.5 20 12C20 7 17 3 12 3Z" />
            <path d="M12 3V21" />
            <path d="M12 9L16 6" />
            <path d="M12 14L8 11" />
          </svg>
        )}
        {type === 'dinosaur' && (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#141414" strokeWidth="2">
            <path d="M18 4H13L10 8V13H6L4 16V20H9V16H14V20H18V11H21V7L18 4Z" />
            <circle cx="15.5" cy="6.5" r="1" fill="#141414" />
          </svg>
        )}
        {type === 'flashcards' && (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#141414" strokeWidth="1.8">
            <rect x="3" y="4" width="8" height="10" rx="1" />
            <rect x="13" y="4" width="8" height="10" rx="1" />
            <path d="M5 18H19" />
            <path d="M7 21H17" />
          </svg>
        )}
        {type === 'busybook' && (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#141414" strokeWidth="1.8">
            <polygon points="12 4 15 10 21 11 16.5 15.5 18 21 12 18 6 21 7.5 15.5 3 11 9 10 12 4" />
          </svg>
        )}
        {type === 'emotions' && (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#141414" strokeWidth="1.8">
            <circle cx="12" cy="12" r="9" />
            <path d="M8 14C8.8 15.8 10.3 17 12 17C13.7 17 15.2 15.8 16 14" />
            <circle cx="9" cy="10" r="1" fill="#141414" />
            <circle cx="15" cy="10" r="1" fill="#141414" />
          </svg>
        )}
        {type === 'math' && (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#141414" strokeWidth="1.8">
            <rect x="4" y="4" width="6" height="6" />
            <rect x="14" y="4" width="6" height="6" />
            <rect x="4" y="14" width="6" height="6" />
            <path d="M14 17H20M17 14V20" />
          </svg>
        )}
      </div>

      <div className="w-full border-t border-black/20 pt-0.5 flex justify-between items-center">
        <span className="w-6 h-1 bg-[#141414]/40 block" />
        <span className="font-mono-code text-[6px] text-[#141414]">KIDS</span>
      </div>
    </div>
  );
};
