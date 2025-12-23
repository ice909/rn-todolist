import React, { useMemo, useRef, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface MenuAction {
  icon: string;
  label: string;
  onPress: () => void;
  color?: string;
}

interface MenuActionSheetProps {
  visible: boolean;
  onClose: () => void;
}

export function MenuActionSheet({ visible, onClose }: MenuActionSheetProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['60%'], []);

  // 显示/隐藏 Bottom Sheet
  React.useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [visible]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.3}
        onPress={() => {
          // 点击 backdrop 只关闭当前 sheet
          bottomSheetModalRef.current?.dismiss();
        }}
      />
    ),
    []
  );

  const handleActionPress = (action: MenuAction) => {
    onClose();
    setTimeout(() => {
      action.onPress();
    }, 300); // 给关闭动画一点时间
  };

  const actions: {
    icon: string;
    iconType: 'Octicons' | 'MaterialIcons';
    label: string;
    onPress: () => void;
    color?: string;
  }[] = [
    {
      icon: 'move-to-top',
      iconType: 'Octicons',
      label: '置顶',
      onPress: () => {
        console.log('置顶任务');
      },
    },
    {
      icon: 'delete-forever',
      iconType: 'MaterialIcons',
      label: '删除',
      color: 'red',
      onPress: () => {
        console.log('删除任务');
      },
    },
  ];

  const renderHandle = useCallback(() => <View />, []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={false}
      enableContentPanningGesture={true}
      enableHandlePanningGesture={true}
      detached={true}
      stackBehavior="push"
      backgroundStyle={styles.background}
      handleComponent={renderHandle}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.topAction}>
          {actions.map((action) => (
            <View style={styles.action} key={action.label}>
              {action.iconType === 'Octicons' ? (
                <View style={styles.iconStyle}>
                  <Octicons
                    name={action.icon as any}
                    size={24}
                    color={action.color || 'black'}
                  />
                </View>
              ) : (
                <View style={styles.iconStyle}>
                  <MaterialIcons
                    name={action.icon as any}
                    size={24}
                    color={action.color || 'black'}
                  />
                </View>
              )}
              <Text style={styles.label}>{action.label}</Text>
            </View>
          ))}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#F7F7F7',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  topAction: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  action: {
    justifyContent: 'center',
  },
  iconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});
