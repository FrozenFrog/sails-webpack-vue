<template>
    <div class="center modal-content z-depth-2">
        <h4>{{headerMessage}}</h4>
        <form class="container">
            <div class="valign-wrapper">
                <div class="left">
                    <div class="image-upload">
                        <label for="file-input"><img :src="imgBase64Data" alt="" class="responsive-img"></label>
                        <input id="file-input" @change="previewImage"  type="file" accept="image/*">
                    </div>
                    <a > {{imgMessage}} </a>
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
                    <h6 class="red-text center-align animated" :class="addMessageShow" >{{addItemNotify_text}}</h6>
                </div>   
            </div>
            <div class="modal-footer right">
                <a class="btn waves-effect waves-light" @click="addItem" >
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
      itemPrice: 0,
      imgBase64Data: "http://img.khoahoc.tv/photos/image/2014/03/28/coffee.jpg",
      addMessageShow: "",
      addItemNotify_text: "",
      addItemNotifyError_text: ""
    };
  },
  methods: {
    hideAddItemsModal() {
      this.$emit("hideAddItemsModal");
    },
    submitPrice() {
      this.itemPrice = this.itemPrice * 1000;
    },
    previewImage: function(event) {
      //https://jsfiddle.net/mani04/5zyozvx8/
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.imgBase64Data = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },
    addItem() {
      let payload = {
        itemName: this.itemName,
        itemPrice: this.itemPrice,
        imgBase64Data: this.imgBase64Data
      };
      this.axios
        .post("/items/add", payload)
        .then(response => {
          this.addMessageShow = "fadeInUp";
          this.addItemNotify_text = this.$t("addItemNotify_text");
          setInterval(() => (this.addMessageShow = "fadeOutDown"), 5000);
        })
        .catch(err => {
          this.addMessageShow = "fadeInUp";
          this.addItemNotifyError_text =
            this.$t("addItemNotifyError_text") +
            err.response.status.toString() +
            err.response.data;
          setInterval(() => (this.addMessageShow = "fadeOutDown"), 5000);
        });
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
.image-upload > input {
  display: none;
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
      "cancelButtonSummit": "Cancel",
      "addItemNotify_text": "Add item successfully",
      "addItemNotifyError_text": "Something went wrong "
    },
    "vn": {
      "headerMessage": "Nhập thông tin sản phẩm mới",
      "itemNameMessage": "Tên sản phẩm",
      "itemPriceMessage": "Giá tiền",
      "imgMessage": "Ảnh đại diện",
      "acceptButtonSummit": "Xác nhận",
      "cancelButtonSummit": "Hủy bỏ",
      "addItemNotify_text": "Thêm sản phẩm mới thành công",
      "addItemNotifyError_text": "Đã có lỗi xảy ra "
    }
  }
</i18n>