<template>
  <div class="main">
    <h1>
      <i class="icon-request" />기상송 투표
      <span
        class="logout"
        @click="onLogout"
      >
        로그아웃
      </span>
    </h1>
    <p>
      학봉관 아침, 여러분의 잠을 깨워 줄
      <strong>기상송</strong>을 직접 골라 보세요! 스팸을 방지하기 위해서 제안한 학생의 실명이 공개됩니다.
    </p>
    <div class="content">
      <div class="list">
        <div
          v-for="(item, idx) in list"
          :key="idx"
          class="item"
        >
          <div class="music">
            <span class="music__title">
              {{ item.title }}
            </span>
            <span class="music__artist">
              {{ item.artist }}
            </span>
            <MbRipple
              color="red"
              @click="onClickYoutube(item)"
            >
              <span class="music__youtube">
                <i class="fab fa-youtube" /> 유튜브에서 검색하기
              </span>
            </MbRipple>
          </div>
          <span class="item__thumb">
            <span
              class="likes"
              :class="{ selected: (item.status === 1) }"
            >
              <MbRipple
                color="blue"
                @click="onChangeStatus(item, 1)"
              >
                <i class="fas fa-thumbs-up" />
                {{ item.likes }}
              </MbRipple>
            </span>
            <span
              class="hates"
              :class="{ selected: (item.status === -1) }"
            >
              <MbRipple
                color="red"
                @click="onChangeStatus(item, -1)"
              >
                <i class="fas fa-thumbs-down" />
                {{ item.hates }}
              </MbRipple>
            </span>
            <span class="item__info">
              <span class="item__text">
                {{ renderUser(item) }},
              </span>
              <span class="item__text">
                {{ new Date(item.time) | moment('from', 'now') }}
              </span>
            </span>
          </span>
        </div>
      </div>
      <div class="add">
        <h2 class="add__title">
          <i class="icon-comment" /> 제안하기
        </h2>
        <p class="add__desc">
          원하는 음악이 없나요? 직접 기상송을
          <strong>제안</strong>해 보세요!
        </p>
        <div class="add__content">
          <div class="add__field">
            <span class="add__label">
              <strong>음악 제목</strong>
            </span>
            <input
              v-model.trim="form.title"
              type="text"
              class="add__input"
              placeholder="추가할 음악 제목"
            >
          </div>
          <div class="add__field">
            <span class="add__label">
              <strong>아티스트 이름</strong>
            </span>
            <input
              v-model.trim="form.artist"
              type="text"
              class="add__input"
              placeholder="추가할 음악 아티스트"
            >
          </div>
          <MbRipple
            color="#fff"
            @click="onSubmit"
          >
            <button class="add__submit">
              추가하기
            </button>
          </MbRipple>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      token: '',
      list: [],
      form: {
        title: '',
        artist: ''
      }
    }
  },
  created () {
    if (!this.$session.exists()) this.$router.push({ name: 'login' })
    else {
      this.token = this.$session.get('token')
    }
    this.updateList()
  },

  methods: {
    updateList () {
      this.$api
        .get('/music', {
          headers: {
            authorization: this.token
          }
        })
        .then(res => {
          console.log(res)
          this.list = res.data
        })
    },

    onSubmit () {
      // TODO: change to async
      // validate input
      if (!this.form.title || !this.form.artist) {
        this.$swal(
          '에러!',
          '음악 제목과 아티스트 이름을 모두 입력해 주세요!',
          'warning'
        )
        return
      }

      this.$api
        .post(
          '/music',
          {
            title: this.form.title,
            artist: this.form.artist
          },
          {
            headers: {
              authorization: this.token
            }
          }
        )
        .then(res => {
          if (res.status === 200) {
            this.$swal('성공!', '추가되었습니다.', 'success')
            this.clearForm()
            this.updateList()
          }
        })
        .catch(err => {
          this.$swal('에러!', err.message, 'error')
        })
    },

    onClickYoutube (item) {
      const url = `https://www.youtube.com/results?search_query=${encodeURI(
        `${item.title} ${item.artist}`
      )}`
      const win = window.open(url, '_blank')
      win.focus()
    },

    onChangeStatus (item, status) {
      if (item.status === status) { // return if already same status
        status = 0
      }
      this.$api
        .put(
          `/music/${item._id}/like`,
          {
            value: status
          },
          {
            headers: {
              authorization: this.token
            }
          }
        )
        .then(res => {
          this.updateList()
        })
        .catch(err => {
          this.$swal('에러!', err.message, 'error')
        })
    },

    clearForm () {
      this.form = {
        title: '',
        artist: ''
      }
    },

    onLogout () {
      this.$session.destroy()
      this.$router.push({ name: 'login' })
    },

    renderUser (item) {
      if (item.student.serial)
        return `${item.student.serial} ${item.student.name}`
      else return `${item.student.name} 선생님`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./../styles/index.scss";
@import "./../styles/tooltip.css";
</style>
