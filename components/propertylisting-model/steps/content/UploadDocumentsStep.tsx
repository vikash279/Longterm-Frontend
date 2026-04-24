'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Check, FileText, Info, RefreshCw, Trash2 } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import type { DocumentUpload, ListPropertyFormData } from '../../ListPropertyModels';

const documentTypes: DocumentUpload[] = [
  { id: 'reg', name: 'Property Registration', desc: 'Legal deed or registration certificate' },
  { id: 'tax', name: 'Tax ID / GST Certificate', desc: 'Business tax registration document' },
  { id: 'id', name: 'Owner Identity Proof', desc: 'Passport, Aadhaar, or Driving License' },
  { id: 'fire', name: 'Fire Safety Certificate', desc: 'Valid NOC from fire department' },
  { id: 'trade', name: 'Trade License', desc: 'Local municipal trade permit' }
];

interface UploadDocumentsStepProps {
  formData: ListPropertyFormData;
  setFormData: Dispatch<SetStateAction<ListPropertyFormData>>;
  title?: string;
  subtitle?: string;
  onValidityChange?: (isValid: boolean) => void;
}

export default function UploadDocumentsStep({ formData, setFormData, title, subtitle, onValidityChange }: UploadDocumentsStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingDocId, setUploadingDocId] = useState<string | null>(null);

  const triggerUpload = (id: string) => {
    setUploadingDocId(id);
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !uploadingDocId) return;

    const doc = documentTypes.find(d => d.id === uploadingDocId);
    if (!doc) return;

    const currentDocId = uploadingDocId;
    setFormData(prev => ({
      ...prev,
      documents: [
        ...prev.documents.filter(d => d.id !== currentDocId),
        { id: currentDocId, name: doc.name, fileName: file.name, status: 'Uploading', progress: 0 }
      ]
    }));

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 25) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFormData(prev => ({
          ...prev,
          documents: prev.documents.map(d =>
            d.id === currentDocId ? { ...d, status: 'Uploaded', progress } : d
          )
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          documents: prev.documents.map(d =>
            d.id === currentDocId ? { ...d, progress } : d
          )
        }));
      }
    }, 300);

    setUploadingDocId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  useEffect(() => {
    const hasUploadedDoc = formData.documents.some(doc => doc.status === 'Uploaded');
    onValidityChange?.(hasUploadedDoc);
  }, [formData.documents, onValidityChange]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-medium text-[#0F172A] tracking-tight mb-1">
          {title ?? 'Upload Documents'}
        </h2>
        <p className="text-[#64748B] text-sm font-medium">
          {subtitle ?? 'Verify your property ownership.'}
        </p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.jpg,.jpeg,.png"
      />

      <div className="grid grid-cols-1 gap-3">
        {documentTypes.map(doc => {
          const uploadedDoc = formData.documents.find(d => d.id === doc.id);
          const isUploaded = uploadedDoc?.status === 'Uploaded';
          const isUploading = uploadedDoc?.status === 'Uploading';

          return (
            <div
              key={doc.id}
              className={`flex flex-col p-3 rounded-xl border transition-all ${
                isUploaded
                  ? 'border-emerald-100 bg-emerald-50/30'
                  : isUploading
                    ? 'border-blue-100 bg-blue-50/20'
                    : 'border-slate-100 bg-white hover:border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isUploaded
                      ? 'bg-emerald-100 text-emerald-600'
                      : isUploading
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-slate-50 text-slate-400'
                  }`}>
                    {isUploading ? <RefreshCw size={18} className="animate-spin" /> : <FileText size={18} />}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#0F172A] tracking-tight leading-none mb-1">{doc.name}</h4>
                    <p className="text-[10px] font-medium text-slate-400">
                      {isUploaded ? (
                        <span className="text-emerald-600 flex items-center">
                          <Check size={10} className="mr-1" /> {uploadedDoc?.fileName}
                        </span>
                      ) : isUploading ? (
                        <span className="text-blue-600">Uploading {uploadedDoc?.fileName}...</span>
                      ) : doc.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {isUploaded && (
                    <button
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          documents: prev.documents.filter(d => d.id !== doc.id)
                        }));
                      }}
                      className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => !isUploading && triggerUpload(doc.id)}
                    disabled={isUploading}
                    className={`px-4 py-1.5 rounded-lg font-black text-[9px] uppercase tracking-wider transition-all ${
                      isUploaded
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : isUploading
                          ? 'bg-blue-500 text-white cursor-not-allowed'
                          : 'bg-slate-950 text-white hover:bg-slate-800'
                    }`}
                  >
                    {isUploaded ? 'REPLACE' : isUploading ? `${uploadedDoc?.progress ?? 0}%` : 'UPLOAD'}
                  </button>
                </div>
              </div>

              {isUploading && (
                <div className="mt-3 w-full bg-blue-100 rounded-full h-1 overflow-hidden">
                  <div
                    className="bg-blue-500 h-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadedDoc?.progress ?? 0}%` }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-start space-x-3">
        <Info className="text-amber-500 shrink-0 mt-0.5" size={14} />
        <p className="text-[10px] font-medium text-amber-700 leading-relaxed">
          Documents are encrypted and stored securely. Verification typically takes 24-48 hours after publishing.
        </p>
      </div>
    </div>
  );
}
