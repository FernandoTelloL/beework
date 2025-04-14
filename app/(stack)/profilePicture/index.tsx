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
import uuid from 'react-native-uuid';
import { updateUserProfile } from "@/src/utils/updateUserProfile";

const authRepository = new AuthRepositoryImpl();
const loginUserUseCase = new LoginUserUseCase(authRepository);
const callMeUseCase = new CallMeUseCase(authRepository);

const ProfilePictureScreen = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  // variables de contexto login
  const { setToken, setisAuthenticated, isAuthenticated, password, token } = useLoginStore();
  const { name, lastName, email } = useCreateAccountStore();
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
      setIsNextEnabled(true); // activar el botón Next si seleccionó una imagen
    }
  };

  const handleUpload = async () => {
    if (!avatar || !userId || !token) {
      console.log("Error", "Faltan datos necesarios para subir la imagen.")
      return;
    }

    try {
      console.log('🔽 handleUpload ejecutado');

      const result = await uploadImageToBeeWork(avatar, userId, token);
      if (result.success) {
        const getRelativeFilePathFromUrl = (url: string): string | null => {
          const params = new URLSearchParams(url.split('?')[1]);
          return params.get('relativeFilePath');
        };

        const relativeFilePath = result.downloadUrl ? getRelativeFilePathFromUrl(result.downloadUrl) : null;

        const avatarData = {
          downloadUrl: result.downloadUrl,
          filename: result.filename,
          id: uuid.v4(),
          relativeFilePaths: relativeFilePath,
          sizeInBytes: result.sizeInBytes,
        };

        const profileUpdateData = {
          firstName: name,
          lastName: lastName,
          avatars: [avatarData],
          roles: ["admin"]
        };

        console.log("✅ profileUpdateData:", JSON.stringify(profileUpdateData, null, 2));

        const updateResult = await updateUserProfile(profileUpdateData, token);

        if (updateResult.success) {
          router.push("/description");
        } else {
          console.log("⚠️ No se pudo agragar tu imagen a tu perfil:", updateResult.error);
          Alert.alert("Error", "No se pudo agragar tu imagen a tu perfil");
        }
      } else {
        console.log('⛔ Falló uploadImageToBeeWork:', result);
        Alert.alert("Error", "Hubo un problema al subir la imagen.");
      }
    } catch (error) {
      console.error('❌ Error en handleUpload:', error);
    }
  };

  const handleSkip = () => {
    router.push("/description"); // Solo navega sin subir imagen ni actualizar perfil
  };

  return (
    <View className="flex-1 justify-between p-4 items-center font-poppins-regular">
      <View className="items-center flex-grow w-full">
        <View className="w-16 h-16 bg-gray-300 rounded-full mb-6" />
        <Text className="text-2xl font-poppins-bold text-center">Pick a profile picture</Text>
        <Text className="text-base text-black-600 mt-2 mb-6 font-poppins-regular text-center">
          Have a favorite selfie? Upload it now
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

      <View className="w-full space-y-3">
        {/* Botón Omitir */}
        <Pressable
          onPress={handleSkip}
          className="py-3 mt- rounded-lg items-center border border-black"
        >
          <Text className="text-black font-semibold text-lg">Omitir</Text>
        </Pressable>

        {/* Botón Next */}
        <Pressable
          onPress={handleUpload}
          className={`py-3 rounded-lg items-center mt-4 ${isNextEnabled ? "bg-black" : "bg-gray-400"}`}
          disabled={!isNextEnabled}
        >
          <Text className="text-white font-semibold text-lg">Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfilePictureScreen;
