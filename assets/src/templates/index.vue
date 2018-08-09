<template>
  <div>
    <div class="container">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
/*Never use vue router guard in this because router-view */
  
  export default {
    data() {
      return {
        
      }
    },
  }
</script>

<style>

</style>