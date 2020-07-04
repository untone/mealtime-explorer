<script>
import { mapGetters } from 'vuex'

export default {
  name: 'List',
  computed: {
    ...mapGetters({
      breeds: 'dogs/breeds'
    })
  }
}
</script>

<template>
  <main>
  </main>
</template>
