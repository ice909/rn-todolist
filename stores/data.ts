import { OrderManager } from '@/common/OrderManager';
import { DataStoreState, Mission, MissionType, Order } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import {
  createJSONStorage,
  persist,
  PersistStorage,
  subscribeWithSelector,
} from 'zustand/middleware';

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
        orderMap: new Map<string, Order>(),
        missionMap: new Map<string, Mission>(),
        setOrders: (order: Order[]) => {
          set({
            orders: OrderManager.orderToList(order).orders,
          });
        },
        addOrder: (order: Order) => {
          set((state) => {
            const newOrders = [order, ...state.orders];
            const newOrderMap = new Map(state.orderMap);
            newOrderMap.set(order.id, order);

            return {
              orders: OrderManager.orderToList(newOrders).orders,
              orderMap: newOrderMap,
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
        updateOrderType: (orderId: string, itemType: MissionType) => {
          console.log('updateOrderType', orderId, itemType);
          set((state) => {
            const orderMap = new Map(state.orderMap);
            const orders = [...state.orders];

            const order = orderMap.get(orderId);
            if (!order) return {};

            const newOrder = { ...order, itemType };
            orderMap.set(orderId, newOrder);

            const index = orders.findIndex((o) => o.id === orderId);
            if (index !== -1) {
              orders[index] = newOrder;
            }

            return {
              orders: OrderManager.orderToList(orders).orders.slice(),
              orderMap,
            };
          });
        },
        deleteOrder: (orderId: string) => {
          set((state) => {
            const orderMap = new Map(state.orderMap);
            const orders = state.orders.filter((o) => o.id !== orderId);
            orderMap.delete(orderId);
            
            return {
              orders: OrderManager.orderToList(orders).orders.slice(),
              orderMap,
            };
          });
        },
      }),
      {
        name: 'rn-todo-data-storage',
        storage: customStorage,

        partialize: (state) =>
          ({
            orders: state.orders,
            orderMap: Array.from(state.orderMap.entries()),
            missionMap: Array.from(state.missionMap.entries()),
          } as unknown as DataStoreState),

        onRehydrateStorage: (state) => {
          return (persistedState) => {
            // 检查持久化的数据是否存在 missionMap 且是数组
            if (persistedState) {
              if (Array.isArray(persistedState.missionMap)) {
                persistedState.missionMap = new Map(
                  persistedState.missionMap as [string, Mission][]
                );
              }

              if (Array.isArray(persistedState.orderMap)) {
                persistedState.orderMap = new Map(
                  persistedState.orderMap as [string, Order][]
                );
              }
            }
          };
        },
      }
    )
  )
);
