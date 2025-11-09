import { DraggableList } from '@/components/draggable-list';
import { Page } from '@/components/page';
import { useRenderStore } from '@/stores/render';

export default function DoneScreen() {
  const orders = useRenderStore((state) => state.doneOrders);
  const setOrders = useRenderStore((state) => state.setOrders);
  return (
    <Page>
      <DraggableList data={orders} onDragEnd={(data) => setOrders(data)} />
    </Page>
  );
}
