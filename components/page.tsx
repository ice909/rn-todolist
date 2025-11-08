import { Colors } from '@/constants/theme';
import React from 'react';
import { useColorScheme, ViewProps, View } from 'react-native';

export function Page({ style, children, ...rest }: ViewProps) {
	const colorScheme = useColorScheme();
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          paddingTop: 8,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
