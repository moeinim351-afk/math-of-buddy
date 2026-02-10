
import React, { useState, useEffect } from 'react';
import { GAME_CHALLENGES } from '../constants';

const MathGameRoom: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' | null }>({ text: '', type: null });
  const [showTip, setShowTip] = useState(false);

  const challenge = GAME_CHALLENGES[currentLevel % GAME_CHALLENGES.length];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim() === challenge.answer) {
      setFeedback({ text: 'آفرین قهرمان! جواب درست بود. 🎉', type: 'success' });
      setScore(score + 10);
      setTimeout(() => {
        setCurrentLevel(currentLevel + 1);
        setUserAnswer('');
        setFeedback({ text: '', type: null });
        setShowTip(false);
      }, 1500);
    } else {
      setFeedback({ text: 'کمی دقت کن عزیزم، دوباره امتحان کن! ❤️', type: 'error' });
      setTimeout(() => setFeedback({ text: '', type: null }), 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white animate-fade-in relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-300 opacity-10 rounded-full blur-3xl"></div>

      <div className="z-10 text-center max-w-md w-full">
        <div className="mb-8">
          <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
            مرحله {currentLevel + 1}
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-2">دوئل معادله‌ها ⚔️</h2>
          <p className="text-indigo-100 text-sm">مقدار x را پیدا کن و امتیاز بگیر!</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 mb-6 transition-all transform hover:scale-[1.02]">
          <div className="text-4xl font-mono font-bold mb-8 tracking-wider bg-white/20 py-4 rounded-2xl">
            {challenge.question}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="پاسخ شما..."
                className="w-full bg-white text-gray-800 rounded-2xl px-6 py-4 text-center text-xl font-bold focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-all placeholder:text-gray-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-4 rounded-2xl shadow-xl transition-all active:scale-95 text-lg"
            >
              بررسی پاسخ ✅
            </button>
          </form>

          {feedback.type && (
            <div className={`mt-4 text-sm font-bold animate-bounce ${feedback.type === 'success' ? 'text-green-300' : 'text-orange-300'}`}>
              {feedback.text}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <button 
            onClick={() => setShowTip(!showTip)}
            className="flex-1 bg-white/10 hover:bg-white/20 py-3 rounded-2xl text-xs font-medium border border-white/10 transition-all"
          >
            💡 راهنمایی می‌خوام
          </button>
          <div className="flex-1 bg-white/10 py-3 rounded-2xl text-xs font-medium border border-white/10">
            امتیاز من: <span className="text-yellow-400 font-bold">{score}</span>
          </div>
        </div>

        {showTip && (
          <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded-2xl text-xs leading-relaxed animate-fade-in border border-yellow-200 shadow-lg">
            {challenge.tip}
          </div>
        )}
      </div>

      <div className="mt-12 text-[10px] opacity-60">
        یادت باشه: هر بازی، یک فرصت برای یادگیریه! 🌟
      </div>
    </div>
  );
};

export default MathGameRoom;
