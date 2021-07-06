<template>
  <div id="app">

    <div class="layout">
        <Layout>
            <Header>
              <WisHeader />
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                  <WisMenu 
                    @addMenuHandle="addMenuHandle"
                  />
                </Sider>
                <Layout class="wis-content-container" 
                  :style=" tabsArray ?
                    {background:'#fff',padding:'46px 0px 0px 0px'}:
                    {background:'#fff',padding:'0px 0px 0px 0px'}
                  "
                >
                    <div class="wis-tabs-container">
                      <WisTabs 

                      />
                    </div>
                    <Content 
                      v-if="isRefresh"
                      :style="{overflow:'auto',height:documentHeight+'px',padding: '8px 8px', minHeight: '280px', background: '#fff'}"
                    >
                      <keep-alive>
                        <router-view v-if='$route.meta.keepAlive'></router-view>
                      </keep-alive>
                      <router-view v-if='!$route.meta.keepAlive'></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
  </div>
</template>

<script>
import WisHeader from '@src/layout/header.vue';  // 头
import WisMenu from '@src/layout/menu.vue';  // 菜单
import WisTabs from '@src/layout/tabs.vue';  // tabs



export default {
  name: 'App',
  components: { 
    WisHeader, 
    WisMenu,
    WisTabs
  },
  data(_this) {
    return {
      isRefresh:true,  // 刷新
      documentHeight:document.documentElement.clientHeight-(_this.tabsArray?116:68),  // 窗口高度
    }
  },
  computed: {
    tabsArray(){
      return this.$store.state.storeTabs.tbasList["length"];
    }     
  },   
  watch:{
    // 监听 tabs
    "$store.state.storeTabs.tbasList"(val){
      this.updataWindow();
    },
  },   
  created(){
    var that=this;

    this.$router.push({name:'home',params:{}});

    window.onresize = function(){ 
      that.updataWindow();
    };

    /**
     * 页面跳转 监听
     */
    this.$router.beforeEach((to, from, next) => {
        let tabsList=that.$store.state.storeTabs.tbasList;
        let action=tabsList.filter(o=>o["name"]==to['name']);

        // 已存在 
        if(action["length"]){
          that.$store.dispatch("selectTabs",to["name"]);
        }else{
          that.$store.dispatch("addTabs",{
            _this:that,
            label:(to["meta"]||{})["title"]||"未命名",
            name:to["name"],
            icon:"ios-bookmark-outline",
            params:to["params"]
          });      
        }

        // 刷新
        if( (to["params"]||{})["refresh"] ){
          that.isRefresh=false;
          that.$nextTick(()=>{
            that.isRefresh=true;
          });
        }
        
        next();
    });

  },
  mounted(){

  },  
  methods:{
    /**
     * 刷新
     */
    updataWindow: function(){
      this.documentHeight=document.documentElement.clientHeight-(this.tabsArray?116:68);  // 窗口高度
    },
    /**
     * add 菜单
     */
    addMenuHandle: function(option){
      let that=this;
      this.$store.dispatch("addTabs",{
        _this:that,
        label:option["name"],
        name:option["pathName"],
        icon:option["icon"]
      });
    },
  },
}
</script>

<style lang="less">
  .wis-content-container{
    width: 100%;
    position: relative;
    
    .wis-tabs-container{
      width: 100%;
      position: absolute;
      top: 0px;
      left: 0px; 
      height: 46px;
    }
  }
</style>
