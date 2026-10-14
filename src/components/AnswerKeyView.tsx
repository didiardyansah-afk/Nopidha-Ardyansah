import React from 'react';
import { ExamDocument } from '../types';
import { QUESTION_TYPE_LABELS } from '../data/kurikulumMerdekaIps';

interface AnswerKeyViewProps {
  document: ExamDocument;
}

export const AnswerKeyView: React.FC<AnswerKeyViewProps> = ({ document: doc }) => {
  const { schoolProfile, examConfig, questions } = doc;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xs border border-slate-200 text-slate-900 leading-relaxed print-container max-w-4xl mx-auto">
      {/* KOP RESMI */}
      <div className="print-kop border-b-2 border-slate-900 pb-3 mb-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 shrink-0 flex items-center justify-center">
            {schoolProfile.logoUrl ? (
              <img
                src={schoolProfile.logoUrl}
                alt="Logo Sekolah"
                className="max-h-16 max-w-16 object-contain"
              />
            ) : (
              <svg className="w-14 h-14 text-indigo-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L1 21h22L12 2zm0 3.5l7.5 13.5H4.5L12 5.5z" />
              </svg>
            )}
          </div>
          <div className="text-center flex-1">
            <h4 className="text-xs font-bold tracking-wider uppercase text-slate-800">
              PEMERINTAH KABUPATEN {schoolProfile.subdistrictCity.toUpperCase()}
            </h4>
            <h4 className="text-xs font-bold tracking-wider uppercase text-slate-800">
              DINAS PENDIDIKAN DAN KEBUDAYAAN
            </h4>
            <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-wide text-slate-950">
              {schoolProfile.schoolName}
            </h2>
            <p className="text-[11px] text-slate-600 leading-tight">
              {schoolProfile.schoolAddress}
            </p>
          </div>
        </div>
      </div>

      {/* JUDUL DOKUMEN */}
      <div className="text-center mb-6">
        <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900">
          KUNCI JAWABAN DAN PEMBAHASAN ASESMEN
        </h3>
        <h4 className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">
          MATA PELAJARAN: ILMU PENGETAHUAN SOSIAL (IPS) · SMP KELAS {examConfig.grade}
        </h4>
        <div className="text-xs text-slate-600 mt-1">
          {examConfig.examTitle} · Tahun Pelajaran {schoolProfile.academicYear} · Semester {schoolProfile.semester}
        </div>
      </div>

      {/* DAFTAR KUNCI JAWABAN CEPAT */}
      <div className="mb-6 p-4 bg-slate-50 border border-slate-300 rounded-lg">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
          Rekap Kunci Jawaban Cepat:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 text-xs">
          {questions.map((q) => (
            <div
              key={q.id}
              className="p-1.5 bg-white border border-slate-200 rounded flex items-center justify-between"
            >
              <span className="font-semibold text-slate-500">No. {q.number}:</span>
              <span className="font-bold text-indigo-700 truncate ml-1">{q.answerKey}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RINCIAN PEMBAHASAN DAN RUBRIK LENGKAP */}
      <div className="space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-1 border-b border-slate-300">
          Rincian Pembahasan & Pedoman Penskoran:
        </div>

        {questions.map((q) => (
          <div
            key={q.id}
            className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs page-break-inside-avoid"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">Nomor {q.number}</span>
                <span className="text-[11px] text-slate-600 font-medium">
                  ({QUESTION_TYPE_LABELS[q.type]})
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">
                  {q.cognitiveLevel}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  {q.learningExperience}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                  Skor Maks: {q.maxScore}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="md:col-span-1">
                <div className="font-semibold text-slate-700 text-[11px]">Kunci Jawaban:</div>
                <div className="font-bold text-indigo-900 text-xs mt-0.5 bg-indigo-50 p-2 rounded border border-indigo-200">
                  {q.answerKey}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="font-semibold text-slate-700 text-[11px]">Pedoman Penskoran:</div>
                <div className="text-slate-700 mt-0.5 bg-white p-2 rounded border border-slate-200 italic">
                  {q.rubric}
                </div>
              </div>
            </div>

            <div>
              <div className="font-semibold text-slate-700 text-[11px]">Pembahasan & Analisis Materi:</div>
              <p className="text-slate-800 leading-relaxed mt-0.5 bg-white p-2.5 rounded border border-slate-200">
                {q.explanation}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* TANDA TANGAN LEGALISASI */}
      <div className="page-break-inside-avoid mt-10 pt-4 border-t border-slate-300 grid grid-cols-2 text-center text-xs text-slate-800">
        <div>
          <div>Mengetahui,</div>
          <div>Kepala {schoolProfile.schoolName}</div>
          <div className="h-16"></div>
          <div className="font-bold underline text-slate-900">{schoolProfile.principalName}</div>
          <div>NIP. {schoolProfile.principalNip}</div>
        </div>
        <div>
          <div>{schoolProfile.subdistrictCity}, ................................... 2025</div>
          <div>Guru Mata Pelajaran IPS</div>
          <div className="h-16"></div>
          <div className="font-bold underline text-slate-900">{schoolProfile.teacherName}</div>
          <div>NIP. {schoolProfile.teacherNip}</div>
        </div>
      </div>
    </div>
  );
};
