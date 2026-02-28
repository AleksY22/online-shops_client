'use client';

import { DASHBOARD_URL } from '../../../shared/config/url.config';
import { IAuthForm } from '../../auth/types/auth.interface';
import { authService } from '../services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export function useAuthForm(isReg: boolean) {
  const router = useRouter();

  const form = useForm<IAuthForm>({
    //валидация сразу при изменении
    mode: 'onChange',
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['auth user'],
    mutationFn: (data: IAuthForm) =>
      authService.main(isReg ? 'register' : 'login', data),
    onSuccess() {
      form.reset();
      toast.success('Авторизация прошла успешно!');
      router.replace(DASHBOARD_URL.home());
    },
    onError() {
      // if (error.message) {
      //   toast.error(error.message);
      // } else {
      //   toast.error('Ошибка при авторизации!');
      // }
      toast.error('Ошибка при авторизации! Проверьте вводимые данные!');
    },
  });

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    mutate(data);
  };

  return { onSubmit, form, isPending };
}
