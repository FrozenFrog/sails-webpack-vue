<template>
    <div>
        <div class="section">
            <h5>Section 3</h5>
            <p></p>
        </div>
            <div class="divider teal lighten-2"></div>
            <div class="right modal-trigger" style="padding-top: 15px;" v-tooltip.left-start="AddItemTooltips" @click="showAddItemsPopupClick">
                <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>
            </div>
            <add-items v-if="isAdmin" v-on:hideAddItemsModal="hideAddItemsModal" style="display: block;" class="modal center animated" :class="displayModal"></add-items>
    </div>
</template>

<script>
import AddItems from './AddItems';
  let modal = null;
  export default {
    data() {
      return {
        AddItemTooltips: this.$t("AddItemTooltips"),
        isAdmin: true,
        displayModal: ""
      };
    },
    methods: {
      showAddItemsPopupClick() {
        this.displayModal = "fadeInUp"
      },
      hideAddItemsModal(){
        this.displayModal = "fadeOutDown"
      }
    },
    components: {
      AddItems: AddItems
    }

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