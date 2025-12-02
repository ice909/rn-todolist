import { useRenderStore } from '@/stores/render';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { MenuProvider } from 'react-native-popup-menu';
import { MissionDetailSheet } from '@/components/sheet/MissionDetailSheet';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../drizzle/migrations';
import { db } from '@/db/db';
import { useDataStore } from '@/stores/data';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (!success) return;
    (async () => {
      useRenderStore.getState().init();
      useDataStore.getState().init();
      // await db.run('DROP TABLE IF EXISTS localOrders');
      // await db.run('DROP TABLE IF EXISTS localMissions');
    })();
  }, [success]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MenuProvider>
        <BottomSheetModalProvider>
          <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
            <MissionDetailSheet />
          </ThemeProvider>
        </BottomSheetModalProvider>
      </MenuProvider>
    </GestureHandlerRootView>
  );
}
