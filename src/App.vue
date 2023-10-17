<template>
  <CommentWithReplies v-for="comment in comments" :key="comment._id" :comment="comment" />
  <CommentBox @on-submit="handleSubmit" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import CommentBox from './components/CommentBoxComponent.vue';
import CommentWithReplies from './components/CommentWithRepliesComponent.vue'

import { useCommentsStore } from './store/commentsStore'

import type { ZComment } from './interface/comment';

const store = useCommentsStore()

const { comments } = storeToRefs(store)

store.getComments()

const handleSubmit = (comment: string) => {
  const newComment: ZComment = {
    content: comment,
    score: 0,
    user: "65154ab60a64cbfdf46d8348"
  }
  store.postComments(newComment)
}
</script>./api/useComments