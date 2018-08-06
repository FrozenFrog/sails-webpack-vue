<template>
  <div class="col l6 offset-l3 container">
    <div class="section">
      <h5>Section 3</h5>
      <p>{{ $t('hello') }}</p>
  </div>
    <div class="divider teal lighten-2"></div>
    <div class="right" style="padding-top: 15px;">
        <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world! test lai di ban oi'
    }
  }
}
</script>

<style>
</style>

<i18n>
  {
    "en": {
      "hello": "Hello World!"
    },
    "vn": {
      "hello": "Xin chao!"
    }
  }
</i18n>