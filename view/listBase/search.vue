<template>
  <Form ref="formRef" :model="formModal" :label-width="80" class="wis-table-search">
    <Row>
      <i-col span="6">
        <FormItem label="权限名称" prop="searchValue">
          <Input v-model="formModal.searchValue"/>
        </FormItem>
      </i-col>
      <i-col span="6">
        <FormItem>
          <Button type="primary" icon="md-search" @click="handleSubmit">查询</Button>
          <Button icon="md-refresh" @click="handleReset" style="margin-left: 8px">重置</Button>
        </FormItem>
      </i-col>
    </Row>
  </Form>
</template>
<script>
export default {
  data() {
    return {
      formModal: {},
    }
  },
  methods: {
    /**
     * 查询
     */
    handleSubmit: function () {
      this.$emit("search", this.formModal);
    },
    /**
     * 重置
     */
    handleReset: function () {
      this.$refs["formRef"].resetFields();
      this.$nextTick(() => {
        this.$emit("search", this.formModal);
      });
    }
  }
}
</script>