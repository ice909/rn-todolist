import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BottomSheetHandleProps, BottomSheetModal } from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Icon } from '@rneui/themed';

interface MissionDetailHandleProps extends BottomSheetHandleProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
  handleDelete: () => void;
  insets: { top: number };
}

export function MissionDetailHandle({
  animatedIndex,
  bottomSheetModalRef,
  showMenu,
  setShowMenu,
  handleDelete,
  insets,
}: MissionDetailHandleProps) {
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
      transform: [{ rotate: '-90deg' }],
      position: 'absolute' as const,
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
}

const styles = StyleSheet.create({
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