<template>
  <div>
    <SearchPage
        @search="searchHandle"
    />

    <div class="wis-table-top-tool-button">
      <WisButton type="info" icon="md-add" @click="editHandle(false)">新增</WisButton>
    </div>

    <div class="wis-table"> 
      <Table
          
          :columns="columns"
          :data="data"
      >

        <template slot-scope="{row}" slot="active">
          <Button
              type="primary"
              size="small"
              style="margin-right: 5px"
              @click="editHandle(true,row)"
          >编辑
          </Button>
          <Button
              type="error"
              size="small"
              style="margin-right: 5px"
              @click="deleteHandle(row)"
          >删除
          </Button>

        </template>

      </Table>
    </div>  

    <div class="wis-table-page"> 
      <Page
          :total="total"
          :current.sync="page"
          :page-size="pageSize"
          :page-size-opts="[10,30,50,100,200]"
          @on-change="changePage"
          @on-page-size-change="changeSizePage"
          show-sizer
          show-elevator
          show-total
          className="table-tool-page"
      />
    </div>  

    <EditPage
        v-model="showEditPage"
        :rowData="rowData"
        @updateFunc="initFunc"
    />


  </div>
</template>
<script>
import API from './api.js';  // api
import SearchPage from './search.vue';  // 查询头

import EditPage from './edit.vue';  // 编辑


export default {
  components: {
    SearchPage,
    EditPage,

  },
  data() {
    return {
      showEditPage: false,  // 显示 编辑


      searchForm: {},  // 查询数据
      rowData: {},     // 行数据

      page: 1,   // 当前页
      pageSize: 10,  // 每页条数
      total: 0,  // 总页数

      // table 配置列
      columns: [
        {
          title: '权限名称',
          key: 'permissionsName'
        },
        {
          title: '类型',
          key: 'permissionsType'
        },
        {
          title: 'URL权限',
          key: 'permissionsUrl'
        },
        {
          title: '权限标识',
          key: 'permissionsCode'
        },
        {
          title: '操作',
          slot: 'active',
        },
      ],

      // table 数据
      data: []


    }
  },
  created() {
    this.initFunc();  // 初始化
  },
  methods: {
    /**
     * 初始化
     */
    initFunc: function (option = {}) {
      let that = this;
      let {page, pageSize, searchForm} = this;

      this.$http.get(API.permissionsList, {
        pageNum: option["page"] || page,
        pageSize: option["pageSize"] || pageSize,
        searchValue: searchForm["searchValue"] || ''},
          {
            hideLoading: true
      }).then((response) => {
        that.total = response.data["total"]
        that.data = response.data["page"] || [];
      });
    },
    /**
     * 页面切换
     */
    changePage: function (page) {
      this.initFunc({page: page});
    },
    /**
     * 页面条数 切换
     */
    changeSizePage: function (pageSize) {
      this.page = 1;
      this.pageSize = pageSize;
      this.$nextTick(() => {
        this.initFunc({pageSize: pageSize});
      });
    },
    /**
     * 查询
     */
    searchHandle: function (form) {
      this.page = 1;
      this.searchForm = form;
      this.$nextTick(() => {
        this.initFunc();
      });
    },
    /**
     * 删除
     */
    deleteHandle: function (row) {
      let that = this;

      this.$Modal.confirm({
        title: '删除',
        content: '<p>删除后数据将无法恢复，确定删除！</p>',
        onOk: () => {

          that.$http.get(API.permissionsRemove + `/${row['permissionsId']}`, {},
              {
                hideLoading: true
              }).then((response) => {

            // 成功 | 失败
            if (response["respCode"] == 0) {
              that.$Message.info(response["message"] || '');
              that.initFunc();
            } else {
              that.$Message.error(response["message"] || '');
            }
          });
        }
      });
    },

    /**
     * 新增
     */
    editHandle: function (active, rowData = {}) {
      this.rowData = rowData;
      this.$nextTick(() => {
        this.showEditPage = true;
      });
    }

  }
}
</script>

<style lang="less">

</style>