import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AdCardProps {
  title: string;
  description: string;
  buttonLabel: string;
  backgroundColor: string;
  bottomRightIconName: keyof typeof Ionicons.glyphMap;
  onClose: () => void;
  onPressButton?: () => void;
}

export default function AdCard({
  title,
  description,
  buttonLabel,
  backgroundColor,
  bottomRightIconName,
  onClose,
  onPressButton,
}: AdCardProps) {
  return (
    <View
      className="rounded-lg p-4 mb-4 border border-gray-500"
      style={{ backgroundColor }}
    >
      {/* Fila superior */}
      <View className="flex-row justify-between items-center mb-2">
        {/* Ícono de alerta a la izquierda */}
        <Ionicons name="alert-circle-outline" size={20} color="#000" />
        {/* Título centrado */}
        <Text className="flex-1 text-lg font-bold ml-4">
          {title}
        </Text>
        {/* Ícono de cerrar a la derecha */}
        <Pressable onPress={onClose}>
          <Ionicons name="close-outline" size={20} color="#000" />
        </Pressable>
      </View>
      {/* Cuerpo del anuncio */}
      <Text className="text-base mb-4 ml-10 max-w-[80%]">{description}</Text>
      {/* Fila inferior */}
      <View className="flex-row justify-between items-center">
        {/* Botón en la izquierda */}
        <Pressable
          onPress={onPressButton}
          className="bg-black rounded-xl py-2 px-4 ml-8"
        >
          <Text className="text-white px-2 py-2 ">{buttonLabel}</Text>
        </Pressable>
        {/* Ícono en la derecha */}
        <Ionicons name={bottomRightIconName} size={24} color="#000" />
      </View>
    </View>
  );
}
