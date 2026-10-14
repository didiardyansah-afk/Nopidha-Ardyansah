import React from 'react';
import { ExamDocument } from '../types';
import { QUESTION_TYPE_LABELS } from '../data/kurikulumMerdekaIps';
import { QuestionCardStimulus } from './QuestionCardStimulus';

interface KartuSoalViewProps {
  document: ExamDocument;
}

export const KartuSoalView: React.FC<KartuSoalViewProps> = ({ document: doc }) => {
  const { schoolProfile, examConfig, questions } = doc;

  return (
    <div className="space-y-8 max-w-4xl mx-auto print-container">
      {/* HEADER RINGKASAN */}
      <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-200 text-center mb-4">
        <h3 className="text-base font-bold uppercase tracking-wider text-slate-900">
          KARTU SOAL ASESMEN KURIKULUM MERDEKA
        </h3>
        <h4 className="text-xs font-semibold text-slate-700 mt-0.5">
          {schoolProfile.schoolName} · MATA PELAJARAN: IPS SMP KELAS {examConfig.grade}
        </h4>
        <div className="text-[11px] text-slate-500 mt-1">
          Tahun Pelajaran: {schoolProfile.academicYear} · Semester: {schoolProfile.semester} · Penelaah: {schoolProfile.principalName}
        </div>
      </div>

      {/* DAFTAR KARTU SOAL (1 Card per butir soal) */}
      {questions.map((q) => (
        <div
          key={q.id}
          className="bg-white p-6 rounded-xl shadow-xs border-2 border-slate-300 page-break-inside-avoid text-xs text-slate-900"
        >
          {/* Header Kartu */}
          <div className="border-b-2 border-slate-900 pb-2 mb-3 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-sm uppercase text-indigo-950">
                KARTU SOAL NOMOR {q.number}
              </div>
              <div className="text-[11px] text-slate-600">
                Satuan Pendidikan: {schoolProfile.schoolName}
              </div>
            </div>
            <div className="text-right">
              <span className="bg-indigo-900 text-white font-bold px-2.5 py-1 rounded text-[11px]">
                {QUESTION_TYPE_LABELS[q.type]}
              </span>
            </div>
          </div>

          {/* Tabel Metadata Kisi-Kisi Kartu Soal */}
          <table className="w-full border border-slate-300 mb-3">
            <tbody>
              <tr>
                <td className="w-36 bg-slate-100 font-semibold p-1.5 border border-slate-300">
                  Mata Pelajaran
                </td>
                <td className="p-1.5 border border-slate-300">Ilmu Pengetahuan Sosial (IPS SMP)</td>
                <td className="w-32 bg-slate-100 font-semibold p-1.5 border border-slate-300">
                  Penyusun Soal
                </td>
                <td className="p-1.5 border border-slate-300">{schoolProfile.teacherName}</td>
              </tr>
              <tr>
                <td className="bg-slate-100 font-semibold p-1.5 border border-slate-300">
                  Kelas / Fase
                </td>
                <td className="p-1.5 border border-slate-300">Kelas {examConfig.grade} / Fase D</td>
                <td className="bg-slate-100 font-semibold p-1.5 border border-slate-300">
                  Tahun Pelajaran
                </td>
                <td className="p-1.5 border border-slate-300">{schoolProfile.academicYear}</td>
              </tr>
              <tr>
                <td className="bg-slate-100 font-semibold p-1.5 border border-slate-300">
                  Tujuan Pembelajaran
                </td>
                <td colSpan={3} className="p-1.5 border border-slate-300 leading-snug">
                  {examConfig.learningGoal}
                </td>
              </tr>
              <tr>
                <td className="bg-slate-100 font-semibold p-1.5 border border-slate-300">
                  Materi Pokok
                </td>
                <td colSpan={3} className="p-1.5 border border-slate-300 font-medium">
                  {examConfig.topic}
                </td>
              </tr>
              <tr>
                <td className="bg-slate-100 font-semibold p-1.5 border border-slate-300">
                  Indikator Soal
                </td>
                <td colSpan={3} className="p-1.5 border border-slate-300 leading-snug">
                  {q.indicator}
                </td>
              </tr>
              <tr>
                <td className="bg-slate-100 font-semibold p-1.5 border border-slate-300">
                  Level Kognitif
                </td>
                <td className="p-1.5 border border-slate-300 font-bold">
                  {q.cognitiveLevel}
                </td>
                <td className="bg-slate-100 font-semibold p-1.5 border border-slate-300">
                  Domain Asesmen
                </td>
                <td className="p-1.5 border border-slate-300 font-medium">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      q.competencyDomain === 'literasi'
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : q.competencyDomain === 'numerasi'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {q.competencyDomain === 'literasi'
                      ? 'Literasi Membaca'
                      : q.competencyDomain === 'numerasi'
                      ? 'Numerasi IPS'
                      : 'Pemahaman Konsep'}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="bg-slate-100 font-semibold p-1.5 border border-slate-300">
                  Buku Sumber
                </td>
                <td colSpan={3} className="p-1.5 border border-slate-300 italic text-slate-600">
                  {q.sourceBook || `Buku Siswa IPS SMP Kelas ${examConfig.grade} Kurikulum Merdeka Kemendikbudristek`}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Rumusan Butir Soal */}
          <div className="border border-slate-300 rounded p-3 mb-3 bg-white">
            <div className="font-bold text-slate-800 uppercase text-[11px] mb-1.5">
              Rumusan Butir Soal:
            </div>
            {q.stimulus && <QuestionCardStimulus stimulus={q.stimulus} />}
            <p className="leading-relaxed font-medium text-slate-900 mt-1">{q.questionText}</p>

            {/* Opsi jika pilihan ganda - Format Menurun A, B, C, D */}
            {q.options && q.options.length > 0 && (
              <div className="space-y-1 mt-2 pl-2 text-slate-800">
                {q.options.map((opt, i) => (
                  <div key={i}>{opt}</div>
                ))}
              </div>
            )}
            {/* Opsi jika PG Kompleks */}
            {q.complexOptions && q.complexOptions.length > 0 && (
              <div className="space-y-1 mt-2 pl-2">
                {q.complexOptions.map((c, i) => (
                  <div key={i}>[ ] {c.text}</div>
                ))}
              </div>
            )}
            {/* Menjodohkan */}
            {q.matchingPairs && q.matchingPairs.length > 0 && (
              <div className="mt-2 text-[11px]">
                <table className="w-full border border-slate-200">
                  <tbody>
                    {q.matchingPairs.map((p, i) => (
                      <tr key={i}>
                        <td className="p-1 border border-slate-200">{p.left}</td>
                        <td className="p-1 border border-slate-200">{p.right}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Kunci Jawaban & Penskoran */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-2.5 bg-slate-50 border border-slate-300 rounded">
            <div>
              <span className="font-bold text-slate-700 block text-[11px]">Kunci Jawaban:</span>
              <span className="font-extrabold text-indigo-900 text-xs">{q.answerKey}</span>
            </div>
            <div>
              <span className="font-bold text-slate-700 block text-[11px]">Pedoman Penskoran:</span>
              <span className="text-slate-700 italic text-[11px]">{q.rubric} (Skor Maksimal: {q.maxScore})</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
