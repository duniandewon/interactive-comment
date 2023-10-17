<template>
  <div class="comments__container">
    <CommentCard :comment="comment" :is-mine="comment.user.username === 'juliusomo'" @on-delete="handleOnDelete"
      @on-reply="handleReply" @on-update="handleOnUpdate" />
    <div v-if="comment.replies?.length" class="comments__replies">
      <CommentCard v-for="reply in comment.replies" :key="reply._id" :comment="reply"
        :is-mine="reply.user.username === 'juliusomo'" :parent-id="comment._id" @on-delete="handleOnDelete"
        @on-reply="handleReply" @on-update="handleOnUpdate" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CommentCard from './CommentCardComponent.vue';

import type { Comment, ZComment } from '@/interface/comment';

import { useCommentsStore } from '@/store/commentsStore';

const props = defineProps<{ comment: Comment }>()

const store = useCommentsStore()

const { postComments, updateComment, deleteComment } = store

const handleOnUpdate = (id: string, content: string) => {
  const index = content.indexOf(" ")
  const mention = content.slice(1, index)
  content = content.slice(index + 1)

  const comment: ZComment = {
    content,
    mention,
    score: props.comment.score,
    user: "65154ab60a64cbfdf46d8348",
  }

  updateComment(id, comment)
}

const handleOnDelete = (id: string) => {
  deleteComment(id)
}

const handleReply = (content: string, parentId: string) => {
  const index = content.indexOf(" ")
  const mention = content.slice(1, index)
  content = content.slice(index + 1)

  const reply: ZComment = {
    content,
    parentId: parentId || props.comment._id,
    mention,
    score: 0,
    user: "65154ab60a64cbfdf46d8348",
  }

  postComments(reply)
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
</style>@/api/useComments