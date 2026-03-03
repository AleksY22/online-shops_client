import { PutBlobResult } from '@vercel/blob';

export async function upload(formData: FormData) {
  const imageFile = formData.get('file') as File;

  const response = await fetch(`/api/upload?filename=${imageFile.name}`, {
    method: 'POST',
    body: imageFile,
  });
  return (await response.json()) as PutBlobResult;
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
