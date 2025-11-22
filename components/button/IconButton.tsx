import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
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
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.container,
        { width: hitSize, height: hitSize, borderRadius: hitSize / 2 },
        containerStyle,
        disabled && styles.disabled,
      ]}
      activeOpacity={0.6}
    >
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Icon {...icon} size={size} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
});

export default IconButton;
