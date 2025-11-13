import { DraggableList } from '@/components/draggable-list';
import { Page } from '@/components/page';
import { useDataStore } from '@/stores/data';
import { useRenderStore } from '@/stores/render';

export default function DoneScreen() {
  const orders = useRenderStore((state) => state.doneOrders);
  const setOrders = useDataStore((state) => state.setOrders);
  return (
    <Page>
      <DraggableList data={orders} onDragEnd={(data) => setOrders(data)} />
    </Page>
  );
}
