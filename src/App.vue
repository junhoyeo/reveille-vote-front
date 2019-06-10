<template>
  <div class="app">
    <h1><i class="icon-request" />기상송 투표</h1>
    <p>학봉관 아침, 여러분의 잠을 깨워 줄 <strong>기상송</strong>을 직접 골라 보세요! 스팸을 방지하기 위해서 제안한 학생의 실명이 공개됩니다.</p>
    <div class="content">
      <div class="list">
        <div
          class="item"
          v-for="item in list"
        >
          <div class="music">
            <span class="music__title">{{ item.title }}</span>
            <span class="music__artist">{{ item.artist }}</span>
          </div>
          <span class="item__thumb">
            <span
              class="likes"
              :class="{ selected: (item.type === 1) }"
            >
              <mb-ripple color="blue">
                <i class="fas fa-thumbs-up"></i> {{ item.likes }}
              </mb-ripple>
            </span>
            <span
              class="hates"
              :class="{ selected: (item.type === -1) }"
            >
              <mb-ripple color="red">
                <i class="fas fa-thumbs-down"></i> {{ item.hates }}
              </mb-ripple>
            </span>
            <span class="item__info">
              <span class="item__strong">{{ item.student }}</span>가 <span class="item__strong">{{ item.date }}</span>에 추가함
            </span>
          </span>
        </div>
      </div>
    </div>
    <div class="add">
      <h2 class="add__title"><i class="icon-comment" /> 제안하기</h2>
      <p class="add__desc">원하는 음악이 없나요? 직접 기상송을 <strong>제안</strong>해 보세요!</p>
      <div class="add__content">
        <div class="add__field">
          <span class="add__label">디미고 아이디</span>
          <input
            type="text" class="add__input" v-model="form.id"
            placeholder="디미고 계정 아이디"
          />
        </div>
        <div class="add__field">
          <span class="add__label">디미고 패스워드</span>
          <input
            type="password" class="add__input" v-model="form.password" 
            placeholder="디미고 계정 패스워드"
          />
        </div>
        <div class="add__field">
          <span class="add__label"><strong>음악 제목</strong></span>
          <input
            type="text" class="add__input" v-model="form.title"
            placeholder="추가할 음악 제목"
          />
        </div>
        <div class="add__field">
          <span class="add__label"><strong>아티스트 이름</strong></span>
          <input
            type="text" class="add__input" v-model="form.artist"
            placeholder="추가할 음악 아티스트"
          />
        </div>
        <mb-ripple color="#fff">
          <button
            @click="onSubmit"
            class="add__submit"
          >
            추가하기
          </button>
        </mb-ripple>
      </div>
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
      // TODO: token 생성 시 timestamp와 함께 쿠키에 저장, created에서 불러와 적용 (reduce unnecessary API calls)
    },

    data () {
      return {
        list: [
          {
            title: '술이 달다', // 제목
            artist: '에픽하이', // 아티스트
            likes: 5, // 좋아요
            hates: 3, // 싫어요
            student: '1520 여준호', // 작성자(서버에서 문자열로 처리좀)
            date: '2019-06-10', // timestamp
            type: 1 // 사용자가 누른 좋아요/싫어요(또는 무응답) 버튼의 타입
          }
        ],
        form: {
          id: '',
          password: '',
          title: '',
          artist: ''
        }
      }
    },

    methods: {
      async updateList () {
        this.$api.get('/songs')
          .then((res) => {
            this.list = res.data.list
          })
      },

      onSubmit () { // TODO: 노트북 받으면 비동기로 바꾼다;;
        // get dimigoin token
        this.$api.post('http://dev-api.dimigo.in/auth', {
          id: this.form.id,
          password: this.form.password
        })
          .then((res) => {
            console.log(res)
            const token = res.data.token

            // send to backend
            const payload = {
              token,
              title: this.form.title,
              artist: this.form.artist,
            }

            this.$api.post('', {
              headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
              }
            }, payload)
              .then((res) => {
                if (res.status === 200) {
                  this.$swal('성공!', '추가되었습니다.', 'success')
                }
              })
              .catch((error) => {
                this.$swal('에러!', '백엔드 서버에서 에러가 발생했습니다.', 'error')                
              })
          })
          .catch((error) => {
            this.$swal('로그인 실패!', '디미고 아이디와 패스워드를 확인해 주세요.', 'error')
          })
      }
    }
}
</script>

<style lang="scss">
@import './style.scss';
@import './tooltip.css';
</style>
