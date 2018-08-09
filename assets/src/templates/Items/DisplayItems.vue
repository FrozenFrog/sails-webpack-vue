<template>
    <div>
        <div class="section">
            <h5>Section 3</h5>
            <p></p>
        </div>
            <div class="divider teal lighten-2"></div>
            <div class="right modal-trigger" style="padding-top: 15px;"  v-tooltip.left-start="AddItemTooltips" @click="showAddItemsPopupClick">
                <a class="btn-floating btn-large waves-effect waves-light red" :class="{disabled: !isAdmin}"><i class="material-icons">add</i></a>
            </div>
            <add-items v-if="isAdmin" v-on:hideAddItemsModal="hideAddItemsModal" class="modal center animated" :style="{display: displayModalStyle}" :class="displayModalTransitionClass"></add-items>
    </div>
</template>

<script>
  import AddItems from './AddItems';
  let modal = null;
  export default {
    data() {
      return {
        AddItemTooltips: this.$t("AddItemTooltips"),
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
      this.isAdmin = JSON.parse(localStorage.getItem('user')).isAdmin
    },

  };
</script>

<style scoped>

</style>

<i18n>
  {
    "en": {
      "AddItemTooltips": "Add new item"
    },
    "vn": {
      "AddItemTooltips": "Thêm sản phẩm mới"
    }
  }
</i18n>