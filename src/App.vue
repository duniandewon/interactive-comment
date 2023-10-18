<template>
  <main class="main">
    <CommentsList />
  </main>
  <footer class="footer">
    <CommentBox @on-submit="handleSubmit" />
  </footer>
</template>

<script setup lang="ts">
import useCommentsQuery from '@/composables/useCommentsQuery'

import CommentsList from './components/CommentsList.vue';
import CommentBox from './components/CommentBoxComponent.vue';

import type { ZComment } from './interface/comment';

const { comments, postComment } = useCommentsQuery()

const handleSubmit = (comment: string) => {
  const newComment: ZComment = {
    content: comment,
    score: 0,
    user: "65154ab60a64cbfdf46d8348"
  }

  postComment(newComment)
}
</script>

<style scoped>
.main {
  overflow-y: auto;
}

.main, .footer {
  padding-inline: 1.2rem;
}
</style>