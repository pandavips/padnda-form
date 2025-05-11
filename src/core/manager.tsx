import { getCurrentInstance, resolveComponent } from "vue";
import type { Component } from "vue";
import { isVueComponent } from "./utils";
import { ElOption, ElRadio, ElCheckbox } from "element-plus";
import { IFormItemProp, SlotType } from "./types";
import { createComponentWithSlots } from "./utils";


// 是否在vue setuo中运行
function isInSetup() {
  return !!getCurrentInstance();
}

// 为了更好用,提前实现的默认插槽
export const DEFAULT_SLOTS: Record<string, (data: IFormItemProp) => SlotType> = {
  select: ({ options }) => {
    return {
      default: () => {
        return options.map((op: any) => {
          return <ElOption value={op.value} label={op.label} key={op.value} disabled={op.disabled} />;
        });
      },
    };
  },
  "radio-group": ({ options }) => {
    return {
      default: () => {
        return options.map((op: any) => {
          return <ElRadio value={op.value} label={op.label} key={op.value} disabled={op.disabled} />;
        });
      },
    };
  },
  "checkbox-group": ({ options }) => {
    return {
      default: () => {
        return options.map((op: any) => {
          return <ElCheckbox value={op.value} label={op.label} key={op.value} disabled={op.disabled} />;
        });
      },
    };
  },
};

class FormControllerManager {
  #components = {};
  constructor() {}
  register(name: string, component: Component) {
    if (this.#components[name]) {
      return console.warn(`控件类型[${name}]已经被注册`);
    }
    if (typeof component === "string") {
      return (this.#components[name] = component);
    }
    if (typeof component === "object") {
      if (isVueComponent(component)) {
        return (this.#components[name] = component);
      }
    }

    throw new Error(`出现未知错误,控件${name}的类型为${typeof component}`);
  }
  // 获取最原始存放的组件
  getComponentRaw(name: string) {
    const component = this.#components[name];
    if (!component) {
      // 如果组件不存在则尝试返回el-name,以使用element-plus的组件
      return "el-" + name;
    }
    return component;
  }
  // 获取element-plus组件
  getComponentInVueSetup(name: string) {
    if (!isInSetup) {
      throw new Error(`类型${name}必须在vue setup中使用`);
    }
    const componentRaw = this.getComponentRaw(name);
    return typeof componentRaw === "string" ? resolveComponent(componentRaw) : componentRaw;
  }
  getComponentWithSlotsInVueSetup(name: string, slots: SlotType) {
    const component = this.getComponentInVueSetup(name);
    return createComponentWithSlots(component, slots);
  }
  getComponents() {
    return new Proxy(this.#components, {
      get(target, prop) {
        return target[prop];
      },
    });
  }
}

const formControllerManager = new FormControllerManager();

export { formControllerManager };
