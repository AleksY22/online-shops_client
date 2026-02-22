import { IProduct } from '../types/product.interface';
import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/shared/lib/utils';

interface ProductGalleryProps {
  product: IProduct;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div>
      <Image
        src={product.images[currentIndex]}
        alt={product.title}
        width={400}
        height={400}
        className="rounded-lg"
      />
      <div className="gflex mt-6 gap-6">
        {product.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'duration-300 border rounded-lg overflow-hidden',
              index === currentIndex ? 'border-black' : 'border-transparent',
            )}
          >
            <Image src={image} alt={product.title} width={100} height={100} />
          </button>
        ))}
      </div>
    </div>
  );
}
