<template>
  <div class="container">
    <button @click="handleScore('inc')">
      <IconPlus />
    </button>
    <span>{{ score }}</span>
    <button @click="handleScore('dec')">
      <IconMinus />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import IconMinus from './icons/IconMinus.vue';
import IconPlus from './icons/IconPlus.vue';

const props = defineProps<{ score: number }>()

const score = ref(props.score)

const handleScore = (action: "inc" | "dec") => {
  if (action === "inc") score.value += 1

  if (action === "dec" && score.value > 0) score.value--
}
</script>

<style scoped>
.container {
  width: min(100%, 100px);

  padding: 0.8rem 0.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--clr-primary-200);
  color: var(--clr-accent-900);

  border-radius: 10px;
}

@media only screen and (min-width: 540px) {
  .container {
    flex-direction: column;
  }
}
</style>