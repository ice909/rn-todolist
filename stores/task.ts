import { AddMissionParams, Mission, Order } from '@/types';
import { create } from 'zustand';
import { useDataStore } from './data';

export const useTaskStore = create<{
  addMission: (params: AddMissionParams) => Promise<void>;
  saveMission: (missions: Mission[]) => Promise<void>;
  toggleDoneOrder: (order: Order) => Promise<void>;
  saveOrders: (orders: Order[]) => Promise<void>;
}>(() => ({
  addMission: async (params: AddMissionParams) => {
    const ds = useDataStore.getState();
    const { mission, order, insertIndex } = params;

    const parentId = order.parent;
    if (parentId) {
      // TODO:
    } else {
      if (insertIndex !== undefined) {
        const items = [
          ...ds.orders.slice(0, insertIndex),
          order,
          ...ds.orders.slice(insertIndex),
        ];
        ds.setOrders(items);
      } else {
        const items = [order, ...ds.orders];
        ds.setOrders(items);
      }
    }
    ds.updateMissionMap([mission]);
  },
  saveMission: async (missions: Mission[]) => {
    const ds = useDataStore.getState();
    const now = new Date().toISOString();
    missions.forEach((m) => {
      m.modifyAt = now;
    });
    ds.updateMissionMap(missions);
  },
  toggleDoneOrder: async (order: Order) => {
    useDataStore.getState().updateOrderInfos([order])
  },
  saveOrders: async (orders: Order[]) => {
    useDataStore.getState().updateOrderInfos(orders)
  }
}));
