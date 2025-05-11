import type { FormItemProps, FormItemRule, FormProps } from "element-plus";
import { VNode, VNodeChild } from "vue";
// 数值范围
export type NumberRange<L extends number, H extends number, CArr extends any[] = [], OArr extends unknown[] = [unknown], R extends number = H> = H extends CArr["length"]
  ? R
  : L extends CArr["length"]
  ? NumberRange<OArr["length"], H, [any, ...CArr], [unknown, ...OArr], L | R>
  : NumberRange<L, H, [...CArr, any], [unknown, ...OArr]>;

// 表单
export interface IFormProp extends Partial<FormProps> {}
// 表单项
export interface IFormItemProp extends Partial<FormItemProps> {
  // 用于el-row布局的span,默认是24
  span?: number;
  // 是否进行展示该项
  show?: boolean;
  // 表单项类型
  type?: string;
  // 候选项列表(只有在是选择控件的时候使用)
  options?: OptionType[];
  // 绑定数据模型的key
  prop?: string;
  // 表单项的值
  value?: any;
  // 校验规则
  rules?: Partial<FormItemRule>[];
  // 表单项插槽
  itemSlots?: SlotType;
  // 控件插槽
  widgetSlots?: SlotType;
  // 表单控件属性
  attrs?: Record<string, any>;
}

// 插槽渲染函数
export type SlotRender = (data?: { fieldValue?: any; formData?: any; formItems?: any }) => VNodeChild;
// 插槽对象
export interface SlotType {
  [props: string]: SlotRender;
}

export type FormItems = (IFormItemProp | VNode)[];
// 整个配置
export interface IFormConfig {
  // 表单配置
  formProp: IFormProp;
  // 校验规则集
  rules?: Partial<FormItemRule>[];
  // 表单项配置集
  items: FormItems;
}

// 候选项
export interface OptionType {
  label: string | undefined;
  value: any;
  disabled?: boolean;
  [key: string]: any;
}
