import React from 'react';
import { ExamDocument, QuestionItem, QuestionType } from '../types';
import { QuestionCardStimulus } from './QuestionCardStimulus';
import { QUESTION_TYPE_LABELS } from '../data/kurikulumMerdekaIps';

interface ExamSheetViewProps {
  document: ExamDocument;
}

export const ExamSheetView: React.FC<ExamSheetViewProps> = ({ document: doc }) => {
  const { schoolProfile, examConfig, questions } = doc;

  // Group questions by type to present them neatly as official school exams do
  const questionsByType: Partial<Record<QuestionType, QuestionItem[]>> = {};
  const order: QuestionType[] = [
    'pilihan_ganda',
    'pilihan_ganda_kompleks',
    'menjodohkan',
    'benar_salah',
    'isian_singkat',
    'uraian',
  ];

  order.forEach((t) => {
    const list = questions.filter((q) => q.type === t);
    if (list.length > 0) {
      questionsByType[t] = list;
    }
  });

  const getSectionTitle = (type: QuestionType, index: number) => {
    const roman = ['I', 'II', 'III', 'IV', 'V', 'VI'][index] || `${index + 1}`;
    switch (type) {
      case 'pilihan_ganda':
        return `BAGIAN ${roman}: SOAL PILIHAN GANDA (Pilihlah salah satu jawaban yang paling tepat dengan memberi tanda silang (X) pada huruf A, B, C, atau D)`;
      case 'pilihan_ganda_kompleks':
        return `BAGIAN ${roman}: SOAL PILIHAN GANDA KOMPLEKS (Pilihlah lebih dari satu jawaban yang benar sesuai stimulus)`;
      case 'menjodohkan':
        return `BAGIAN ${roman}: SOAL MENJODOHKAN (Pasangkanlah pernyataan di Kolom Kiri dengan jawaban yang tepat di Kolom Kanan)`;
      case 'benar_salah':
        return `BAGIAN ${roman}: SOAL BENAR – SALAH (Berilah tanda centang atau lingkari huruf B jika pernyataan BENAR dan S jika SALAH)`;
      case 'isian_singkat':
        return `BAGIAN ${roman}: SOAL ISIAN SINGKAT (Isilah titik-titik di bawah ini dengan jawaban yang singkat dan tepat)`;
      case 'uraian':
        return `BAGIAN ${roman}: SOAL URAIAN / ESAI (Jawablah pertanyaan-pertanyaan berikut dengan uraian yang jelas, sistematis, dan logis)`;
      default:
        return `BAGIAN ${roman}: ${QUESTION_TYPE_LABELS[type]}`;
    }
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-xl shadow-xs border border-slate-200 text-slate-900 leading-relaxed print-container max-w-4xl mx-auto">
      {/* KOP SURAT RESMI */}
      <div className="print-kop border-b-2 border-slate-900 pb-3 mb-5">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 shrink-0 flex items-center justify-center">
            {schoolProfile.logoUrl ? (
              <img
                src={schoolProfile.logoUrl}
                alt="Logo Sekolah"
                className="max-h-20 max-w-20 object-contain"
              />
            ) : (
              <svg className="w-16 h-16 text-indigo-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L1 21h22L12 2zm0 3.5l7.5 13.5H4.5L12 5.5z" />
              </svg>
            )}
          </div>
          <div className="text-center flex-1">
            <h4 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-800">
              PEMERINTAH KABUPATEN {schoolProfile.subdistrictCity.toUpperCase()}
            </h4>
            <h4 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-800">
              DINAS PENDIDIKAN DAN KEBUDAYAAN
            </h4>
            <h2 className="text-base sm:text-xl font-extrabold uppercase tracking-wide text-slate-950 mt-0.5">
              {schoolProfile.schoolName}
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-tight">
              {schoolProfile.schoolAddress}
            </p>
          </div>
        </div>
      </div>

      {/* JUDUL NASKAH SOAL */}
      <div className="text-center mb-6">
        <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900">
          NASKAH SOAL {examConfig.examTitle.toUpperCase()}
        </h3>
        <h4 className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">
          MATA PELAJARAN: ILMU PENGETAHUAN SOSIAL (IPS SMP) · KURIKULUM MERDEKA
        </h4>
        <div className="text-xs text-slate-600 mt-1">
          Tahun Pelajaran: {schoolProfile.academicYear} · Semester: {schoolProfile.semester}
        </div>
      </div>

      {/* KARTU IDENTITAS SISWA */}
      <div className="border border-slate-300 rounded p-3 mb-6 bg-slate-50 text-xs grid grid-cols-2 sm:grid-cols-4 gap-3 print:bg-white print:border-slate-800">
        <div>
          <span className="text-slate-500 block text-[10px] uppercase">Mata Pelajaran:</span>
          <span className="font-bold text-slate-900">IPS SMP</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase">Kelas / Fase:</span>
          <span className="font-bold text-slate-900">Kelas {examConfig.grade} (Fase D)</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase">Alokasi Waktu:</span>
          <span className="font-bold text-slate-900">{examConfig.timeAllocation} Menit</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase">Nama Lengkap Siswa:</span>
          <span className="font-semibold text-slate-700 border-b border-dotted border-slate-400 block pt-1">
            ..................................................
          </span>
        </div>
      </div>

      {/* PETUNJUK UMUM */}
      <div className="mb-6 p-3 bg-amber-50/70 border border-amber-200 rounded text-xs text-slate-800 print:bg-white print:border-slate-400">
        <div className="font-bold text-amber-950 mb-1">PETUNJUK UMUM ASESMEN:</div>
        <ol className="list-decimal list-inside space-y-0.5 text-[11px] leading-relaxed text-slate-700">
          <li>Tulislah nama, nomor peserta, dan kelas Anda pada lembar jawab yang telah disediakan.</li>
          <li>Periksa dan bacalah setiap butir soal dengan teliti sebelum Anda menjawabnya.</li>
          <li>Laporkan kepada pengawas jika terdapat tulisan yang kurang jelas, rusak, atau jumlah soal kurang.</li>
          <li>Dahulukan menjawab soal-soal yang Anda anggap mudah.</li>
          <li>Periksalah kembali seluruh pekerjaan Anda sebelum diserahkan kepada pengawas ujian.</li>
        </ol>
      </div>

      {/* BUTIR SOAL PER BAGIAN */}
      <div className="space-y-8">
        {order.map((t, sIdx) => {
          const sectionQuestions = questionsByType[t];
          if (!sectionQuestions || sectionQuestions.length === 0) return null;

          return (
            <div key={t} className="space-y-4">
              <div className="bg-slate-100 px-3 py-1.5 rounded font-bold text-xs uppercase tracking-wide text-slate-800 border-l-4 border-indigo-600 print:bg-transparent print:border-l-0 print:border-b print:border-slate-900 print:px-0">
                {getSectionTitle(t, sIdx)}
              </div>

              <div className="space-y-5">
                {sectionQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="page-break-inside-avoid space-y-2 text-sm text-slate-800 pl-1"
                  >
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-slate-900 shrink-0 w-6">
                        {q.number}.
                      </span>
                      <div className="flex-1 space-y-2">
                        {/* Stimulus jika ada */}
                        {q.stimulus && <QuestionCardStimulus stimulus={q.stimulus} />}

                        {/* Teks Soal */}
                        <p className="leading-relaxed text-slate-900 font-medium">
                          {q.questionText}
                        </p>

                        {/* Pilihan Ganda Standard - Format Menurun A, B, C, D */}
                        {q.type === 'pilihan_ganda' && q.options && (
                          <div className="space-y-1.5 pt-1 pl-2">
                            {q.options.map((opt, optIdx) => (
                              <div key={optIdx} className="text-xs text-slate-800 leading-snug flex items-start">
                                <span>{opt}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Pilihan Ganda Kompleks */}
                        {q.type === 'pilihan_ganda_kompleks' && q.complexOptions && (
                          <div className="space-y-1.5 pt-1 pl-1">
                            {q.complexOptions.map((cOpt, cIdx) => (
                              <div key={cIdx} className="flex items-center gap-2 text-xs text-slate-800">
                                <span className="inline-block w-4 h-4 border border-slate-400 rounded-xs shrink-0"></span>
                                <span>{cOpt.text}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Menjodohkan */}
                        {q.type === 'menjodohkan' && q.matchingPairs && (
                          <div className="pt-2">
                            <table className="w-full text-xs border border-slate-300">
                              <thead>
                                <tr className="bg-slate-100">
                                  <th className="border border-slate-300 p-2 text-left w-1/2">
                                    Kolom Kiri (Konsep / Peristiwa)
                                  </th>
                                  <th className="border border-slate-300 p-2 text-left w-1/2">
                                    Kolom Kanan (Definisi / Makna)
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {q.matchingPairs.map((pair, pIdx) => (
                                  <tr key={pIdx}>
                                    <td className="border border-slate-300 p-2">{pair.left}</td>
                                    <td className="border border-slate-300 p-2">{pair.right}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Benar - Salah */}
                        {q.type === 'benar_salah' && q.trueFalseStatements && (
                          <div className="pt-2">
                            <table className="w-full text-xs border border-slate-300">
                              <thead>
                                <tr className="bg-slate-100">
                                  <th className="border border-slate-300 p-2 text-left">Pernyataan Soal</th>
                                  <th className="border border-slate-300 p-2 text-center w-24">Pilihan</th>
                                </tr>
                              </thead>
                              <tbody>
                                {q.trueFalseStatements.map((tf, tfIdx) => (
                                  <tr key={tfIdx}>
                                    <td className="border border-slate-300 p-2">{tf.statement}</td>
                                    <td className="border border-slate-300 p-2 text-center font-bold">
                                      [ B ] / [ S ]
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Isian Singkat */}
                        {q.type === 'isian_singkat' && (
                          <div className="pt-2 text-xs text-slate-500 italic">
                            Jawaban: ............................................................................................................
                          </div>
                        )}

                        {/* Uraian */}
                        {q.type === 'uraian' && (
                          <div className="pt-3 min-h-[50px] border-b border-dotted border-slate-300">
                            <div className="text-[11px] text-slate-400 italic mb-2">
                              (Ruang jawaban uraian siswa)
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* TANDA TANGAN LEGALISASI */}
      <div className="page-break-inside-avoid mt-12 pt-6 border-t border-slate-300 grid grid-cols-2 text-center text-xs text-slate-800">
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
