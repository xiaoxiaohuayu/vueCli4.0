<template>
  <div class="login_page">
    <div class="login_div">
      <span class="title_text">登陆</span>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          :validate-status="userNameError() ? 'error' : ''"
          :help="userNameError() || ''"
        >
          <a-input
            v-decorator="[
              'account',
              { rules: [{ required: true, message: '账号' }] },
            ]"
            placeholder="账号"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item
          :validate-status="passwordError() ? 'error' : ''"
          :help="passwordError() || ''"
        >
          <a-input
            v-decorator="[
              'password',
              { rules: [{ required: true, message: '密码' }] },
            ]"
            type="password"
            placeholder="密码"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
          >
            登陆
          </a-button>
        </a-form-item>
        <a-button type="primary" @click="info()"> 获取 </a-button>
        <a-button type="primary" @click="signOut()"> 注销 </a-button>
      </a-form>
    </div>
  </div>
</template>

<script>
import { loginFun, infoFun } from "@httpGather";
import { mapState, mapActions } from "vuex";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}
export default {
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: "horizontal_login" }),
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
      // this.$message.error('This is an error message');
    });
  },
  computed: {
    ...mapState("alert", ["status"]),
  },
  methods: {
    ...mapActions("user", ["login", "logout"]),
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("account") && getFieldError("account");
    },
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          this.login(values);
          // console.log(this.$store.state,'登陆之后经过vuex之后的数据')
        }
      });
    },
    info() {
      infoFun().then((res) => {
        console.log(res);
      });
    },
    signOut() {
        console.log(sessionStorage.getItem('token'),'2')
      this.logout();
    },
  },
  watch: {},
};
</script>

<style lang='less' scoped>
.login_page {
  background: url("~@/assets/bg.jpg") no-repeat 90%;
  // width: 400px;
  height: 100vh;
  // margin: 0 auto;
  .login_div {
    width: 400px;
    height: 200px;
    margin-left: -200px;
    margin-top: -100px;
    position: absolute;
    left: 50%;
    top: 50%;
    text-align: center;
    // transform: translate(-50%, -50%);
    .title_text {
      display: block;
    //   display: inline-block;
      font-size: 24px;
      color: #ffffff;
    }
  }
}
</style>
