import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Icon } from '@rneui/themed';

export const PRIORITY_OPTIONS = [
  { id: 1, label: '高优先级', color: '#D74A46' },
  { id: 2, label: '中优先级', color: '#F8B31C' },
  { id: 3, label: '低优先级', color: '#5378ED' },
  { id: 4, label: '无优先级', color: '#B5B5B5' },
];

interface PrioritySelectProps {
  priority: number;
  onChange: (priority: number) => void;
}

export function PrioritySelect({ priority, onChange }: PrioritySelectProps) {
  const [visible, setVisible] = useState(false);

  const currentPriority =
    PRIORITY_OPTIONS.find((p) => p.id === priority) || PRIORITY_OPTIONS[3];

  return (
    <View>
      <TouchableOpacity
        onPress={() => setVisible(!visible)}
        style={styles.priorityButton}
      >
        <Icon
          name="flag"
          type="feather"
          size={20}
          color={currentPriority.color}
        />
      </TouchableOpacity>

      {visible && (
        <>
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          <View style={styles.menu}>
            {PRIORITY_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.menuItem}
                onPress={() => {
                  onChange(option.id);
                  setVisible(false);
                }}
              >
                <Icon
                  name="flag"
                  type="feather"
                  size={20}
                  color={option.color}
                />
                <Text style={styles.menuText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  priorityButton: {
    padding: 8,
    borderRadius: 4,
  },
  overlay: {
    position: 'absolute',
    top: -1000,
    bottom: -1000,
    left: -1000,
    right: -1000,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  menu: {
    position: 'absolute',
    bottom: '100%',
    left: 0,
    zIndex: 2,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: 150,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
  },
  menuText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
});
