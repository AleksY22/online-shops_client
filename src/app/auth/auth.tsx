'use client';

import Image from 'next/image';
import { useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui';

import { Social } from '@/features//auth/components/social';
import { AuthFields } from '@/features/auth/components/auth-fields';
import { useAuthForm } from '@/features/auth/hooks/useAuthForm';

export function Auth() {
  const [isReg, setIsReg] = useState(false);

  const { onSubmit, form, isPending } = useAuthForm(isReg);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image
          src="/images/auth.svg"
          alt="shop-auth"
          width={200}
          height={200}
          loading="eager"
        />
      </div>
      <div className="h-full flex flex-col items-center justify-center">
        <Card className="p-6 flex flex-col items-center justify-center w-380px">
          <CardHeader className="w-full text-center pb-5">
            <CardTitle className="pb-1 text-3xl font-bold">
              {isReg ? 'Создать аккаунт' : 'Войти в аккаунт'}
            </CardTitle>
            <CardDescription>
              Войдите или создайте учетную запись, чтобы оформлять покупки!
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 w-full">
            <form
              id="form-auth"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <AuthFields form={form} isPending={isPending} isReg={isReg} />

              <Button type="submit" disabled={isPending} className="w-full">
                Продолжить
              </Button>
            </form>
            <Social />
          </CardContent>
          <CardFooter className="p-0 mt-4 text-sm text-muted-foreground">
            {isReg ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'}
            <button
              onClick={() => setIsReg(!isReg)}
              className="ml-1 text-sky-500"
            >
              {isReg ? 'Войти' : 'Создать'}
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
