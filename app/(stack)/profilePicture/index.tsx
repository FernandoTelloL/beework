import { useState } from "react";
import { View, Text, Image, Pressable, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";

const ProfilePictureScreen = () => {
  const [avatar, setAvatar] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "You need to allow access to photos.");
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

  return (
    <View className="flex-1 justify-between p-4 items-center font-poppins-regular">
      {/* Contenedor superior */}
      <View className="items-center flex-grow w-full">
        {/* Circulo gris */}
        <View className="w-16 h-16 bg-gray-300 rounded-full mb-6" />

        {/* Título */}
        <Text className="text-2xl font-poppins-bold text-center">Pick a profile picture</Text>

        {/* Subtítulo */}
        <Text className="text-base text-black-600 mt-2 mb-6 font-poppins-regular text-center">
          Have a favorite selfie? Upload it now
        </Text>

        {/* Círculo grande con botón + */}
        <View className="relative">
          <View className="w-40 h-40 bg-gray-300 rounded-full overflow-hidden justify-center items-center">
            {avatar && <Image source={{ uri: avatar }} className="w-full h-full" />}
          </View>

          {/* Botón + */}
          <Pressable
            onPress={pickImage}
            className="absolute -bottom-2 -right-2 bg-black w-12 h-12 rounded-full items-center justify-center"
          >
            <Ionicons name="add" size={24} color="white" />
          </Pressable>
        </View>
      </View>

      {/* Botón Next siempre habilitado */}
      <Pressable
        className="w-full py-3 rounded-lg items-center bg-black"
        onPress={() => router.push("/description")}
      >
        <Text className="text-white font-semibold text-lg">Next</Text>
      </Pressable>
    </View>
  );
};

export default ProfilePictureScreen;
