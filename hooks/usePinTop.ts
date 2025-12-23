import { useDataStore } from '@/stores/data';

export function usePinTop() {
  function exec(id: string) {
    const state = useDataStore.getState();
    const { orders, setOrders } = state;

    const targetIndex = orders.findIndex((order) => order.id === id);
    if (targetIndex === -1) {
      console.warn(`任务 ${id} 不存在`);
      return false;
    }

    // 如果已经在顶部，无需操作
    if (targetIndex === 0) {
      console.log('任务已在顶部');
      return true;
    }

    const newOrders = [...orders];
    const [targetTask] = newOrders.splice(targetIndex, 1);

    newOrders.unshift(targetTask);

    // 更新状态
    setOrders(newOrders);
  }
  return exec;
}
