import { useDataStore } from '@/stores/data';
import { useRenderStore } from '@/stores/render';
import { useDetailStore } from '@/stores/detail';
import { MissionType, Order } from '@/types';
import { StyleSheet, Text, Pressable } from 'react-native';
import { RenderItemParams } from 'react-native-draggable-flatlist';
import { CustomCheckbox } from './checkbox/CheckBox';

export function MissionItem({
  item,
  drag,
  isActive,
  getIndex,
}: RenderItemParams<Order>) {
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
  const priorityColor = mission ? priorityColors[mission.missionPriorityId] : undefined;

  return (
    <Pressable
      onPress={() => openDetailSheet(item.id)}
      onLongPress={drag}
      style={[
        styles.item,
        { backgroundColor: isActive ? '#ddd' : '#fff' },
        {
          borderTopLeftRadius: getIndex() === 0 ? 6 : 0,
          borderTopRightRadius: getIndex() === 0 ? 6 : 0,
          borderBottomLeftRadius: getIndex() === todoOrders.length - 1 ? 8 : 0,
          borderBottomRightRadius: getIndex() === todoOrders.length - 1 ? 8 : 0,
        },
      ]}
    >
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 'auto',
    paddingHorizontal: 12 ,
    paddingVertical: 10,
    marginHorizontal: 12,
    gap: 6,
  },
  text: {
    fontSize: 16,
  },
});
