<template>
   <div class="nav-bar" v-bind:class="fixed?'':'bottomBox'">
       <slot></slot>
   </div>
</template>
<script>
export default {
    name:"bottomNav",
    props:{
        fixed:Boolean
    },
    data(){
        return{

        }
    },

}
</script>
<style lang="scss" scoped>
.nav-bar{
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0.1rem 0.8rem;
    background:#fff;
}

.bottomBox{
    border-top:1px solid #e9e9e9;
    box-shadow: 0 0 0.1rem 0.1rem #f8f8f8;
}
</style>