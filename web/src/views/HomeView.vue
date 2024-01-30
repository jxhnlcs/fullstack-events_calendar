<template>
  <div class="app">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="column-content">
      <Navbar :isMyEventsView="false" @search-events="handleSearch" />
      <div class="content">
        <h1>Principais Eventos</h1>
        <div class="eventGrid">
          <div v-if="filteredEvents.length === 0">
            Nenhum evento encontrado.
          </div>
          <EventCard
            v-for="event in filteredEvents"
            :key="event.EventID"
            :event="event"
            :isMyEventsView="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/sidebar.vue'
import EventCard from '../components/eventcard.vue'
import Navbar from '../components/navbar.vue'
import axios from '@/utils/axios'

export default {
  components: {
    Sidebar,
    EventCard,
    Navbar,
  },

  beforeRouteEnter(to, from, next) {
    document.title = to.meta.title || 'EventSync'
    next()
  },

  data() {
    return {
      allEvents: [],
      filteredEvents: [],
    }
  },

  mounted() {
    this.fetchAllEvents()
  },

  methods: {
    async fetchAllEvents() {
      try {
        const response = await axios.get('/events')
        this.allEvents = response.data
        this.filteredEvents = response.data
      } catch (error) {
        console.error('Erro ao buscar todos os eventos:', error.message)
      }
    },

    handleSearch(query) {
      this.filteredEvents = this.allEvents.filter(event =>
        event.Description.toLowerCase().includes(query.toLowerCase())
      )
    },
  },
}
</script>

<style scoped>
.app {
  display: flex;
}

.column-content {
  width: 100%;
}

.content {
  margin: 20px;
}

.content h1 {
  color: #274CB3;
}

.eventGrid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;

  max-height: calc(100vh - 40px);
  overflow-y: auto;
}

@media (max-width: 768px) {
  .app {
    overflow: hidden;
  }

  .eventGrid {
    grid-template-columns: 1fr;
    max-height: 80vh;
  }
}
</style>
