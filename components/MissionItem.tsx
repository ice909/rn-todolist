import { useDataStore } from '@/stores/data';
import { useRenderStore } from '@/stores/render';
import { MissionType, Order } from '@/types';
import { StyleSheet, View, Text } from 'react-native';
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
  return (
    <View
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
        onChange={(checked) => {
          console.log('checked', checked);
          updateOrderType(
            item.id,
            checked ? MissionType.DONE : MissionType.NOT_DONE
          );
        }}
      />
      <Text style={styles.text} onLongPress={drag}>
        {missionMap.get(item.id)?.missionTitle}
      </Text>
    </View>
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
