import { useRenderStore } from '@/stores/render';
import { Order } from '@/types';
import { View, Text, StyleSheet } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';

export function DraggableList({ data, onDragEnd }: { data: Order[], onDragEnd: (data: Order[]) => void }) {
  const missionMap = useRenderStore((state) => state.missionMap);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Order>) => {
    return (
      <View
        style={[styles.item, { backgroundColor: isActive ? '#ddd' : '#fff' }]}
      >
        <Text
          style={styles.text}
          onLongPress={drag} // 长按拖拽
        >
          {missionMap.get(item.id)?.missionTitle}
        </Text>
      </View>
    );
  };
  return (
    <DraggableFlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      onDragEnd={({ data }) => onDragEnd(data)}
    ></DraggableFlatList>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 'auto',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
});
