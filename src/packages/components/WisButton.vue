
<template>
    <span>
        <Button
            :type="type"
            :size="size"
            :disabled="disabled"
            :icon="icon"

            @click="click"
        >
            <slot></slot>
        </Button>
    </span>
</template>
<script>
export default {
    data() {
        return {

        }
    },        
    created() {

    },  
    methods: {
        /**
         * 点击
         */
        click:function(){
            this.$emit('click');
        }
    },
    props: {
        // 按钮权限
        permission:{
            type: String,
            default: () => ""
        },



        type:{
            type: String,
            default: () => "default"
        },       
        size:{
            type: String,
            default: () => "default"
        },     
        disabled:{
            type: Boolean,
            default: () => false
        },   
        icon:{
            type: String,
            default: () => ""
        },                       
    }         
}
</script>

<style lang="less">

</style>