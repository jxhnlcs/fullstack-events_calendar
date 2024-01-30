<template>
  <div class="app">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="column-content">
      <Navbar @search-events="handleSearch" @event-added="handleEventAdded" />
      <div class="content">
        <h1>Meus Eventos</h1>
        <div class="eventGrid">
          <div class="row-error" v-if="filteredEvents.length === 0">
            Nenhum evento encontrado.
          </div>
          <EventEditModal :showEditModal="showEditModal" :eventToEdit="selectedEvent" @edit-event="handleEditEvent"
          @close-edit-modal="closeEditModal"/>

          <EventCard v-for="event in filteredEvents" :key="event.EventID" :event="event" :isHomeView="false"
            @click="handleEventClick(event)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/sidebar.vue'
import EventCard from '../components/eventcard.vue'
import EventEditModal from '../components/eventEditModal.vue';
import Navbar from '../components/navbar.vue'
import axios from '@/utils/axios'
import { jwtDecode } from 'jwt-decode'

export default {
  components: {
    Sidebar,
    EventCard,
    Navbar,
    EventEditModal,
  },

  beforeRouteEnter(to, from, next) {
    document.title = to.meta.title || 'EventSync';
    next();
  },

  data() {
    return {
      myEvents: [],
      userId: null,
      filteredEvents: [],
      selectedEvent: null,
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
        this.filteredEvents = response.data
        console.log(this.myEvents)
      } catch (error) {
        console.error('Erro ao buscar todos os eventos:', error.message)
      }
    },

    handleSearch(query) {
      this.filteredEvents = this.myEvents.filter(event =>
        event.Description.toLowerCase().includes(query.toLowerCase())
      )
    },

    handleEventAdded() {
      this.fetchMyEvents();
    },

    handleEventClick(selectedEvent) {
      this.selectedEvent = selectedEvent;
      this.showEditModal = true;
    },

    closeEditModal() {
      this.showEditModal = false;
      this.$forceUpdate();
    },

    async handleEditEvent(editFormData) {
    try {
      const eventId = this.selectedEvent.EventID;
      const response = await axios.put(`/events/${eventId}`, editFormData);

      console.log('Evento atualizado com sucesso:', response.data);

      this.fetchMyEvents();
      this.closeEditModal();

    } catch (error) {
      console.error('Erro ao atualizar evento:', error.message);
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

.content h1 {
  color: #274CB3;
}

.eventGrid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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
