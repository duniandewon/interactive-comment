<template>
  <textarea class="text-box" :value="value" placeholder="Add comment..." @input="emits('onChange', $event)"></textarea>
</template>

<script setup lang="ts">
defineProps<{ value: string }>()

const emits = defineEmits(["onChange"])
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