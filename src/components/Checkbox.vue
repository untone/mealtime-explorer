<script>
export default {
  name: 'Checkbox',
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      checkedValue: null
    }
  },
  computed: {
    checkedModel: {
      get () {
        return this.checkedValue
      },
      set (value) {
        this.checkedValue = value
      }
    }
  },
  watch: {
    checked (value) {
      this.checkedValue = value
    }
  },
  mounted () {
    this.checkedValue = this.checked
  },
  methods: {
    onSpaceDown () {
      this.$refs.input.click()
    },
    change (event) {
      this.$emit('change', this.checkedModel)
      this.$emit('input', event.target.value, this.checkedModel)
    }
  }
}
</script>

<template>
  <label
    class="checkbox"
    @keydown.space.prevent="onSpaceDown"
  >
    <input
      ref="input"
      v-model="checkedModel"
      :value="value"
      type="checkbox"
      class="input"
      @change="change($event)"
    >
    <div
      :class="[
        'switch',
        checkedValue && 'switchChecked'
      ]"
    >
      <div class="tick"/>
    </div>
  </label>
</template>

<style lang="scss">
.checkbox {
  color: currentColor;
}

.input {
  position: absolute;
  visibility: hidden;
  opacity: 0;
}

.switch {
  position: relative;
  width: 32px;
  height: 16px;
  display: flex;
  align-items: center;
  border: 1px solid;
  border-radius: 15px;
  cursor: pointer;
}

.tick {
  position: absolute;
  top: 2px;
  right: auto;
  left: 2px;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: currentColor;
  transition: left .25s ease-in-out;
  }

.switchChecked .tick {
  left: 18px;
}
</style>
