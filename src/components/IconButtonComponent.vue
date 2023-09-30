<template>
  <button class="icon-button">
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>

<style scoped>
.icon-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  color: var(--clr-accent-900);
  text-transform: capitalize;
  font-weight: 500;
}

.icon-button:hover {
  opacity: 0.6;
}

.icon-button.danger {
  color: var(--clr-secondary-900);
}
</style>