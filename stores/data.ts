import { OrderManager } from '@/common/OrderManager';
import { DataStoreState, Mission, Order } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import {
  createJSONStorage,
  persist,
  PersistStorage,
  subscribeWithSelector,
} from 'zustand/middleware';

type DataStorePersist = Pick<DataStoreState, 'orders' | 'missionMap'>;
const customStorage = createJSONStorage(
  () => AsyncStorage
) as PersistStorage<DataStoreState>;

/**
 * 数据层
 */
export const useDataStore = create(
  subscribeWithSelector(
    persist<DataStoreState>(
      (set) => ({
        orders: [],
        missionMap: new Map<string, Mission>(),
        setOrder: (order: Order[]) => {
          set({
            orders: OrderManager.orderToList(order).orders,
          });
        },
        addOrder: (order: Order) => {
          set((state) => {
            const newOrders = [order, ...state.orders];

            return {
              orders: OrderManager.orderToList(newOrders).orders,
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
      }),
      {
        name: 'rn-todo-data-storage',
        storage: customStorage,

        partialize: (state) =>
          ({
            // 只持久化 orders 数组
            orders: state.orders,
            missionMap: Array.from(state.missionMap.entries()),
          } as unknown as DataStoreState),

        onRehydrateStorage: (state) => {
          return (persistedState) => {
            // 检查持久化的数据是否存在 missionMap 且是数组
            if (persistedState && Array.isArray(persistedState.missionMap)) {
              // 将数组转换回 Map 对象
              persistedState.missionMap = new Map(
                persistedState.missionMap as [string, Mission][]
              );
            }
          };
        },
      }
    )
  )
);
