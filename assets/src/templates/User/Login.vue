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
                <h6 class="red-text center-align animated" for="loginMessageNotify_text" :class="loginMessageShow" >{{loginMessageNotify_text}}</h6>
                <div class="center" id="LoginButton" @click="login">
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
      username: "",
      password: "",
      loginMessageNotify_text: "",
      loginMessageShow: "",
      loginMessage_text: this.$t("loginMessage_text"),
      usernameMessage_text: this.$t("usernameMessage_text"),
      passwordMessage_text: this.$t("passwordMessage_text")
    };
  },
  methods: {
    login() {
      this.axios
        .post("/user/login", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          localStorage.setItem('user',JSON.stringify(response.data.userInfo))
          localStorage.setItem('token',response.data.token)
        })
        .catch(err => {
          if (err.response.status == 404) {
            this.loginMessageShow = "fadeInUp";
            this.loginMessageNotify_text = this.$t("loginMessageNotify_text");
            setInterval(() => (this.loginMessageShow = "fadeOutDown"), 5000);
          } else {
            this.loginMessageShow = "fadeInUp";
            this.loginMessageNotify_text = this.$t(
              "loginMessageNotifyError_text"
            );
            setInterval(() => (this.loginMessageShow = "fadeOutDown"), 5000);
          }
        });
    }
  }
};
</script>

<style scoped>
form {
  margin-top: 200px;
}
div#LoginButton {
  padding-bottom: 30px;
}
</style>

<i18n>
  {
    "en": {
      "loginMessage_text": "Login",
      "usernameMessage_text": "Username",
      "passwordMessage_text": "Password",
      "loginMessageNotify_text": "Invalid input",
      "loginMessageNotifyError_text": "Something wents wrong"
    },
    "vn": {
      "loginMessage_text": "Đăng nhập",
      "usernameMessage_text": "Tên đăng nhập",
      "passwordMessage_text": "Mật khẩu",
      "loginMessageNotify_text": "Sai tên đăng nhập hoặc mật khẩu",
      "loginMessageNotifyError_text": "Đã có lỗi xảy ra"
    }
  }
</i18n>