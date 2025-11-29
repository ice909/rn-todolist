import React from 'react';
import {
  Pressable,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Icon, IconProps } from '@rneui/themed';

export interface IconButtonProps {
  icon: IconProps;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
  size?: number;
  hitSize?: number;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  containerStyle,
  disabled = false,
  loading = false,
  size = 24,
  hitSize = 38,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.container,
        { width: hitSize, height: hitSize },
        containerStyle,
        disabled && styles.disabled,
        pressed && Platform.OS !== 'android' && styles.pressed,
      ]}
      android_ripple={{
        color: 'rgba(0, 0, 0, 0.12)',
        borderless: false,
        foreground: true,
      }}
      hitSlop={8}
    >
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Icon {...icon} size={size} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  disabled: {
    opacity: 0.4,
  },
  pressed: {
    opacity: 0.6,
  },
});

export default IconButton;
