import { PutBlobResult } from '@vercel/blob';

export async function upload(formData: FormData) {
  const images: string[] = [];

  const imageFiles = formData.getAll('files') as File[];

  for (const imageFile of imageFiles) {
    const originalName = `${Date.now()}-${imageFile.name}`;

    const response = await fetch(`/api/upload?filename=${originalName}`, {
      method: 'POST',
      body: imageFile,
    });
    const image = (await response.json()) as PutBlobResult;
    images.push(image.url);
  }

  return images;
}

// import { IFile } from '../types/file.interface';
// import { axiosWithAuth } from '@/shared/api/api.interceptors';
// import { API_URL } from '@/shared/config/api.config';

// class FileService {
//   //======================================
//   async upload(file: FormData, folder?: string) {
//     const { data } = await axiosWithAuth<IFile[]>({
//       url: API_URL.files(),
//       method: 'POST',
//       data: file,
//       params: {
//         folder,
//       },
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return data;
//   }
// }

// export const fileService = new FileService();
