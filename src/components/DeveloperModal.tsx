import React from 'react';
import { DEVELOPER_INFO } from '../data/kurikulumMerdekaIps';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-indigo-200 hover:text-white p-1 rounded transition-colors"
          >
            ✕
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-indigo-300 flex items-center justify-center text-2xl font-bold text-white shadow-inner">
              NA
            </div>
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-indigo-300">
                Profil Resmi Pengembang
              </span>
              <h3 className="text-lg font-bold text-white leading-tight mt-0.5">
                {DEVELOPER_INFO.name}
              </h3>
              <p className="text-xs text-indigo-200 mt-1">
                {DEVELOPER_INFO.role} · {DEVELOPER_INFO.regency}
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-sm text-slate-700">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="text-xs font-semibold text-slate-900 mb-1">
              Institusi Pendidikan:
            </div>
            <p className="text-xs text-slate-600">
              SMP Negeri 2 Gumelar, Kabupaten Banyumas, Propinsi Jawa Tengah
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Dedikasi & Visi Pengembangan
            </h4>
            <p className="text-xs leading-relaxed text-slate-600">
              Aplikasi ini dirancang khusus guna membantu Bapak/Ibu guru IPS jenjang SMP dalam mengimplementasikan asesmen bermutu tinggi berbasis Kurikulum Merdeka. Dengan integrasi level kognitif (LOTS, MOTS, HOTS) dan pengalaman belajar (Memahami, Mengaplikasi, Merefleksi), guru dapat dengan mudah menghasilkan 5 instrumen asesmen lengkap (Naskah Soal, Kisi-Kisi, Kartu Soal, Kunci Jawaban, dan Norma Penilaian skor 100) secara otomatis dan siap cetak.
            </p>
          </div>

          <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-xs text-slate-500">
            <span>© 2024–2026 Nopidha Ardyansah, S.Pd., M.Pd.</span>
            <span>Banyumas, Jawa Tengah</span>
          </div>

          <div className="pt-2 text-right">
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
