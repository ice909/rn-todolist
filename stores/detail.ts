import { DetailStoreState } from "@/types";
import { create } from "zustand";
import { useDataStore } from './data';

export const useDetailStore = create<DetailStoreState>((set, get) => ({
  editingOrderId: null,
  editingOrder: null,

  openDetailSheet(orderId: string) {
    const order = useDataStore.getState().orderMap.get(orderId);
    set({
      editingOrderId: orderId,
      editingOrder: order,
    });
  },

  closeDetailSheet() {
    set({ editingOrderId: null, editingOrder: null });
  },
}));