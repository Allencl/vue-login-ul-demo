<template>
    <div class="wis-form-page">
        <Form
            ref="form"
            :model="formData"
            :rules="ruleValidate"
            :label-width="120"
        >
            <Row>
                <i-col span="8">
                    <FormItem label="权限名称" prop="name">
                        <Input
                            v-model="formData.name"
                            clearable
                            placeholder="请输入权限名称..."
                            :maxlength="30"
                            show-word-limit
                        />
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <FormItem label="URL权限" prop="perUrl">
                        <Input
                            v-model="formData.perUrl"
                            clearable
                            placeholder="请输入URL权限..."
                            :maxlength="30"
                            show-word-limit
                        />
                    </FormItem>
                </i-col>  
                <i-col span="8">
                    <FormItem label="显示排序" prop="sort">
                        <InputNumber
                            v-model="formData.sort"
                            :max="10"
                            :min="1"
                        >
                        </InputNumber>
                    </FormItem>
                </i-col>              
            </Row>
            <Row>
                <i-col span="12">
                    <FormItem label="权限类型">
                        <RadioGroup v-model="formData.type">
                        <Radio :label="0">URL权限</Radio>
                        <Radio :label="1" >按钮权限</Radio>
                        </RadioGroup>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem label="权限标识" prop="identifier" v-if="formData.type==1">
                        <Input
                            v-model="formData.identifier"
                            clearable
                            placeholder="请输入权限标识..."
                            :maxlength="30"
                            show-word-limit
                        />
                    </FormItem>
                </i-col>        
            </Row>
            <Row>
                <i-col span="24">
                    <FormItem label="备注">
                        <Input
                            v-model="formData.remark"
                            type="textarea"
                            :autosize="{minRows: 2,maxRows: 5}"
                            placeholder="请输入备注..."
                            :maxlength="200"
                            show-word-limit

                        />
                    </FormItem>
                </i-col>
            </Row>

            <div class="form-bottom-button">
                <Button type="primary" @click="submitHandle">保存</Button>
            </div>

        </Form>
    </div>
</template>
<script>
import API from './api.js';  // api

export default {
  model: {
    prop: 'value',
    event: 'cv'
  },
  data() {
    return {

      // 表单数据
      formData: {
        sort: 1,
        type: 0
      },

      // 表单校验
      ruleValidate: {
        name: [
          {required: true, message: '该项必填！', trigger: 'blur'}
        ],
        sort: [
          {type: 'number', required: true, message: '该项必填！', trigger: 'blur'}
        ],
        identifier: [
          {required: true, message: '该项必填！', trigger: 'blur'}
        ],
        perUrl: [
          {required: true, message: '该项必填！', trigger: 'blur'}
        ],
      }
    }
  },
  created() {

  },
  methods: {
    /**
     * 初始化
     */
    innitFunc: function () {
      let that = this;

    },
    /**
     * 提交 |保存
     */
    submitHandle: function () {
      let that = this;
      let {name, type, identifier, remark, perUrl} = this.formData;

      this.$refs['form'].validate((valid) => {
        if (valid) {

        } else {
          this.$Message.error('表单不完整！');
        }
      });
    }
  },
  props: {

  }
}
</script>
<style lang="less">

</style>