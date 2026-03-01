import { useUpload } from '../hooks/useUpload';
import { cn } from '../lib/utils';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';

import { Button } from './ui';

interface ImageUploadProps {
  isDisabled: boolean;
  value: string[];
  onChange: (value: string[]) => void;
}

export function ImageUpload({ isDisabled, value, onChange }: ImageUploadProps) {
  const {
    handleButtonClick,
    handleFileChange,
    isUploading,
    fileInputRef,
    blob,
  } = useUpload(onChange);
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-50 h-50 rounded-md overflow-hidden"
          >
            <Image
              src={blob!.url}
              alt="Картинка"
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <Button
        type="button"
        disabled={isDisabled || isUploading}
        variant="secondary"
        onClick={handleButtonClick}
        className={cn('', { 'mt-4': value.length })}
      >
        <ImagePlus className="size-4 mr-2" />
        Загрузить картинки
      </Button>
      <input
        type="file"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={isDisabled}
      />
    </div>
  );
}
