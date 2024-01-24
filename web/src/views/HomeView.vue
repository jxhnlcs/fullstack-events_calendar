<template>
  <div class="app">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="column-content">
      <Navbar />
      <div class="content">
        <h1>Principais Eventos</h1>
        <!-- Passe a lista de eventos para o EventCard -->
        <EventCard v-for="event in allEvents" :key="event.EventID" :event="event" />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/sidebar.vue';
import EventCard from '../components/eventcard.vue';
import Navbar from '../components/navbar.vue';
import axios from '@/utils/axios'; // Certifique-se de importar o axios corretamente

export default {
  components: {
    Sidebar,
    EventCard,
    Navbar,
  },
  data() {
    return {
      allEvents: [],
    };
  },
  mounted() {
    // Ao montar o componente, busque todos os eventos
    this.fetchAllEvents();
  },
  methods: {
    async fetchAllEvents() {
      try {
        // Faça uma solicitação à sua API para obter todos os eventos
        const response = await axios.get('/events');
        this.allEvents = response.data; // Atualize a lista de eventos
        console.log(this.allEvents)
      } catch (error) {
        console.error('Erro ao buscar todos os eventos:', error.message);
      }
    },
  },
};
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
