<template>
  <div id="app">
    <RouterView />
    <div class="footer">
      <a
        v-tooltip="'프론트엔드 개발'"
        href="https://github.com/junhoyeo"
        target="_blank"
      >
        18HD여준호
      </a>
      &nbsp;
      <i class="icon-dimigo" />&nbsp;
      <a
        v-tooltip="'백엔드 개발'"
        href="https://github.com/uhmtoto"
        target="_blank"
      >
        18HD엄서훈
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
