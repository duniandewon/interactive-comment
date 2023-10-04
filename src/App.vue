
<template>
  <CommentWithReplies v-for="comment in comments" :key="comment._id" :comment="comment" />
</template>

<script setup lang="ts">
  import CommentWithReplies from './components/CommentWithRepliesComponent.vue'

import useComments from './hooks/useComments'

const { comments } = useComments()
</script>