<template>
  <div class="app">
    <h1><i class="icon-request" />기상송 투표</h1>
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
        <span class="add__label">노래 제목</span>
        <input type="text" class="add__input" />
      </div>
      <div class="add__field">
        <span class="add__label">아티스트 이름</span>
        <input type="text" class="add__input" />
      </div>
      <button class="add__submit">추가하기</button>
    </div>
    <div class="footer">
      <i class="icon-dimigo"/> 18HD여준호
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
        list: [
          {
            'name': '교통정리',
            'artist': '기리보이',
            'likes': 5,
            'hates': 0
          },
          {
            'name': '솔직하게 말해서 나',
            'artist': '김나영',
            'likes': 3,
            'hates': 2
          }
        ]
      }
    },

    methods: {
      async updateList () {
        this.$api.get('./api.php')
          .then((res) => {
            this.list = res.data.list
          })
      }
    }
}
</script>

<style lang="scss">
@import url('https://cdn.rawgit.com/innks/NanumSquareRound/master/nanumsquareround.min.css');
@import url('https://cdn.jsdelivr.net/gh/dimigoin/dimigoincon@9e0a536bbf40b5e4aabbbee280acceaea559a4c7/css/dimigoincon.css');

*:focus {
   outline: none;
}

html {
  background-color: #f7f7f7;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
}

h1 {
  margin-left: 1em;
  margin-top: 1em;
  font-family: 'NanumSquareRound', sans-serif;
}

.content {
  font-family: 'NanumSquareRound', sans-serif;
  margin: 0;
  padding: 0;
  text-align: center;
}

.item {
  margin: auto;
  text-align: left;
  font-size: 1.5em;
  display: table;
  border-spacing: 0.3em;
  margin-bottom: 0.5em;
  width: 90%;
  border-radius: 18px;
  border: 0.5px solid rgba(128, 128, 128, 0.2);
  box-shadow: 15px 19px 32px -18px rgba(21,19,19,.07);
  padding: 0.5em;
  
  &__thumb {
    display: table-row;
    color: rgb(172, 172, 172);
  }

  span {
    margin-left: 0.5em;
    cursor: pointer;
  }

  span.likes:hover {
    color: rgb(154, 154, 255);
  }

  span.hates:hover {
    color: rgb(252, 152, 152);
  }
}

.music {
  &__title {
    font-weight: 700;
  }

  &__artist {
    margin-left: 0.3em !important;
  }
}

.add {
  margin: auto;
  font-family: 'NanumSquareRound', sans-serif;
  padding: 0.5em;
  width: 90%;
  border-radius: 18px;
  border: 0.5px solid rgba(128, 128, 128, 0.2);
  box-shadow: 15px 19px 32px -18px rgba(21,19,19,.07);
  display: table;
  border-spacing: 0.5em;
  padding-left: 1.5em;

  &__title {
    margin: 0;
    margin-top: 0.5em;
  }

  &__field {
    display: table-row;
  }

  &__label,
  &__input {
    display: table-cell;
    border-radius: 12px;
    border: none;
  }

  &__label {
    font-size: 1.2em;
    width: 20%;
  }

  &__input {
    font-size: 1em;
    box-shadow: 15px 19px 32px -18px rgba(21, 19, 19, 0.2);
    padding: 0.5em;
    width: 50%;
  }

  &__submit {
    width: 100%;
    display: table-row;
    font-size: 1.2em;
    padding: 0.3em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    border-radius: 50px;
    border: none;
    box-shadow: 15px 19px 32px -18px rgba(21, 19, 19, 0.2);
    background-color: #e83c3d;
    color: white;
    font-family: 'NanumSquareRound', sans-serif;
    font-weight: 600;
  }
}

.footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  padding: 1em;
  background-color: #e7e7e7;
  color: gray;
}
</style>
