<template>
  <div class="app">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="column-content">
      <Navbar />
      <div class="content">
        <h1>Meus Eventos</h1>
        <EventCard />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/sidebar.vue'
import EventCard from '../components/eventcard.vue'
import Navbar from '../components/navbar.vue'

export default {
  components: {
    Sidebar,
    EventCard,
    Navbar,
  }
}
</script>

<style scoped>
.app {
  display: flex;
}

.column-content{
  width: 100%;
}

.content {
  margin: 20px;
}

/* Estilize conforme necessário */
</style>
