import { useDataStore } from '@/stores/data';
import { useRenderStore } from '@/stores/render';
import { useDetailStore } from '@/stores/detail';
import { MissionType, Order } from '@/types';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { Checkbox } from './checkbox/CheckBox';
import { useTaskStore } from '@/stores/task';

export function MissionItem({ item, index }: { item: Order; index: number }) {
  const missionMap = useDataStore((state) => state.missionMap);
  const toggleDoneOrder = useTaskStore((state) => state.toggleDoneOrder);
  const todoOrders = useRenderStore((state) => state.todoOrders);
  const openDetailSheet = useDetailStore((state) => state.openDetailSheet);

  const mission = missionMap.get(item.id);

  function handleDone(checked: boolean) {
    toggleDoneOrder({
      ...item,
      itemType: checked ? MissionType.DONE : MissionType.NOT_DONE,
    });
  }

  return (
    <Pressable
      android_ripple={{
        color: 'rgba(0,0,0,0.1)',
        borderless: false,
        foreground: true,
      }}
      onPress={() => openDetailSheet(item.id)}
      style={[
        styles.pressable,
        {
          borderTopLeftRadius: index === 0 ? 6 : 0,
          borderTopRightRadius: index === 0 ? 6 : 0,
          borderBottomLeftRadius: index === todoOrders.length - 1 ? 8 : 0,
          borderBottomRightRadius: index === todoOrders.length - 1 ? 8 : 0,
        },
      ]}
    >
      <View style={[styles.inner]}>
        <Checkbox
          checked={item.itemType === MissionType.DONE}
          priority={mission?.missionPriorityId}
          onChange={handleDone}
        />
        <Text style={styles.text}>{missionMap.get(item.id)?.missionTitle}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
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
});

