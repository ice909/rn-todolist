import { create } from "zustand";

/**
 * 数据库层，用于保存到本地和同步远程
 */
export const usePersistenceStore = create()