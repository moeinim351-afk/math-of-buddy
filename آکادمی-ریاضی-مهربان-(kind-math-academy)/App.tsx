
import React, { useState, useRef, useEffect } from 'react';
import { Message } from './types';
import { geminiService } from './services/geminiService';
import { MATH_QUOTES, TOPICS, MATH_WONDERS, MATH_CHAPTERS } from './constants';
import ChatBubble from './components/ChatBubble';
import MathGameRoom from './components/MathGameRoom';
import GradeAnalysis from './components/GradeAnalysis';
import VideoLibrary from './components/VideoLibrary';
import GeometryRoom from './components/GeometryRoom';

const MISTAKE_TOPICS = ["بردار", "توان و جذر", "معادله", "هندسه"];

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'سلام قهرمان من! 👋 خوشحالم که می‌بینمت. امروز چه مبحثی از ریاضی هشتم رو با هم تمرین کنیم؟ یادت باشه هیچ سوالی سخت نیست، فقط نیاز به کمی دوستی با اعداد داره!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [dailyWonder, setDailyWonder] = useState(MATH_WONDERS[0]);
  const [activeTab, setActiveTab] = useState<'chat' | 'games' | 'videos' | 'grades' | 'geometry'>('chat');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && activeTab === 'chat') {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, activeTab]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % MATH_QUOTES.length);
    }, 12000);
    
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setDailyWonder(MATH_WONDERS[dayOfYear % MATH_WONDERS.length]);
    
    return () => clearInterval(interval);
  }, []);

  const processMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    setActiveTab('chat');

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const result = await geminiService.sendMessage(history, text);

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: result.text,
      groundingLinks: result.groundingLinks,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleSend = async () => {
    await processMessage(input);
    setInput('');
  };

  const handleMistakeTopicClick = (topic: string) => {
    processMessage(`فکر می‌کنم توی مبحث "${topic}" کمی اشتباه داشتم. می‌تونی کمکم کنی و برام ویدیوی آموزشی یا منبع خوبی پیدا کنی؟`);
  };

  const handleChapterVideoRequest = (chapterTitle: string) => {
    processMessage(`لطفاً برای یادگیری "${chapterTitle}" ریاضی هشتم، چند تا ویدیوی آموزشی معتبر و خوب از منابعی مثل گوگل یا آپارات برام پیدا کن.`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto p-4 gap-4">
      {/* Sidebar - Motivational Area */}
      <aside className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-4 max-h-screen overflow-y-auto pr-1 pb-4 custom-scrollbar">
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-blue-100 flex flex-col items-center text-center sticky top-0 z-10">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 text-3xl shadow-inner">
            👨‍🏫
          </div>
          <h1 className="text-lg font-bold text-blue-800 mb-1 leading-tight">آکادمی ریاضی مهربان</h1>
          <p className="text-[10px] text-gray-500 font-medium">پایه هشتم - یادگیری با لبخند</p>
        </div>

        {/* Navigation Tabs - Extended */}
        <div className="bg-white rounded-3xl p-2 shadow-xl border border-blue-100 grid grid-cols-2 gap-2">
          <button
            onClick={() => setActiveTab('chat')}
            className={`py-3 rounded-2xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${activeTab === 'chat' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
          >
            💬 گفتگو
          </button>
          <button
            onClick={() => setActiveTab('games')}
            className={`py-3 rounded-2xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${activeTab === 'games' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
          >
            🎮 بازی
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`py-3 rounded-2xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${activeTab === 'videos' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
          >
            🎥 ویدیوها
          </button>
          <button
            onClick={() => setActiveTab('grades')}
            className={`py-3 rounded-2xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${activeTab === 'grades' ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
          >
            📊 نمره‌ها
          </button>
          <button
            onClick={() => setActiveTab('geometry')}
            className={`py-3 rounded-2xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 col-span-2 ${activeTab === 'geometry' ? 'bg-orange-600 text-white shadow-lg' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
          >
            📐 آزمایشگاه هندسه
          </button>
        </div>

        {/* Daily Wonder Card */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-5 shadow-lg border border-green-100">
          <h3 className="font-bold text-green-800 mb-2 flex items-center text-sm">
            <span className="ml-2 text-lg">✨</span> شگفتی امروز ریاضی
          </h3>
          <p className="text-xs font-bold text-green-700 mb-1">{dailyWonder.title}</p>
          <p className="text-[11px] text-green-800 leading-relaxed">
            {dailyWonder.text}
          </p>
        </div>

        {/* Quick Links Card */}
        <div className="bg-white rounded-3xl p-5 shadow-xl border border-orange-100 bg-gradient-to-b from-white to-orange-50">
          <h3 className="font-bold text-orange-800 mb-3 flex items-center text-sm">
            <span className="ml-2 text-lg">🚩</span> رفع اشکال سریع
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {MISTAKE_TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => handleMistakeTopicClick(topic)}
                className="px-2 py-2 bg-orange-100 text-orange-700 rounded-xl text-[10px] font-bold hover:bg-orange-200 transition-colors border border-orange-200 shadow-sm"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-5 text-white shadow-xl min-h-[100px] flex flex-col justify-center mb-4">
          <p className="text-sm font-medium mb-1 italic">"{MATH_QUOTES[currentQuoteIndex].text}"</p>
          <p className="text-[10px] opacity-80 text-left">— {MATH_QUOTES[currentQuoteIndex].author}</p>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col bg-white rounded-3xl shadow-2xl border border-blue-50 overflow-hidden h-[85vh] md:h-auto transition-all">
        {activeTab === 'chat' && (
          <>
            <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
                  <span className="text-xl">✨</span>
                </div>
                <div>
                  <h2 className="font-bold text-gray-800 text-sm md:text-base">گفتگو با معلم صبور</h2>
                  <p className="text-[10px] text-green-600 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full ml-1 animate-pulse"></span>
                    همیشه در کنار تو
                  </p>
                </div>
              </div>
            </div>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50 space-y-2 scroll-smooth custom-scrollbar"
            >
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
              {isLoading && (
                <div className="flex justify-start animate-pulse">
                  <div className="bg-white rounded-2xl p-4 shadow-sm border-r-4 border-blue-300">
                    <div className="flex gap-1 text-xs font-bold text-blue-500">درحال جستجوی بهترین منابع برای تو...</div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="هر چی دوست داری بپرس..."
                  className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-lg disabled:opacity-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform rotate-180"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </form>
              <p className="text-[9px] text-gray-400 mt-2 text-center">یادت باشه، تو از هر مسئله‌ای بزرگتری! ❤️</p>
            </div>
          </>
        )}

        {activeTab === 'games' && (
          <div className="flex-1 flex flex-col h-full animate-fade-in">
             <div className="p-4 border-b bg-gray-50 flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center shadow-inner text-xl">🎮</div>
                <h2 className="font-bold text-gray-800 text-sm md:text-base">اتاقک بازی ریاضی</h2>
              </div>
              <button onClick={() => setActiveTab('chat')} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold border border-blue-100">برگشت به گفتگو</button>
            </div>
            <MathGameRoom />
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="flex-1 flex flex-col h-full animate-fade-in">
             <div className="p-4 border-b bg-gray-50 flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shadow-inner text-xl">🎥</div>
                <h2 className="font-bold text-gray-800 text-sm md:text-base">کتابخانه ویدیوها</h2>
              </div>
              <button onClick={() => setActiveTab('chat')} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold border border-blue-100">برگشت به گفتگو</button>
            </div>
            <VideoLibrary onChapterSelect={handleChapterVideoRequest} />
          </div>
        )}

        {activeTab === 'grades' && (
          <div className="flex-1 flex flex-col h-full animate-fade-in">
             <div className="p-4 border-b bg-gray-50 flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shadow-inner text-xl">📊</div>
                <h2 className="font-bold text-gray-800 text-sm md:text-base">تحلیل نمره‌ها</h2>
              </div>
              <button onClick={() => setActiveTab('chat')} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold border border-blue-100">برگشت به گفتگو</button>
            </div>
            <GradeAnalysis />
          </div>
        )}

        {activeTab === 'geometry' && (
          <div className="flex-1 flex flex-col h-full animate-fade-in">
             <div className="p-4 border-b bg-gray-50 flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shadow-inner text-xl">📐</div>
                <h2 className="font-bold text-gray-800 text-sm md:text-base">آزمایشگاه هندسه</h2>
              </div>
              <button onClick={() => setActiveTab('chat')} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold border border-blue-100">برگشت به گفتگو</button>
            </div>
            <GeometryRoom />
          </div>
        )}
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
        .animate-fade-in { animation: fadeIn 0.3s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default App;
