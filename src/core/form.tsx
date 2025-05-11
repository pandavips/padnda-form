/**
 * 表单布局逻辑,采用el-row和el-col布局,由于el-form-item自带margin-bottom,所以我们不需要做太多工作
 */
import { ElCol, ElForm, ElFormItem, ElRow } from "element-plus";
import { merge } from "lodash-es";
import type { PropType } from "vue";
import { defineComponent, h, ref, watch, isVNode } from "vue";
import type { FormItems, IFormItemProp, IFormProp } from "./types";
import { formControllerManager } from "./manager";
import { DEFAULT_SLOTS } from "./manager";

const createFormItemByDefault = (): IFormItemProp => {
  return {
    type: "input",
    span: 24,
    show: true,
    value: "",
    options: [],
    widgetSlots: {},
    itemSlots: {},
    attrs: {},
  };
};

export const Form = defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<Record<string, any>>,
      required: true,
      default: () => ({}),
    },
    formProp: {
      type: Object as PropType<IFormProp>,
      default: () => ({}),
    },
    items: {
      type: Array as PropType<FormItems>,
      default: () => [],
    },
  },
  inheritAttrs: false,
  emits: ["update:modelValue"],
  setup(props, { emit, expose, attrs: formAttrs }) {
    const innerFormItems = ref<IFormItemProp[]>([]);
    watch(
      () => props.items,
      () => {
        innerFormItems.value = props.items.map((item) => merge(createFormItemByDefault(), item));
        // 初始化一份默认值
        innerFormItems.value.forEach((item) => {
          updateFormData(item.prop, props.modelValue[item.prop] !== void 0 ? props.modelValue[item.prop] : item.value || "");
        });
      },
      {
        immediate: true,
        deep: true,
      }
    );

    // 更新表单值
    function updateFormData(prop: string, value: any) {
      // 如果prop为空,则不更新
      if (prop) {
        emit("update:modelValue", Object.assign(props.modelValue, { [prop]: value }));
      }
    }

    // 表单实例
    const formRef = ref<InstanceType<typeof ElForm> | null>(null);
    // 表单项实例
    const formItemsRefs = ref<Record<string, any>>({});
    // 控件实例
    const widgetRefs = ref<Record<string, any>>({});
    expose({
      formRef,
      formItemsRefs,
      widgetRefs,
    });

    // 渲染表单项
    const renderFormItem = (item: IFormItemProp) => {
      const { label, rules, type, attrs, span, prop, options, widgetSlots, itemSlots, value: _, show, ...formItemAttrs } = item;

      const controllerComponent = DEFAULT_SLOTS[type]
        ? formControllerManager.getComponentWithSlotsInVueSetup(type as string, DEFAULT_SLOTS[type](item))
        : formControllerManager.getComponentInVueSetup(type as string);

      return (
        <ElCol span={span}>
          {isVNode(item) ? (
            item
          ) : (
            <ElFormItem v-show={show} ref={(v: any) => (formItemsRefs.value[prop] = v)} prop={prop} label={label} rules={rules} {...formItemAttrs} >
              {{
                ...itemSlots,
                default: () => {
                  return itemSlots.default
                    ? itemSlots.default()
                    : h(
                        controllerComponent,
                        {
                          // 数据绑定
                          modelValue: props.modelValue[prop],
                          "onUpdate:modelValue": (val: any) => updateFormData(prop, val),

                          ref: (v: any) => {
                            widgetRefs.value[prop] = v;
                          },

                          // 其他属性/事件
                          options,
                          ...attrs,
                        },
                        { ...widgetSlots }
                      );
                },
              }}
            </ElFormItem>
          )}
        </ElCol>
      );
    };
    return () => (
      <ElForm ref={(val: any) => (formRef.value = val)} model={props.modelValue} {...formAttrs}>
        {/* 这里使用了row布局,所以行内表单无法正常布局,建议使用span来模拟 */}
        <ElRow>{innerFormItems.value.map((item) => renderFormItem(item))}</ElRow>
      </ElForm>
    );
  },
});
