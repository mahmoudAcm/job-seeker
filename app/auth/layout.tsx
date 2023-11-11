import { ReactNode } from 'react';
import Image from 'next/image';
import sideLogo from './side-logo.svg';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='container mx-auto px-[1rem] max-lg:max-w-[calc(100%-2rem)]'>
      <div className='grid lg:grid-cols-[min(100%,386px)_min(100%,440px)] items-center justify-center gap-[116px] min-h-screen py-[2rem]'>
        <Image src={sideLogo} alt='side-logo' className='hidden lg:block' priority />
        {children}
      </div>
    </div>
  );
}
