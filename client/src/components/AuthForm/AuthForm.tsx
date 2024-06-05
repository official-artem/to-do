'use client';

import { AuthFormType } from '@/types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
}

interface AuthFormProps {
  type: AuthFormType;
  onSubmit: SubmitHandler<LoginData | RegisterData>;
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(5, 'Short password').max(25, 'Long password').required('Required'),
});

const registerSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short').max(25, 'Too Long').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(5, 'Short password').max(25, 'Long password').required('Required'),
});

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const router = useRouter();
  const schema = type === 'login' ? loginSchema : registerSchema;
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginData | RegisterData>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data: any) => {
    await onSubmit(data);
    reset();
    router.replace('/');
  };

  return (
    <div className='flex justify-center fixed left-[35rem] right-[35rem] top-[15rem] flex-col'>
      <form method='post' onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col p-4 gap-6' noValidate>
        {type === AuthFormType.REGISTER && (
          <label className='relative'>
            <span className='absolute top-[-1.25rem] text-sm text-gray-500'>Name</span>
            <input {...register('name')} type='text' className='block border-2 w-full py-1' />
            <p>{(errors as FieldErrors<RegisterData>).name?.message}</p>
          </label>
        )}
        <label className='relative'>
          <span className='absolute top-[-1.25rem] text-sm text-gray-500'>Email</span>
          <input {...register('email')} type='email' className='block border-2 w-full py-1' />
          {errors.email && <p>{errors.email.message}</p>}
        </label>
        <label className='relative'>
          <span className='absolute top-[-1.25rem] text-sm text-gray-500 '>Password</span>
          <input {...register('password')} type='password' className='block border-2 w-full py-1' />
          {errors.password && <p>{errors.password.message}</p>}
        </label>
        <button type='submit' className='border-2'>
          {type === 'login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      {type === AuthFormType.LOGIN ? (
        <Link className='text-center' href="/auth/register">Sign up</Link>
      ) : (
        <Link className='text-center' href="/auth/login">Sign in</Link>
      )}
    </div>
  );
};

export default AuthForm;