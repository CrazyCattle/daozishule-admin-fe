<template>
  <div class="test"> {{ a }} </div>
</template>

<script lang="ts" setup>
  import { Ref, ref } from 'vue'

  const a: Ref<string> = ref('test')
</script>

<style lang="scss" scoped></style>
