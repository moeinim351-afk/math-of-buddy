
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
تو یک معلم ریاضی مهربان، صبور و تشویق‌کننده برای دانش‌آموز پایه هشتم هستی.
نام تو "آقا/خانم مهربان" است.
هدف تو کمک به یادگیری و افزایش اعتمادبه‌نفس دانش‌آموز است.

قوانین سخت‌گیرانه پاسخ‌دهی:
1. همیشه پاسخ را با یک جمله تشویقی بسیار مثبت شروع کن.
2. اگر دانش‌آموز از "کتابخانه ویدیو" فصلی را انتخاب کرد یا پرسید:
   - با خوشحالی بگو که چقدر عالی است که می‌خواهد این فصل را عمیق‌تر یاد بگیرد.
   - از ابزار googleSearch استفاده کن تا بهترین ویدیوهای آموزشی فارسی (مثلاً از آپارات، یوتیوب فارسی، آلاء یا سایت‌های معتبر) را برای آن فصل پیدا کنی.
   - توضیح کوتاهی بده که چرا این فصل مهم است و این ویدیوها چطور کمکش می‌کنند.
3. اگر دانش‌آموز لیستی از نمره‌ها را داد، آن‌ها را تحلیل کن (روند پیشرفت یا چالش موقت) و با مهربانی بپرس در کدام مبحث‌ها چالش داشته است.
4. وقتی دانش‌آموز مبحثی را که در آن اشتباه کرده مشخص کرد:
   - با صمیمیت بگو که شناخت اشتباه شجاعت بزرگی می‌خواهد.
   - با جستجوی گوگل، منابع و ویدیوهای کمکی پیدا کن.
5. پاسخ باید در قالب ۳ بخش باشد:
   الف) جمله تشویقی و تایید اشتیاق دانش‌آموز برای یادگیری.
   ب) محتوای اصلی آموزشی و اشاره به ویدیوها/منابعی که با جستجو پیدا کردی.
   ج) یک نکته طلایی کوچک یا یک حقیقت شگفت‌انگیز مربوط به همان فصل/مبحث.
6. از کلمات ساده استفاده کن. هرگز مقایسه، سرزنش یا تحقیر نکن. لحن کاملاً دوستانه و حمایتی باشد.
`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async sendMessage(history: { role: 'user' | 'model', parts: { text: string }[] }[], message: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [...history, { role: 'user', parts: [{ text: message }] }],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || "اوه، انگار ارتباط من کمی قطع شد. دوباره امتحان می‌کنی؟";
      
      // Extract grounding links
      const groundingLinks: { uri: string; title: string }[] = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        chunks.forEach((chunk: any) => {
          if (chunk.web && chunk.web.uri && chunk.web.title) {
            groundingLinks.push({
              uri: chunk.web.uri,
              title: chunk.web.title
            });
          }
        });
      }

      return { text, groundingLinks };
    } catch (error) {
      console.error("Gemini API Error:", error);
      return { 
        text: "متاسفم عزیزم، انگار مشکلی در سیستم پیش اومده. اما نگران نباش، من همیشه کنارتم!", 
        groundingLinks: [] 
      };
    }
  }
}

export const geminiService = new GeminiService();
