import { IUser } from '../../user/types/user.interface';

export interface IReview {
  id: string;
  createdAt: string;
  text: string;
  rating: number;
  user: IUser;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IReviewInput extends Pick<IReview, 'text' | 'rating'> {}
