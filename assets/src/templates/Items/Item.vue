<template>
<div>
    <div class="z-depth-3 center-align" id="itemobj">
        <div class="right" >
            <router-link :to="{name: 'delete', params: {id: item.id}}" class="waves-effect waves-light btn-flat modal-trigger" 
            :class="{disabled: !isAdmin}" data-target="modal2" v-on:click.native="deleteItem(item)" replace>
                <i class="material-icons">clear</i>
            </router-link>
        </div>
        <router-link :to="{name: 'edit', params: { id: item.id }}" data-target="modal1" :class="editable"  v-on:click.native="editItem(item)" replace>
            <img :src="item.imgBase64Data" alt="item.itemPrice" class="responsive-img">
            <span><i class="material-icons">bookmark_border</i>{{item.itemName}} </span> <br>
            <span><i class="material-icons">attach_money</i>{{item.itemPrice}} </span>
        </router-link>

    </div>
</div>

</template>

<script>
export default {
  data() {
    return {
      isAdmin: 0,
      editable: ""
    };
  },
  computed: {
  },
  props: ["item"],
  methods: {
    editItem: function(item) {
      //emit editItem event with item object to displayitems.vue
      this.$emit("editItem", item);
    },
    deleteItem: function(item) {
      this.$emit("deleteItem", item);
    }
  },
  created: function() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.isAdmin) {
        this.editable = "modal-trigger"; //only show modal to edit if user is admin
        this.isAdmin = user.isAdmin;
      }
    } 
    else this.$router.push({ name: "login" });
  }
};
</script>

<style scoped>
img.responsive-img {
  height: 200px;
  width: 280px;
  padding-left: 15px;
  padding-top: 15px;
}
div#itemobj {
  background-color: #b2dfdb;
}
a.btn-flat:hover {
  background-color: #e57373;
}
</style>