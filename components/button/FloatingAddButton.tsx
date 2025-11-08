import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Colors } from '@/constants/theme';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function FloatingAddButton({ onPress }: { onPress?: () => void }) {
  const colorScheme = useColorScheme();
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.92, { damping: 9, stiffness: 150, mass: 0.5 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 120, mass: 0.8 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const style = StyleSheet.create({
    fab: {
      position: 'absolute',
      right: 16,
      bottom: 16,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: Colors[colorScheme ?? 'light'].primary,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
  });

  return (
    <AnimatedPressable
      style={[style.fab, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Entypo name="plus" size={30} color="white" />
    </AnimatedPressable>
  );
}
