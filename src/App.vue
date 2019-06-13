<template>
  <div id="app">
    <router-view />
    <div class="footer">
      <a href="https://github.com/junhoyeo" target="_blank" v-tooltip="'프론트엔드 개발'">18HD여준호</a>
      &nbsp;
      <i class="icon-dimigo"/>&nbsp;
      <a href="https://github.com/uhmtoto" target="_blank" v-tooltip="'백엔드 개발'">18HD엄서훈</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
