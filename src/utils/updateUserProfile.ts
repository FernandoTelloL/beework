import axios from 'axios';

export const updateUserProfile = async (data: any, token: string) => {
  try {
    console.log("🚀 Enviando datos a backend:", JSON.stringify(data, null, 2));

    const response = await axios.put(
      'https://beework.kuskaya.co/api/membership/me',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    console.log("✅ Perfil actualizado con éxito:", response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("❌ Error al actualizar perfil:", error?.response?.data || error.message);
    return { success: false, error: error?.response?.data || error.message };
  }
};
