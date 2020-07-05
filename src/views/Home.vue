<script>
import Header from '@/components/Header.vue'
import Nav from '@/components/Nav.vue'
import List from '@/components/List.vue'
import ScrollTop from '@/components/ScrollTop.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Nav,
    List,
    ScrollTop
  }
}
</script>

<template>
  <div>
    <Header />
    <Nav />
    <List />
    <ScrollTop />
  </div>
</template>
