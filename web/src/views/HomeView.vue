<template>
  <div class="app">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="content">
      <h1>Oi</h1>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/sidebar.vue'

export default {
  components: {
    Sidebar,
  }
}
</script>

<style scoped>
.app{
  display: flex;
}
</style>