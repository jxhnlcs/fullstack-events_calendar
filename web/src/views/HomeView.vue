<template>
  <div class="app">
    <div class="sidebar">
      <Sidebar />
    </div>
    
    <div class="content">
      <h1>Principais Eventos</h1>
      <EventCard />
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/sidebar.vue'
import EventCard from '../components/eventcard.vue'

export default {
  components: {
    Sidebar,
    EventCard,
  }
}
</script>

<style scoped>
.app {
  display: flex;
}

.content {
  margin: 20px;
}

/* Estilize conforme necessário */
</style>
