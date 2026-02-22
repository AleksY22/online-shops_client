'use client';

import { useCreateCategory } from '../hooks/useCreateCategory';
import { useDeleteCategory } from '../hooks/useDeleteCategory';
import { useUpdateCategory } from '../hooks/useUpdateCategory';
import { ICategory, ICategoryInput } from '../types/category.interface';
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

interface CategoryFormProps {
  category?: ICategory;
}

export function CategoryForm({ category }: CategoryFormProps) {
  const { createCategory, isLoadingCreate } = useCreateCategory();
  const { updateCategory, isLoadingUpdate } = useUpdateCategory();
  const { deleteCategory, isLoadingDelete } = useDeleteCategory();

  const title = category ? 'Изменить данные' : 'Создать категорию';
  const description = category
    ? 'Изменить данные о категории'
    : 'Добавить новую категорию';
  const action = category ? 'Сохранить' : 'Создать';

  const form = useForm<ICategoryInput>({
    mode: 'onChange',
    values: {
      title: category?.title || '',
      description: category?.description || '',
    },
  });

  const onSubmit: SubmitHandler<ICategoryInput> = (data) => {
    if (category) updateCategory(data);
    else createCategory(data);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {category && (
          <ConfirmModal handleClick={() => deleteCategory()}>
            <Button
              size="icon"
              disabled={isLoadingDelete}
              className="bg-blue-500 hover:bg-blue-500/80"
            >
              <Trash className="size-4" />
            </Button>
          </ConfirmModal>
        )}
      </div>
      <form
        id="form-product"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 h-full"
      >
        <FieldGroup>
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
            <Controller
              control={form.control}
              name="title"
              rules={{
                required: 'Обязательное поле',
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-category">
                    Название категории
                  </FieldLabel>
                  <Input
                    type="text"
                    placeholder="Введите название"
                    disabled={isLoadingUpdate || isLoadingCreate}
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="description"
              rules={{
                required: 'Обязательное поле',
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-category">Описание</FieldLabel>
                  <Input
                    type="text"
                    placeholder="Введите описание"
                    disabled={isLoadingUpdate || isLoadingCreate}
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
        </FieldGroup>
        <Button
          type="submit"
          disabled={isLoadingUpdate || isLoadingCreate}
          className="flex items-center gap-x-4 bg-blue-500 hover:bg-blue-500/80"
        >
          {action}
        </Button>
      </form>
    </div>
  );
}
