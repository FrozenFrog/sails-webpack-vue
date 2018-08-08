<template>
    <div class="row">
        <form class="z-depth-3 col s12 m8 l6 push-l3 push-m2"  >
                <div class="input-field">
                    <i class="material-icons prefix">account_circle</i>
                    <input id="icon_account_circle" v-model="username" type="text" class="validate">
                    <label for="icon_account_circle">{{usernameMessage_text}}</label>
                </div>
                <div class="input-field">
                    <i class="material-icons prefix">lock</i>
                    <input id="icon_lock" v-model="password" type="password" class="validate">
                    <label for="icon_lock">{{passwordMessage_text}}</label>
                </div>
                <div class="center" id="LoginButton">
                    <a class="btn waves-effect waves-light center red">
                    {{loginMessage_text}}
                    <i class="material-icons">input</i>
                    </a>
                </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                "username": "",
                "password": "",
                "loginMessage_text": this.$t("loginMessage_text"),
                "usernameMessage_text": this.$t("usernameMessage_text"),
                "passwordMessage_text": this.$t("passwordMessage_text")
            }
        },
    }
</script>

<style scoped>
form{
    margin-top: 200px;
}
div#LoginButton{
    padding-bottom: 30px;
}
</style>

<i18n>
  {
    "en": {
      "loginMessage_text": "Login",
      "usernameMessage_text": "Username",
      "passwordMessage_text": "Password"
    },
    "vn": {
      "loginMessage_text": "Đăng nhập",
      "usernameMessage_text": "Tên đăng nhập",
      "passwordMessage_text": "Mật khẩu"
    }
  }
</i18n>