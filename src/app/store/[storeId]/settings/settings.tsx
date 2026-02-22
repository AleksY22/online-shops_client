'use client';

import { Trash } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { ConfirmModal } from '@/shared/components/confirm-modal';
import { Heading } from '@/shared/components/heading';
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from '@/shared/components/ui';
import { Textarea } from '@/shared/components/ui/textarea';

import { useDeleteStore } from '@/features/store/hooks/useDeleteStore';
import { useUpdateStore } from '@/features/store/hooks/useUpdateStore';
import { IStoreEdit } from '@/features/store/types/store.interface';

export function Settings() {
  const { store, updateStore, isLoadingUpdate } = useUpdateStore();
  const { deleteStore, isLoadingDelete } = useDeleteStore();

  const form = useForm<IStoreEdit>({
    mode: 'onChange',
    values: {
      title: store?.title || '',
      description: store?.description || '',
    },
  });

  const onSubmit: SubmitHandler<IStoreEdit> = (data) => {
    updateStore(data);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <Heading
          title="Настройки"
          description="Управление настройками магазина"
        />
        <ConfirmModal handleClick={() => deleteStore()}>
          <Button
            size="icon"
            disabled={isLoadingDelete}
            className="bg-blue-500 hover:bg-blue-500/80"
          >
            <Trash className="size-4" />
          </Button>
        </ConfirmModal>
      </div>
      <form
        id="form-settings"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 h-full"
      >
        <FieldGroup>
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <Controller
              control={form.control}
              name="title"
              rules={{
                required: 'Обязательное поле',
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-settings">Название</FieldLabel>
                  <Input
                    type="text"
                    placeholder="Введите название"
                    disabled={isLoadingUpdate}
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-settings">Описание</FieldLabel>
                <Textarea
                  placeholder="Введите описание"
                  disabled={isLoadingUpdate}
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button
          type="submit"
          disabled={isLoadingUpdate}
          className="flex items-center gap-x-4 bg-blue-500 hover:bg-blue-500/80"
        >
          Сохранить
        </Button>
      </form>
    </div>
  );
}
