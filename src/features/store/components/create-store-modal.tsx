'use client';

import { useCreateStore } from '../hooks/useCreateStore';
import { IStoreCreate } from '../types/store.interface';
import { type PropsWithChildren, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Input,
} from '@/shared/components/ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';

export function CreateStoreModal({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  const { createStore, isLoadingCreate } = useCreateStore();

  const form = useForm<IStoreCreate>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IStoreCreate> = (data) => {
    createStore(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создание магазина</DialogTitle>
          <DialogDescription>
            Для создания магазина необходимо указать название
          </DialogDescription>
        </DialogHeader>
        <form
          id="form-create-store"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <Controller
            control={form.control}
            name="title"
            rules={{ required: 'Обязательное поле' }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-auth">Название</FieldLabel>
                <Input
                  placeholder="Введите название"
                  disabled={isLoadingCreate}
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoadingCreate}
              className="flex items-center gap-x-4 bg-blue-500 hover:bg-blue-500/80"
            >
              Создать
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
