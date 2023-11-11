'use client';
import Input from '@/src/components/ui/Input';
import Link from 'next/link';
import Button from '@/src/components/ui/Button';
import { useState } from 'react';
import { cn } from '@/src/utils/cn';

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <>
      <div className='absolute right-[46px] top-[53px] flex gap-[10px]'>
        {Array.from({ length: 2 }).map((_, index) => (
          <span
            key={index}
            className={cn(
              'w-[20px] h-[20px] rounded-full grid place-items-center text-white bg-[#624BFF33] text-[0.8125rem] font-[500] select-none',
              {
                'bg-[#624BFF]': currentStep >= index + 1
              }
            )}
          >
            {index + 1}
          </span>
        ))}
      </div>
      <h1 className='text-center text-[3.25rem] font-[700] leading-[78px] mt-[100px]'>Sign up</h1>
      <div className={cn('grid gap-[35px]', { hidden: currentStep === 2 })}>
        <Input placeholder='Username' className='w-full' />
        <Input placeholder='Email address' className='w-full' />
        <Input placeholder='Confirm password' className='w-full' />
        <Input placeholder='Password' className='w-full' />
      </div>
      <Button
        onClick={() => {
          setCurrentStep(2);
        }}
        disabled
      >
        {currentStep === 1 ? 'Continue' : 'Sign up'}
      </Button>
      <p className='mx-auto text-[#624BFF] font-[500] text-[0.875rem] leading-[1.71429] select-none'>
        Already have an account ?{' '}
        <Link href='/auth/signin' className='font-[700]'>
          Sign in
        </Link>
      </p>
    </>
  );
}
