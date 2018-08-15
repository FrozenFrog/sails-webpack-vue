<template>
    <div>
        <table class="highlight responsive-table">
        <thead>
          <tr>
              <th>{{itemName_text}}</th>
              <th>{{itemAmount_text}}</th>
              <th>{{total_text}}</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <th>
                <div class="row">
                  <div class="col s12">
                    <div class="row">
                      <div class="input-field col s12">
                        <input type="text" id="autocomplete-input" class="autocomplete" placeholder="Nhập tên sản phẩm" >
                        <label class="active" for="autocomplete-input">Sản phẩm đã dùng</label>
                      </div>
                    </div>
                  </div>
                </div>
              </th>
              <th>xyz</th>
              <th>pl</th>
            </tr>
            <tr>
              <th>abc</th>
              <th>xyz</th>
            </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import { map, pick, zipObject } from "lodash/fp";
let autocomplete_input = null;
export default {
  data: function() {
    return {
      itemName_text: this.$t("itemName_text"),
      itemAmount_text: this.$t("itemAmount_text"),
      total_text: this.$t("total_text"),
    };
  },
  methods: {
    setData: function(value) {
      let itemNameList = map("itemName")(value);
      let imgBase64DataList = map("imgBase64Data")(value);
      let itemInfomationList = zipObject(itemNameList, imgBase64DataList);
      M.Autocomplete.getInstance(
        this.$el.querySelector(".autocomplete")
      ).updateData(itemInfomationList);
    }
  },
  watch: {},
  beforeRouteEnter: function(to, from, next) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      next(vm => vm.$router.push({ name: "login" }));
    }
    next(vm => {
      vm.axios
        .get("/items")
        .then(response => {
          vm.setData(
            map(pick(["itemName", "itemPrice", "imgBase64Data"]))(response.data)
          );
        })
        .catch(err => {
          console.log("Cannot get items data from server");
        });
    });
  },
  mounted: function() {
    M.Autocomplete.init(this.$el.querySelector(".autocomplete"));
  }
};
</script>

<style scoped>
</style>

<i18n>
  {
    "en": {
      "itemName_text": "Items",
      "logout_text": "Sign Out",
      "Checkout_text": "Checkout",
      "itemAmount_text": "Amount",
      "total_text": "Total"
    },
    "vn": {
      "itemName_text": "Sản phẩm",
      "logout_text": "Đăng xuất",
      "Checkout_text": "Tính tiền",
      "itemAmount_text": "Số lượng",
      "total_text": "Tổng cộng"
    }
  }
</i18n>