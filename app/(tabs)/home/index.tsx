import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import Toast from 'react-native-toast-message';

import { useRouter } from 'expo-router';
import AdCard from '@/src/shared/components/AdCard';
import useLoginStore from '@/src/modules/auth/context/LoginStore';
import useUserProfileStore from '@/src/modules/auth/context/UserProfileStore';
import useCreateAccountStore from '@/src/modules/auth/context/CreateAccountStore';

const ads = [
  {
    id: '1',
    title: 'Completa tu perfil',
    description: 'Actualiza tus datos para obtener mejores recomendaciones.',
    buttonLabel: 'Actualizar',
    backgroundColor: '#E8B931',
    bottomRightIconName: 'checkmark-circle-outline' as const,
  },
  {
    id: '2',
    title: 'Tareas disponibles',
    description: 'Descubre nuevas tareas y ofertas cerca de ti.',
    buttonLabel: 'Buscar',
    backgroundColor: '#CFF7D3',
    bottomRightIconName: 'information-circle-outline' as const,
  },
  {
    id: '3',
    title: 'Al día',
    description: 'No tenemos novedades por el momento, sigue atento a esta sección para poder participar.',
    buttonLabel: 'Ok',
    backgroundColor: '#FFCC00',
    bottomRightIconName: 'star-outline' as const,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { token, email, isAuthenticated } = useLoginStore();
  const { name, lastName } = useCreateAccountStore();
  const { userId } = useUserProfileStore();

  useEffect(() => {
    if (name && lastName) {
      Toast.show({
        type: 'welcome', // Usamos el tipo personalizado
        text1: `¡Bienvenido ${name} ${lastName}!`,
        text2: 'Nos alegra tenerte por aquí 😊',
        visibilityTime: 6000,
        autoHide: true,
        topOffset: 40,
        position: 'top',
      });
    }
  }, [name, lastName]);

  const renderItem = ({ item }: { item: typeof ads[0] }) => (
    <AdCard
      title={item.title}
      description={item.description}
      buttonLabel={item.buttonLabel}
      backgroundColor={item.backgroundColor}
      bottomRightIconName={item.bottomRightIconName}
      onClose={() => console.log('Cerrar anuncio', item.id)}
    />
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <FlatList
        data={ads}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
}
