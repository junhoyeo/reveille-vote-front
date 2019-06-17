<template>
  <div
    class="content"
  >
    <div class="login">
      <h1 class="login__title">
        디미고 기상송
      </h1>
      <span class="login__desc">
        원하는 음악을 기상송으로.
      </span>
      <div class="login__wrap">
        <div class="login__form">
          <div class="login__field">
            <span class="login__label">
              디미고 아이디
            </span>
            <input
              v-model="form.id"
              type="text"
              class="login__input"
            >
          </div>
          <div class="login__field">
            <span class="login__label">
              디미고 패스워드
            </span>
            <input
              v-model="form.password"
              type="password"
              class="login__input"
              @keyup.enter="onLogin"
            >
          </div>
        </div>
        <button
          class="login__btn"
          @click="onLogin"
        >
          로그인
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        id: '',
        password: ''
      }
    }
  },
  beforeCreate () {
    if (this.$session.exists()) {
      this.$router.push({ name: 'index' })
    }
  },
  methods: {
    onLogin () {
      if (!this.form.id || !this.form.password) {
        this.$swal(
          '에러!',
          '디미고 아이디와 패스워드를 모두 입력해 주세요!',
          'warning'
        )
        return
      }
      this.$api
        .post('/auth', {
          id: this.form.id,
          password: this.form.password
        })
        .then(res => {
          this.$session.set('token', res.data.token)
          this.$router.push({ name: 'index' })
        })
        .catch(err => {
          this.$swal('에러!', '로그인을 실패했습니다.', 'error')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../styles/login.scss';
</style>
