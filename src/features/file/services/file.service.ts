import { PutBlobResult } from '@vercel/blob';

import { API_URL } from '@/shared/config/api.config';

export async function fileService(file: FormData) {
  const response = await fetch(`${API_URL.files()}?filename=${file}`, {
    method: 'POST',
    body: file,
  });
  const newBlob = (await response.json()) as PutBlobResult;
  return newBlob;
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
