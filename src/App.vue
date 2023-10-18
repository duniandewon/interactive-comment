<template>
  <main class="main">
    <CommentsList />
  </main>
  <footer class="footer">
    <CommentBox />
  </footer>
</template>

<script setup lang="ts">
import CommentsList from './components/CommentsList.vue';
import CommentBox from './components/CommentBoxComponent.vue';
</script>

<style scoped>
.main {
  overflow-y: auto;
}

.main,
.footer {
  padding-inline: 1.2rem;
}
</style>