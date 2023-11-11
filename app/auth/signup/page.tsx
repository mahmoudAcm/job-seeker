'use client';
import Input from '@/src/components/ui/Input';
import Link from 'next/link';
import Button from '@/src/components/ui/Button';
import { useState } from 'react';
import { cn } from '@/src/utils/cn';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InferType } from 'yup';
import { createUserWithEmailAndPassword } from '@/src/lib/firebase';
import { FirebaseError } from '@firebase/app';
import { useRouter } from 'next/navigation';

const signUpSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  name: yup.string().required('Username is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf(
      [
        yup.ref('password'),
        // @ts-ignore
        null
      ],
      'Passwords do not match'
    )
    .required('Confirm Password is required')
});

export default function Signup() {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signUpSchema),
    reValidateMode: 'onChange'
  });

  const onSubmit = async (data: InferType<typeof signUpSchema>) => {
    try {
      setSubmitting(true);
      if (currentStep === 2) {
        await createUserWithEmailAndPassword(data.email, data.password, data.name);
        return router.push('/profile');
      }
      setCurrentStep(2);
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          setError('email', { message: 'Email already in use' });
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className='grid gap-[62px]' onSubmit={handleSubmit(onSubmit)}>
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
        <Input placeholder='Name' className='w-full' {...register('name')} errorMessage={errors.name?.message} />
        <Input
          placeholder='Email address'
          className='w-full'
          type='email'
          {...register('email')}
          errorMessage={errors.email?.message}
        />
        <Input
          placeholder='Password'
          className='w-full'
          {...register('password')}
          errorMessage={errors.password?.message}
        />
        <Input
          placeholder='Confirm password'
          className='w-full'
          {...register('confirmPassword')}
          errorMessage={errors.confirmPassword?.message}
        />
      </div>
      <Button type='submit' disabled={isSubmitting}>
        {currentStep === 1 ? 'Continue' : 'Sign up'}
      </Button>
      <p className='mx-auto text-[#624BFF] font-[500] text-[0.875rem] leading-[1.71429] select-none'>
        Already have an account ?{' '}
        <Link href='/auth/signin' className='font-[700]'>
          Sign in
        </Link>
      </p>
    </form>
  );
}
