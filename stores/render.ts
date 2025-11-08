import { create } from 'zustand';
import { Mission, Order, RenderStoreState } from '@/types';

export const useRenderStore = create<RenderStoreState>((set) => ({
  orders: [],
  missionMap: new Map<string, Mission>(),

  setOrder: (order: Order[]) => {
    set({
      orders: order,
    });
  },
  addOrder: (order: Order) => {
    set((state) => {
      const newOrders = [order, ...state.orders];

      return {
        orders: newOrders,
      };
    });
  },
  addMission: (mission: Mission) => {
    set((state) => {
      const newMissionMap = new Map(state.missionMap);
      newMissionMap.set(mission.missionId, mission);

      return {
        missionMap: newMissionMap,
      };
    });
  }
}));
