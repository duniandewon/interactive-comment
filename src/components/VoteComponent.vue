<template>
  <div class="container">
    <button>
      <IconPlus />
    </button>
    <span>12</span>
    <button>
      <IconMinus />
    </button>
  </div>
</template>

<script setup lang="ts">
import IconMinus from './icons/IconMinus.vue';
import IconPlus from './icons/IconPlus.vue';
</script>

<style scoped>
.container {
  width: min(100%, 100px);
  height: 100%;

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