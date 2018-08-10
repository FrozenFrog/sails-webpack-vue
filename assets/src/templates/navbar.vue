<template>
    <div>
        <nav>
        <div class="nav-wrapper">
            <a href="#!" class="brand-logo">Logo</a>
            <a href="##" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down" v-if="loggedin">
            <li><a href="/#/items">{{DisplayItems_text}}</a></li>
            <li><a href="badges.html">Components</a></li>
            <li><a href="collapsible.html">Javascript</a></li>
            <li><a @click="logout" class="btn waves-effect waves-light center red">{{logout_text}}</a></li>
            </ul>
        </div>
        </nav>
    
        <ul class="sidenav" id="mobile-demo"  v-if="loggedin" >
        <li><a href="/#/items">{{DisplayItems_text}}</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">Javascript</a></li>
        <li><a @click="logout" class="btn waves-effect waves-light center red">{{logout_text}}</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                DisplayItems_text: this.$t('DisplayItems_text'),
                logout_text: this.$t('logout_text')
            }
        },
        methods: {
            logout() {
                localStorage.removeItem('user')
                localStorage.removeItem('token')
                this.axios.defaults.headers.common['token'] = ''
                this.$store.commit('signout')
                this.$router.push({name: 'login'})
            }
        },
        computed: {
            loggedin (){
                return this.$store.state.loggedin
            }
        },
        created: function () {
            if (localStorage.getItem('user') != null) this.$store.state.loggedin = true 
        }
    }
</script>

<style scoped>

</style>

<i18n>
  {
    "en": {
      "DisplayItems_text": "Items",
      "logout_text": "Sign Out",
      "passwordMessage_text": "Password",
      "loginMessageNotify_text": "Invalid input",
      "loginMessageNotifyError_text": "Something wents wrong"
    },
    "vn": {
      "DisplayItems_text": "Sản phẩm",
      "logout_text": "Đăng xuất",
      "passwordMessage_text": "Mật khẩu",
      "loginMessageNotify_text": "Sai tên đăng nhập hoặc mật khẩu",
      "loginMessageNotifyError_text": "Đã có lỗi xảy ra"
    }
  }
</i18n>