import { Order } from '@/types';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { MissionItem } from './MissionItem';

export function DraggableList({
  data,
  onDragEnd,
}: {
  data: Order[];
  onDragEnd: (data: Order[]) => void;
}) {
  const renderItem = ({ item, drag, isActive, getIndex }: RenderItemParams<Order>) => {
    return <MissionItem item={item} drag={drag} isActive={isActive} getIndex={getIndex} />;
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
