import { useCreateProduct } from '../hooks/useCreateProduct';
import { useDeleteProduct } from '../hooks/useDeleteProduct';
import { useUpdateProduct } from '../hooks/useUpdateProduct';
import { IProduct, IProductInput } from '../types/product.interface';
import { Trash } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { ConfirmModal } from '@/shared/components/confirm-modal';
import { Heading } from '@/shared/components/heading';
import { ImageUpload } from '@/shared/components/image-upload';
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from '@/shared/components/ui';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';

import { ICategory } from '@/features/category/types/category.interface';
import { IColor } from '@/features/color/types/color.interface';

interface ProductFormProps {
  product?: IProduct;
  categories: ICategory[];
  colors: IColor[];
}

export function ProductForm({ product, categories, colors }: ProductFormProps) {
  const { createProduct, isLoadingCreate } = useCreateProduct();
  const { updateProduct, isLoadingUpdate } = useUpdateProduct();
  const { deleteProduct, isLoadingDelete } = useDeleteProduct();

  const title = product ? 'Изменить данные' : 'Создать товар';
  const description = product
    ? 'Изменить данные о товаре'
    : 'Добавить новый товар в магазин';
  const action = product ? 'Сохранить' : 'Создать';

  const form = useForm<IProductInput>({
    mode: 'onChange',
    values: {
      title: product?.title || '',
      description: product?.description || '',
      // images: product?.images || [],
      images: product?.images || [],
      price: product?.price || 0,
      categoryId: product?.category.id || '',
      colorId: product?.color.id || '',
    },
  });

  const onSubmit: SubmitHandler<IProductInput> = (data) => {
    data.price = Number(data.price);
    if (product) updateProduct(data);
    else createProduct(data);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {product && (
          <ConfirmModal handleClick={() => deleteProduct()}>
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
          <Controller
            control={form.control}
            name="images"
            rules={{
              required: 'Загрузите хотя бы одну картинку',
            }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mt-4">
                <FieldLabel htmlFor="form-product">Картинки</FieldLabel>
                <ImageUpload
                  isDisabled={isLoadingCreate || isLoadingUpdate}
                  onChange={field.onChange}
                  value={field.value}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
            <Controller
              control={form.control}
              name="title"
              rules={{
                required: 'Обязательное поле',
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-product">
                    Название товара
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
              name="price"
              rules={{
                required: 'Обязательное поле',
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-product">Цена товара</FieldLabel>
                  <Input
                    type="text"
                    placeholder="Введите цену"
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
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <Controller
              control={form.control}
              name="categoryId"
              rules={{
                required: 'Обязательное поле',
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-product">
                    Категория товара
                  </FieldLabel>
                  <Select
                    disabled={isLoadingUpdate || isLoadingCreate}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Категория товара" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="colorId"
              rules={{
                required: 'Обязательное поле',
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-product">Цвет товара</FieldLabel>
                  <Select
                    disabled={isLoadingUpdate || isLoadingCreate}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Цвет товара" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {colors.map((color) => (
                          <SelectItem key={color.id} value={color.id}>
                            {color.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <Controller
              control={form.control}
              name="description"
              rules={{
                required: 'Обязательное поле',
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-зкщвгсе">
                    Описание товара
                  </FieldLabel>
                  <Textarea
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
