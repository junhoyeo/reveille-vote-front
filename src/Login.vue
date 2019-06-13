<template>
  <div class="content" :style="{ 'background-image': `url('${require('./background.png')}) no-repeat center center fixed` }">
    <div class="login">
      <h1 class="login__title">디미고 기상송</h1>
      <span class="login__desc">원하는 음악을 기상송으로.</span>
      <div class="login__wrap">
        <div class="login__form">
          <div class="login__field">
            <span class="login__label">디미고 아이디</span>
            <input v-model="form.id" type="text" class="login__input">
          </div>
          <div class="login__field">
            <span class="login__label">디미고 패스워드</span>
            <input v-model="form.password" type="password" class="login__input">
          </div>
        </div>
        <button class="login__btn" @click="onLogin">로그인</button>
      </div>
    </div>
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

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Black+Han+Sans&display=swap');

.content {
  background-size: cover; 
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  text-align: left;
}

html, body, .content {
  width: 100%;
  height: -webkit-fill-available;
}

.login {
  color: white;
  font-size: 110%;

  &__title {
    font-family: 'Black Han Sans', sans-serif;
    margin: 0;
    color: white;
    font-size: 5em;
    font-weight: normal !important;
    padding-left: 1.5rem;
    padding-top: 2rem;
  }
  
  &__desc {
    font-size: 40px;
    font-family: 'NanumSquareRound', sans-serif;
    padding-left: 1.5rem;
    font-weight: 100;
  }

  &__form {
    display: table;
    border-spacing: 1.5rem;
  }

  &__field {
    display: table-row;
  }

  &__label,
  &__input {
    display: table-cell;
  }

  &__label {
    font-weight: 600;
    font-size: 1.5em;
  }

  &__input {
    width: 300px;
    font-size: 1.2em;
    border-radius: 8px;
    border: none;
    padding: 0.3em;
    box-shadow: 15px 19px 32px -15px rgba(255, 255, 255, 0.7);
  }

  &__input:focus {
    border: 1px solid gray;
  }

  &__btn {
    color: white;
    background-color: #ec137f;
    border: none;
    padding: 0.5em;
    font-size: 1em;
    position: absolute;
    right: 0;
    border-radius: 8px;
    font-weight: 800;
    width: 150px;
    box-shadow: 15px 19px 32px -15px rgba(255, 255, 255, 0.7);
  }

  &__btn:focus {
    border: 1px solid red;
  }

  &__wrap {
    width: fit-content;
    position: relative;
  }
}
</style>
