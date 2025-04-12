import { useState } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import useCreateAccountStore from "@/src/modules/auth/context/CreateAccountStore";

const CodeVerificationScreen = () => {
  const [validationCode, setValidationCode] = useState("");

  const { email, invitationToken } = useCreateAccountStore();

  const handleChange = (text: string) => {
    setValidationCode(text);
  };

  const handleNext = () => {
    // verificar si el codigo de invitacion es el mismo que tengo en mi store
    if (validationCode !== invitationToken) {
      alert("El código de invitación no es correcto");
      return;
    }

    router.push("/createPassword");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
      keyboardVerticalOffset={100}
    >
      <View className="flex-1 justify-between p-4 font-poppins-regular">
        <View className="flex-grow items-center">
          <View className="w-16 h-16 bg-gray-300 rounded-full mb-6" />

          <Text className="text-2xl mb-2 font-poppins-bold text-center">
            We sent you a code
          </Text>

          <Text className="text-base text-black-600 mb-6 mt-8 font-poppins-regular text-center">
            Ingresa el código {email}
          </Text>

          <View className="flex-row justify-between mb-6 w-full">
            <TextInput
              className="w-full h-14 border border-gray-300 text-center text-xl tracking-[3px] font-poppins-regular rounded-md p-0"
              value={validationCode}
              onChangeText={handleChange}
            />
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-base text-black-500 font-poppins-regular text-left mb-4">
            Didn’t receive mail?
          </Text>

          <Pressable
            className={`w-full py-3 rounded-lg items-center bg-black`}
            onPress={handleNext}
          >
            <Text className="text-white font-semibold text-lg">Next</Text>
          </Pressable>
        </View>
      </View>

    </KeyboardAvoidingView>
  );
};

export default CodeVerificationScreen;
