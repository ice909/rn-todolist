import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Icon } from '@rneui/themed';
import { Colors } from '@/constants/theme';

import { PRIORITY_OPTIONS } from '../PrioritySelect';

export function Checkbox({
  checked,
  onChange,
  size = 22,
  color,
  priority,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: number;
  color?: string;
  priority?: number;
}) {
  const colorScheme = useColorScheme();
  const themeColor = Colors[colorScheme ?? 'light'];

  const priorityColor = priority
    ? PRIORITY_OPTIONS.find((p) => p.id === priority)?.color
    : undefined;

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
        color={
          checked
            ? themeColor.checkbox
            : priorityColor || color || themeColor.checkbox
        }
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
