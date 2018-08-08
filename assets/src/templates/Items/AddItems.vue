<template>
    <div class="center modal-content z-depth-2">
        <h4>{{headerMessage}}</h4>
        <form class="container">
            <div class="valign-wrapper">
                <div class="left">
                    <ul>
                        <li><img src="https://materializecss.com/images/yuna.jpg" alt="" class="responsive-img"></li>
                        <li> <a class = "iconTitle" href="" target="_blank"> {{imgMessage}} </a> </li>
                    </ul>
                </div>
                <div style="padding-left: 60px; width: 80%;">
                    <div class="row">
                        <div class="input-field col s12">
                            <input type="text" v-model="itemName">
                            <label>{{itemNameMessage}}</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input type="number" min="0" step="1000" @keyup.enter="submitPrice" v-model="itemPrice">
                            <label>{{itemPriceMessage}}</label>
                        </div>
                    </div>
                </div>   
            </div>
            <div class="modal-footer right">
                <a class="btn waves-effect waves-light">
                {{acceptButtonSummit_Text}} <i class="material-icons">send</i>
                </a>
                <a class="btn waves-effect waves-light red" @click="hideAddItemsModal">
                {{cancelButtonSummit_Text}} <i class="material-icons">cancel_presentation</i>
                </a>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      headerMessage: this.$t("headerMessage"),
      itemNameMessage: this.$t("itemNameMessage"),
      itemPriceMessage: this.$t("itemPriceMessage"),
      imgMessage: this.$t("imgMessage"),
      acceptButtonSummit_Text: this.$t("acceptButtonSummit"),
      cancelButtonSummit_Text: this.$t("cancelButtonSummit"),
      itemName: "",
      itemPrice: 0
    };
  },
  methods: {
    hideAddItemsModal() {
      this.$emit("hideAddItemsModal");
    },
    submitPrice(){
        this.itemPrice = this.itemPrice *1000;
    }
  }
};
</script>

<style scoped>
div.center {
  padding-top: 15px;
  margin-top: 90px;
  border: 5px solid #4db6ac;
}
</style>

<i18n>
  {
    "en": {
      "headerMessage": "Fill Item's Infomation",
      "itemNameMessage": "Item's name",
      "itemPriceMessage": "Item's Price",
      "imgMessage": "Image",
      "acceptButtonSummit": "Accept",
      "cancelButtonSummit": "Cancel"
    },
    "vn": {
      "headerMessage": "Nhập thông tin sản phẩm mới",
      "itemNameMessage": "Tên sản phẩm",
      "itemPriceMessage": "Giá tiền",
      "imgMessage": "Ảnh đại diện",
      "acceptButtonSummit": "Xác nhận",
      "cancelButtonSummit": "Hủy bỏ"
    }
  }
</i18n>