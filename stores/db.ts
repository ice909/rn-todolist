import { initdb } from '@/db/db';
import { DBStoreState } from '@/types';
import { create } from 'zustand';

export const useDBStore = create<DBStoreState>(() => ({
  async init() {
    await initdb();
  },
}));
