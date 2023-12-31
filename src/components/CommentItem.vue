<template>
  <div class="comment-card">
    <div class="comment-card__header">
      <Avatar :username="comment.user.username" />
      <div class="comment-card__user">
        <span>{{ comment.user.username }}</span>
        <span class="comment-card__you" v-if="isMine">you</span>
      </div>
      <div class="comment-card__time">
        2 days ago
      </div>
    </div>
    <p v-if="!isEditing" class="comment-card__content">
      <span class="conmment-card__mention" v-if="comment.mention">@{{ comment.mention }}</span> {{ comment.content }}
    </p>
    <div v-if="isEditing && isMine" class="comment-card__content">
      <textarea class="text-box" v-model="updatedComment" ref="textBoxRef"></textarea>
    </div>
    <div class="comment-card__vote">
      <VoteButton :score="comment.score" />
    </div>
    <div class="comment-card__action">
      <Button v-if="isEditing" class="small primary" @click="handleUpdateComment">Update</Button>
      <Button v-if="isEditing" class="small" @click="handleClickEdit">Cancel</Button>
      <IconButton v-if="isMine && !isEditing" class="danger" @click="handleClickDelete">
        <template v-slot:icon>
          <IconDelete />
        </template>
        <span>Delete</span>
      </IconButton>
      <IconButton v-if="isMine && !isEditing" @click="handleClickEdit">
        <template v-slot:icon>
          <IconEdit />
        </template>
        <span>Edit</span>
      </IconButton>
      <IconButton v-if="!isMine" @click="handleClickReply">
        <template v-slot:icon>
          <IconReply />
        </template>
        <span>Reply</span>
      </IconButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

import Avatar from './AvatarComponent.vue';
import Button from './ButtonComponent.vue';

import IconButton from './IconButtonComponent.vue';
import VoteButton from './VoteComponent.vue';
import IconDelete from './icons/IconDelete.vue';
import IconEdit from './icons/IconEdit.vue';
import IconReply from './icons/IconReply.vue';

import type { Comment } from '@/interface/comment';

const props = defineProps<{ comment: Comment, isMine: boolean, isEditing: boolean }>()

const updatedComment = ref(props.comment.content)

const textBoxRef = ref<HTMLTextAreaElement | null>(null)

const emits = defineEmits(['onClickDelete', "onClickReply", "onClickEdit", "onUpdateComment"])

const handleClickDelete = () => {
  emits("onClickDelete", props.comment)
}

const handleClickReply = () => {
  emits("onClickReply", props.comment)
}

const handleClickEdit = () => {
  emits("onClickEdit", props.comment)
}

const handleUpdateComment = () => {
  emits("onUpdateComment", updatedComment.value)
}

watchEffect(() => {
  if (props.isEditing) textBoxRef.value?.focus()
})
</script>

<style scoped>
.comment-card {
  background-color: var(--clr-primary-100);
  border-radius: 0.5rem;
  padding: 1rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.comment-card+.comment-card {
  margin-block-start: 1rem;
}

.comment-card__header,
.comment-card__user,
.comment-card__action {
  display: flex;
  align-items: center;
}

.comment-card__header,
.comment-card__content {
  grid-column: span 2;
}

.comment-card__header {
  gap: 1rem;
}

.comment-card__user {
  gap: 0.5rem;
  color: var(--clr-primary-900);
  font-weight: 500;
}

.comment-card__you {
  background-color: var(--clr-accent-900);
  color: var(--clr-primary-100);

  padding-inline: 6px;
  border-radius: 2px;
}

.conmment-card__mention {
  color: var(--clr-accent-900);
  font-weight: 500;
}

.comment-card__action {
  justify-self: end;
  gap: 0.5rem;
}

@media only screen and (min-width: 540px) {
  .comment-card {
    grid-template-columns: 45px 1fr 1fr;
  }

  .comment-card__header {
    grid-column: 2;
  }

  .comment-card__vote {
    grid-column: 1;
    grid-row: 1 / span 2;
  }

  .comment-card__action {
    grid-column: 3;
    grid-row: 1;
  }
}
</style>