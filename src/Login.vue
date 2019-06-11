<template>
  <div class="content">
    <input v-model="form.id" type="text">
    <input v-model="form.password" type="password">
    <button @click="onLogin">로그인</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: "",
        password: ""
      }
    };
  },
  methods: {
    onLogin() {
      if (!this.form.id || !this.form.password) {
        this.$swal(
          "에러!",
          "디미고 아이디와 패스워드를 모두 입력해 주세요!",
          "warning"
        );
        return;
      }
      this.$api
        .post("/auth", {
          id: this.form.id,
          password: this.form.password
        })
        .then(res => {
          this.$session.set("token", res.data.token);
          this.$emit("updated", { token: this.token });
        })
        .catch(err => {
          this.$swal("에러!", err.message, "error");
        });
    }
  }
};
</script>
