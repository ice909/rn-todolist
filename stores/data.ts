import { OrderManager } from '@/common/OrderManager';
import { db } from '@/db/db';
import { localMissionTable } from '@/db/schema/localMissions';
import { localOrderTable } from '@/db/schema/localOrders';
import { DataStoreState, Mission, MissionType, Order } from '@/types';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

/**
 * 数据层
 */
export const useDataStore = create(
  subscribeWithSelector<DataStoreState>((set) => ({
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

        db.insert(localOrderTable)
          .values([order])
          .catch((err) => console.error(err));

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

        db.insert(localMissionTable)
          .values([mission])
          .catch((err) => console.error(err));

        return {
          missionMap: newMissionMap,
        };
      });
    },
    updateMissionPriority: (missionId: string, priority: number) => {
      set((state) => {
        const mission = state.missionMap.get(missionId);
        if (!mission) return {};

        const updatedMission = { ...mission, missionPriorityId: priority };
        const newMissionMap = new Map(state.missionMap);
        newMissionMap.set(missionId, updatedMission);

        return {
          missionMap: newMissionMap,
        };
      });
    },
    updateOrderType: (orderId: string, itemType: MissionType) => {
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

    init: async () => {
      const localOrders = await db.select().from(localOrderTable);
      console.log('local Orders', localOrders);
      const orders: Order[] = localOrders.map((r) => ({
        id: r.id,
        parent: r.parent ?? '',
        num: r.num ?? 0,
        deleted: r.deleted ?? false,
        itemType: r.itemType ?? MissionType.NOT_DONE,
        userId: r.userId ?? '',
      }));
      const orderMap = new Map(orders.map((o) => [o.id, o]));
      const localMissions = await db.select().from(localMissionTable);
      console.log('localMission', localMissions);
      const missionMap = new Map(
        localMissions.map((m) => [
          m.missionId,
          { ...m, userId: m.userId ?? undefined },
        ])
      );
      set({
        orders,
        orderMap,
        missionMap,
      });
    },
  }))
);
