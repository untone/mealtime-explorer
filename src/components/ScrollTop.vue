<script>
import Arrow from '@/components/Arrow'

export default {
  name: 'ScrollTop',
  components: {
    Arrow
  },
  data () {
    return {
      visible: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.watchScroll, { passive: true })
    this.watchScroll()
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.watchScroll)
  },
  methods: {
    watchScroll () {
      const scrollY = window.scrollY
      const pageHeight = document.documentElement.clientHeight
      this.visible = scrollY > pageHeight
    },
    scrollTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<template>
  <div :class="[
    $style.content,
    visible && $style.contentVisible,
  ]">
    <div
      :class="$style.button"
      @click="scrollTop"
    >
      <Arrow :class="$style.icon" />
    </div>
  </div>
</template>

<style lang="scss" module>
.content {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 100px;
  margin: 0 auto;
  max-width: var(--max-content-width);
  transition: opacity .15s;
  color: var(--defaultColor);
  visibility: hidden;
  opacity: 0;
}

.contentVisible {
  visibility: visible;
  opacity: 1;
}

.button {
  position: absolute;
  right: 60px;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
  border: 1px solid;
  border-radius: 55px;
  cursor: pointer;
  transition: color .15s, border-color .15s;

  &:hover {
    color: var(--active-color);
    border-color: var(--active-color);
  }
}

.icon {
  width: 20px;
}

</style>
