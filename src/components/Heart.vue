<script>
export default {
  name: 'Heart',
  props: {
    filled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <svg
    viewBox="0 0 16 14"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path
      :class="[
        $style.filled,
        filled && $style.filledVisible
      ]"
      d="M1.858 7.604l-.41.405 6.143 5.83a.599.599 0 00.818 0l6.143-5.83c1.93-1.832 1.93-4.808 0-6.64C12.759-.33 9.933-.448 8 1.021 6.067-.448 3.24-.332 1.448 1.37c-1.93 1.832-1.93 4.808 0 6.64l.41-.405z"
    />
    <path
      d="M7.59 13.838L1.449 8.01c-1.93-1.832-1.93-4.808 0-6.64C3.241-.33 6.067-.448 8 1.021c1.933-1.469 4.76-1.353 6.552.348 1.93 1.832 1.93 4.808 0 6.64l-6.143 5.83a.599.599 0 01-.818 0zM2.268 2.18c-1.462 1.387-1.462 3.631 0 5.018L8 12.638l5.733-5.44c1.462-1.387 1.462-3.63 0-5.018C12.264.787 9.878.787 8.41 2.18a.599.599 0 01-.82 0C6.123.787 3.737.787 2.268 2.18z"
    />
  </svg>
</template>

<style lang="scss" module>
.filled {
  opacity: 0;
  transform: scale(0.25);
  transform-origin: 50%;
  transition: opacity .15s, transform .35s;
}

.filledVisible {
  opacity: 1;
  transform: scale(1);
}
</style>
