import { useDataStore } from '@/stores/data';
import { useRenderStore } from '@/stores/render';
import { Order } from '@/types';
// import { CheckBox } from '@rneui/themed';
import { StyleSheet, View, Text } from 'react-native';
import { RenderItemParams } from 'react-native-draggable-flatlist';

export function MissionItem({
  item,
  drag,
  isActive,
  getIndex,
}: RenderItemParams<Order>) {
  const missionMap = useDataStore((state) => state.missionMap);
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
      {/* <CheckBox
        containerStyle={{
          margin: 0,
          padding: 0,
        }}
				wrapperStyle={{ margin: 0, padding: 0 }}
				style={{ margin: 0, padding: 0 }}
				size={20}
        checked={item.itemType === MissionType.DONE}
        iconType="material-community"
        uncheckedIcon={'checkbox-blank-outline'}
        checkedIcon={'checkbox-marked'}
      /> */}
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
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginHorizontal: 12,
		gap: 0,
  },
  text: {
    fontSize: 16,
  },
});
