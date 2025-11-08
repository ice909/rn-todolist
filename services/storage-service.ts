import { Order } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'tasks';

/**
 * 待办事项本地存储服务
 * 封装了 AsyncStorage 的所有读写操作
 */
export const TodoStorageService = {
  /**
   * 从本地存储中加载所有任务
   * @returns {Promise<Array>} 任务列表数组，如果不存在则返回空数组
   */
  getTasks: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        return JSON.parse(jsonValue);
      }
      return [];
    } catch (e) {
      console.error('AsyncStorage: Error reading data', e);
      // 读取失败时也返回空数组，避免应用崩溃
      return [];
    }
  },

  /**
   * 将整个任务列表保存到本地存储
   * @param tasks - 要保存的任务列表
   * @returns {Promise<void>}
   */
  saveTasks: async (tasks: Order[]) => {
    try {
      // AsyncStorage 只存储字符串，因此需要 JSON.stringify()
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error('AsyncStorage: Error saving data', e);
    }
  },
};

export default TodoStorageService;
