'use client';

import { UserApi } from '@/client/user';
import AuthForm from '@/components/AuthForm/AuthForm';
import { AuthFormType } from '@/types/auth';

export default function Page() {
  const handleRegister = async (data: any) => {
    const {name, email, password} = data;
    await new UserApi(name, email, password).registration();
  };

  return <AuthForm type={AuthFormType.REGISTER} onSubmit={handleRegister} />
}