export interface IStore {
  id: string;
  title: string;
  description: string;
}

//подключает только title из IStore
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IStoreCreate extends Pick<IStore, 'title'> {}

//исключает id из IStore
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IStoreEdit extends Omit<IStore, 'id'> {}
