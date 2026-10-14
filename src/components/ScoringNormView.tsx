import React from 'react';
import { ExamDocument } from '../types';
import { calculateScoringNorms } from '../data/kurikulumMerdekaIps';

interface ScoringNormViewProps {
  document: ExamDocument;
}

export const ScoringNormView: React.FC<ScoringNormViewProps> = ({ document: doc }) => {
  const { schoolProfile, examConfig, questions } = doc;
  const { norms, totalRawScore, totalScore } = calculateScoringNorms(questions);

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

      {/* JUDUL */}
      <div className="text-center mb-6">
        <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900">
          NORMA PENILAIAN DAN PEDOMAN PENSKORAN ASESMEN
        </h3>
        <h4 className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">
          MATA PELAJARAN: ILMU PENGETAHUAN SOSIAL (IPS) · SMP KELAS {examConfig.grade}
        </h4>
        <div className="text-xs font-semibold text-indigo-700 mt-1">
          STANDARISASI SKOR AKHIR: 100 (SERATUS) · KURIKULUM MERDEKA
        </div>
      </div>

      {/* TABEL 1: NORMA PEMBOBOTAN TERKALIBRASI SKOR 100 */}
      <div className="mb-6 space-y-2">
        <div className="font-bold text-xs uppercase text-slate-800">
          Tabel 1: Pembobotan dan Kalibrasi Skor Tiap Bentuk Soal (Total Skor 100)
        </div>
        <table className="w-full text-xs border border-slate-400">
          <thead>
            <tr className="bg-slate-100 text-center font-bold">
              <th className="border border-slate-400 p-2 w-10">No</th>
              <th className="border border-slate-400 p-2 text-left">Bentuk Soal</th>
              <th className="border border-slate-400 p-2 w-24">Jumlah Butir</th>
              <th className="border border-slate-400 p-2 w-28">Skor Mentah / Butir</th>
              <th className="border border-slate-400 p-2 w-28">Skor Maks Mentah</th>
              <th className="border border-slate-400 p-2 w-24">Bobot (%)</th>
              <th className="border border-slate-400 p-2 w-28">Skor Akhir (Maks)</th>
            </tr>
          </thead>
          <tbody>
            {norms.map((n, idx) => (
              <tr key={n.type} className="hover:bg-slate-50 text-center">
                <td className="border border-slate-400 p-2 font-medium">{idx + 1}</td>
                <td className="border border-slate-400 p-2 text-left font-semibold text-slate-800">
                  {n.typeName}
                </td>
                <td className="border border-slate-400 p-2">{n.count} Soal</td>
                <td className="border border-slate-400 p-2">{n.rawScorePerItem}</td>
                <td className="border border-slate-400 p-2 font-medium">{n.totalRawScore}</td>
                <td className="border border-slate-400 p-2">{n.weightPercentage}%</td>
                <td className="border border-slate-400 p-2 font-bold text-indigo-900">
                  {n.contributionTo100} Poin
                </td>
              </tr>
            ))}
            <tr className="bg-indigo-50 font-bold text-center border-t-2 border-indigo-300">
              <td colSpan={2} className="border border-slate-400 p-2 text-right uppercase">
                TOTAL KESELURUHAN:
              </td>
              <td className="border border-slate-400 p-2">{questions.length} Soal</td>
              <td className="border border-slate-400 p-2">-</td>
              <td className="border border-slate-400 p-2">{totalRawScore}</td>
              <td className="border border-slate-400 p-2">100%</td>
              <td className="border border-slate-400 p-2 text-indigo-950 font-extrabold text-sm">
                {totalScore}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* RUMUS FORMULA PENILAIAN */}
      <div className="mb-6 p-4 bg-slate-50 border border-slate-300 rounded-lg text-xs space-y-2">
        <div className="font-bold text-slate-800 uppercase">
          Rumus Penentuan Nilai Akhir (NA) Peserta Didik:
        </div>
        <div className="bg-white p-3 rounded border border-slate-200 font-mono text-center text-slate-900 text-xs font-semibold">
          Nilai Akhir (NA) = ∑ [ (Skor Mentah Diperoleh / Skor Mentah Maksimal) × Bobot Bentuk Soal ]
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          * Catatan: Jika asesmen hanya terdiri dari 1 bentuk soal (misal Pilihan Ganda saja), maka:
          <span className="font-semibold block font-mono mt-0.5">
            NA = (Jumlah Benar / Total Soal) × 100
          </span>
        </p>
      </div>

      {/* TABEL 2: KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP) */}
      <div className="mb-6 space-y-2">
        <div className="font-bold text-xs uppercase text-slate-800">
          Tabel 2: Interval Nilai & Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)
        </div>
        <table className="w-full text-xs border border-slate-400">
          <thead>
            <tr className="bg-slate-100 text-center font-bold">
              <th className="border border-slate-400 p-2 w-28">Interval Nilai</th>
              <th className="border border-slate-400 p-2 w-36">Kategori Capaian</th>
              <th className="border border-slate-400 p-2">Deskripsi Tindak Lanjut Pembelajaran</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-400 p-2 text-center font-bold text-emerald-800">
                86 – 100
              </td>
              <td className="border border-slate-400 p-2 font-bold text-emerald-800 text-center">
                Sangat Mahir
              </td>
              <td className="border border-slate-400 p-2 text-slate-700">
                Peserta didik telah melampaui tujuan pembelajaran materi IPS. Diberikan materi pengayaan (enrichment) dan proyek analisis kritis lanjutan.
              </td>
            </tr>
            <tr>
              <td className="border border-slate-400 p-2 text-center font-bold text-blue-800">
                71 – 85
              </td>
              <td className="border border-slate-400 p-2 font-bold text-blue-800 text-center">
                Mahir (Tuntas)
              </td>
              <td className="border border-slate-400 p-2 text-slate-700">
                Peserta didik telah mencapai tujuan pembelajaran secara memadai. Melanjutkan ke topik pembelajaran selanjutnya.
              </td>
            </tr>
            <tr>
              <td className="border border-slate-400 p-2 text-center font-bold text-amber-800">
                56 – 70
              </td>
              <td className="border border-slate-400 p-2 font-bold text-amber-800 text-center">
                Berkembang
              </td>
              <td className="border border-slate-400 p-2 text-slate-700">
                Peserta didik belum sepenuhnya memahami beberapa indikator kognitif. Diberikan bimbingan remedial terbimbing pada materi yang belum dikuasai.
              </td>
            </tr>
            <tr>
              <td className="border border-slate-400 p-2 text-center font-bold text-rose-800">
                0 – 55
              </td>
              <td className="border border-slate-400 p-2 font-bold text-rose-800 text-center">
                Perlu Bimbingan
              </td>
              <td className="border border-slate-400 p-2 text-slate-700">
                Peserta didik belum mencapai tujuan pembelajaran. Diperlukan intervensi remedial intensif dan pendampingan personal dari guru pengampu.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* TABEL 3: SIMULASI FORMAT BLANGKO REKAPITULASI NILAI KELAS */}
      <div className="space-y-2">
        <div className="font-bold text-xs uppercase text-slate-800">
          Tabel 3: Lembar Rekapitulasi Penilaian Hasil Belajar Siswa (Siap Cetak)
        </div>
        <table className="w-full text-xs border border-slate-400">
          <thead>
            <tr className="bg-slate-100 text-center font-bold">
              <th className="border border-slate-400 p-1.5 w-8">No</th>
              <th className="border border-slate-400 p-1.5 w-24">NIS / NISN</th>
              <th className="border border-slate-400 p-1.5 text-left">Nama Peserta Didik</th>
              <th className="border border-slate-400 p-1.5 w-16">Skor PG</th>
              <th className="border border-slate-400 p-1.5 w-16">Skor PGK</th>
              <th className="border border-slate-400 p-1.5 w-16">Skor Uraian</th>
              <th className="border border-slate-400 p-1.5 w-20">Nilai Akhir (0-100)</th>
              <th className="border border-slate-400 p-1.5 w-24">Ketercapaian</th>
            </tr>
          </thead>
          <tbody>
            {[
              { no: 1, nis: '2425001', name: 'Aditya Pratama Putra' },
              { no: 2, nis: '2425002', name: 'Alya Nur Farida' },
              { no: 3, nis: '2425003', name: 'Bagas Wahyu Nugroho' },
              { no: 4, nis: '2425004', name: 'Dewi Sekar Ayu' },
              { no: 5, nis: '2425005', name: 'Fajar Eka Saputra' },
            ].map((s) => (
              <tr key={s.no} className="text-center">
                <td className="border border-slate-400 p-1.5">{s.no}</td>
                <td className="border border-slate-400 p-1.5 font-mono text-[11px]">{s.nis}</td>
                <td className="border border-slate-400 p-1.5 text-left font-medium">{s.name}</td>
                <td className="border border-slate-400 p-1.5 text-slate-400">.....</td>
                <td className="border border-slate-400 p-1.5 text-slate-400">.....</td>
                <td className="border border-slate-400 p-1.5 text-slate-400">.....</td>
                <td className="border border-slate-400 p-1.5 font-bold text-slate-400">.....</td>
                <td className="border border-slate-400 p-1.5 text-slate-400">.....</td>
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
