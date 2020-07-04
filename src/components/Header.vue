<script>
import Logo from '@/components/Logo'
import Heart from '@/components/Heart'

export default {
  name: 'Header',
  components: {
    Logo,
    Heart
  }
}
</script>

<template>
  <header :class="$style.header">
    <div :class="$style.content">
      <router-link
        to="/"
        :class="$style.logo"
        exact
      >
        <Logo />
      </router-link>
      <router-link
        to="/favourites"
        :class="$style.nav"
        exact
      >
        Избранные пёсели
        <Heart :class="$style.icon" />
      </router-link>
    </div>
  </header>
</template>

<style lang="scss" module>
.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 60px;
  background-color: var(--background-color);
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, .55);
  transition: height .15s;

  @include mq($from: tablet) {
    height: 100px;
  }
}

.content {
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-content-width);
  height: 100%;

  @include mq($from: tablet) {
    padding: 0 60px;
  }
}

.logo {
  width: 118px;
  color: var(--active-color);

  &:global(.router-link-active) {
    cursor: default;
  }
}

.nav {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: var(--inactive-color);
  text-decoration: none;
  transition: color .15s;

  &:global(:not(.router-link-active)) {
    &:hover,
    &:focus {
      color: var(--default-color);
    }
  }

  &:global(.router-link-active) {
    color: var(--default-color);
  }

  .icon {
    margin: 0 0 0 10px;
    width: 16px;
  }
}

</style>
