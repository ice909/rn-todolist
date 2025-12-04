import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const themeColors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeColors.primary,
        headerBackground: () => (
          <View
            style={{
              flex: 1,
              backgroundColor: themeColors.background,
            }}
          />
        ),
        headerStyle: {
          height: 50 + insets.top,
        },
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: insets.bottom + 60,
          paddingBottom: 8,
          backgroundColor: themeColors.background,
          paddingTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '任务',
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
        name="trash"
        options={{
          title: '回收站',
          tabBarIcon: ({ color }) => (
            <Feather name="trash" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="debug"
        options={{
          title: '调试',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bug" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
