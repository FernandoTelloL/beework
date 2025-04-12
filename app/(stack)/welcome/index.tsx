import { View, Text, Image, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

const WelcomeScreen = () => {

  return (
    <SafeAreaView className='flex-1 items-center mt-6 px-4 w-[85%] mx-auto'>

      {/* Logo con tamaño definido */}
      <Image
        source={require('@/assets/images/logo2.png')}
        style={{ width: 100, height: 114 }}
        resizeMode="contain"
      />


      <Text className="font-poppins-bold text-2xl text-black mt-6 leading-normal tracking-normal w-full text-center">
        Trabaja cuando quieras y gana hasta S/. 50 la hora.
      </Text>


      <Pressable
        className="mt-8 bg-gray-200 rounded-xl py-4 shadow-lg w-full shadow-black active:shadow-lg"
        onPress={() => router.push('/welcome')}
      >
        <Text className="font-poppins-regular text-black text-center">Continuar con Google</Text>
      </Pressable>

      <Pressable
        className="mt-8 bg-gray-200 rounded-xl px-8 py-4 shadow-lg shadow-black active:shadow-lg w-full"
      // onPress={() => router.push('/(stack)/findYourTwitterAccount')}
      >
        <Text className="font-poppins-regular text-black text-center">Continuar con Apple</Text>
      </Pressable>

      <Text className='font-poppins-regular my-6'>o</Text>

      <Pressable
        className=" bg-black rounded-xl px-8 py-4 shadow-lg shadow-black active:shadow-lg w-full"
        onPress={() => router.push('/(stack)/createAccount')}
      >
        <Text className="font-poppins-regular text-white text-center">Crea una Cuenta</Text>
      </Pressable>


      <Text className='font-poppins-regular mt-6'>Al registrarte, aceptas nuestros Términos, Política de privacidad y Uso de cookies</Text>


      <View className='flex-row mt-8 items-center'>
        <Text className='font-poppins-regular text-base'>¿Ya tienes una cuenta?
        </Text>

        <Pressable
          onPress={() => router.push('/(stack)/login')}
        >
          <Text className="font-poppins-regular text-blue-600 ml-2">Inicia sesión</Text>
        </Pressable>

      </View>

    </SafeAreaView>
  )
}

export default WelcomeScreen