import { List } from '@/components/List';
import { Page } from '@/components/page';
import { EmptyState } from '@/components/empty/EmptyState';
import { useRenderStore } from '@/stores/render';

export default function DoneScreen() {
  const orders = useRenderStore((state) => state.doneOrders);

  function renderList() {
    if (orders.length === 0) {
      return <EmptyState />;
    }
    return <List data={orders} />;
  }

  return <Page>{renderList()}</Page>;
}
