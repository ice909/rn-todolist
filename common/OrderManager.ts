import { Order } from '@/types';
import { deepClone } from '@/utils';

const ROOT_PARID = '';

interface OrderToListResult {
  orders: Order[];
  papaMap: Map<string, Order[]>;
}

interface UnorderToListResult {
  orders: Order[];
  papaMap: Map<string, Order[]>;
}

export class OrderManager {
  // 将修改后的顺序保存 转化成新的num列表
  public static orderToList(
    _ois: Order[],
    root = ROOT_PARID
  ): OrderToListResult {
    let papaMap = new Map<string, Order[]>();
    let orders: Order[] = [];

    const ois = deepClone(_ois);
    // 将数组的顺序，用Map 记录下来
    ois.forEach((v) => {
      let arr: Order[];
      if (papaMap.has(v.parent)) {
        arr = papaMap.get(v.parent)!;
      } else {
        arr = [];
        papaMap.set(v.parent, arr);
      }
      arr.push(v);
    });

    // 给顺序重新打上数字
    papaMap?.forEach((v) => {
      let i = v.length - 1;
      v.forEach((o, _) => {
        o.num = i--;
      });
    });

    papaMap.get(root)?.forEach((v) => {
      orders.push(v);
    });

    for (let i = 0; i < orders.length; i++) {
      let cur = orders[i];
      if (papaMap.has(cur.id)) {
        // 存在子任务，将其所有子任务添加到 后面
        orders = this.insertAfterIndex(orders, i, papaMap.get(cur.id)!);
      }
    }
    return {
      orders: deepClone(orders),
      papaMap,
    };
  }

  // 将无顺序的orders根据num进行排序（源数据转成有序的）
  public static unorderToList(
    arr: Order[],
    root = ROOT_PARID
  ): UnorderToListResult {
    let papaMap = new Map<string, Order[]>();
    let orders: Order[] = [];

    arr.forEach((v) => {
      if (!papaMap.has(v.parent)) {
        papaMap.set(v.parent, []);
      }
      papaMap.get(v.parent)!.push(v);
    });
    papaMap.forEach((v) => {
      v.sort((a: Order, b: Order): number => {
        return b.num - a.num;
      });
    });
    papaMap.get(root)?.forEach((v) => {
      orders.push(v);
    });

    for (let i = 0; i < orders.length; i++) {
      let cur = orders[i];
      if (papaMap.has(cur.id)) {
        // 存在子任务，将其所有子任务添加到 后面
        orders = this.insertAfterIndex(orders, i, papaMap.get(cur.id)!);
      }
    }
    return {
      orders: deepClone(orders),
      papaMap,
    };
  }

  // 将元素插入到索引之后
  public static insertAfterIndex(
    arr: Order[],
    index: number,
    instd: Order[]
  ): Order[] {
    let start = index + 1;
    if (arr.length <= 1 || arr.length + 1 <= index) {
      return arr.concat(instd);
    }

    return arr
      .slice(0, start)
      .concat(instd)
      .concat(arr.slice(start, arr.length));
  }

  /**
   * @param neos 必须是排好序的，如果都没有进行ReOrder，那么这个计算没有意义
   */
  public static computeDiff(origin: Order[], neos: Order[]): Order[] {
    let originMap = new Map<string, Order>();
    let upds: Order[] = [];

    origin.forEach((v) => {
      originMap.set(v.id, v);
    });

    neos.forEach((v) => {
      const current = originMap.get(v.id)!;
      if (!current) {
        upds.push(v);
      } else {
        // 判断parent,num,deleted,itemType是否变更!om
        if (v.num != current.num) {
          upds.push(v);
        } else if (v.parent !== current.parent) {
          upds.push(v);
        } else if (v.deleted !== current.deleted) {
          upds.push(v);
        } else if (v.itemType !== current.itemType) {
          upds.push(v);
        }
      }
    });

    return deepClone(upds);
  }
}
