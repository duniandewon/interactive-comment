<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  background-color: var(--clr-primary-700);
  color: var(--clr-primary-100);
  font-weight: 500;

  padding: 0.75rem 1.75rem;
  border-radius: 0.5rem;
}

.button.small {
  padding: 0.75rem 0.938rem;
}

.button:hover {
  background-color: var(--clr-primary-300);
}

.button.primary {
  background-color: var(--clr-accent-900);
}

.button.button.primary:hover {
  background-color: var(--clr-accent-700);
}

.button.secondary {
  background-color: var(--clr-secondary-900);
}

.button.secondary:hover {
  background-color: var(--clr-secondary-700);
}
</style>