import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import useCreateAccountStore from "@/src/modules/auth/context/CreateAccountStore";
import useLoginStore from "@/src/modules/auth/context/LoginStore";

const CreatePasswordScreen = () => {
  const [temporalPassword, setTemporalPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { invitationToken, email } = useCreateAccountStore();
  const { setPassword } = useLoginStore();

  // Verifica si la contraseña tiene al menos 8 caracteres
  const isPasswordValid = temporalPassword.length >= 8;

  const handleSubmit = async () => {
    if (!isPasswordValid) return;

    try {
      setLoading(true);
      setPassword(temporalPassword);

      const response = await fetch("https://beework.kuskaya.co/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: temporalPassword,
          invitationToken,
          recaptchaToken: "", // puedes agregarlo si lo usas más adelante
        }),
      });

      if (response.ok) {



        router.push("/profilePicture");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        Alert.alert("Oops", errorData.message || "Algo salió mal al crear la cuenta.");
      }
    } catch (error) {
      console.error("Error en el fetch:", error);
      Alert.alert("Error", "Hubo un problema de red o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
      keyboardVerticalOffset={100}
    >

      <View className="flex-1 justify-between p-4 font-poppins-regular w-[85%] mx-auto">
        {/* Contenedor superior */}
        <View className="items-center flex-grow">
          {/* Avatar */}
          <View className="w-16 h-16 bg-gray-300 rounded-full mb-6" />

          {/* Título */}
          <Text className="text-2xl mb-2 font-poppins-bold text-center">
            You’ll need a password
          </Text>

          {/* Subtítulo */}
          <Text className="text-base text-black-600 mb-6 mt-2 font-poppins-regular text-center">
            Make sure it’s 8 characters or above
          </Text>

          {/* Input de contraseña */}
          <View className="w-full flex-row items-center border border-gray-300 rounded-md px-4 py-1 mb-4 font-poppins-regular">
            <TextInput
              className="flex-1 text-base font-poppins-regular"
              placeholder="Enter password"
              secureTextEntry={!showPassword}
              value={temporalPassword}
              onChangeText={setTemporalPassword}
            />
            <Ionicons name="arrow-forward-circle-outline" size={24} color="gray" />
          </View>

          {/* Texto para mostrar la contraseña */}
          <Text
            className="text-base text-blue-500 font-poppins-regular text-right w-full"
            onPress={() => setShowPassword(!showPassword)}
          >
            Reveal password
          </Text>
        </View>

        {/* Contenedor inferior */}
        <View className="mb-6">
          <Pressable
            className={`w-full py-3 rounded-lg items-center ${isPasswordValid ? "bg-black" : "bg-gray-400"
              }`}
            disabled={!isPasswordValid || loading}
            onPress={handleSubmit}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold text-lg">Next</Text>
            )}
          </Pressable>
        </View>
      </View>

    </KeyboardAvoidingView>
  );
};

export default CreatePasswordScreen;
