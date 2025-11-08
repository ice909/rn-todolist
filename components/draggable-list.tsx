import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';

type Task = {
  id: string;
  title: string;
};

const initialTasks: Task[] = [
  { id: '1', title: 'Task A' },
  { id: '2', title: 'Task B' },
  { id: '3', title: 'Task C' },
  { id: '4', title: 'Task D' },
  { id: '5', title: 'Task E' },
  { id: '6', title: 'Task F' },
  { id: '7', title: 'Task G' },
  { id: '8', title: 'Task H' },
  { id: '9', title: 'Task I' },
  { id: '10', title: 'Task J' },
  { id: '11', title: 'Task K' },
  { id: '12', title: 'Task L' },
  { id: '13', title: 'Task M' },
  { id: '14', title: 'Task N' },
  { id: '15', title: 'Task O' },
  { id: '16', title: 'Task P' },
  { id: '17', title: 'Task Q' },
  { id: '18', title: 'Task R' },
  { id: '19', title: 'Task S' },
  { id: '20', title: 'Task T' },
  { id: '21', title: 'Task U' },
  { id: '22', title: 'Task V' },
  { id: '23', title: 'Task W' },
  { id: '24', title: 'Task X' },
  { id: '25', title: 'Task Y' },
  { id: '26', title: 'Task Z' },
];

export function DraggableList() {
  const [tasks, setTasks] = useState(initialTasks);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Task>) => {
    return (
      <View
        style={[styles.item, { backgroundColor: isActive ? '#ddd' : '#fff' }]}
      >
        <Text
          style={styles.text}
          onLongPress={drag} // 长按拖拽
        >
          {item.title}
        </Text>
      </View>
    );
  };
  return (
    <DraggableFlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      onDragEnd={({ data }) => setTasks(data)}
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
