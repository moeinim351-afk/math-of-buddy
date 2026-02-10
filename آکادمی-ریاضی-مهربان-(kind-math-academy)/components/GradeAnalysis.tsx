
import React, { useState } from 'react';

interface GradeEntry {
  id: string;
  value: number;
  date: string;
  label: string;
}

const GradeAnalysis: React.FC = () => {
  const [grades, setGrades] = useState<GradeEntry[]>([]);
  const [newValue, setNewValue] = useState('');
  const [newLabel, setNewLabel] = useState('');

  const addGrade = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newValue);
    if (isNaN(val) || val < 0 || val > 20) return;

    // Get current date in Shamsi (Persian)
    const shamsiDate = new Intl.DateTimeFormat('fa-IR').format(new Date());

    const newEntry: GradeEntry = {
      id: Date.now().toString(),
      value: val,
      date: shamsiDate,
      label: newLabel || `آزمون ${grades.length + 1}`
    };

    setGrades([...grades, newEntry]);
    setNewValue('');
    setNewLabel('');
  };

  const removeGrade = (id: string) => {
    setGrades(grades.filter(g => g.id !== id));
  };

  // Chart Logic
  const canAnalyze = grades.length >= 2;
  const maxGrade = 20;
  const chartHeight = 200;
  const chartWidth = 400;
  const padding = 40;

  const getPoints = () => {
    if (grades.length < 2) return "";
    const xStep = (chartWidth - padding * 2) / (grades.length - 1);
    return grades.map((g, i) => {
      const x = padding + i * xStep;
      const y = chartHeight - padding - (g.value / maxGrade) * (chartHeight - padding * 2);
      return `${x},${y}`;
    }).join(" ");
  };

  return (
    <div className="flex-1 p-6 bg-white overflow-y-auto custom-scrollbar">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl">📊</div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">تحلیل پیشرفت تحصیلی</h2>
            <p className="text-xs text-gray-500">نمره‌های خود را وارد کن تا روندت را تحلیل کنیم</p>
          </div>
        </div>

        <div className="bg-purple-50 rounded-3xl p-6 border border-purple-100 mb-8">
          <form onSubmit={addGrade} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-purple-700 mr-2">نمره (۰ تا ۲۰)</label>
              <input
                type="number"
                step="0.25"
                min="0"
                max="20"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="مثلاً: ۱۹.۵"
                className="px-4 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-purple-700 mr-2">موضوع آزمون</label>
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="مثلاً: میان‌ترم اول"
                className="px-4 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-xl transition-all shadow-md text-sm"
              >
                ثبت نمره جدید ✨
              </button>
            </div>
          </form>
        </div>

        {grades.length > 0 && (
          <div className="mb-8">
            <h3 className="font-bold text-gray-700 mb-4 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              لیست نمرات ثبت شده
            </h3>
            <div className="space-y-2">
              {grades.map((g) => (
                <div key={g.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white transition-all shadow-sm group">
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 flex items-center justify-center bg-white rounded-xl font-bold text-purple-600 border border-purple-100">{g.value}</span>
                    <div>
                      <div className="text-xs font-bold text-gray-800">{g.label}</div>
                      <div className="text-[9px] text-gray-500">{g.date}</div>
                    </div>
                  </div>
                  <button onClick={() => removeGrade(g.id)} className="text-red-300 hover:text-red-500 p-2 transition-colors opacity-0 group-hover:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {canAnalyze ? (
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-6 text-sm flex items-center gap-2">
              <span className="text-lg">📈</span> تحلیل نموداری پیشرفت
            </h3>
            <div className="w-full flex justify-center overflow-x-auto pb-4">
              <svg width={chartWidth} height={chartHeight} className="overflow-visible">
                {/* Grid lines */}
                {[0, 5, 10, 15, 20].map(val => {
                  const y = chartHeight - padding - (val / maxGrade) * (chartHeight - padding * 2);
                  return (
                    <g key={val}>
                      <line x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="#f3f4f6" strokeWidth="1" />
                      <text x={padding - 10} y={y + 4} textAnchor="end" className="text-[10px] fill-gray-400 font-sans">{val}</text>
                    </g>
                  );
                })}
                {/* Points and Labels */}
                {grades.map((g, i) => {
                  const xStep = (chartWidth - padding * 2) / (grades.length - 1);
                  const x = padding + i * xStep;
                  const y = chartHeight - padding - (g.value / maxGrade) * (chartHeight - padding * 2);
                  return (
                    <g key={g.id}>
                      <circle cx={x} cy={y} r="5" className="fill-purple-600 stroke-white stroke-2" />
                      <text x={x} y={chartHeight - padding + 20} textAnchor="middle" className="text-[8px] fill-gray-500 font-bold" transform={`rotate(15, ${x}, ${chartHeight - padding + 20})`}>{g.label}</text>
                    </g>
                  );
                })}
                {/* Line */}
                <polyline
                  fill="none"
                  stroke="#9333ea"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={getPoints()}
                  className="drop-shadow-sm"
                />
              </svg>
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3 italic">
              <div className="text-xl">💡</div>
              <p className="text-xs text-blue-800 leading-relaxed">
                {grades[grades.length-1].value >= grades[grades.length-2].value 
                  ? "آفرین قهرمان! روند نمودارت صعودیه. همین تلاش هوشمندانه رو ادامه بده."
                  : "افت نمره توی نمودار کاملاً طبیعیه و مثل یه سکوی پرش برای موفقیت‌های بعدی عمل می‌کنه. نگران نباش!"}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-orange-50 rounded-3xl p-8 text-center border border-orange-100 border-dashed">
            <div className="text-4xl mb-3">📍</div>
            <p className="text-sm font-bold text-orange-800">برای مشاهده تحلیل نموداری حداقل به ۲ نمره نیاز داریم</p>
            <p className="text-xs text-orange-600 mt-2">نمره‌های خودت رو از آزمون‌های مختلف وارد کن تا با هم روندت رو بررسی کنیم.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeAnalysis;
