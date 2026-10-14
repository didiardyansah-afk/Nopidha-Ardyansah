import React, { useState } from 'react';
import { SchoolProfile } from '../types';

interface SchoolSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: SchoolProfile;
  onSave: (updated: SchoolProfile) => void;
}

export const SchoolSettingsModal: React.FC<SchoolSettingsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [formData, setFormData] = useState<SchoolProfile>({ ...profile });
  const [logoPreview, setLogoPreview] = useState<string>(profile.logoUrl);

  if (!isOpen) return null;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        setFormData((prev) => ({ ...prev, logoUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-8">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="font-semibold text-base">Pengaturan Identitas Sekolah & Kop Surat</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Logo Section */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Logo Resmi Sekolah
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white border border-slate-300 rounded flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo Sekolah" className="w-full h-full object-contain p-1" />
                ) : (
                  <div className="text-center p-1">
                    <svg className="w-8 h-8 mx-auto text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L1 21h22L12 2zm0 3.5l7.5 13.5H4.5L12 5.5z"/>
                    </svg>
                    <span className="text-[9px] text-slate-400 font-medium">Logo Standar</span>
                  </div>
                )}
              </div>
              <div className="space-y-1.5 flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                />
                <p className="text-[11px] text-slate-500">
                  Format PNG, JPG, atau SVG. Logo akan otomatis tercetak pada Kop Surat resmi naskah soal dan dokumen kisi-kisi.
                </p>
                {logoPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setLogoPreview('');
                      setFormData((p) => ({ ...p, logoUrl: '' }));
                    }}
                    className="text-[11px] text-rose-600 hover:underline"
                  >
                    Gunakan logo standar
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* School Name & Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Sekolah <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.schoolName}
                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                placeholder="Contoh: SMP NEGERI 2 GUMELAR"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kabupaten / Kota & Provinsi
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={formData.subdistrictCity}
                  onChange={(e) => setFormData({ ...formData, subdistrictCity: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  placeholder="Banyumas"
                />
                <input
                  type="text"
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  placeholder="Jawa Tengah"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Alamat Lengkap Sekolah <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              required
              value={formData.schoolAddress}
              onChange={(e) => setFormData({ ...formData, schoolAddress: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              placeholder="Contoh: Jl. Raya Gumelar No. 12, Kec. Gumelar, Kab. Banyumas, Jawa Tengah 53165"
            />
          </div>

          {/* Principal Info */}
          <div className="p-3.5 bg-indigo-50/50 border border-indigo-100 rounded-lg">
            <div className="text-xs font-semibold text-indigo-900 mb-2">Identitas Kepala Sekolah</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-700 mb-1">Nama Kepala Sekolah Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  value={formData.principalName}
                  onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  placeholder="Nopidha Ardyansah, S.Pd., M.Pd."
                />
              </div>
              <div>
                <label className="block text-xs text-slate-700 mb-1">NIP Kepala Sekolah</label>
                <input
                  type="text"
                  required
                  value={formData.principalNip}
                  onChange={(e) => setFormData({ ...formData, principalNip: e.target.value })}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  placeholder="19780512 200501 1 008"
                />
              </div>
            </div>
          </div>

          {/* Teacher Info */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="text-xs font-semibold text-slate-800 mb-2">Identitas Guru Pengampu IPS</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-700 mb-1">Nama Guru Mata Pelajaran & Gelar</label>
                <input
                  type="text"
                  required
                  value={formData.teacherName}
                  onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  placeholder="Nama Guru Pengampu"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-700 mb-1">NIP Guru Pengampu</label>
                <input
                  type="text"
                  required
                  value={formData.teacherNip}
                  onChange={(e) => setFormData({ ...formData, teacherNip: e.target.value })}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  placeholder="19840214 200902 1 003"
                />
              </div>
            </div>
          </div>

          {/* Academic Year & Semester */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tahun Pelajaran</label>
              <input
                type="text"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                placeholder="2024/2025"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Semester</label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value as 'Ganjil' | 'Genap' })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                <option value="Ganjil">Semester Ganjil (Gasal)</option>
                <option value="Genap">Semester Genap</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
            >
              Simpan Identitas Sekolah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
