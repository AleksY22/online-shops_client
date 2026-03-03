import { useMutation } from '@tanstack/react-query';
import { PutBlobResult } from '@vercel/blob';
import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { upload } from '@/features/file/services/file.service';

export function useUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const { mutate: uploadFiles, isPending: isUploading } = useMutation({
    mutationKey: ['upload files'],
    //  mutationFn: (formData: FormData) => fileService.upload(formData),
    mutationFn: (file: FormData) => upload(file),
    onSuccess(data) {
      // onChange(data.map((file) => file.url));

      setBlob(data);
    },
    onError() {
      toast.error('Ошибка при загрузке файлов!');
    },
  });

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files![0];

      // const selectedFiles = event.target.files;

      // if (selectedFiles) {
      //   const fileArray = Array.from(selectedFiles);

      const formData = new FormData();
      //   fileArray.forEach((file) => formData.append('files', file));
      formData.append('file', file);

      uploadFiles(formData);
      // }
    },
    [uploadFiles],
  );

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, [fileInputRef]);

  return useMemo(
    () => ({
      handleButtonClick,
      handleFileChange,
      isUploading,
      fileInputRef,
      blob,
    }),
    [isUploading, handleButtonClick, handleFileChange, fileInputRef, blob],
  );
}

// import { useMutation } from '@tanstack/react-query';
// import { ChangeEvent, useCallback, useMemo, useRef } from 'react';
// import toast from 'react-hot-toast';

// import { fileService } from '@/features/file/services/file.service';

// export function useUpload(onChange: (value: string[]) => void) {
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const { mutate: uploadFiles, isPending: isUploading } = useMutation({
//     mutationKey: ['upload files'],
//     mutationFn: (formData: FormData) => fileService.upload(formData),
//     onSuccess(data) {
//       onChange(data.map((file) => file.url));
//     },
//     onError() {
//       toast.error('Ошибка при загрузке файлов!');
//     },
//   });

//   const handleFileChange = useCallback(
//     (event: ChangeEvent<HTMLInputElement>) => {
//       const selectedFiles = event.target.files;

//       if (selectedFiles) {
//         const fileArray = Array.from(selectedFiles);

//         const formData = new FormData();
//         fileArray.forEach((file) => formData.append('files', file));

//         uploadFiles(formData);
//       }
//     },
//     [uploadFiles],
//   );

//   const handleButtonClick = useCallback(() => {
//     fileInputRef.current?.click();
//   }, [fileInputRef]);

//   return useMemo(
//     () => ({
//       handleButtonClick,
//       handleFileChange,
//       isUploading,
//       fileInputRef,
//     }),
//     [isUploading, handleButtonClick, handleFileChange, fileInputRef],
//   );
// }
