<script>
import Header from '@/components/Header.vue'
import Nav from '@/components/Nav.vue'
import List from '@/components/List.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Nav,
    List
  }
}
</script>

<template>
  <div>
    <Header />
    <Nav />
    <List />
  </div>
</template>
