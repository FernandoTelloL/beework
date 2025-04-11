import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#673ab7',
        tabBarInactiveTintColor: '#222',
        tabBarShowLabel: true,
      }}>

      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }: { color: string }) => <Ionicons size={28} name="home-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="buscarTareas/index"
        options={{
          title: 'Buscar Tareas',
          tabBarIcon: ({ color }: { color: string }) => <Ionicons size={28} name="search-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="misTareas/index"
        options={{
          title: 'Mis Tareas',
          tabBarIcon: ({ color }: { color: string }) => <Ionicons size={28} name="calendar-outline" color={color} />,
        }}
      />

      <Tabs.Screen
        name="pagos/index"
        options={{
          title: 'Pagos',
          tabBarIcon: ({ color }: { color: string }) => <Ionicons size={28} name="happy-outline" color={color} />,
        }}
      />


      <Tabs.Screen
        name="perfil/index"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }: { color: string }) => <Ionicons size={28} name="person-circle-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
