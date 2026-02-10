
import React, { useState } from 'react';

const GeometryRoom: React.FC = () => {
  const [sideA, setSideA] = useState<number>(3);
  const [sideB, setSideB] = useState<number>(4);

  const sideC = Math.sqrt(sideA * sideA + sideB * sideB);
  
  // Scale for SVG drawing
  const scale = 20;
  const offset = 40;

  return (
    <div className="flex-1 p-6 bg-white overflow-y-auto custom-scrollbar animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner">📐</div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">آزمایشگاه هندسه (فیثاغورس)</h2>
            <p className="text-xs text-gray-500">اضلاع رو تغییر بده تا ببینی چطور وتر به دست میاد!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-orange-50 p-8 rounded-3xl border border-orange-100 mb-8 shadow-sm">
          {/* Controls */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="flex justify-between text-xs font-bold text-orange-800">
                <span>ضلع اول (a):</span>
                <span className="bg-white px-2 rounded-lg">{sideA}</span>
              </label>
              <input 
                type="range" min="1" max="10" step="0.1" 
                value={sideA} 
                onChange={(e) => setSideA(parseFloat(e.target.value))}
                className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
            </div>

            <div className="space-y-2">
              <label className="flex justify-between text-xs font-bold text-orange-800">
                <span>ضلع دوم (b):</span>
                <span className="bg-white px-2 rounded-lg">{sideB}</span>
              </label>
              <input 
                type="range" min="1" max="10" step="0.1" 
                value={sideB} 
                onChange={(e) => setSideB(parseFloat(e.target.value))}
                className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
            </div>

            <div className="p-4 bg-white rounded-2xl border border-orange-200 shadow-inner">
              <p className="text-[10px] text-gray-400 mb-1">فرمول جادویی:</p>
              <p className="text-lg font-mono font-bold text-orange-700 text-center">
                a² + b² = c²
              </p>
              <div className="mt-3 text-xs text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>{sideA}² + {sideB}² = c²</span>
                  <span>جایگذاری</span>
                </div>
                <div className="flex justify-between font-bold text-gray-800">
                  <span>{(sideA**2).toFixed(1)} + {(sideB**2).toFixed(1)} = {(sideC**2).toFixed(1)}</span>
                  <span>محاسبه توان</span>
                </div>
                <div className="flex justify-between text-orange-600 font-bold border-t pt-1">
                  <span>وتر (c) ≈ {sideC.toFixed(2)}</span>
                  <span>جذر نهایی</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="flex flex-col items-center justify-center">
            <svg 
              width="250" height="250" 
              viewBox="0 0 250 250" 
              className="drop-shadow-2xl bg-white rounded-2xl p-4 border border-white"
            >
              {/* Triangle path */}
              <path 
                d={`M ${offset} ${250-offset} L ${offset + sideB * scale} ${250-offset} L ${offset} ${250 - offset - sideA * scale} Z`}
                fill="rgba(249, 115, 22, 0.1)"
                stroke="#ea580c"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              
              {/* Side Labels */}
              <text x={offset + (sideB * scale)/2} y={250-offset + 20} textAnchor="middle" className="text-[10px] fill-orange-800 font-bold">b = {sideB}</text>
              <text x={offset - 25} y={250-offset - (sideA * scale)/2} textAnchor="middle" transform={`rotate(-90, ${offset - 25}, ${250-offset - (sideA * scale)/2})`} className="text-[10px] fill-orange-800 font-bold">a = {sideA}</text>
              <text x={offset + (sideB * scale)/2 + 10} y={250-offset - (sideA * scale)/2 - 10} textAnchor="middle" className="text-[12px] fill-orange-600 font-black">c ≈ {sideC.toFixed(2)}</text>
              
              {/* Right Angle Indicator */}
              <rect x={offset} y={250-offset-15} width="15" height="15" fill="none" stroke="#ea580c" strokeWidth="1" opacity="0.5" />
            </svg>
            <p className="text-[10px] text-gray-400 mt-4 italic text-center">مثلث قائم‌الزاویه همزمان با تغییر اضلاع ساخته میشه!</p>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100 flex gap-4">
          <div className="text-3xl">💡</div>
          <div>
            <h4 className="font-bold text-indigo-900 text-sm">نکته معلم صبور:</h4>
            <p className="text-xs text-indigo-800 mt-1 leading-relaxed">
              عزیزم، فیثاغورس فقط برای مثلث‌هایی کار می‌کنه که یه زاویه ۹۰ درجه (قائمه) دارن. 
              خیلی راحت میتونی با داشتن دو ضلع، ضلع بلندتر یعنی "وتر" رو پیدا کنی. 
              وتر همیشه روبه‌روی زاویه ۹۰ درجه قرار داره و بلندترین ضلع مثلثه!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeometryRoom;
