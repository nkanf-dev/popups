import React, { useEffect, useState } from 'react';
import type { PopupConfig } from '@/types';

interface PopupProps {
  config: PopupConfig;
  onComplete: (id: string) => void;
}

const THEME_STYLES: Record<string, { header: string; content: string }> = {
  blue: { header: 'bg-blue-100 border-blue-300', content: 'bg-blue-50' },
  green: { header: 'bg-green-100 border-green-300', content: 'bg-green-50' },
  orange: { header: 'bg-orange-100 border-orange-300', content: 'bg-orange-50' },
  purple: { header: 'bg-purple-100 border-purple-300', content: 'bg-purple-50' },
  pink: { header: 'bg-pink-100 border-pink-300', content: 'bg-pink-50' },
  yellow: { header: 'bg-yellow-100 border-yellow-300', content: 'bg-yellow-50' },
  cyan: { header: 'bg-cyan-100 border-cyan-300', content: 'bg-cyan-50' },
  lime: { header: 'bg-lime-100 border-lime-300', content: 'bg-lime-50' },
  red: { header: 'bg-red-100 border-red-300', content: 'bg-red-50' },
  teal: { header: 'bg-teal-100 border-teal-300', content: 'bg-teal-50' },
  indigo: { header: 'bg-indigo-100 border-indigo-300', content: 'bg-indigo-50' },
  amber: { header: 'bg-amber-100 border-amber-300', content: 'bg-amber-50' },
  rose: { header: 'bg-rose-100 border-rose-300', content: 'bg-rose-50' },
  mint: { header: 'bg-emerald-100 border-emerald-300', content: 'bg-emerald-50' },
  peach: { header: 'bg-orange-50 border-orange-200', content: 'bg-orange-25' },
  lavender: { header: 'bg-violet-100 border-violet-300', content: 'bg-violet-50' },
  coral: { header: 'bg-orange-100 border-orange-300', content: 'bg-orange-50' },
  sky: { header: 'bg-sky-100 border-sky-300', content: 'bg-sky-50' },
  lemon: { header: 'bg-yellow-50 border-yellow-200', content: 'bg-yellow-25' },
};

const PROGRESS_BAR_COLORS: Record<string, string> = {
  blue: 'bg-blue-200',
  green: 'bg-green-200',
  orange: 'bg-orange-200',
  purple: 'bg-purple-200',
  pink: 'bg-pink-200',
  yellow: 'bg-yellow-200',
  cyan: 'bg-cyan-200',
  lime: 'bg-lime-200',
  red: 'bg-red-200',
  teal: 'bg-teal-200',
  indigo: 'bg-indigo-200',
  amber: 'bg-amber-200',
  rose: 'bg-rose-200',
  mint: 'bg-emerald-200',
  peach: 'bg-orange-100',
  lavender: 'bg-violet-200',
  coral: 'bg-orange-200',
  sky: 'bg-sky-200',
  lemon: 'bg-yellow-100',
};

const ANIMATION_STYLES: Record<string, string> = {
  top: 'animate-[popup-from-top_0.55s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]',
  bottom: 'animate-[popup-from-bottom_0.55s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]',
  left: 'animate-[popup-from-left_0.55s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]',
  right: 'animate-[popup-from-right_0.55s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]',
  topleft: 'animate-[popup-from-topleft_0.55s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]',
  topright: 'animate-[popup-from-topright_0.55s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]',
  bottomleft: 'animate-[popup-from-bottomleft_0.55s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]',
  bottomright: 'animate-[popup-from-bottomright_0.55s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]',
};

const EMOJIS = ['📖', '✨', '💫', '🌟', '⭐', '💝', '🎀', '🎭', '🎨', '🎪', '🎯', '🎲', '🎸', '🎵', '🎶', '🎤', '🎧', '🏆', '👑', '💎', '💰', '🎁', '🌹', '🌺', '🌻', '🌷', '🌸', '🦋', '🐝', '🌊', '🔥', '❄️', '☀️', '🌙', '⚡', '🌈'];

const KAOMOJI = [
  '(´▽`)',
  '(´∇｀)',
  '(´∀｀)♡',
  '(´▽｀)ノ',
  '(๑´▾`๑)',
  '(´；ω；`)',
  '(´；ω；`)',
  '(´▽｀)',
  '(ノ´▽`)ノ',
  '(´∇｀)',
  '(*´▽｀)',
  '(´▽｀*)ﾉ',
  '(´▾`)',
  '(´∀`)',
  '(´▽｀)',
  '(๑´•.̫ • ́)و',
  '(´｀)',
  '(´▽`)',
];

const getEmojiFromId = (id: string): string => {
  // 使用 id 的字符编码和 length 作为种子
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return EMOJIS[Math.abs(hash) % EMOJIS.length];
};

const getKaomojiFromId = (id: string): string => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash = hash & hash;
  }
  return KAOMOJI[Math.abs(hash) % KAOMOJI.length];
};

const Popup: React.FC<PopupProps> = ({ config, onComplete }) => {
  const [progress, setProgress] = useState(100);
  const duration = config.duration || 10000;

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, ((duration - elapsed) / duration) * 100);
      setProgress(remaining);
    }, 30);

    const timer = setTimeout(() => {
      onComplete(config.id);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [config.id, duration, onComplete]);

  const themeStyle = THEME_STYLES[config.theme] || THEME_STYLES.blue;
  const animStyle = ANIMATION_STYLES[config.animation] || ANIMATION_STYLES.top;
  const emoji = getEmojiFromId(config.id);
  const kaomoji = getKaomojiFromId(config.id);
  const progressBarColor = PROGRESS_BAR_COLORS[config.theme] || PROGRESS_BAR_COLORS.blue;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div
      className={`fixed rounded-lg border border-gray-200 bg-white shadow-lg user-select-none pointer-events-none ${animStyle} ${
        isMobile ? 'w-[80px]' : 'w-[300px]'
      }`}
      style={{
        top: `${config.top}%`,
        left: `${config.left}%`,
        transform: 'translate(0, 0)',
      }}
    >
      {/* Header */}
      <div
        className={`flex items-center gap-1 px-2 py-1 ${themeStyle.header} border-b`}
      >
        <span className={isMobile ? 'text-base' : 'text-xs'}>{emoji}</span>
        <span className={`font-bold ${isMobile ? 'text-[10px]' : 'text-xs'}`}>{kaomoji}</span>
      </div>

      {/* Content */}
      <div
        className={`px-3 py-2 text-center text-sm font-semibold text-gray-800 ${themeStyle.content}`}
      >
        <div className="text-xs mb-1 opacity-70"> </div>
        {isMobile ? (
          // 手机端：竖排显示
          <div className="writing-mode-vertical flex justify-center">
            {config.text.split('').map((char, index) => (
              <span key={index} className="leading-relaxed">
                {char}
              </span>
            ))}
          </div>
        ) : (
          // 电脑端：横排显示
          <div>{config.text}</div>
        )}
      </div>

      {/* Author */}
      {config.author && (
        <div className="px-3 py-1 text-right text-xs text-gray-500 border-t border-gray-100">
          —— {config.author}
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full h-0.5 bg-gray-100 rounded-b-lg overflow-hidden">
        <div
          className={`h-full transition-all duration-100 ${progressBarColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Popup;
