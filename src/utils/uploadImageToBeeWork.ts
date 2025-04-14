import axios from 'axios';

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

    // Paso 1: Obtener credenciales
    const credentialsResponse = await axios.get<UploadResponse>(
      `https://beework.kuskaya.co/api/file/credentials?filename=${filename}&storageId=membershipAvatars`
    );

    /*
    const handleUploadImage = async (roleType: string, source: 'camera' | 'library') => {
  // Definir opciones correctamente usando MediaType
  const options: CameraOptions | ImageLibraryOptions = {
      mediaType: 'photo' as MediaType, // Usar el tipo correcto en lugar de string
  };

  const result = source === 'camera' ? await launchCamera(options) : await launchImageLibrary(options);

  if (!result.didCancel && result.assets) {
      const fileUri = result.assets[0].uri;
      const filename = fileUri?.split('/').pop();
      try {
          const credentialsResponse = await axios.get(
              https://beework.kuskaya.co/api/file/credentials?filename=${filename}&storageId=membershipAvatars
          );
          const { uploadCredentials, downloadUrl } = credentialsResponse.data;
          const formData = new FormData();
          formData.append('file', { uri: fileUri, name: filename, type: 'image/jpeg' });

          await axios.post(https://beework.kuskaya.co${uploadCredentials.url}, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
      } catch (error) {
          console.error('Error durante la subida de imagen:', error);
      }
  }
};
    
    
    */


    const { uploadCredentials, downloadUrl } = credentialsResponse.data;
    console.log('credentialsResponse.data', credentialsResponse.data)
    console.log('uploadCredentials.url', uploadCredentials.url)
    // Paso 2: Preparar FormData
    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      name: filename,
      type: fileType,
    } as any);

    // Paso 3: Subir imagen al endpoint de carga
    const localupload = await axios.post(`https://beework.kuskaya.co${uploadCredentials.url}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(localupload)

    // Paso 4: Obtener el relativeFilePath usando el endpoint de local-upload

    // const localUploadUrl = `https://beework.kuskaya.co/api/file/local-upload?token=${token}`;

    // console.log('localUploadUrl', localUploadUrl)

    // const localUploadResponse = await axios.post(localUploadUrl, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });

    // console.log('localUploadResponse', localUploadResponse)

    // const { relativeFilePath } = localUploadResponse.data;

    return {
      success: true,
      downloadUrl,
      localupload
      // relativeFilePath,
    };

  } catch (error) {
    console.error('❌ Error subiendo imagen:', error);
    return { success: false, error };
  }
};
