<template>
  <div class="avatar">
    <img :src="`image-${username}.png`" :alt="username">
  </div>
</template>

<script setup lang="ts">
defineProps<{ username: string }>()
</script>

<style scoped>
.avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>