import { Page } from '@/components/page';
import { EmptyState } from '@/components/empty/EmptyState';
import { useRenderStore } from '@/stores/render';
import { FlashList } from '@shopify/flash-list';
import { Order } from '@/types';
import { TrashItem } from '@/components/TrashItem';

export default function DoneScreen() {
  const orders = useRenderStore((state) => state.deletedOrders);

  const renderItem = ({ item, index }: { item: Order; index: number }) => {
    return <TrashItem item={item} index={index} />;
  };

  function renderList() {
    if (orders.length === 0) {
      return <EmptyState />;
    }
    console.log(orders);
    return (
      <FlashList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      ></FlashList>
    );
  }

  return <Page>{renderList()}</Page>;
}
