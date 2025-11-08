import { useTaskStore } from '@/stores/task';
import { AddMissionParams, CreateParamsParams, CreateTaskParams, Mission, MissionType, Order } from '@/types';
import { v4 } from 'uuid';

export function useCreateTask() {
  const ts = useTaskStore((state) => state);
  function createParams(params: CreateParamsParams) {
    // 获取当前时间
    const time = new Date().toString();

    // 任务
    const mission: Mission = {
      missionId: params.missionId,
      missionTitle: params.missionTitle || '',
      missionContent: params.missionContent || '',
      missionStartTime: params.missionStartTime || '',
      missionEndTime: '',
      missionPriorityId: params.missionPriorityId || 4,
      modifyAt: time,
    };

    // 任务顺序
    const order: Order = {
      id: params.missionId,
      parent: params.parentId || '',
      num: 0, // 后面计算
      deleted: false,
      itemType: params.itemType || MissionType.NOT_DONE,
    };

    return {
      mission,
      order,
    };
  }

  async function createTask(params: CreateTaskParams) { 
    const missionId = v4();

    const { mission, order } = createParams({
      missionTitle: params.missionTitle,
      missionContent: params.missionContent,
      missionStartTime: params.missionStartTime,
      missionPriorityId: params.missionPriorityId,
      missionId,
      parentId: params.parentId,
      itemType: params.itemType || MissionType.NOT_DONE,
    });

    let addMissionParams: AddMissionParams = {
      mission,
      order,
    };

    // // 计算 num
    // if (typeof params.insertPosition !== 'number') {
    //   if (params.insertPosition === 'last') {
    //     const lastChildOrder =
    //       ts.editingChildTodoOrders?.[ts.editingChildTodoOrders.length - 1];
    //     if (lastChildOrder) {
    //       order.num = lastChildOrder.num - 1;
    //     }
    //     ts.editingChildTodoOrders.push(order);
    //   } else {
    //     const firstChildOrder = ts.editingChildTodoOrders?.[0];
    //     if (firstChildOrder) {
    //       order.num = firstChildOrder.num + 1;
    //     }
    //     ts.editingChildTodoOrders.unshift(order);
    //     as.setMission(mission);
    //   }
    //   addMissionParams.insertPosition = params.insertPosition;
    // } else {
    //   addMissionParams.insertIndex = params.insertPosition;
    // }

    // 拖动创建按钮添加待办需要在添加前移除掉占位任务
    // ms.removePlaceholderItem();

    await ts.addMission(addMissionParams);

    // 回调函数
    params.onCreateSuccess?.({ missionId, mission, order });

    return {
      mission,
      order,
    };
  }
  
  return {
    createTask
  }
}