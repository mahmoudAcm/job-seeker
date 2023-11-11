'use client';
import Image from 'next/image';
import profilePicture from './pfp.svg';
import Button from '@/src/components/ui/Button';
import { signOut } from '@/src/lib/firebase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/hooks/useAuth';

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

export default function Profile() {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) {
    return <h3 className='text-2xl'>loading...</h3>;
  }

  if (!user) return router.replace('/auth/signin');

  const names = user.displayName?.split(' ') ?? [];

  const [firstCharsFirstName] = (names[0] ?? '') as unknown as string[];
  const [firstCharsLastName] = (names[1] ?? '') as unknown as string[];

  return (
    <>
      <div>
        <div className='w-[11.25rem] h-[11.25rem] rounded-full overflow-hidden mx-auto mb-[2.81rem] bg-gray-200 grid place-content-center text-[2rem] uppercase text-gray-500'>
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
      <div className='flex md:gap-[60px] gap-[1.5rem] justify-between flex-wrap mt-[62px]'>
        {infos.map((info, index) => (
          <div key={index} className='grid'>
            <span className='text-[clamp(1.125rem,0.589rem_+_2.679vw,3rem)] font-[400]'>{info.count}</span>
            <span className='text-[#6C6C6C]'>{info.title}</span>
          </div>
        ))}
      </div>
      <a href='' className='text-[1.125rem] leading-[27px] text-[#624BFF] underline mt-[62px]'>
        View CV
      </a>
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
