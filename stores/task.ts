import { AddMissionParams } from "@/types";
import { create } from "zustand";
import { useRenderStore } from "./render";

export const useTaskStore = create<{
  addMission: (params: AddMissionParams) => Promise<void>
}>(() => ({
  addMission: async (params: AddMissionParams) => {
    const rs = useRenderStore.getState();
    rs.addOrder(params.order);
    rs.addMission(params.mission);
  }
}));
