import { defineComponent, Component, h } from "vue";
import { SlotType } from "./types";

export const createComponentWithSlots = (VueComponent: Component, slots?: SlotType) => {
  return defineComponent({
    setup(_, { attrs, slots: setupSlots }) {
      return () => h(VueComponent, attrs, { ...slots, ...setupSlots });
    },
  });
};

/**
 * 生成一个唯一的id
 * @returns
 */
export const uniqueId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// 判断是否是vue组件
export function isVueComponent(value: any) {
  return (
    typeof value === "object" &&
    value !== null &&
    (typeof value.setup === "function" || // 组合式 API
      typeof value.render === "function" || // 选项式 API
      typeof value.template === "string") // 字符串模板
  );
}
