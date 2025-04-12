import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { Redirect, router } from "expo-router";

import { LoginUserUseCase } from "@/src/modules/auth/usecases/LoginUserUseCase";
import { CallMeUseCase } from "@/src/modules/auth/usecases/CallMeUseCase";
import { AuthRepositoryImpl } from "@/src/modules/auth/infrastructure/AuthRepositoryImpl";
import { Formik } from "formik";
import { passwordSchema } from "@/src/modules/auth/validation/passwordSchema";
import useLoginStore from "@/src/modules/auth/context/LoginStore";

const authRepository = new AuthRepositoryImpl(); // Instancia única del repositorio

// Reutilizamos la misma instancia del repositorio en los casos de uso
const loginUserUseCase = new LoginUserUseCase(authRepository);
// const callMeUseCase = new CallMeUseCase(authRepository);

const EnterYourPasswordScreen = () => {
  const { email, setToken, setisAuthenticated, isAuthenticated, token } = useLoginStore();

  console.log("Valores en EnterYourPasswordScreen ->  email:", email);

  const handleLogin = async (values: { password: string }) => {
    try {
      console.log('inicio de login');
      const token = await loginUserUseCase.execute(email!, values.password);

      // Actualiza el estado global
      setToken(token);
      setisAuthenticated(true); // asegúrate de que esto ocurra dentro del usecase o aquí

      // Navega directamente
      router.push('/(tabs)/home');
    } catch (error) {
      console.log(error);
      Alert.alert("BeeWork", "Credenciales no válidas");
    }
  };

  return (
    <View className="flex-1 justify-between p-4">
      <Formik
        initialValues={{ password: "" }}
        validationSchema={passwordSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View className="items-center">
              <View className="w-12 h-12 bg-gray-300 rounded-full mb-6" />
              <Text className="text-2xl mb-4 font-poppins-bold">Enter your password</Text>

              <View className="w-full flex-row justify-between border border-gray-300 rounded-md px-4 py-3 mb-4">
                <Text className="text-base font-poppins-regular">
                  {email}
                </Text>
              </View>

              <TextInput
                className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4"
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text className="text-red-500">{errors.password}</Text>
              )}
            </View>

            <Pressable className="w-full py-3 bg-black rounded-lg items-center" onPress={() => handleSubmit()}>
              <Text className="text-white font-semibold text-lg">Log in</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};

export default EnterYourPasswordScreen;
