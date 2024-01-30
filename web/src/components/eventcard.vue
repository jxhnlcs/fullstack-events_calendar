<template>
  <div class="event-card">
    <div class="event-card-header">
      <span class="event-span">EVENTO</span>

      <div class="delete-icon" v-if="isMyEventsView" @click.stop="confirmDelete">
        <i class="bx bx-trash"></i>
      </div>
    </div>
    <div class="event-card-details">
      <p class="event-description title">{{ event.Description }}</p>
      <div class="event-time">
        <strong><i class="bx bxs-time"></i></strong>
        {{ formattedTime(event.StartTime) }}
      </div>
      <div class="event-time">
        <strong><i class="bx bxs-time-five"></i></strong>
        {{ formattedTime(event.EndTime) }}
      </div>
    </div>
    <div class="event-card-footer" v-if="isHomeView">
      <i class="bx bxs-user"></i>
      <p class="event-creator">Criado por {{ event.Name }}</p>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/axios'
import Swal from 'sweetalert2';

export default {
  props: {
    event: {
      type: Object,
      required: true,
    },

    isHomeView: {
      type: Boolean,
      default: true,
    },

    isMyEventsView: {
      type: Boolean,
      default: true,
    },
  },
  methods: {

    formattedTime(time) {
      return new Date(time).toLocaleTimeString()
    },

    async confirmDelete() {
      const confirmResult = await Swal.fire({
        title: 'Tem certeza?',
        text: 'Você realmente deseja excluir este evento?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar',
      });

      if (confirmResult.isConfirmed) {
        this.deleteEvent();
      }
    },

    async deleteEvent() {
      try {
        await axios.delete(`/events/${this.event.EventID}`);

        this.$emit('event-deleted', this.event.EventID);

        Swal.fire({
          icon: 'success',
          title: 'Evento excluído com sucesso!',
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir o evento',
          text: 'Por favor, tente novamente.',
        });

        console.error('Erro ao excluir o evento:', error);
      }
    },
  },
}
</script>

<style scoped>
.event-card {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
  }
}

.event-card-header {
  display: flex;
  justify-content: space-between;

  margin-bottom: -10px;
}

.delete-icon {
  font-size: 20px;
  cursor: pointer;
  color: #ff0000;
  transition: 1s;
}

.delete-icon:hover {
  background: #b3272735;
  color: #e34343;
  text-align: center;

  font-style: normal;
  font-weight: 600;
  border-radius: 5px;

  border: none;
}

.event-span {
  flex-shrink: 0;
  border-radius: 5px;
  background: #274cb335;
  color: #274CB3;
  text-align: center;

  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  padding: 5px;
  border: none;
}

.event-description {
  display: flex;
  align-items: center;
  margin: 5px 0px;
  font-size: 1.2rem;
  color: #666;
  font-weight: bold;
}

.bxs-time,
.bxs-time-five {
  color: #666;
}

.event-card-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: #666;
  margin-top: 10px;
  font-weight: 600;
}

.event-card-footer {
  display: flex;
  align-items: center;
}

.event-creator {
  display: flex;
  align-items: center;
  margin: 5px 0px;
  font-size: 0.9rem;
  color: #666;
}

.bxs-user {
  color: #666;
  margin-right: 5px;
}

.event-time {
  margin-bottom: 5px;
  font-size: 0.9rem;
}
</style>
