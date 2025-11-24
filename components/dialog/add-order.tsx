import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Platform,
  TextInput,
  useColorScheme,
  Keyboard,
  TouchableOpacity,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Icon } from '@rneui/themed';
import { Colors } from '@/constants/theme';

const PRIORITY_OPTIONS = [
  { id: 1, label: '高优先级', color: '#D74A46' },
  { id: 2, label: '中优先级', color: '#F8B31C' },
  { id: 3, label: '低优先级', color: '#5378ED' },
  { id: 4, label: '无优先级', color: '#B5B5B5' },
];

export function AddOrder({
  visible,
  onClose,
  onConfirm,
}: {
  visible: boolean;
  onClose: () => void;
  onConfirm: (title: string, description: string, priority: number) => void;
}) {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? 'light'];
  const titleInputRef = React.useRef<TextInput>(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState(4);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleConfirm = () => {
    Keyboard.dismiss();
    onConfirm(title, desc, priority);
    setTitle('');
    setDesc('');
    setPriority(4);
    onClose();
  };

  const handleCancel = () => {
    Keyboard.dismiss();
    setTitle('');
    setDesc('');
    setPriority(4);
    setShowPriorityMenu(false);
    onClose();
  };

  const currentPriority = PRIORITY_OPTIONS.find((p) => p.id === priority) || PRIORITY_OPTIONS[3];

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={handleCancel}
      style={style.modal}
      backdropOpacity={0.2}
      backdropTransitionOutTiming={500}
      statusBarTranslucent
      avoidKeyboard
    >
      <KeyboardAvoidingView
        style={style.keyborad}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <SafeAreaView style={style.content}>
          <TextInput
            ref={titleInputRef}
            style={style.title}
            placeholder="准备做什么？"
            placeholderTextColor="#D9D9D9"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={style.description}
            placeholder="描述"
            placeholderTextColor="#D9D9D9"
            value={desc}
            onChangeText={setDesc}
          />
          <View style={{ height: 8 }}></View>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ position: 'relative', zIndex: 10 }}>
              <TouchableOpacity
                onPress={() => setShowPriorityMenu(!showPriorityMenu)}
                style={style.priorityButton}
              >
                <Icon
                  name="flag"
                  type="feather"
                  size={20}
                  color={currentPriority.color}
                />
              </TouchableOpacity>
              {showPriorityMenu && (
                <View style={style.priorityMenu}>
                  {PRIORITY_OPTIONS.map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      style={style.priorityMenuItem}
                      onPress={() => {
                        setPriority(option.id);
                        setShowPriorityMenu(false);
                      }}
                    >
                      <Icon
                        name="flag"
                        type="feather"
                        size={20}
                        color={option.color}
                      />
                      <Text style={{ marginLeft: 8, fontSize: 16, color: '#333' }}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            <Button
              radius={6}
              buttonStyle={{
                backgroundColor: color.primary,
              }}
              titleStyle={{ paddingHorizontal: 8 }}
              size="md"
              title="创建"
              onPress={handleConfirm}
            ></Button>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const style = StyleSheet.create({
  modal: {
    margin: 0,
  },
  keyborad: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    gap: 0,
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
  },
  priorityButton: {
    padding: 8,
    borderRadius: 4,
  },
  priorityMenu: {
    position: 'absolute',
    bottom: '100%',
    left: 0,
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
  priorityMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
  },
});
