import { useDataStore } from '@/stores/data';
import { useRenderStore } from '@/stores/render';
import { useDetailStore } from '@/stores/detail';
import { MissionType, Order } from '@/types';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { CustomCheckbox } from './checkbox/CheckBox';

export function MissionItem({ item, index }: { item: Order; index: number }) {
  const missionMap = useDataStore((state) => state.missionMap);
  const updateOrderType = useDataStore((state) => state.updateOrderType);
  const todoOrders = useRenderStore((state) => state.todoOrders);
  const openDetailSheet = useDetailStore((state) => state.openDetailSheet);

  const mission = missionMap.get(item.id);
  const priorityColors: Record<number, string> = {
    1: '#D74A46',
    2: '#F8B31C',
    3: '#5378ED',
    4: '#B5B5B5',
  };
  const priorityColor = mission
    ? priorityColors[mission.missionPriorityId]
    : undefined;

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
        <CustomCheckbox
          checked={item.itemType === MissionType.DONE}
          color={item.itemType === MissionType.DONE ? undefined : priorityColor}
          onChange={(checked) => {
            console.log('checked', checked);
            updateOrderType(
              item.id,
              checked ? MissionType.DONE : MissionType.NOT_DONE
            );
          }}
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

