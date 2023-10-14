<template>
  <div class="comments__container">
    <CommentCard :comment="comment" :is-mine="comment.user.username === 'juliusomo'" @on-delete="handleOnDelete" />
    <div v-if="comment.replies?.length" class="comments__replies">
      <CommentCard v-for="reply in comment.replies" :key="reply._id" :comment="reply"
        :is-mine="reply.user.username === 'juliusomo'" @on-delete="handleOnDelete" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Comment } from '@/interface/comment';
import CommentCard from './CommentCardComponent.vue';

import useComments from '@/hooks/useComments'

defineProps<{ comment: Comment }>()

const { deleteComment } = useComments()

const handleOnDelete = (id: string) => {
  deleteComment(id)
}
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