import Swipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useDataStore } from '@/stores/data';
import { useRenderStore } from '@/stores/render';
import { Checkbox } from './checkbox/CheckBox';
import { MissionType, Order } from '@/types';
import { useRef } from 'react';
import { useTaskStore } from '@/stores/task';
import { deepClone } from '@/utils';

export function TrashItem({ item, index }: { item: Order; index: number }) {
  const swipeableRef = useRef<SwipeableMethods>(null);
  const missionMap = useDataStore((state) => state.missionMap);
  const deletedOrders = useRenderStore((state) => state.deletedOrders);
  const saveOrders = useTaskStore(state => state.saveOrders)

  const mission = missionMap.get(item.id);

  function hdlPressRecover() {
    const order = deepClone(item)
    order.deleted = false
    saveOrders([order])
  }

  const renderRightActions = () => {
    return (
      <View style={[styles.rightActionsContainer]}>
        <Pressable style={[styles.action, styles.restore]} onPress={hdlPressRecover}>
          <Text style={styles.actionText}>恢复</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      overshootLeft={false}
      overshootRight={false}
      renderRightActions={renderRightActions}
      containerStyle={[{
        marginHorizontal: 12,
        overflow: 'hidden',
      },
      {
        borderTopLeftRadius: index === 0 ? 6 : 0,
        borderTopRightRadius: index === 0 ? 6 : 0,
        borderBottomLeftRadius: index === deletedOrders.length - 1 ? 8 : 0,
        borderBottomRightRadius: index === deletedOrders.length - 1 ? 8 : 0,
      }
      ]}
    >
      <Pressable
        style={[
          styles.pressable
        ]}
      >
        <View style={styles.inner}>
          <Checkbox
            checked={item.itemType === MissionType.DONE}
            priority={mission?.missionPriorityId}
            onChange={() => { }}
          />
          <Text style={styles.text}>{mission?.missionTitle}</Text>
        </View>
      </Pressable>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 6,
  },
  text: {
    fontSize: 16,
  },
  action: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: '100%',
  },
  restore: {
    backgroundColor: '#4772fa',
  },
  rightActionsContainer: {
    height: '100%',
    flexDirection: 'row', // 横向排列按钮
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
