import axios from 'axios';
import * as FileSystem from 'expo-file-system';

interface UploadResponse {
  downloadUrl: string;
  uploadCredentials: {
    url: string;
  };
}

export const uploadImageToBeeWork = async (fileUri: string, userId: string, token: string) => {
  try {
    const filename = fileUri.split('/').pop();
    const fileType = 'image/jpeg';

    // Obtener tamaño del archivo
    const fileInfo: FileSystem.FileInfo = await FileSystem.getInfoAsync(fileUri);
    const sizeInBytes = fileInfo.size;

    // Paso 1: Obtener credenciales
    const credentialsResponse = await axios.get<UploadResponse>(
      `https://beework.kuskaya.co/api/file/credentials?filename=${filename}&storageId=membershipAvatars`
    );

    const { uploadCredentials, downloadUrl } = credentialsResponse.data;

    // Paso 2: Preparar FormData
    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      name: filename,
      type: fileType,
    } as any);

    // Paso 3: Subir imagen
    const localupload = await axios.post(`https://beework.kuskaya.co${uploadCredentials.url}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      success: true,
      downloadUrl,
      filename,
      sizeInBytes,
      localupload,
      credentialsResponse,
    };

  } catch (error) {
    console.error('❌ Error subiendo imagen:', error);
    return { success: false, error };
  }
};
