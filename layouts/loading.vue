<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="spinner"></div>
    <slot />
  </div>
</template>

<style>
.spinner {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 6px solid;
  border-color: #dbdcef;
  border-right-color: theme('colors.red.100');
  animation: spinner-d3wgkg 1s infinite linear;
}

@keyframes spinner-d3wgkg {
  to {
    transform: rotate(1turn);
  }
}
</style>
