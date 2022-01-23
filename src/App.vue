<script setup>
import Registration from './components/Registration.vue'
</script>

<template>
  <Registration />
</template>

<style lang="scss">
@import './styles/global.scss';

#app {
  @include flex;
  align-items: center;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
