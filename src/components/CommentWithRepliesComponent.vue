<template>
  <div class="comments__container">
    <CommentCard :content="comment.content" :created-at="comment.createdAt"
      :is-mine="comment.user.username === 'juliusomo'" :replying-to="comment.replyingTo" :score="comment.score"
      :username="comment.user.username" />

    <div v-if="comment.replies?.length" class="comments__replies">
      <CommentCard v-for="reply in comment.replies" :key="reply._id" :content="reply.content"
        :created-at="reply.createdAt" :is-mine="reply.user.username === 'juliusomo'" :replying-to="reply.replyingTo"
        :score="reply.score" :username="reply.user.username" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Comment } from '@/interface/comment';
import CommentCard from './CommentCardComponent.vue';

defineProps<{ comment: Comment }>()
</script>

<style scoped>
.comments__container+.comments__container,
.comments__replies {
  margin-block-start: 1.25rem;
}

.comments__replies {
  padding-inline-start: 1rem;
  border-left: 2px solid var(--clr-primary-300);
}

@media only screen and (min-width: 540px) {
  .comments__replies {
    padding-inline-start: 2rem;
    margin-inline-start: 2rem;
  }
}
</style>