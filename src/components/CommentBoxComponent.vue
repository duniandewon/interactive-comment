<template>
  <form @submit.prevent="handleSubmit">
    <div class="comment-box">
      <div class="comment-box__avatar">
        <Avatar username="juliusomo" />
      </div>
      <div class="comment-box__input">
        <textarea class="text-box" v-model="commentContent" ref="textBoxRef" placeholder="Add a comment..."></textarea>
      </div>
      <div class="comment-box__action">
        <Button class="primary" type="submit">Send</Button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watchEffect, } from 'vue';
import { storeToRefs } from 'pinia';

import Avatar from './AvatarComponent.vue';
import Button from './ButtonComponent.vue';

import { useCommentStore } from '@/store/commentStore';
import useCommentsQuery from '@/composables/useCommentsQuery';

import type { ZComment } from '@/interface/comment';

const commentContent = ref("")

const store = useCommentStore()

const textBoxRef = ref<HTMLTextAreaElement | null>(null)

const { activeComment, isEditting } = storeToRefs(store)

const { postComment } = useCommentsQuery()

const handleSubmit = () => {
  const content = activeComment.value ? commentContent.value.slice(activeComment.value.user.username.length + 2) : commentContent.value
  const mention = activeComment.value?.user.username
  const parentId = activeComment.value?.parentId || activeComment.value?._id

  const newComment: ZComment = {
    content, parentId, mention,
    score: 0,
    user: "65154ab60a64cbfdf46d8348"
  }

  postComment(newComment)

  commentContent.value = ""
  store.$patch({ activeComment: null })
}

watchEffect(() => {
  if (activeComment.value && !isEditting.value) {
    commentContent.value = `@${activeComment.value.user.username} `
    textBoxRef.value?.focus()
  } else {
    commentContent.value = ""
  }
})
</script>

<style>
.comment-box {
  background-color: var(--clr-primary-100);
  padding: 1rem;
  border-radius: 8px;
  margin-block-start: 1rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 1rem;
}

.comment-box__input {
  grid-column: 1 / 3;
  grid-row: 1;
}

.comment-box__action {
  display: flex;
  gap: 1rem;
  justify-self: end;
}

@media only screen and (min-width: 540px) {
  .comment-box {
    grid-template-columns: auto 1fr auto;
    align-items: start;
  }

  .comment-box__input {
    grid-column: 2;
    align-self: stretch;
  }

  .comment-box__action {
    flex-direction: column;
  }
}
</style>