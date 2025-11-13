import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Platform,
  TextInput,
  useColorScheme,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@rneui/themed';
import { Colors } from '@/constants/theme';

export function AddOrder({
  visible,
  onClose,
  onConfirm,
}: {
  visible: boolean;
  onClose: () => void;
  onConfirm: (title: string, description: string) => void;
}) {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? 'light'];
  const titleInputRef = React.useRef<TextInput>(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

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
    onConfirm(title, desc);
    setTitle('');
    setDesc('');
    onClose();
  };

  const handleCancel = () => {
    Keyboard.dismiss();
    setTitle('');
    setDesc('');
    onClose();
  };

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
              justifyContent: 'flex-end',
            }}
          >
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
});
