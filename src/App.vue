<script lang="tsx" setup>
import { ElButton, FormRules } from "element-plus";
import { reactive, ref } from "vue";
import { Form, FormItems } from "./core";
const regions = [
  {
    value: "华北",
    label: "华北地区",
    children: [
      {
        value: "北京",
        label: "北京市",
        children: [
          {
            value: "东城区",
            label: "东城区",
          },
          {
            value: "西城区",
            label: "西城区",
          },
          {
            value: "朝阳区",
            label: "朝阳区",
          },
          {
            value: "海淀区",
            label: "海淀区",
          },
        ],
      },
      {
        value: "天津",
        label: "天津市",
        children: [
          {
            value: "和平区",
            label: "和平区",
          },
          {
            value: "河东区",
            label: "河东区",
          },
        ],
      },
      {
        value: "河北",
        label: "河北省",
        children: [
          {
            value: "石家庄",
            label: "石家庄市",
          },
          {
            value: "唐山",
            label: "唐山市",
          },
        ],
      },
      {
        value: "山西",
        label: "山西省",
        children: [
          {
            value: "太原",
            label: "太原市",
          },
          {
            value: "大同",
            label: "大同市",
          },
        ],
      },
      {
        value: "内蒙古",
        label: "内蒙古自治区",
        children: [
          {
            value: "呼和浩特",
            label: "呼和浩特市",
          },
          {
            value: "包头",
            label: "包头市",
          },
        ],
      },
    ],
  },
  {
    value: "华东",
    label: "华东地区",
    children: [
      {
        value: "上海",
        label: "上海市",
        children: [
          {
            value: "黄浦区",
            label: "黄浦区",
          },
          {
            value: "徐汇区",
            label: "徐汇区",
          },
        ],
      },
      {
        value: "江苏",
        label: "江苏省",
        children: [
          {
            value: "南京",
            label: "南京市",
          },
          {
            value: "苏州",
            label: "苏州市",
          },
        ],
      },
      {
        value: "浙江",
        label: "浙江省",
        children: [
          {
            value: "杭州",
            label: "杭州市",
          },
          {
            value: "宁波",
            label: "宁波市",
          },
        ],
      },
      {
        value: "安徽",
        label: "安徽省",
        children: [
          {
            value: "合肥",
            label: "合肥市",
          },
          {
            value: "芜湖",
            label: "芜湖市",
          },
        ],
      },
      {
        value: "福建",
        label: "福建省",
        children: [
          {
            value: "福州",
            label: "福州市",
          },
          {
            value: "厦门",
            label: "厦门市",
          },
        ],
      },
    ],
  },
  {
    value: "华南",
    label: "华南地区",
    children: [
      {
        value: "广东",
        label: "广东省",
        children: [
          {
            value: "广州",
            label: "广州市",
          },
          {
            value: "深圳",
            label: "深圳市",
          },
        ],
      },
      {
        value: "广西",
        label: "广西壮族自治区",
        children: [
          {
            value: "南宁",
            label: "南宁市",
          },
          {
            value: "桂林",
            label: "桂林市",
          },
        ],
      },
      {
        value: "海南",
        label: "海南省",
        children: [
          {
            value: "海口",
            label: "海口市",
          },
          {
            value: "三亚",
            label: "三亚市",
          },
        ],
      },
    ],
  },
];

