import { DraggableList } from '@/components/draggable-list';
import { Page } from '@/components/page';
import { EmptyState } from '@/components/empty/EmptyState';
import { useDataStore } from '@/stores/data';
import { useRenderStore } from '@/stores/render';

export default function DoneScreen() {
  const orders = useRenderStore((state) => state.doneOrders);
  const setOrders = useDataStore((state) => state.setOrders);

  function renderList() {
    if (orders.length === 0) {
      return (
        <EmptyState />
      )
    }
    return <DraggableList data={orders} onDragEnd={(data) => setOrders(data)} />
  }

  return (
    <Page>
      {renderList()}
    </Page>
  );
}
