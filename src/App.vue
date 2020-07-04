<script>
export default {
  name: 'App',
  watch: {
    $route: {
      immediate: true,
      handler (to, from) {
        document.title = to.meta.title
      }
    }
  }
}
</script>

<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<style lang="scss">
@import '~@/assets/css/reset';

html {
  -webkit-text-size-adjust: 100%;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

body {
  margin: 0 auto;
  padding-top: 60px;
  max-width: var(--max-content-width);
  min-height: 100vh;
  @include sans-serif;
  color: var(--default-color);
  background-image: linear-gradient(
    to bottom,
    var(--background-start-color),
    var(--background-stop-color)
  );
  @include mq($from: tablet) {
    padding-top: 100px;
  }
}
</style>
