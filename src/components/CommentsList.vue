<template>
  <div class="comments__container" v-for="comment in comments" :key="comment._id">
    <CommentItem :comment="comment" :is-mine="comment.user.username === 'juliusomo'"
      :is-editing="isEditting && activeComment?._id === comment._id" @on-click-reply="handleCLickReply"
      @on-click-edit="handleClickUpdate" @on-update-comment="handleUpdateComment" @on-click-delete="handleClickDelete" />
    <div v-if="comment.replies?.length" class="comments__replies">
      <CommentItem v-for="reply in comment.replies" :key="reply._id" :comment="reply"
        :is-mine="reply.user.username === 'juliusomo'" :is-editing="isEditting && activeComment?._id === reply._id"
        @on-click-reply="handleCLickReply" @on-click-edit="handleClickUpdate" @on-update-comment="handleUpdateComment"
        @on-click-delete="handleClickDelete" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommentStore } from '@/store/commentStore'
import useCommentsQuery from '@/composables/useCommentsQuery'

import CommentItem from './CommentItem.vue';

import type { Comment } from '@/interface/comment';
import { storeToRefs } from 'pinia';

const store = useCommentStore()

const { isEditting, activeComment } = storeToRefs(store)

const { comments, deleteComment, editComment } = useCommentsQuery()

const handleCLickReply = (comment: Comment) => {
  store.$patch({ activeComment: comment, isEditting: false })
}

const handleClickUpdate = (comment: Comment) => {
  store.$patch({ isEditting: !isEditting.value, activeComment: !isEditting.value ? comment : null })
}

const handleUpdateComment = (content: string) => {
  let updatedComment: Comment

  if (store.activeComment) {
    updatedComment = {
      ...store.activeComment,
      content
    }
    store.$patch({ isEditting: false, activeComment: null })

    editComment(updatedComment)
  }
}

const handleClickDelete = (comment: Comment) => {
  deleteComment(comment)
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