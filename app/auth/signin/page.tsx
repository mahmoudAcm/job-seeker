'use client';
import Input from '@/src/components/ui/Input';
import Link from 'next/link';
import Button from '@/src/components/ui/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InferType } from 'yup';
import { signInWithEmailAndPassword } from '@/src/lib/firebase';
import { useState } from 'react';
import { FirebaseError } from '@firebase/app';
import { useRouter } from 'next/navigation';

const signInSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
});

export default function Signin() {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signInSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange'
  });

  const onSubmit = async (data: InferType<typeof signInSchema>) => {
    try {
      setSubmitting(true);
      await signInWithEmailAndPassword(data.email, data.password);
      return router.replace('/profile');
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/user-disabled') {
          setError('email', {
            message: 'This account is disabled'
          });
        }

        if (error.code === 'auth/invalid-login-credentials') {
          setError('email', {
            message: 'Invalid login credentials'
          });

          setError('password', {
            message: 'Invalid login credentials'
          });
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className='grid gap-[31px] md:gap-[62px]' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-center text-[3.25rem] font-[700] leading-[78px]'>Sign in</h1>
      <div className='grid gap-[35px]'>
        <Input
          placeholder='Enter email'
          className='w-full'
          {...register('email')}
          type='email'
          autoComplete='on'
          errorMessage={errors.email?.message}
        />
        <Input
          placeholder='Password'
          className='w-full'
          {...register('password')}
          type='password'
          errorMessage={errors.password?.message}
        />
      </div>
      <Button type='submit' disabled={isSubmitting}>
        Sign in
      </Button>
      <Link
        href='/auth/signup'
        className='mx-auto text-[#624BFF] font-[500] text-[0.875rem] leading-[1.71429] select-none'
      >
        Create An Account
      </Link>
    </form>
  );
}
