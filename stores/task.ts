import { AddMissionParams } from "@/types";
import { create } from "zustand";
import { useDataStore } from "./data";

export const useTaskStore = create<{
  addMission: (params: AddMissionParams) => Promise<void>
}>(() => ({
  addMission: async (params: AddMissionParams) => {
    const rs = useDataStore.getState();
    rs.addOrder(params.order);
    rs.updateMission(params.mission);
  }
}));
