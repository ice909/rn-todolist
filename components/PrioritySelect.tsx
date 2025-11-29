import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import IconButton from './button/IconButton';

export const PRIORITY_OPTIONS = [
  { id: 1, label: '高优先级', color: '#D74A46' },
  { id: 2, label: '中优先级', color: '#F8B31C' },
  { id: 3, label: '低优先级', color: '#5378ED' },
  { id: 4, label: '无优先级', color: '#B5B5B5' },
];

interface PrioritySelectProps {
  priority: number;
  placementType?: 'top' | 'bottom';
  onChange: (priority: number) => void;
}

export function PrioritySelect({
  priority,
  placementType = 'bottom',
  onChange,
}: PrioritySelectProps) {
  const menuRef = useRef<Menu>(null);
  const currentPriority =
    PRIORITY_OPTIONS.find((p) => p.id === priority) || PRIORITY_OPTIONS[3];

  return (
    <Menu
      ref={menuRef}
      renderer={renderers.Popover}
      rendererProps={{
        placement: placementType,
        preferredPlacement: placementType,
        anchorStyle: {
          width: 0,
          height: 10,
          backgroundColor: 'transparent',
        },
      }}
    >
      <MenuTrigger>
        <IconButton
          icon={{
            name: 'flag',
            type: 'feather',
            color: currentPriority.color,
          }}
          size={20}
          onPress={() => menuRef.current?.open()}
        />
      </MenuTrigger>
      <MenuOptions customStyles={optionsStyles}>
        {PRIORITY_OPTIONS.map((option) => (
          <MenuOption
            key={option.id}
            onSelect={() => onChange(option.id)}
            customStyles={optionStyles}
          >
            <View style={styles.menuItem}>
              <Icon name="flag" type="feather" size={20} color={option.color} />
              <Text style={styles.menuText}>{option.label}</Text>
            </View>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
});

const optionsStyles = {
  optionsContainer: {
    borderRadius: 8,
    padding: 4,
    width: 150,
  },
};

const optionStyles = {
  optionWrapper: {
    padding: 8,
    borderRadius: 4,
  },
};
