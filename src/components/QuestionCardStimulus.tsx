import React from 'react';
import { Stimulus } from '../types';

interface QuestionCardStimulusProps {
  stimulus: Stimulus;
}

export const QuestionCardStimulus: React.FC<QuestionCardStimulusProps> = ({ stimulus }) => {
  return (
    <div
      className="stimulus-visual-card my-3 p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm"
      data-stimulus-id={stimulus.svgIcon || 'custom'}
    >
      {stimulus.title && (
        <div className="font-semibold text-xs tracking-wide text-indigo-900 mb-2 flex items-center gap-1.5">
          <svg className="w-4 h-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{stimulus.title}</span>
        </div>
      )}

      {/* Visual illustration graphics */}
      <div className="stimulus-visual-box my-2 flex justify-center">
        {stimulus.svgIcon === 'map-indonesia' && (
          <div className="w-full max-w-md bg-sky-50 border border-sky-200 rounded p-3 text-center">
            <svg
              className="w-full h-32 mx-auto"
              viewBox="0 0 400 120"
              width="400"
              height="120"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <marker id="arrow-alki" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#dc2626" />
                </marker>
              </defs>
              {/* Lautan Indonesia */}
              <rect width="400" height="120" fill="#e0f2fe" rx="4" />
              {/* Kepulauan Nusantara */}
              <path d="M20,60 Q35,45 60,65 T100,55 T120,70 L115,80 Q70,75 25,75 Z" fill="#0284c7" />
              <path d="M140,50 Q160,35 180,55 T210,65 L200,85 Q160,80 140,75 Z" fill="#0369a1" />
              <path d="M170,88 Q190,82 220,86 T260,88 L255,95 Q210,95 170,92 Z" fill="#0284c7" />
              <path d="M230,45 Q250,30 270,50 T300,55 L290,75 Q260,70 230,65 Z" fill="#0284c7" />
              <path d="M310,60 Q340,40 375,65 T390,80 L380,95 Q340,85 315,80 Z" fill="#0369a1" />
              {/* ALKI shipping lines */}
              <line x1="80" y1="20" x2="160" y2="105" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="4" />
              <line x1="200" y1="15" x2="215" y2="105" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="4" />
              <line x1="290" y1="15" x2="280" y2="105" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="4" />
              <text x="145" y="112" fill="#dc2626" fontSize="10" fontWeight="bold">ALKI I</text>
              <text x="218" y="112" fill="#dc2626" fontSize="10" fontWeight="bold">ALKI II</text>
              <text x="282" y="112" fill="#dc2626" fontSize="10" fontWeight="bold">ALKI III</text>
              <text x="20" y="22" fill="#0369a1" fontSize="9" fontWeight="bold">SAMUDRA HINDIA</text>
              <text x="260" y="25" fill="#0369a1" fontSize="9" fontWeight="bold">SAMUDRA PASIFIK</text>
            </svg>
            <div className="text-[11px] text-slate-700 mt-1 font-semibold">
              Peta Tematik: Alur Laut Kepulauan Indonesia (ALKI) & Posisi Geopolitik Nusantara
            </div>
          </div>
        )}

        {stimulus.svgIcon === 'market-curve' && (
          <div className="w-full max-w-sm bg-amber-50 border border-amber-200 rounded p-3 text-center">
            <svg
              className="w-full h-32 mx-auto"
              viewBox="0 0 240 120"
              width="240"
              height="120"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="240" height="120" fill="#fffbeb" rx="4" />
              <line x1="30" y1="10" x2="30" y2="100" stroke="#334155" strokeWidth="2" />
              <line x1="30" y1="100" x2="220" y2="100" stroke="#334155" strokeWidth="2" />
              {/* Axes labels */}
              <text x="8" y="20" fill="#1e293b" fontSize="9" fontWeight="bold">Harga (P)</text>
              <text x="165" y="114" fill="#1e293b" fontSize="9" fontWeight="bold">Kuantitas (Q)</text>
              {/* Demand curve */}
              <line x1="45" y1="25" x2="185" y2="90" stroke="#2563eb" strokeWidth="2.5" />
              <text x="188" y="93" fill="#2563eb" fontSize="10" fontWeight="bold">D</text>
              {/* Supply curves */}
              <line x1="45" y1="90" x2="185" y2="25" stroke="#16a34a" strokeWidth="2.5" />
              <text x="188" y="27" fill="#16a34a" fontSize="10" fontWeight="bold">S0</text>
              <line x1="85" y1="90" x2="225" y2="25" stroke="#059669" strokeWidth="2" strokeDasharray="4" />
              <text x="226" y="27" fill="#059669" fontSize="10" fontWeight="bold">S1</text>
              {/* Pergeseran kurva */}
              <line x1="120" y1="55" x2="150" y2="55" stroke="#dc2626" strokeWidth="2" />
              <polygon points="152,55 146,51 146,59" fill="#dc2626" />
            </svg>
            <div className="text-[11px] text-slate-700 mt-1 font-semibold">
              Kurva Pergeseran Penawaran Beras Saat Panen Raya (S0 ke S1)
            </div>
          </div>
        )}

        {stimulus.svgIcon === 'population-pyramid' && (
          <div className="w-full max-w-sm bg-emerald-50 border border-emerald-200 rounded p-3 text-center">
            <svg
              className="w-full h-32 mx-auto"
              viewBox="0 0 240 120"
              width="240"
              height="120"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="240" height="120" fill="#ecfdf5" rx="4" />
              <line x1="120" y1="10" x2="120" y2="105" stroke="#64748b" strokeWidth="1.5" />
              {/* Male bars (left) */}
              <rect x="95" y="15" width="25" height="10" fill="#93c5fd" />
              <rect x="70" y="30" width="50" height="10" fill="#60a5fa" />
              <rect x="40" y="45" width="80" height="12" fill="#3b82f6" />
              <rect x="35" y="60" width="85" height="12" fill="#2563eb" />
              <rect x="50" y="75" width="70" height="10" fill="#60a5fa" />
              <rect x="65" y="90" width="55" height="10" fill="#93c5fd" />
              {/* Female bars (right) */}
              <rect x="120" y="15" width="25" height="10" fill="#f9a8d4" />
              <rect x="120" y="30" width="50" height="10" fill="#f472b6" />
              <rect x="120" y="45" width="80" height="12" fill="#ec4899" />
              <rect x="120" y="60" width="85" height="12" fill="#db2777" />
              <rect x="120" y="75" width="70" height="10" fill="#f472b6" />
              <rect x="120" y="90" width="55" height="10" fill="#f9a8d4" />
              {/* Age markers */}
              <text x="12" y="55" fill="#1e3a8a" fontSize="8" fontWeight="bold">Usia Produktif (15-64)</text>
              <text x="12" y="24" fill="#64748b" fontSize="8">65+ th</text>
              <text x="12" y="98" fill="#64748b" fontSize="8">0-14 th</text>
            </svg>
            <div className="text-[11px] text-slate-700 mt-1 font-semibold">
              Infografis: Komposisi Usia Penduduk & Peluang Bonus Demografi
            </div>
          </div>
        )}

        {stimulus.svgIcon === 'digital-payment' && (
          <div className="w-full max-w-sm bg-violet-50 border border-violet-200 rounded p-3 text-center">
            <svg
              className="w-full h-28 mx-auto"
              viewBox="0 0 240 100"
              width="240"
              height="100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="240" height="100" fill="#f5f3ff" rx="4" />
              <rect x="10" y="25" width="55" height="50" rx="4" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
              <text x="17" y="45" fill="#6d28d9" fontSize="8" fontWeight="bold">Konsumen</text>
              <text x="14" y="58" fill="#6d28d9" fontSize="7">Smartphone</text>

              <line x1="70" y1="50" x2="105" y2="50" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3" />
              <polygon points="107,50 102,47 102,53" fill="#8b5cf6" />

              <rect x="108" y="20" width="45" height="60" rx="6" fill="#7c3aed" />
              <text x="117" y="45" fill="#ffffff" fontSize="9" fontWeight="bold">QRIS</text>
              <text x="112" y="60" fill="#e9d5ff" fontSize="7">GPN / BI</text>

              <line x1="156" y1="50" x2="185" y2="50" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3" />
              <polygon points="187,50 182,47 182,53" fill="#8b5cf6" />

              <rect x="188" y="25" width="50" height="50" rx="4" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
              <text x="195" y="45" fill="#6d28d9" fontSize="8" fontWeight="bold">Merchant</text>
              <text x="198" y="58" fill="#6d28d9" fontSize="7">UMKM</text>
            </svg>
            <div className="text-[11px] text-slate-700 mt-1 font-semibold">
              Bagan Alur Transaksi Digital Cepat Antara Konsumen dan Toko UMKM
            </div>
          </div>
        )}

        {stimulus.svgIcon === 'ship-relief' && (
          <div className="w-full max-w-sm bg-stone-100 border border-stone-300 rounded p-3 text-center">
            <svg
              className="w-full h-28 mx-auto"
              viewBox="0 0 240 100"
              width="240"
              height="100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="240" height="100" fill="#f5f5f4" rx="4" />
              {/* Ship hull */}
              <path d="M20,65 Q120,95 220,65 L190,85 Q120,95 50,85 Z" fill="#78716c" />
              {/* Cadik / Outrigger */}
              <line x1="30" y1="80" x2="210" y2="80" stroke="#44403c" strokeWidth="3" />
              {/* Mast & Sail */}
              <line x1="120" y1="20" x2="120" y2="70" stroke="#44403c" strokeWidth="2.5" />
              <path d="M120,25 Q170,40 160,65 L120,60 Z" fill="#d6d3d1" stroke="#57534e" strokeWidth="1.5" />
              {/* Waves */}
              <path d="M10,88 Q30,82 50,88 T90,88 T130,88 T170,88 T210,88 T240,88" fill="none" stroke="#0284c7" strokeWidth="2" />
            </svg>
            <div className="text-[11px] text-stone-800 mt-1 font-semibold">
              Ilustrasi Relief Perahu Bercadik Candi Borobudur (Teknologi Bahari Abad VIII)
            </div>
          </div>
        )}

        {stimulus.svgIcon === 'eco-chart' && (
          <div className="w-full max-w-sm bg-teal-50 border border-teal-200 rounded p-3 text-center">
            <svg
              className="w-full h-28 mx-auto"
              viewBox="0 0 240 100"
              width="240"
              height="100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="240" height="100" fill="#f0fdfa" rx="4" />
              {/* Pie chart segments */}
              <circle cx="70" cy="50" r="35" fill="#f43f5e" />
              {/* 54% organic slice */}
              <path d="M70,50 L70,15 A35,35 0 1,1 55,82 Z" fill="#10b981" />
              {/* 22% plastic slice */}
              <path d="M70,50 L55,82 A35,35 0 0,1 36,40 Z" fill="#3b82f6" />
              {/* Legend */}
              <rect x="130" y="25" width="10" height="10" fill="#10b981" />
              <text x="145" y="34" fill="#334155" fontSize="8" fontWeight="bold">Organik: 54%</text>
              <rect x="130" y="45" width="10" height="10" fill="#3b82f6" />
              <text x="145" y="54" fill="#334155" fontSize="8" fontWeight="bold">Plastik: 22%</text>
              <rect x="130" y="65" width="10" height="10" fill="#f43f5e" />
              <text x="145" y="74" fill="#334155" fontSize="8" fontWeight="bold">Lainnya: 24%</text>
            </svg>
            <div className="text-[11px] text-slate-700 mt-1 font-semibold">
              Komposisi Sampah Domestik Perkotaan Berdasarkan Jenis Bahan
            </div>
          </div>
        )}

        {stimulus.imageUrl && (
          <img
            src={stimulus.imageUrl}
            alt={stimulus.title || 'Stimulus Soal'}
            className="max-h-48 object-contain rounded border border-slate-200"
          />
        )}
      </div>

      {stimulus.text && (
        <p className="text-slate-700 text-xs italic leading-relaxed bg-white p-2.5 rounded border border-slate-200 mt-2">
          {stimulus.text}
        </p>
      )}

      {stimulus.caption && (
        <div className="text-[10px] text-slate-600 text-center mt-1.5 italic font-medium">
          {stimulus.caption}
        </div>
      )}
    </div>
  );
};
