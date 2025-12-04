import { create } from 'zustand';
import { MissionType, RenderStoreState, Order } from '@/types';
import { useDataStore } from './data';

export const useRenderStore = create<RenderStoreState>((set, get) => ({
  todoOrders: [],
  doneOrders: [],
  deletedOrders: [],

  updateDerived() {
    const { orders } = useDataStore.getState();

    set({
      todoOrders: orders.filter(
        (m) => m.itemType === MissionType.NOT_DONE && !m.deleted
      ),
      doneOrders: orders.filter(
        (m) => m.itemType === MissionType.DONE && !m.deleted
      ),
      deletedOrders: orders.filter((m) => m.deleted),
    });
  },

  _unsubscribe: null,

  init() {
    if (get()._unsubscribe) return;

    const unsubscribe = useDataStore.subscribe(
      (state) => state.orders,
      () => {
        get().updateDerived();
      }
    );

    set({ _unsubscribe: unsubscribe });

    get().updateDerived();
  },
}));