const items = ref<FormItems>([
  {
    prop: "",
    type: "divider",
    widgetSlots: {
      default: () => {
        return <div>基本信息</div>;
      },
    },
  },
  {
    label: "姓名",
    prop: "name",
    value: "",
  },
  {
    label: "邮箱",
    prop: "email",
    value: "",
    rules: [
      { required: true, message: "请输入邮箱", trigger: "blur" },
      { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" },
    ],
  },
  {
    label: "手机号",
    prop: "phone",
    value: "",
  },
  {
    label: "地址",
    prop: "address",
    value: "",
  },
  {
    label: "年龄",
    prop: "age",
    type: "input-number",
    value: null,
    attrs: {
      min: 1,
      max: 150,
    },
  },
  {
    label: "身高(cm)",
    prop: "height",
    type: "input-number",
    value: null,
  },
  {
    label: "体重(kg)",
    prop: "weight",
    type: "input-number",
    value: null,
  },
  {
    label: "性别",
    prop: "gender",
    type: "radio-group",
    value: "",
    options: [
      { label: "男", value: "男" },
      { label: "女", value: "女" },
      { label: "其他", value: "其他" },
    ],
  },
  {
    label: "爱好",
    prop: "hobbies",
    type: "checkbox-group",
    value: [],
    options: [
      { label: "跑步", value: "跑步" },
      { label: "游泳", value: "游泳" },
      { label: "阅读", value: "阅读" },
    ],
  },
  {
    label: "学历",
    prop: "education",
    type: "select",
    value: "",
    options: [
      { label: "本科", value: "本科" },
      { label: "硕士", value: "硕士" },
      { label: "博士", value: "博士" },
    ],
  },
  {
    label: "出生日期",
    prop: "birthday",
    type: "date-picker",
    value: "",
    attrs: {
      onChange: (value: string | number | Date) => {
        formData.age = new Date().getFullYear() - new Date(value).getFullYear();
      },
    },
  },
  {
    label: "起床时间",
    prop: "wakeupTime",
    type: "time-picker",
    value: "",
  },
  {
    label: "喜爱的颜色",
    prop: "favoriteColor",
    type: "color-picker",
    value: "",
  },
  {
    label: "是否在职",
    prop: "isEmployed",
    type: "switch",
    value: false,
  },
  {
    label: "标签",
    prop: "tags",
    type: "input-tag",
    widgetSlots: {
      suffix: () => {
        return <span>输入完成摁下回车</span>;
      },
    },
    value: [],
  },
  {
    label: "满意度",
    prop: "satisfaction",
    type: "slider",
    attrs: {
      min: 0,
      max: 100,
    },
  },
  {
    label: "评分",
    prop: "rating",
    type: "rate",
    value: 3.5,
    attrs: {
      allowHalf: true,
    },
  },
  {
    label: "所在地区",
    prop: "region",
    type: "cascader",
    options: regions,
    value: [],
  },
  {
    label: "头像上传",
    prop: "avatar",
    type: "upload",
    value: [],
    attrs: {
      action: "",
      listType: "picture-card",
      limit: 1,
    },
  },
  {
    label: "备注",
    prop: "remarks",
    value: "",
    attrs: {
      type: "textarea",
      rows: 3,
    },
  },
  {
    label: "我会被覆盖",
    type: "",
    span: 12,
    itemSlots: {
      default: () => {
        return <div style="color: yellow">自定义form-item default slot</div>;
      },
      label: () => {
        return <div style="color: pink">自定义</div>;
      },
    },
  },
  <div style="color: red">自定义整个form-item内容</div>,
]);

const rules = ref<FormRules>({
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 2, max: 20, message: "姓名长度应在2-20个字符之间", trigger: "blur" },
  ],
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号格式", trigger: "blur" },
  ],
  address: [{ required: true, message: "请输入地址", trigger: "blur" }],
  age: [
    { required: true, message: "请输入年龄", trigger: "blur" },
    { type: "number", message: "年龄必须为数字", trigger: "blur" },
  ],
  height: [
    { required: true, message: "请输入身高", trigger: "blur" },
    { type: "number", message: "身高必须为数字", trigger: "blur" },
  ],
  weight: [
    { required: true, message: "请输入体重", trigger: "blur" },
    { type: "number", message: "体重必须为数字", trigger: "blur" },
  ],
  gender: [{ required: true, message: "请选择性别", trigger: "change" }],
  hobbies: [
    { required: true, message: "请选择爱好", trigger: "change" },
    { type: "array", message: "爱好必须为数组", trigger: "change" },
  ],
  education: [{ required: true, message: "请选择学历", trigger: "change" }],
  birthday: [{ required: true, message: "请选择出生日期", trigger: "change" }],
  wakeupTime: [{ required: true, message: "请选择起床时间", trigger: "change" }],
  favoriteColor: [{ required: true, message: "请选择喜爱的颜色", trigger: "change" }],
  region: [
    { required: true, message: "请选择所在地区", trigger: "change" },
    { type: "array", required: true, message: "请选择所在地区", trigger: "change" },
  ],
  satisfaction: [{ required: true, message: "请选择满意度", trigger: "blur" }],
  rating: [{ required: true, message: "请选择评分", trigger: "change" }],
  avatar: [
    { required: true, message: "请上传头像", trigger: "change" },
    { type: "array", message: "头像必须为数组", trigger: "change" },
  ],
  remarks: [
    { required: true, message: "请输入备注", trigger: "blur" },
    { max: 200, message: "备注不能超过200个字符", trigger: "blur" },
  ],
});
const formData = reactive<Record<string, any>>({
  name: "", // 姓名
  email: "", // 邮箱
  phone: "", // 手机号
  address: "", // 地址
  age: null, // 年龄
  height: null, // 身高 (cm)
  weight: null, // 体重 (kg)
  gender: "", // 性别（男 / 女 / 其他）
  hobbies: [], // 爱好（跑步 / 游泳 / 阅读等）
  education: "", // 学历（本科 / 硕士 / 博士）
  birthday: "", // 出生日期
  wakeupTime: "", // 起床时间
  favoriteColor: "", // 喜爱的颜色
  isEmployed: false, // 是否在职
  // satisfaction: 0, // 满意度（0-100）
  rating: 3.5, // 评分
  region: [], // 所在地区 (省 / 市 / 区)
  avatar: [], // 头像上传
  remarks: "", // 备注
});
const formRef = ref<any>();
const handleSubmit = async () => {
  await formRef.value.formRef.validate();
  alert("提交成功");
};
</script>

<template>
  <div>
    <div class="box">
      <Form
        ref="formRef"
        :items="items"
        :rules="rules"
        v-model="formData"
        label-suffix=":" />
      <el-button @click="handleSubmit">提交</el-button>
    </div>
  </div>
</template>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  border: 1px solid #000;
  padding: 8px;
}
</style>
