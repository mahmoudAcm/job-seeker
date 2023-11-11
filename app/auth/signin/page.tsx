import Input from '@/src/components/ui/Input';
import Link from 'next/link';
import Button from '@/src/components/ui/Button';

export default function Signin() {
  return (
    <>
      <h1 className='text-center text-[3.25rem] font-[700] leading-[78px]'>Sign in</h1>
      <div className='grid gap-[35px]'>
        <Input placeholder='Enter email' className='w-full' />
        <Input placeholder='Password' className='w-full' />
      </div>
      <Button>Sign in</Button>
      <Link
        href='/auth/signup'
        className='mx-auto text-[#624BFF] font-[500] text-[0.875rem] leading-[1.71429] select-none'
      >
        Create An Account
      </Link>
    </>
  );
}
