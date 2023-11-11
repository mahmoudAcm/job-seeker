// components/PdfModal.tsx
import React, { FC } from 'react';

type PdfModalProps = {
  url: string;
  isOpen: boolean;
  onClose: () => void;
};

const PdfModal: FC<PdfModalProps> = ({ url, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-full max-w-4xl p-5 mx-4 bg-white rounded-lg shadow-xl'>
        <span className='absolute top-0 right-0 p-2'>
          <button
            onClick={onClose}
            className='text-black bg-transparent hover:bg-gray-200 rounded-full text-2xl p-2 leading-none outline-none focus:outline-none'
          >
            &times;
          </button>
        </span>
        <div className='mt-3 text-center'>
          <iframe src={url} className='w-full h-[calc(100vh-5rem)] border-none' title='pdf'></iframe>
        </div>
      </div>
    </div>
  );
};

export default PdfModal;
