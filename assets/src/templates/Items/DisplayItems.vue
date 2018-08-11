<template>
    <div>
        <div class="section">
          <a class="left-align">{{ItemsMessage_text.toUpperCase()}}</a>
          <router-link :to="{name: 'add'}" class="right-align modal-trigger btn-floating btn-large waves-effect waves-light red" @click.native="addItemHanlde" data-target="modal1" v-tooltip.left-start="AddItemTooltips" :class="{disabled: !isAdmin}">
            <i class="material-icons">add</i>
          </router-link>
        </div>
        <div class="divider teal lighten-2"></div>
        <div class="modal center z-depth-2" id="modal1">  
          <add-items key="addItems"  v-if="!$store.state.editItem && isAdmin"></add-items>
          <edit-item key="editItem" v-if="$store.state.editItem && isAdmin"></edit-item>
        </div>
        <div class="row">
          <div v-for="item of itemsObject" :key="item.id" class="col s6 m4 l3">
             <item v-on:editItem="handleEditItem" :item="item" :key="item.id"></item>
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
//Do không thể access this.$router từ bên ngoài này nên tạo VueRouter mới
const router = new VueRouter({});
var modalClose = function(){
  router.replace({path: '/items'})
}
export default {
  data() {
    return {
      AddItemTooltips: this.$t("AddItemTooltips"),
      ItemsMessage_text: this.$t("ItemsMessage_text"),
      isAdmin: 0,
      itemsObject: null //Đây là object chứa toàn bộ items sau khi fetch data từ server
    };
  },
  computed: {},
  methods: {
    handleEditItem: function(item) {
      //handle editItem event from Item.vue then pass prop to edit-item component
      modalShow = true;
      this.$store.commit("editItemHandle", item);
    },
    addItemHanlde: function() {
      if (this.$store.state.editItemProp) {
        modalShow = true;
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
    M.Modal.init(this.$el.querySelectorAll(".modal")[0]);
    //MutationObserver xem sự thay đổi của div.modal có class open hay ko, nếu ko có mà modalShow (tức là nó đã từng show rồi) => $router replace về /items
    var target = document.querySelectorAll(".modal")[0];
    observer = new MutationObserver(function(mutations) {
      const changes = mutations.filter(
        ({ attributeName }) => attributeName === "class"
      );
      if (!target.classList.contains('open') && modalShow ) {
        modalClose()
      }
    });

    // pass in the target node, as well as the observer options
    observer.observe(target, {attributes: true});
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
        console.log("Cannot get items data from server");
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
      "ItemsMessage_text": "All items"
    },
    "vn": {
      "AddItemTooltips": "Thêm sản phẩm mới",
      "ItemsMessage_text": "Các sản phẩm hiện có"
    }
  }
</i18n>