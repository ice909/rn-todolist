import { FloatingAddButton } from '@/components/button/FloatingAddButton';
import { DraggableList } from '@/components/draggable-list';
import { Page } from '@/components/page';
import { useCreateTask } from '@/hooks/use-create-task';
import { useRenderStore } from '@/stores/render';
import { MissionType } from '@/types';
import { v4 } from 'uuid';

export default function HomeScreen() {
  const ct = useCreateTask();
  const orders = useRenderStore((state) => state.orders);
  const setOrders = useRenderStore((state) => state.setOrder);

  function handlePress() {
    ct.createTask({
      missionTitle: v4(),
      missionContent: '',
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
      <FloatingAddButton onPress={handlePress} />
    </Page>
  );
}
