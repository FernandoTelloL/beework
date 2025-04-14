import { useEffect, useState } from "react";
import { View, Text, Image, Pressable, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { LoginUserUseCase } from "@/src/modules/auth/usecases/LoginUserUseCase";
import { AuthRepositoryImpl } from "@/src/modules/auth/infrastructure/AuthRepositoryImpl";
import useLoginStore from "@/src/modules/auth/context/LoginStore";
import useCreateAccountStore from "@/src/modules/auth/context/CreateAccountStore";
import { CallMeUseCase } from "@/src/modules/auth/usecases/CallMeUseCase";
import useUserProfileStore from "@/src/modules/auth/context/UserProfileStore";
import { uploadImageToBeeWork } from "@/src/utils/uploadImageToBeeWork";

const authRepository = new AuthRepositoryImpl();
const loginUserUseCase = new LoginUserUseCase(authRepository);
const callMeUseCase = new CallMeUseCase(authRepository);

const ProfilePictureScreen = () => {
  const [avatar, setAvatar] = useState<string | null>(null);

  // variables de contexto login
  const { setToken, setisAuthenticated, isAuthenticated, password, token } = useLoginStore();

  const { name, lastName } = useCreateAccountStore()


  const { email } = useCreateAccountStore();
  const { userId } = useUserProfileStore();

  useEffect(() => {
    if (password) {
      handleLogin(password);
      setisAuthenticated(true);
    }
  }, []);

  const handleLogin = async (password: string) => {
    try {
      await loginUserUseCase.execute(email!, password);
    } catch (error) {
      console.error(error);
      Alert.alert("BeeWork", "Credenciales no válidas desde avatar");
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso requerido", "Debes permitir acceso a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (!avatar || !userId || !token) {
      Alert.alert("Error", "Faltan datos necesarios para subir la imagen.");
      return;
    }

    const result = await uploadImageToBeeWork(avatar, userId, token);
    console.log('result', result)
    // Log de las respuestas de ambos endpoints
    if (result.success) {
      console.log("✅ Primer endpoint - Credenciales de carga:", result.downloadUrl);
      // console.log("✅ Segundo endpoint - Respuesta local-upload:", result.relativeFilePath);

      const avatarData = {
        id: crypto.randomUUID(),
        downloadUrl: result.downloadUrl,
        // relativeFilePath: result.relativeFilePath,
      };

      const profileUpdateData = {
        firstName: name,
        lastName: lastName,
        avatars: [avatarData], // Aquí va el objeto completo con relativeFilePath, etc.
        roles: ["admin"]
      };

      // Aquí llamas el endpoint para actualizar el perfil, si es necesario
      // await updateProfileUseCase.execute(profileUpdateData);

      Alert.alert("Éxito", "Imagen subida correctamente 🎉");
      router.push("/description");
    } else {
      Alert.alert("Error", "Hubo un problema al subir la imagen.");
    }
  };

  return (
    <View className="flex-1 justify-between p-4 items-center font-poppins-regular">
      <View className="items-center flex-grow w-full">
        <View className="w-16 h-16 bg-gray-300 rounded-full mb-6" />
        <Text className="text-2xl font-poppins-bold text-center">Pick a profile picture</Text>
        <Text className="text-base text-black-600 mt-2 mb-6 font-poppins-regular text-center">
          Have a favorite selfie? Upload it now
        </Text>
        <Text className="text-base text-black-600 mt-2 mb-6 font-poppins-regular text-center">
          {userId}
        </Text>

        <View className="relative">
          <View className="w-40 h-40 bg-gray-300 rounded-full overflow-hidden justify-center items-center">
            {avatar && <Image source={{ uri: avatar }} className="w-full h-full" />}
          </View>

          <Pressable
            onPress={pickImage}
            className="absolute -bottom-2 -right-2 bg-black w-12 h-12 rounded-full items-center justify-center"
          >
            <Ionicons name="add" size={24} color="white" />
          </Pressable>
        </View>
      </View>

      <Pressable
        className="w-full py-3 rounded-lg items-center bg-black"
        onPress={handleUpload}
      >
        <Text className="text-white font-semibold text-lg">Next</Text>
      </Pressable>
    </View>
  );
};

export default ProfilePictureScreen;
