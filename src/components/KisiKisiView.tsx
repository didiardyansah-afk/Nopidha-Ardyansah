import React from 'react';
import { ExamDocument } from '../types';
import { QUESTION_TYPE_LABELS } from '../data/kurikulumMerdekaIps';

interface KisiKisiViewProps {
  document: ExamDocument;
}

export const KisiKisiView: React.FC<KisiKisiViewProps> = ({ document: doc }) => {
  const { schoolProfile, examConfig, questions } = doc;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xs border border-slate-200 text-slate-900 leading-relaxed print-container max-w-5xl mx-auto">
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

      {/* JUDUL KISI-KISI */}
      <div className="text-center mb-6">
        <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900">
          KISI-KISI PENULISAN SOAL ASESMEN
        </h3>
        <h4 className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">
          MATA PELAJARAN: ILMU PENGETAHUAN SOSIAL (IPS) · SMP KELAS {examConfig.grade}
        </h4>
        <div className="text-xs text-slate-600 mt-1">
          Tahun Pelajaran: {schoolProfile.academicYear} · Semester: {schoolProfile.semester} · Kurikulum Merdeka
        </div>
      </div>

      {/* TABEL KISI-KISI LENGKAP */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs border border-slate-400">
          <thead>
            <tr className="bg-slate-100 text-slate-900 font-bold text-center">
              <th className="border border-slate-400 p-2 w-10">No</th>
              <th className="border border-slate-400 p-2 w-44">Tujuan Pembelajaran (TP)</th>
              <th className="border border-slate-400 p-2 w-36">Materi Pokok</th>
              <th className="border border-slate-400 p-2">Indikator Soal & Stimulus</th>
              <th className="border border-slate-400 p-2 w-20">Level Kognitif</th>
              <th className="border border-slate-400 p-2 w-24">Domain AKM</th>
              <th className="border border-slate-400 p-2 w-24">Pengalaman Belajar</th>
              <th className="border border-slate-400 p-2 w-28">Bentuk Soal</th>
              <th className="border border-slate-400 p-2 w-14">No. Soal</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, idx) => (
              <tr key={q.id} className="hover:bg-slate-50">
                <td className="border border-slate-400 p-2 text-center font-medium">
                  {idx + 1}
                </td>
                <td className="border border-slate-400 p-2 text-slate-700 leading-snug">
                  {examConfig.learningGoal}
                </td>
                <td className="border border-slate-400 p-2 text-slate-800 font-medium">
                  {examConfig.topic}
                </td>
                <td className="border border-slate-400 p-2 text-slate-700 leading-snug">
                  {q.indicator}
                  {q.stimulus && (
                    <span className="block text-[10px] text-indigo-700 font-semibold mt-1">
                      [Disajikan Stimulus: {q.stimulus.title || 'Visual Gambar/Grafik'}]
                    </span>
                  )}
                </td>
                <td className="border border-slate-400 p-2 text-center font-bold">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] ${
                      q.cognitiveLevel === 'HOTS'
                        ? 'bg-rose-100 text-rose-800'
                        : q.cognitiveLevel === 'MOTS'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {q.cognitiveLevel}
                  </span>
                </td>
                <td className="border border-slate-400 p-2 text-center font-bold">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] ${
                      q.competencyDomain === 'literasi'
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : q.competencyDomain === 'numerasi'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {q.competencyDomain === 'literasi'
                      ? 'Literasi'
                      : q.competencyDomain === 'numerasi'
                      ? 'Numerasi'
                      : 'Konsep'}
                  </span>
                </td>
                <td className="border border-slate-400 p-2 text-center">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                      q.learningExperience === 'Merefleksi'
                        ? 'bg-purple-100 text-purple-800'
                        : q.learningExperience === 'Mengaplikasi'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-cyan-100 text-cyan-800'
                    }`}
                  >
                    {q.learningExperience}
                  </span>
                </td>
                <td className="border border-slate-400 p-2 text-slate-800 text-center">
                  {QUESTION_TYPE_LABELS[q.type]}
                </td>
                <td className="border border-slate-400 p-2 text-center font-bold text-slate-900">
                  {q.number}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
