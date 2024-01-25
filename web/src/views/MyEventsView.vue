<template>
  <div class="app">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="column-content">
      <Navbar />
      <div class="content">
        <h1>Meus Eventos</h1>
        <div class="eventGrid">
          <EventCard
            v-for="event in myEvents"
            :key="event.EventID"
            :event="event"
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
import { jwtDecode } from 'jwt-decode'

export default {
  components: {
    Sidebar,
    EventCard,
    Navbar,
  },

  data() {
    return {
      myEvents: [],
      userId: null,
    }
  },

  mounted() {
    const token = localStorage.getItem('token')

    if (token) {
      const decodedToken = jwtDecode(token)
      this.userId = decodedToken.userid
    }

    this.fetchMyEvents()
  },

  methods: {
    async fetchMyEvents() {
      try {
        const response = await axios.get(`/events/${this.userId}`)
        this.myEvents = response.data
        console.log(this.myEvents)
      } catch (error) {
        console.error('Erro ao buscar todos os eventos:', error.message)
      }
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

.eventGrid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .eventGrid {
    grid-template-columns: 1fr;
  }
}
</style>
