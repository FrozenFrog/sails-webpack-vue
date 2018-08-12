<template>
    <div>
        <nav>
        <div class="nav-wrapper">
            <router-link :to="{name: 'index'}" class="brand-logo">Coffee Shop</router-link>
            <a href="##" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down" v-if="loggedin">
                <router-link tag="li" :to="{name: 'displayitem'}">
                    <a>{{DisplayItems_text}}</a>
                </router-link>
                <li><a @click="logout" class="btn waves-effect waves-light center red">{{logout_text}}</a></li>
            </ul>
        </div>
        </nav>
    
        <ul class="sidenav" id="mobile-demo"  v-if="loggedin" >
            <router-link tag="li" :to="{name: 'displayitem'}">
                    <a>{{DisplayItems_text}}</a>
            </router-link>
            <router-link tag="li" :to="{name: 'displayitem'}">
                    <a>{{Checkout_text}}</a>
            </router-link>
            <li><a @click="logout" class="btn waves-effect waves-light center red">{{logout_text}}</a></li>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      DisplayItems_text: this.$t("DisplayItems_text"),
      logout_text: this.$t("logout_text"),
      Checkout_text: this.$t("Checkout_text")
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      this.axios.defaults.headers.common["token"] = "";
      this.$store.commit("signout");
      this.$router.push({ name: "login" });
    }
  },
  computed: {
    loggedin() {
      return this.$store.state.loggedin;
    }
  },
  created: function() {
    if (localStorage.getItem("user") != null) this.$store.state.loggedin = true;
  }
};
</script>

<style scoped>
</style>

<i18n>
  {
    "en": {
      "DisplayItems_text": "Items",
      "logout_text": "Sign Out",
      "Checkout_text": "Checkout"
    },
    "vn": {
      "DisplayItems_text": "Sản phẩm",
      "logout_text": "Đăng xuất",
      "Checkout_text": "Tính tiền"
    }
  }
</i18n>