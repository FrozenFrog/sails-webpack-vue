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
    beforeRouteEnter: (to, from, next) => { // Éo hiểu sao ở index.js đã config là redirect qua login mà nó không work
      if (localStorage.getItem('user') == null) {
        next(vm => {vm.$router.push({name: 'login'})})
      }
      else next()
    }
  }
</script>

<style>

</style>