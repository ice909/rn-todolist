import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].primary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '待办',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="checkbox-blank-outline"
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="done"
        options={{
          title: '已完成',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="checkbox-marked"
              size={26}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
