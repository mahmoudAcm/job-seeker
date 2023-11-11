import { ReactNode } from 'react';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className='container mx-auto px-[1rem] max-lg:max-w-[calc(100%-2rem)]'>
      <div className='grid min-h-screen justify-center items-center py-[2rem] text-center'>{children}</div>
    </div>
  );
}
