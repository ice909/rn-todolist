import { DetailStoreState } from "@/types";
import { create } from "zustand";

export const useDetailStore = create<DetailStoreState>((set, get) => ({
  editingOrderId: null,

  openDetailSheet(orderId: string) {
    set({ editingOrderId: orderId });
  },

  closeDetailSheet() {
    set({ editingOrderId: null });
  },
}));