<template>
    <div>
        <div class="section">
          <a class="left-align">{{ItemsMessage_text.toUpperCase()}}</a>
          <a class="right-align modal-trigger btn-floating btn-large waves-effect waves-light red" @click="addItemHanlde" data-target="modal1" v-tooltip.left-start="AddItemTooltips" :class="{disabled: !isAdmin}"><i class="material-icons">add</i></a>
        </div>
        <div class="divider teal lighten-2"></div>
        <div class="modal center z-depth-2" id="modal1">  
          <add-items key="addItems"  v-if="!$store.state.editItem && isAdmin"></add-items>
          <edit-item key="editItem" v-if="$store.state.editItem && isAdmin"></edit-item>
        </div>
        <div class="row">
          <div v-for="item of itemsObject" :key="item.id" class="col s6 m4 l3">
             <item v-on:editItem="handleEditItem" :item="item"></item>
          </div>
        </div>
    </div>
</template>

<script>
  import AddItems from './AddItems';
  import EditItem from './AddItems.vue';
  import Item from './Item.vue'
  let modal = null;
  export default {
    data() {
      return {
        AddItemTooltips: this.$t("AddItemTooltips") ,
        ItemsMessage_text: this.$t("ItemsMessage_text"),
        isAdmin: 0,
        itemsObject: [], //Đây là object chứa toàn bộ items sau khi fetch data từ server
      };
    },
    watch: {

    },
    methods: {
      handleEditItem: function(item){ //handle editItem event from Item.vue then pass prop to edit-item component
        this.$store.commit('editItemHandle', item)
      },
      addItemHanlde: function(){
        if(this.$store.state.editItemProp) {
          this.$store.state.editItem = false
          this.$store.state.editItemProp = null
        }
      }
    },
    components: {
      AddItems: AddItems,
      EditItem: EditItem,
      Item: Item
    },
    created: function () {
      let user = JSON.parse(localStorage.getItem('user'))
      if(user){
        if (user.isAdmin) this.isAdmin = user.isAdmin
      }
      else this.$router.push({name: 'login'})
      this.axios.get('/items').then(response => {
        this.itemsObject = response.data
      }).catch(err => {
        console.log("Cannot get items data from server")
      })
    },

  };
</script>

<style scoped>
a.modal-trigger {
  padding-right: 20px;
}
div.col.s6{
    padding-bottom: 20px;
}
div.divider{
  margin-bottom: 20px;
}
</style>

<i18n>
  {
    "en": {
      "AddItemTooltips": "Add new item",
      "ItemsMessage_text": "All items"
    },
    "vn": {
      "AddItemTooltips": "Thêm sản phẩm mới",
      "ItemsMessage_text": "Các sản phẩm hiện có"
    }
  }
</i18n>