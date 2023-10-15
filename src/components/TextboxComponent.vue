<template>
  <textarea class="text-box" ref="textboxRef"></textarea>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const textboxRef = ref<HTMLTextAreaElement>()

onMounted(() => {
  textboxRef.value?.focus()
})
</script>

<style scoped>
.text-box {
  resize: none;
  width: 100%;
  height: 100%;
  padding: 0.75rem 1.375rem;
  border: 1px solid var(--clr-primary-300);
  border-radius: 8px;
}
</style>