export interface IColor {
  id: string;
  createdAt: string;
  name: string;
  value: string;
  storeId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IColorInput extends Pick<IColor, 'name' | 'value'> {}
