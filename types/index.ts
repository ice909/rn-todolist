export interface Order {
  id: string;
  parent: string;
  num: number;
  deleted?: boolean;
  itemType?: MissionType;
  userId?: string;
}

export interface Mission {
  missionId: string;
  missionTitle: string;
  missionContent: string;
  missionPriorityId: number;
  missionStartTime: string;
  missionEndTime: string;
  modifyAt: string;
  userId?: string;
}

export enum MissionType {
  NOT_DONE = 'NOT_DONE',
  DONE = 'DONE',
}

export interface RenderStoreState {
  orders: Order[]; // 任务数组的类型
  missionMap: Map<string, Mission>;
  setOrder: (order: Order[]) => void;
  addOrder: (order: Order) => void;
  addMission: (mission: Mission) => void;
}

export interface AddMissionParams {
  mission: Mission;
  order: Order;
  insertIndex?: number; // 插入到第几个位置
  insertPosition?: 'first' | 'last'; // 插入到最前面或者最后面
}

export interface CreateParamsParams {
  missionTitle?: string;
  missionContent?: string;
  missionStartTime?: string;
  missionPriorityId?: number;

  missionId: string;
  parentId?: string;
  itemType?: MissionType;
}

export interface CreateTaskParams {
  missionTitle: string;
  missionContent: string;
  missionStartTime: string;
  missionPriorityId: number;

  parentId: string;
  itemType?: MissionType;
  insertPosition: 'last' | 'first' | number;

  onCreateSuccess?: (res: {
    missionId: string;
    mission: Mission;
    order: Order;
  }) => void;
}