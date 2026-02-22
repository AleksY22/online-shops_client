import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '../../../shared/components/ui/field';
import { Input } from '../../../shared/components/ui/input';
import { Controller, UseFormReturn } from 'react-hook-form';

import { validEmail } from '@/shared/constants/regex';

import { IAuthForm } from '@/features/auth/types/auth.interface';

interface AuthFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<IAuthForm, any, IAuthForm>;
  isPending: boolean;
  isReg?: boolean;
}

export function AuthFields({
  form,
  isPending,
  isReg = false,
}: AuthFieldsProps) {
  return (
    <FieldGroup>
      {isReg && (
        <Controller
          control={form.control}
          name="name"
          rules={{ required: 'Обязательное поле' }}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-auth">Имя</FieldLabel>
              <Input
                placeholder="Введите имя"
                disabled={isPending}
                {...field}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )}
      <Controller
        control={form.control}
        name="email"
        rules={{
          required: 'Обязательное поле',
          pattern: {
            value: validEmail,
            message: 'Введите валидную почту',
          },
        }}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-auth">Email</FieldLabel>
            <Input
              type="email"
              placeholder="Введите email"
              disabled={isPending}
              {...field}
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="password"
        rules={{
          required: 'Обязательное поле',
          minLength: {
            value: 6,
            message: 'Минимум 6 символов',
          },
        }}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-auth">Пароль</FieldLabel>
            <Input
              type="password"
              placeholder="Введите пароль"
              disabled={isPending}
              {...field}
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
