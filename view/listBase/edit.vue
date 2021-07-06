<template>
  <div>
    <Drawer
        v-model="showModel"
        :title="titleModel"
        width="50%"
        class-name="wis-drawer"
        draggable
        @on-close="cancelHandle"
    >
      <Form
          ref="form"
          :model="formData"
          :rules="ruleValidate"
          :label-width="120"
      >
        <Row>
          <i-col span="24">
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
        </Row>
        <!--                <Row>-->
        <!--                    <i-col span="24">-->
        <!--                        <FormItem label="显示排序" prop="sort">-->
        <!--                            <InputNumber -->
        <!--                                v-model="formData.sort" -->
        <!--                                :max="10" -->
        <!--                                :min="1" -->
        <!--                            >-->
        <!--                            </InputNumber>-->
        <!--                        </FormItem>-->
        <!--                    </i-col>-->
        <!--                </Row>  -->
        <Row>
          <i-col span="24">
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
        </Row>
        <Row>
          <i-col span="24">
            <FormItem label="权限类型">
              <RadioGroup v-model="formData.type">
                <Radio :label="0">URL权限</Radio>
                <Radio :label="1" >按钮权限</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="24">
            <FormItem label="权限标识" prop="identifier" v-if="formData.type == 1">
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


      </Form>
      <div class="wis-drawer-footer">
        <Button type="primary" @click="submitHandle">保存</Button>
      </div>
    </Drawer>
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
      showModel:false,  // 显示 弹框

      // styles: {
      //   height: 'calc(100% - 55px)',
      //   overflow: 'auto',
      //   paddingBottom: '53px',
      //   position: 'static'
      // },

      titleModel: '新增',  // 标题

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
  watch: {
    value(val) {
      if (val) this.innitFunc();  // 初始化
    },
  },
  created() {

  },
  methods: {
    /**
     * 初始化
     */
    innitFunc: function () {
      let that = this;
      let row = this.rowData;

      if (row['permissionsId']) {
        this.titleModel = "编辑";

        that.$http.get(API.permissionsGet + `/${row['permissionsId']}`, {},
            {
              hideLoading: true
            }).then((response) => {
          let row = response.data;
          that.formData = {
            name: row["permissionsName"],
            sort: row["sort"] || 1,
            type: row["permissionsType"] === "URL" ? 0:1,
            identifier: row["permissionsCode"],
            perUrl: row["permissionsUrl"],
            remark: row["remark"],
          };
        });

      } else {
        this.titleModel = "新增";
      }

      this.showModel=true;
    },
    /**
     * 关闭
     */
    cancelHandle: function () {
      this.formData = {
        type: 0,
        sort: 1
      };
      this.$emit("cv", false);
      this.showModel=false;
    },
    /**
     * 提交 |保存
     */
    submitHandle: function () {
      let that = this;
      let row = this.rowData;
      let {name, type, identifier, remark, perUrl} = this.formData;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          that.$http.post(row['permissionsId'] ? API.permissionsEdit : API.permissionsAdd, {
            permissionsId: row['permissionsId'] || null,
            permissionsName: name,
            permissionsType: String(type),
            permissionsCode: identifier,
            remark: remark,
            permissionsUrl: perUrl,
          }).then((response) => {

            // 成功 | 失败
            if (response["respCode"] == 0) {
              that.$Message.info(response["message"] || '');
              that.cancelHandle();
              console.log("sfasdafasdfa")
              that.$emit("updateFunc");
            } else {
              that.$Message.error(response["message"] || '');
            }
          });
        } else {
          this.$Message.error('表单不完整！');
        }
      })


    }
  },
  props: {
    value: {
      type: Boolean,
      default: () => false
    },
    rowData: {
      type: Object,
      default: () => {
      }
    },
  }
}
</script>
<style lang="less">

</style>