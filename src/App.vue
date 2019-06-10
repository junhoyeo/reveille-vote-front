<template>
  <div class="app">
    <h1><i class="icon-request" />기상송 투표</h1>
    <p>학봉관 아침, 여러분의 잠을 깨워 줄 <strong>기상송</strong>을 직접 골라 보세요! 스팸을 막기 위해서 제안한 학생의 실명이 공개됩니다.</p>
    <div class="content">
      <div class="list">
        <div
          class="item"
          v-for="item in list"
        >
          <div class="music">
            <span class="music__title">{{ item.name }}</span>
            <span class="music__artist">{{ item.artist }}</span>
          </div>
          <span class="item__thumb">
            <span class="likes">
              <i class="fas fa-thumbs-up"></i> {{ item.likes }}
            </span>
            <span class="hates">
              <i class="fas fa-thumbs-down"></i> {{ item.hates }}
            </span>
          </span>
        </div>
      </div>
    </div>
    <div class="add">
      <h2 class="add__title">제안하기</h2>
      <div class="add__field">
        <span class="add__label">디미고 아이디</span>
        <input type="text" class="add__input" />
      </div>
      <div class="add__field">
        <span class="add__label">디미고 비밀번호</span>
        <input type="password" class="add__input" />
      </div>
      <div class="add__field">
        <span class="add__label"><strong>노래 제목</strong></span>
        <input type="text" class="add__input" />
      </div>
      <div class="add__field">
        <span class="add__label"><strong>아티스트 이름</strong></span>
        <input type="text" class="add__input" />
      </div>
      <button
        class="add__submit"
      >
        추가하기
      </button>
    </div>
    <div class="footer">
      <a 
        href="https://github.com/junhoyeo" target="_blank"
        v-tooltip="'프론트엔드 개발'"
      >
        18HD여준호
      </a>
      &nbsp;<i class="icon-dimigo"/>&nbsp;
      <a
        href="https://github.com/uhmtoto" target="_blank"
        v-tooltip="'백엔드 개발'"
      >
        18HD엄서훈
      </a>
    </div>
  </div>
</template>

<script>
export default {
    async created () {
      await this.updateList()
    },

    data () {
      return {
        list: []
      }
    },

    methods: {
      async updateList () {
        this.$api.get('/songs')
          .then((res) => {
            this.list = res.data.list
          })
      },

      async likeSong () {

      },

      async hateSong () {

      }
    }
}
</script>

<style lang="scss">
@import './style.scss';
@import './tooltip.css';
</style>
