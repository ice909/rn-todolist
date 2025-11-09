import { DataStoreState, Mission, Order } from '@/types';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

/**
 * 数据层
 */
export const useDataStore = create(
  subscribeWithSelector<DataStoreState>((set) => ({
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
    updateMission: (mission: Mission) => {
      set((state) => {
        const newMissionMap = new Map(state.missionMap);
        newMissionMap.set(mission.missionId, mission);

        return {
          missionMap: newMissionMap,
        };
      });
    },
  }))
);
