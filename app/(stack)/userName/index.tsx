import { useState } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";

const MIN_USERNAME_LENGTH = 3;

const UserNameScreen = () => {
  const [username, setUsername] = useState("");

  // Función para generar sugerencias de nombres de usuario
  const generateSuggestions = (input: string) => {
    if (input.length < MIN_USERNAME_LENGTH) return [];
    return [
      `${input}.123`,
      `${input.split("").reverse().join("")}`,
      `${input}.xyz`,
    ];
  };

  const usernameSuggestions = generateSuggestions(username);

  // Validación: No permitir espacios en medio del username
  const handleChangeText = (text: string) => {
    const sanitizedText = text.replace(/\s/g, ""); // Elimina espacios
    setUsername(sanitizedText);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
    >
      <View className="flex-1 justify-between p-4 font-poppins-regular">
        {/* Contenedor superior */}
        <View className="items-center flex-grow w-full">
          {/* Círculo gris */}
          <View className="w-16 h-16 bg-gray-300 rounded-full mb-6" />

          {/* Título */}
          <Text className="text-2xl font-poppins-bold text-center mb-2">
            What should we call you?
          </Text>

          {/* Subtítulo */}
          <Text className="text-base text-black-800 mt-2 mb-6 font-poppins-regular text-center">
            Your @username is unique. You can always change it later.
          </Text>

          {/* Input de username */}
          <View className="w-full border border-gray-300 rounded-md p-3 mb-2">
            <TextInput
              className="text-base font-poppins-regular text-black"
              placeholder="Enter username"
              placeholderTextColor="#A0A0A0"
              value={username}
              onChangeText={handleChangeText}
              autoCapitalize="none"
            />
          </View>

          {/* Lista de sugerencias en fila */}
          {usernameSuggestions.length > 0 && (
            <View className="flex-row mt-2 w-full">
              {usernameSuggestions.map((item) => (
                <Text key={item} className="text-black-500 px-2 py-1 rounded-md mr-2">
                  {item}
                </Text>
              ))}
            </View>
          )}

          {/* Show more */}
          <Text className="text-black-500 mt-2 w-full ml-3">Show more</Text>
        </View>

        {/* Botón Next */}
        <Pressable
          className={`w-full py-3 rounded-lg items-center ${username.length >= MIN_USERNAME_LENGTH ? "bg-black" : "bg-gray-400"
            }`}
          disabled={username.length < MIN_USERNAME_LENGTH}
          onPress={() => router.push("/allowNotification")}
        >
          <Text className="text-white font-semibold text-lg">Next</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UserNameScreen;
