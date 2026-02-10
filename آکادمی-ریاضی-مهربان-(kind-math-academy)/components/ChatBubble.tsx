
import React from 'react';
import { Message } from '../types';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isTeacher = message.role === 'model';

  return (
    <div className={`flex ${isTeacher ? 'justify-start' : 'justify-end'} mb-4 animate-fade-in`}>
      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 shadow-md ${
          isTeacher
            ? 'bg-white text-gray-800 rounded-tr-none border-r-4 border-blue-500'
            : 'bg-blue-600 text-white rounded-tl-none'
        }`}
      >
        <div className="flex items-center mb-1">
          <span className="text-[10px] font-bold opacity-70">
            {isTeacher ? 'معلم مهربان 👨‍🏫' : 'شما 🎓'}
          </span>
        </div>
        <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
          {message.text}
        </p>

        {isTeacher && message.groundingLinks && message.groundingLinks.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-[10px] font-bold text-blue-600 mb-2">📚 منابع و ویدیوهای پیشنهادی:</p>
            <div className="flex flex-col gap-2">
              {message.groundingLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-2 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-xs text-blue-800 font-medium border border-blue-100"
                >
                  <span className="ml-2">📺</span>
                  <span className="truncate">{link.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className={`text-[9px] mt-2 opacity-50 text-left`}>
          {message.timestamp.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
