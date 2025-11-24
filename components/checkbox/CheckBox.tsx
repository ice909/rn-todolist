import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Icon } from '@rneui/themed';
import { Colors } from '@/constants/theme';

export function CustomCheckbox({
  checked,
  onChange,
  size = 22,
  color,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: number;
  color?: string;
}) {
  const colorScheme = useColorScheme();
  const themeColor = Colors[colorScheme ?? 'light'];
  return (
    <Pressable
      onPress={() => onChange(!checked)}
      style={styles.container}
      hitSlop={8}
    >
      <Icon
        type="material-community"
        name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
        size={size}
        color={color || themeColor.checkbox}
        containerStyle={styles.icon}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
  },
  icon: {
    padding: 0,
    margin: 0,
  },
});
