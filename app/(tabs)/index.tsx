import { FloatingAddButton } from '@/components/button/FloatingAddButton';
import { AddOrder } from '@/components/dialog/add-order';
import { List } from '@/components/List';
import { EmptyState } from '@/components/empty/EmptyState';
import { Page } from '@/components/page';
import { useCreateTask } from '@/hooks/use-create-task';
import { useRenderStore } from '@/stores/render';
import { MissionType } from '@/types';
import { useState } from 'react';

export default function HomeScreen() {
  const ct = useCreateTask();
  const orders = useRenderStore((state) => state.todoOrders);
  const [visible, setVisible] = useState(false);

  function handleCreate(title: string, desc: string, priority: number) {
    ct.createTask({
      missionTitle: title,
      missionContent: desc,
      missionStartTime: '',
      missionPriorityId: priority,

      parentId: '',
      itemType: MissionType.NOT_DONE,
      insertPosition: 'first',

      onCreateSuccess: () => {},
    });
  }

  function renderList() {
    if (orders.length === 0) {
      return <EmptyState />;
    }
    return <List data={orders} />;
  }

  return (
    <Page>
      {renderList()}
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
