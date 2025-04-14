// components/CustomToast.tsx
import React, { useEffect, useRef } from 'react';
import { Text, Animated } from 'react-native';
import { BaseToastProps } from 'react-native-toast-message';

export const CustomWelcomeToast = ({ text1, text2 }: BaseToastProps) => {
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      friction: 8,
    }).start();
  }, []);

  return (
    <Animated.View
      className={'bg-teal-700 rounded-xl mt-5 mx-4 px-6 py-4 shadow-lg'}
      style=
      {{ transform: [{ translateY }] }}
    >
      <Text className='text-white text-lg font-bold'>{text1}</Text>
      <Text className='text-white text-sm mt-1'>{text2}</Text>
    </Animated.View>
  );
};
