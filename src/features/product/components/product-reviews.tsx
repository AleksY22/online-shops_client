import { IProduct } from '../types/product.interface';
import { Plus, Trash } from 'lucide-react';
import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';

import { ConfirmModal } from '@/shared/components/confirm-modal';
import { useProfile } from '@/shared/hooks/useProfile';

import { ReviewModal } from '@/features/review/components/review-modal';
import { useDeleteReviews } from '@/features/review/hooks/useDeleteReviews';

interface ProductReviewsProps {
  product: IProduct;
}

export function ProductReviews({ product }: ProductReviewsProps) {
  const { user } = useProfile();
  const { deleteReview } = useDeleteReviews();

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Отзывы</h1>
        {user && (
          <ReviewModal storeId={product.storeId}>
            <div className="flex items-center border px-3 py-1 rounded-2xl hover:bg-gray-200 transition">
              <Plus className="size-4 mr-2" />
              Добавить отзыв
            </div>
          </ReviewModal>
        )}
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {product.reviews.length ? (
          product.reviews.map((review) => (
            <div className="border rounded-lg p-4" key={review.id}>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-4 font-medium">
                  <Image
                    src={review.user.picture}
                    alt={review.user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  {review.user.name}
                </div>
                {review.user.id === user?.id && (
                  <ConfirmModal handleClick={() => deleteReview(review.id)}>
                    <button className="-mt-3 text-red-500">
                      <Trash className="size-5" />
                    </button>
                  </ConfirmModal>
                )}
              </div>
              <Rating
                readonly
                initialValue={review.rating}
                SVGstyle={{ display: 'inline-block' }}
                size={18}
                allowFraction
                transition
              />
              <div className="text-sm text-muted-foreground mt-1">
                {review.text}
              </div>
            </div>
          ))
        ) : (
          <div className="mt-4">У этого товара пока нет отзывов</div>
        )}
      </div>
    </div>
  );
}
