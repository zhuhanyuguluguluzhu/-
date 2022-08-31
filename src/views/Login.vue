<template>
  <div class="login">
    <div class="login-top">
      <h1>网易云音乐</h1>
      <h2>欢迎登录</h2>
    </div>
    <div class="login-content">
      <span>手机号码</span
      ><input type="text" placeholder="请输入手机号码" v-model="phone" />
      <span>密码</span
      ><input type="password" placeholder="请输入密码" v-model="psw" />
      <button @click="Login">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      psw: "",
    };
  },
  methods: {
    async Login() {
      let res = await this.$store.dispatch("getLogin", {
        phone: this.phone,
        psw: this.psw,
      });
      console.log(res);
    },
  },
};
</script>

<style scoped lang="less">
.login {
  width: 100vw;
  height: 100vh;
  background-color: rgb(226, 20, 20);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  .login-top {
    text-align: center;
    color: #ffff;
    margin-bottom: 1rem;
    h2 {
      margin-top: 1rem;
    }
  }
  .login-content {
    span {
      font-size: 0.4rem;
      color: #ccc;
    }

    input {
      padding: 0.2rem;
      margin-top: 0.4rem;
      margin-bottom: 0.2rem;
    }
    button {
      padding: 0.4rem;
      font-weight: 800;
      color: #fff;
      margin: 0.4rem 0 0 1.4rem;
      background-color: rgb(226, 20, 20);
      border: 2px solid #ccc;
    }
  }
}
</style>
