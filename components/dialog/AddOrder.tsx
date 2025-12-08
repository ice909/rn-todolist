import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  useColorScheme,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Button } from '@rneui/themed';
import { Colors } from '@/constants/theme';
import Animated from 'react-native-reanimated';

import { PrioritySelect } from '../PrioritySelect';
import {
  MenuProvider,
} from 'react-native-popup-menu';

export function AddOrder({
  visible,
  onClose,
  onConfirm,
}: {
  visible: boolean;
  onClose: () => void;
  onConfirm: (title: string, description: string, priority: number) => void;
}) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? 'light'];
  const titleInputRef = React.useRef<TextInput>(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState(4);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleConfirm = () => {
    if (!title.trim()) return;
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
    setPriority(4);
    onClose();
  };

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const bottomOffset = keyboardHeight > 0 ? keyboardHeight + insets.bottom : 0;

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={handleCancel}
      onBackButtonPress={handleCancel}
      style={style.modal}
      backdropOpacity={0.2}
      backdropTransitionOutTiming={500}
      statusBarTranslucent
    >
      <MenuProvider skipInstanceCheck>
        <Animated.View style={[style.animated, { bottom: bottomOffset }]}>
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
                <PrioritySelect
                  priority={priority}
                  placementType="top"
                  onChange={(p) => setPriority(p)}
                />
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
        </Animated.View>
      </MenuProvider>
    </Modal>
  );
}

const style = StyleSheet.create({
  modal: {
    margin: 0,
  },
  animated: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    gap: 0,
    paddingHorizontal: 10,
  },
  content: {
    paddingTop: 4,
    paddingBottom: 20,
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
  },
});
