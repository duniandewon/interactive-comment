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
    <p class="comment-card__content">
      <span class="conmment-card__mention" v-if="comment.mention">@{{ comment.mention }}</span> {{ comment.content }}
    </p>
    <div class="comment-card__vote">
      <VoteButton :score="comment.score" />
    </div>
    <div class="comment-card__action">
      <IconButton class="danger" v-if="isMine" @click="handleClickDelete">
        <template v-slot:icon>
          <IconDelete />
        </template>
        <span>Delete</span>
      </IconButton>
      <IconButton v-if="isMine">
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
  <CommentBox v-if="isReplying" :value="`@${comment.user.username} `" @on-submit="handleSubmit" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { Comment } from '@/interface/comment';

import Avatar from './AvatarComponent.vue';
import CommentBox from './CommentBoxComponent.vue';

import IconButton from './IconButtonComponent.vue';
import VoteButton from './VoteComponent.vue';
import IconDelete from './icons/IconDelete.vue';
import IconEdit from './icons/IconEdit.vue';
import IconReply from './icons/IconReply.vue';

const props = defineProps<{ comment: Comment, isMine: boolean, parentId?: string }>()

const isReplying = ref(false)

const emits = defineEmits(['onDelete', "onReply"])

const handleClickDelete = () => {
  emits("onDelete", props.comment._id)
}

const handleClickReply = () => {
  isReplying.value = !isReplying.value
}

const handleSubmit = (content: string) => {
  emits('onReply', content, props.parentId)
}
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

.comment-card + .comment-card {
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