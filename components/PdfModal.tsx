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
      <div className='relative mx-4 w-full max-w-4xl rounded-lg bg-white p-5 shadow-xl'>
        <span className='absolute top-0 right-0 p-2'>
          <button
            onClick={onClose}
            className='rounded-full bg-transparent p-2 text-2xl leading-none text-black outline-none hover:bg-gray-200 focus:outline-none'
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
