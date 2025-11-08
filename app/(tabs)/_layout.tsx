import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Text, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].primary,
        headerBackground: () => (
          <View
            style={{
              flex: 1,
              backgroundColor: Colors[colorScheme ?? 'light'].background,
            }}
          />
        ),
        headerStyle: {
          height: 50 + insets.top,
        },
        tabBarButton: HapticTab,
        tabBarLabel: ({ focused, color, children }) =>
          focused ? (
            <Text style={{ color, fontSize: 12, fontWeight: '600' }}>
              {children}
            </Text>
          ) : null,
        tabBarStyle: {
          height: 80,
          paddingBottom: 8,
          paddingTop: 6,
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '待办',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="checkbox-blank-outline"
              size={26}
              color={color}
              style={{
                marginTop: focused ? 0 : 5,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="done"
        options={{
          title: '已完成',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="checkbox-marked"
              size={26}
              color={color}
              style={{
                marginTop: focused ? 0 : 5,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
