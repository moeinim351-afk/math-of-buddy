
import React from 'react';
import { MATH_CHAPTERS } from '../constants';

interface VideoLibraryProps {
  onChapterSelect: (title: string) => void;
}

const VideoLibrary: React.FC<VideoLibraryProps> = ({ onChapterSelect }) => {
  return (
    <div className="flex-1 p-6 bg-white overflow-y-auto custom-scrollbar">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner">🎥</div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">کتابخانه جامع ویدیوهای هشتم</h2>
            <p className="text-xs text-gray-500">فصل مورد نظرت رو انتخاب کن تا بهترین آموزش‌ها رو برات پیدا کنم</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MATH_CHAPTERS.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => onChapterSelect(chapter.title)}
              className="group p-5 bg-gray-50 hover:bg-blue-600 rounded-3xl border border-gray-100 hover:border-blue-400 transition-all duration-300 text-right shadow-sm hover:shadow-xl flex flex-col gap-3 active:scale-95"
            >
              <div className="w-10 h-10 bg-white group-hover:bg-blue-500 rounded-xl flex items-center justify-center text-xl shadow-inner transition-colors">🎬</div>
              <div>
                <h3 className="text-sm font-bold text-gray-800 group-hover:text-white transition-colors">{chapter.title}</h3>
                <p className="text-[10px] text-gray-400 group-hover:text-blue-100 mt-1">مشاهده ویدیوهای آموزشی و مکمل</p>
              </div>
              <div className="mt-2 text-blue-600 group-hover:text-white text-[10px] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                جستجو در منابع معتبر
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-3xl p-6 border border-blue-100 flex items-center gap-6">
          <div className="text-4xl">🎓</div>
          <div>
            <h4 className="font-bold text-blue-900 text-sm">یادگیری بصری چطوری کمک می‌کنه؟</h4>
            <p className="text-xs text-blue-800 mt-1 leading-relaxed">
              تحقیقات نشون میده مغز ما مفاهیم ریاضی رو وقتی به صورت تصویری و متحرک می‌بینه، خیلی سریع‌تر و عمیق‌تر درک می‌کنه. این ویدیوها بهت کمک می‌کنن تا غول ریاضی رو به یه دوست تبدیل کنی!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLibrary;
