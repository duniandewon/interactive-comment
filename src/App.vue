<template>
  <CommentWithReplies v-for="comment in comments" :key="comment._id" :comment="comment" />
  <CommentBox @on-submit="handleSubmit" />
</template>

<script setup lang="ts">
import CommentBox from './components/CommentBoxComponent.vue';
import CommentWithReplies from './components/CommentWithRepliesComponent.vue'

import useComments from './hooks/useComments'

const { comments, postComments } = useComments()

const handleSubmit = (comment:string) =>{
  postComments(comment)
}
</script>