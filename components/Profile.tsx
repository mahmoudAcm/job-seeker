'use client';
import Button from '@/src/components/ui/Button';
import { signOut } from '@/src/lib/firebase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/hooks/useAuth';
import { useEffect, useState } from 'react';
import PdfModal from '@/src/components/PdfModal';

const infos = [
  {
    count: 0,
    title: 'Shots'
  },
  {
    count: 0,
    title: 'Followers'
  },
  {
    count: 0,
    title: 'Following'
  }
];

interface ProfileProps {
  cvUrl: string;
}

export default function Profile({ cvUrl }: ProfileProps) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace('/auth/signin');
  }, [loading, user]);

  if (loading) {
    return <h3 className='text-2xl'>loading...</h3>;
  }

  if (!user) return null;

  const names = user.displayName?.split(' ') ?? [];

  const [firstCharsFirstName] = (names[0] ?? '') as unknown as string[];
  const [firstCharsLastName] = (names[1] ?? '') as unknown as string[];

  return (
    <>
      <div>
        <div className='mx-auto grid place-content-center overflow-hidden rounded-full bg-gray-200 uppercase text-gray-500 w-[11.25rem] h-[11.25rem] mb-[2.81rem] text-[2rem]'>
          {firstCharsFirstName}
          {firstCharsLastName}
        </div>
        <div className='grid gap-[1rem]'>
          <h2 className='text-[clamp(1.125rem,0.929rem_+_0.982vw,1.813rem)] font-[600] leading-[0.75862]'>
            {user?.displayName}
          </h2>
          <h3 className='text-[clamp(0.938rem,0.759rem_+_0.893vw,1.563rem)] font-[500] leading-[0.88] text-[#A4A4A4]'>
            {user?.email}
          </h3>
        </div>
      </div>
      <div className='flex flex-wrap justify-between gap-[1.5rem] mt-[62px] md:gap-[60px]'>
        {infos.map((info, index) => (
          <div key={index} className='grid'>
            <span className='text-[clamp(1.125rem,0.589rem_+_2.679vw,3rem)] font-[400]'>{info.count}</span>
            <span className='text-[#6C6C6C]'>{info.title}</span>
          </div>
        ))}
      </div>
      <a
        href={cvUrl}
        className='text-[1.125rem] leading-[27px] text-[#624BFF] underline mt-[62px]'
        onClick={event => {
          event.preventDefault();
          setOpen(true);
        }}
      >
        View CV
      </a>
      <PdfModal
        url={cvUrl}
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
        }}
      />
      <Button
        className='w-[min(100%,352px)] mt-[2.56rem] mx-auto'
        onClick={async () => {
          await signOut();
          return router.replace('/auth/signin');
        }}
      >
        Logout
      </Button>
    </>
  );
}
