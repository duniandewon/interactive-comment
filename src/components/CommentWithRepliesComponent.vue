<template>
  <div class="comments__container">
    <CommentCard :comment="comment" :is-mine="comment.user.username === 'juliusomo'" @on-delete="handleOnDelete"
      @on-reply="handleReply" />
    <div v-if="comment.replies?.length" class="comments__replies">
      <CommentCard v-for="reply in comment.replies" :key="reply._id" :comment="reply"
        :is-mine="reply.user.username === 'juliusomo'" :parent-id="comment._id" @on-delete="handleOnDelete" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Comment, ZComment } from '@/interface/comment';
import CommentCard from './CommentCardComponent.vue';

import useComments from '@/hooks/useComments'

const props = defineProps<{ comment: Comment }>()

const { deleteComment, postComments } = useComments()

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
</style>