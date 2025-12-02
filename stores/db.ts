import { DBStoreState } from '@/types';
import { create } from 'zustand';

export const useDBStore = create<DBStoreState>(() => ({
  async init() {},
}));
