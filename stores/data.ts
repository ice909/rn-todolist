import { OrderManager } from '@/common/OrderManager';
import { db } from '@/db/db';
import { localMissionTable } from '@/db/schema/localMissions';
import { localOrderTable } from '@/db/schema/localOrders';
import { DataStoreState, Mission, MissionType, Order } from '@/types';
import { sql } from 'drizzle-orm';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

/**
 * 数据层
 */
export const useDataStore = create(
  subscribeWithSelector<DataStoreState>((set, get) => ({
    orders: [],
    orderMap: new Map<string, Order>(),
    missionMap: new Map<string, Mission>(),
    setOrders: (orders: Order[]) => {
      const _orders = OrderManager.orderToList(orders).orders;
      set({
        orders: _orders,
        orderMap: new Map(_orders.map((o) => [o.id, o])),
      });

      db.insert(localOrderTable)
        .values(_orders)
        .onConflictDoUpdate({
          target: localOrderTable.id,
          set: {
            parent: sql`excluded.parent`,
            num: sql`excluded.num`,
            deleted: sql`excluded.deleted`,
            itemType: sql`excluded.itemType`,
            userId: sql`excluded.userId`,
          },
        })
        .run();
    },
    updateOrderInfos: (orders: Order[]) => {
      let map = new Map<string, Order>();
      orders.forEach((v) => {
        map.set(v.id, v);
      });
      const _orders = get().orders;
      let updateCount = 0;
      for (let i = 0; i < _orders.length; i++) {
        const v = _orders[i];
        if (updateCount >= orders.length) {
          break;
        }
        if (map.has(v.id)) {
          const order = map.get(v.id)!;
          _orders[i] = {
            ...order,
          };
          updateCount++;
          continue;
        }
      }
      if (!updateCount) return;
      const listOrders = OrderManager.orderToList(_orders).orders;
      set({
        orders: listOrders,
        orderMap: new Map(listOrders.map((o) => [o.id, o])),
      });

      db.insert(localOrderTable)
        .values(listOrders)
        .onConflictDoUpdate({
          target: localOrderTable.id,
          set: {
            parent: sql`excluded.parent`,
            num: sql`excluded.num`,
            deleted: sql`excluded.deleted`,
            itemType: sql`excluded.itemType`,
            userId: sql`excluded.userId`,
          },
        })
        .run();
    },
    updateMissionMap: (missions: Mission[]) => {
      if (!missions.length) return;
      set((state) => {
        const newMissionMap = new Map(state.missionMap);
        missions.forEach((m) => {
          newMissionMap.set(m.missionId, m);
        });

        return {
          missionMap: newMissionMap,
        };
      });
      db.insert(localMissionTable)
        .values(missions)
        .onConflictDoUpdate({
          target: localMissionTable.missionId,
          set: {
            missionTitle: sql`excluded.missionTitle`,
            missionContent: sql`excluded.missionContent`,
            missionPriorityId: sql`excluded.missionPriorityId`,
            missionStartTime: sql`excluded.missionStartTime`,
            missionEndTime: sql`excluded.missionEndTime`,
            modifyAt: sql`excluded.modifyAt`,
            userId: sql`excluded.userId`,
          },
        })
        .run();
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
        orders: OrderManager.unorderToList(orders).orders,
        orderMap,
        missionMap,
      });
    },
  }))
);
