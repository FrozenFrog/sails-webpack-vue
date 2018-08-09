<template>
    <div>
        <navigation-bar></navigation-bar>
        <index></index>
    </div>
</template>

<script>
    import index from './index.vue';
    import navigationBar from "./navbar.vue";
    export default {
        components:{
            index: index, 
            navigationBar: navigationBar
        }
        
    }
</script>

<style scoped>

</style>