import { ReactNode } from 'react';
import { getCvUrl } from '@/src/lib/firebase';
import Profile from '@/src/components/Profile';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function ProfileLayout({ children }: { children: ReactNode }) {
  const userId = cookies().get('_uid')?.value;

  if (!userId) return redirect('/auth/signin');

  const cvUrl = await getCvUrl(userId);

  return (
    <div className='container mx-auto px-[1rem] max-lg:max-w-[calc(100%-2rem)]'>
      <div className='grid min-h-screen items-center justify-center text-center py-[2rem]'>
        <Profile cvUrl={cvUrl} />
        {children}
      </div>
    </div>
  );
}
