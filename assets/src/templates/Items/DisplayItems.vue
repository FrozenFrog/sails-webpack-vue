<template>
    <div>
        <div class="section">
          <a class="left-align">{{ItemsMessage_text.toUpperCase()}}</a>
          <router-link :to="{name: 'add'}" class="right-align modal-trigger btn-floating btn-large waves-effect waves-light red" @click.native="addItemHanlde" data-target="modal1" v-tooltip.left-start="AddItemTooltips" :class="{disabled: !isAdmin}">
            <i class="material-icons">add</i>
          </router-link>
        </div>
        <div class="divider teal lighten-2"></div>
        <div class="modal center z-depth-2"  id="modal2">
            <div class="modal-content">
              <h4>{{deleteConfirmation_text}}</h4>
            </div>
            <div class="modal-footer">
              <a class="btn waves-effect waves-light" @click="requestDelete">
                  {{acceptButtonSummit_Text}} <i class="material-icons">send</i>
                  </a>
                  <a class="btn waves-effect waves-light red modal-close">
                  {{cancelButtonSummit_Text}} <i class="material-icons">cancel_presentation</i>
                  </a>
            </div>
        </div>
        <div class="modal center z-depth-2" id="modal1">  
          <add-items key="addItems"  v-if="!$store.state.editItem && isAdmin"></add-items>
          <edit-item key="editItem" v-if="$store.state.editItem && isAdmin"></edit-item>
        </div>
        <div class="row">
          <div v-for="item of itemsObject" :key="item.id" class="col s6 m4 l3">
             <item v-on:editItem="handleEditItem" v-on:deleteItem="handleDeleteItem" :item="item" :key="item.id"></item>
          </div>
        </div>
    </div>
</template>

<script>
import AddItems from "./AddItems";
import EditItem from "./AddItems.vue";
import Item from "./Item.vue";
import VueRouter from "vue-router";
var modalShow = null;
var observer = null;
var itemToDel;
//Do không thể access this.$router từ bên ngoài này nên tạo VueRouter mới
const router = new VueRouter({});
var modalClose = function() {
  modalShow = false;
  itemToDel = null;
  router.replace({ path: "/items" });
};
export default {
  data() {
    return {
      AddItemTooltips: this.$t("AddItemTooltips"),
      ItemsMessage_text: this.$t("ItemsMessage_text"),
      isAdmin: 0,
      itemsObject: null, //Đây là object chứa toàn bộ items sau khi fetch data từ server
      deleteConfirmation_text: this.$t("deleteConfirmation_text"),
      acceptButtonSummit_Text: this.$t("acceptButtonSummit"),
      cancelButtonSummit_Text: this.$t("cancelButtonSummit")
    };
  },
  computed: {},
  methods: {
    handleEditItem: function(item) {
      //handle editItem event from Item.vue then pass prop to edit-item component
      modalShow = true;
      this.$store.commit("editItemHandle", item);
    },
    handleDeleteItem: function(item) {
      modalShow = true;
      itemToDel = item;
    },
    requestDelete: function() {
      this.axios.delete("/items/" + itemToDel.id);
      location.reload();
    },
    addItemHanlde: function() {
      modalShow = true;
      if (this.$store.state.editItemProp) {
        this.$store.state.editItem = false;
        this.$store.state.editItemProp = null;
      }
    }
  },
  components: {
    AddItems: AddItems,
    EditItem: EditItem,
    Item: Item
  },
  mounted: function() {
    M.Modal.init(this.$el.querySelectorAll(".modal#modal2")[0]);
    M.Modal.init(this.$el.querySelectorAll(".modal#modal1")[0]);
    var target = document.body; //theo dõi cả body coi sự thay đổi class của mấy anh
    observer = new MutationObserver(function(mutations) {
      const changes = mutations.filter(
        ({ attributeName }) => attributeName === "class"
      );
      let modal1 = document.querySelectorAll(".modal#modal1")[0];
      let modal2 = document.querySelectorAll(".modal#modal2")[0];
      if (
        modalShow &&
        (!modal1.classList.contains("open") &&
          !modal2.classList.contains("open"))
      ) {
        modalClose();
      }
    });
    // pass in the target node, as well as the observer options
    observer.observe(target, { attributes: true });
  },
  beforeUpdate: function() {},
  created: function() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.isAdmin) this.isAdmin = user.isAdmin;
    } else this.$router.push({ name: "login" });
    this.axios
      .get("/items")
      .then(response => {
        this.itemsObject = response.data;
      })
      .catch(err => {
        M.toast({ html: "Cannot get items data from server!" });
      });
  }
};
</script>

<style scoped>
a.modal-trigger {
  padding-right: 20px;
}
div.col.s6 {
  padding-bottom: 20px;
}
div.divider {
  margin-bottom: 20px;
}
</style>

<i18n>
  {
    "en": {
      "AddItemTooltips": "Add new item",
      "ItemsMessage_text": "All items",
      "deleteConfirmation_text": "Are you sure deleting this item?",
      "acceptButtonSummit": "Accept",
      "cancelButtonSummit": "Cancel"
    },
    "vn": {
      "AddItemTooltips": "Thêm sản phẩm mới",
      "ItemsMessage_text": "Các sản phẩm hiện có",
      "deleteConfirmation_text": "Bạn có chắc chắn muốn xóa sản phẩm này",
      "acceptButtonSummit": "Xác nhận",
      "cancelButtonSummit": "Hủy bỏ"
    }
  }
</i18n>