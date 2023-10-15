<template>
  <form @submit.prevent="handleSubmit">
    <div class="comment-box">
      <div class="comment-box__avatar">
        <Avatar username="juliusomo" />
      </div>
      <div class="comment-box__input">
        <TextBox :value="comment" @onChange="handleChange" />
      </div>
      <div class="comment-box__action">
        <Button class="primary" type="submit">Send</Button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Avatar from './AvatarComponent.vue';
import Button from './ButtonComponent.vue';
import TextBox from './TextboxComponent.vue'

const props = defineProps<{ value?: string }>()

const comment = ref(props.value ||"")

const emits = defineEmits(['onSubmit'])

const handleChange = (e: Event) => {
  const { value } = e.target as HTMLInputElement

  comment.value = value
}

const handleSubmit = () => {
  emits('onSubmit', comment.value)
  comment.value = ""
}
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