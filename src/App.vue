<template>
  <CommentWithReplies v-for="comment in comments" :key="comment._id" :comment="comment" />
  <CommentBox @on-submit="handleSubmit" />
</template>

<script setup lang="ts">
import CommentBox from './components/CommentBoxComponent.vue';
import CommentWithReplies from './components/CommentWithRepliesComponent.vue'

import useComments from './hooks/useComments'

const { comments, postComments } = useComments()

import type { ZComment } from './interface/comment';

const handleSubmit = (comment: string) => {
  const newComment: ZComment = {
    content: comment,
    score: 0,
    user: "65154ab60a64cbfdf46d8348"
  }

  postComments(newComment)
}
</script>