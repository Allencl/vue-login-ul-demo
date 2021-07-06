<template>
    <div style="height:100%">
        <Menu
            width="auto"
            style="height:100%"
            @on-select="selectHandle"
        >
            <menu-sun :menus="menuList"/>
        </Menu>
    </div>
</template>
<script>
import MenuSun from "@src/layout/menuList.vue";
import menuData from "@src/layout/menu.json";   // 菜单数据
export default {
    components: {
        MenuSun
    },
    data() {
        return {
            // 菜单 数据
            menuList: []
        };
    },
    created(){
      this.menuList=menuData;
    },
    methods:{
        /**
         * 菜单 点击
         */
        selectHandle: function(option){
            try {
                this.$emit("addMenuHandle",JSON.parse(option));
            } catch (error) {
                
            }
        }
    }
};
</script>