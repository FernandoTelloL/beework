import { View, Text, TextInput, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";

// import { SaveUserNameUseCase } from "@/src/modules/auth/usecases/SaveUserNameUseCase";
import { AuthRepositoryImpl } from "@/src/modules/auth/infrastructure/AuthRepositoryImpl";
import { Formik } from "formik";
import { loginSchema } from "@/src/modules/auth/validation/loginSchema";
import useCreateAccountStore from "@/src/modules/auth/context/CreateAccountStore";
import useLoginStore from "@/src/modules/auth/context/LoginStore";

const authRepository = new AuthRepositoryImpl();
// const saveUserNameUseCase = new SaveUserNameUseCase(authRepository);

const LoginScreen = () => {
  const { setEmail } = useLoginStore();

  const handleNext = (values: any) => {
    const { inputValue } = values;

    setEmail(inputValue);

    // saveUserNameUseCase.execute(inputValue);
    router.push("/(stack)/enterYourPassword");
  };

  return (
    <View className="flex-1 justify-between p-4">
      <Formik<{ inputValue: string }>
        initialValues={{ inputValue: "" }}
        validationSchema={loginSchema}
        onSubmit={handleNext}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View className="items-center">
              <View className="w-12 h-12 bg-gray-300 rounded-full mb-6" />
              <Text className="text-2xl mb-12 font-poppins-bold">
                To get started, first enter your phone, email, or @username
              </Text>

              <View className="w-[350] flex-row items-center border border-gray-300 rounded-md px-4 py-3 mb-4">
                <TextInput
                  className="flex-1 text-base font-poppins-regular"
                  placeholder="Phone, email or username"
                  onChangeText={handleChange("inputValue")}
                  onBlur={handleBlur("inputValue")}
                  value={values.inputValue}
                />
                {values.inputValue.trim() !== "" && (
                  <Ionicons name="arrow-forward-circle-outline" size={24} color="gray" />
                )}
              </View>
              {touched.inputValue && errors.inputValue && (
                <Text className="text-red-500">{errors.inputValue}</Text>
              )}
            </View>

            <View className="flex-row justify-between mb-6 w-full items-center">
              <Pressable
                className="text-left"
                onPress={() => router.push("/(stack)/login")}
              >
                <Text className="text-black">Forgot password?</Text>
              </Pressable>

              <Pressable
                className={`py-3 px-6 text-right rounded-lg text-base ${values.inputValue.trim() !== "" ? "bg-black" : "bg-gray-400"}`}
                onPress={() => handleSubmit()}
                disabled={values.inputValue.trim() === ""}
              >
                <Text className="text-white font-semibold text-[18px] text-center">Next</Text>
              </Pressable>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;
