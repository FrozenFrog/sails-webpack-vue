<template>
    <div>
        <div class="section">
          <a class="left-align">{{ItemsMessage_text.toUpperCase()}}</a>
          <a class="right-align modal-trigger btn-floating btn-large waves-effect waves-light red" v-tooltip.left-start="AddItemTooltips" @click="showAddItemsPopupClick" :class="{disabled: !isAdmin}"><i class="material-icons">add</i></a>
        </div>
        <div class="divider teal lighten-2"></div>
        <add-items v-if="isAdmin" v-on:hideAddItemsModal="hideAddItemsModal" class="modal center animated" :style="{display: displayModalStyle}" :class="displayModalTransitionClass"></add-items>
    </div>
</template>

<script>
  import AddItems from './AddItems';
  let modal = null;
  export default {
    data() {
      return {
        AddItemTooltips: this.$t("AddItemTooltips") ,
        ItemsMessage_text: this.$t("ItemsMessage_text"),
        isAdmin: 0,
        displayModalTransitionClass: "",
        displayModalStyle: ""
      };
    },
    methods: {
      showAddItemsPopupClick() {
        this.displayModalStyle ="block" //Lý do có thằng này là vì modal mặc định materialize là display none
        this.displayModalTransitionClass = "fadeInUp"
      },
      hideAddItemsModal(){
        this.displayModalTransitionClass = "fadeOutDown"
      }
    },
    components: {
      AddItems: AddItems
    },
    created: function () {
      let user = JSON.parse(localStorage.getItem('user'))
      if(user){
        if (user.isAdmin) this.isAdmin = user.isAdmin
      }
      else this.$router.push({name: 'login'})
    },

  };
</script>

<style scoped>
a.modal-trigger {
  padding-right: 20px;
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