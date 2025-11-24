import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetHandleProps,
} from '@gorhom/bottom-sheet';
import { useDataStore } from '@/stores/data';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Icon } from '@rneui/themed';
import { useDetailStore } from '@/stores/detail';

export function MissionDetailSheet() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const selectedTaskId = useDetailStore((state) => state.editingOrderId);
  const closeDetailSheet = useDetailStore((state) => state.closeDetailSheet);
  const missionMap = useDataStore((state) => state.missionMap);
  const insets = useSafeAreaInsets();

  const snapPoints = useMemo(() => ['50%', '100%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      closeDetailSheet();
    }
  }, [closeDetailSheet]);

  useEffect(() => {
    if (selectedTaskId) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [selectedTaskId]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.2}
      />
    ),
    []
  );

  const deleteOrder = useDataStore((state) => state.deleteOrder);
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = () => {
    if (selectedTaskId) {
      deleteOrder(selectedTaskId);
      closeDetailSheet();
    }
  };

  const CustomHandle = useCallback(
    ({ animatedIndex }: BottomSheetHandleProps) => {
      const containerStyle = useAnimatedStyle(() => {
        const paddingTop = interpolate(
          animatedIndex.value,
          [0, 0.8, 1],
          [10, 10, insets.top + 10],
          Extrapolation.CLAMP
        );

        return {
          paddingTop,
        };
      });

      const containerAnimatedStyle = useAnimatedStyle(() => {
        const rotate = interpolate(
          animatedIndex.value,
          [0, 1],
          [0, 90],
          Extrapolation.CLAMP
        );

        return {
          transform: [{ rotate: `${rotate}deg` }],
        };
      });

      const chevronStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
          animatedIndex.value,
          [0, 0.5],
          [1, 0],
          Extrapolation.CLAMP
        );
        return { opacity };
      });

      const arrowStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
          animatedIndex.value,
          [0.5, 1],
          [0, 1],
          Extrapolation.CLAMP
        );
        return {
          opacity,
          transform: [{ rotate: '-90deg' }], // Pre-rotate to point down
          position: 'absolute',
        };
      });

      return (
        <Animated.View style={[styles.header, containerStyle]}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => bottomSheetModalRef.current?.dismiss()}
              style={styles.iconButton}
            >
              <Animated.View style={[containerAnimatedStyle]}>
                <Animated.View style={chevronStyle}>
                  <Icon name="chevron-down" type="feather" size={24} />
                </Animated.View>
                <Animated.View style={arrowStyle}>
                  <Icon name="arrow-left" type="feather" size={24} />
                </Animated.View>
              </Animated.View>
            </TouchableOpacity>
          </View>
          <View style={styles.headerCenter} />
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => setShowMenu(!showMenu)}
              style={styles.iconButton}
            >
              <Icon name="more-vertical" type="feather" size={24} />
            </TouchableOpacity>
            {showMenu && (
              <View style={styles.menu}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={handleDelete}
                >
                  <Icon name="trash-2" type="feather" size={18} color="red" />
                  <Text style={{ marginLeft: 8, color: 'red', fontSize: 16 }}>
                    删除
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Animated.View>
      );
    },
    [insets.top, showMenu]
  );

  const mission = selectedTaskId ? missionMap.get(selectedTaskId) : null;

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      handleComponent={CustomHandle}
      enableDynamicSizing={false}
    >
      <BottomSheetView style={styles.contentContainer}>
        {mission ? (
          <View>
            <Text style={styles.title}>{mission.missionTitle}</Text>
            <Text style={styles.content}>{mission.missionContent}</Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 2,
    alignItems: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  iconButton: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 19,
  },
  menu: {
    position: 'absolute',
    top: '100%',
    right: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: 120,
    zIndex: 100,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 4,
  },
});
