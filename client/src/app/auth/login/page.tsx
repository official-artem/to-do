'use client';

import { UserApi } from '@/client/user';
import AuthForm from '@/components/AuthForm/AuthForm';
import { AuthFormType } from '@/types/auth';

export default function Page() {
  const handleLogin = async (data: any) => {
    const { email, password } = data;
    await new UserApi('', email, password).login();
  };

  return <AuthForm type={AuthFormType.LOGIN} onSubmit={handleLogin} />
}