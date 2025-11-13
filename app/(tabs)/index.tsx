import { FloatingAddButton } from '@/components/button/FloatingAddButton';
import { AddOrder } from '@/components/dialog/add-order';
import { DraggableList } from '@/components/draggable-list';
import { Page } from '@/components/page';
import { useCreateTask } from '@/hooks/use-create-task';
import { useDataStore } from '@/stores/data';
import { useRenderStore } from '@/stores/render';
import { MissionType } from '@/types';
import { useState } from 'react';

export default function HomeScreen() {
  const ct = useCreateTask();
  const orders = useRenderStore((state) => state.todoOrders);
  const setOrders = useDataStore((state) => state.setOrders);
  const [visible, setVisible] = useState(false);

  function handleCreate(title: string, desc: string) {
    ct.createTask({
      missionTitle: title,
      missionContent: desc,
      missionStartTime: '',
      missionPriorityId: 4,

      parentId: '',
      itemType: MissionType.NOT_DONE,
      insertPosition: 'first',

      onCreateSuccess: () => {},
    });
  }
  return (
    <Page>
      <DraggableList data={orders} onDragEnd={setOrders} />
      <FloatingAddButton onPress={() => setVisible(true)} />
      <AddOrder
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onConfirm={handleCreate}
      />
    </Page>
  );
}
