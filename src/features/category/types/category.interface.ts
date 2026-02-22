export interface ICategory {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  storeId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICategoryInput extends Pick<
  ICategory,
  'title' | 'description'
> {}
