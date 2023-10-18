<template>
  <div class="comments__container" v-for="comment in comments" :key="comment._id">
    <CommentItem :comment="comment" :is-mine="comment.user.username === 'juliusomo'" @on-reply="handleCLickReply" />
    <div v-if="comment.replies?.length" class="comments__replies">
      <CommentItem v-for="reply in comment.replies" :key="reply._id" :comment="reply"
        :is-mine="reply.user.username === 'juliusomo'" @on-reply="handleCLickReply" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommentStore } from '@/store/commentStore'
import useCommentsQuery from '@/composables/useCommentsQuery'

import CommentItem from './CommentItem.vue';

import type { Comment } from '@/interface/comment';

const store = useCommentStore()

const { setActiveComment } = store

const { comments } = useCommentsQuery()

const handleCLickReply = (comment: Comment) => {
  setActiveComment(comment)
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