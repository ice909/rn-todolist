import { AddMissionParams } from "@/types";
import { create } from "zustand";
import { useDataStore } from "./data";

export const useTaskStore = create<{
  addMission: (params: AddMissionParams) => Promise<void>
}>(() => ({
  addMission: async (params: AddMissionParams) => {
    const ds = useDataStore.getState();
    ds.addOrder(params.order);
    ds.updateMission(params.mission);
  }
}));
