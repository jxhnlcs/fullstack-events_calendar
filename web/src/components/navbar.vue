<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="search-container">
        <input type="text" id="search" v-model="searchQuery" @input="search" placeholder="Pesquisar" />
      </div>

      <button v-if="isMyEventsView" @click="openModal" class="add-button">
        +
      </button>
      <button @click="openInviteModal" class="add-button">
        <i class="bx bx-mail-send"></i>
      </button>
      <button @click="toggleNotifications" class="add-button">
        <i class="bx bx-bell"></i>
        <span class="badge" v-if="this.notifications && this.notifications.length > 0">{{ this.notifications.length
        }}</span>
      </button>

      <div v-if="showNotifications" class="notifications-dropdown">
        <div class="notifications-header">
          <h3>Minhas Notificações</h3>
        </div>
        <ul>
          <li v-for="notification in notifications" :key="notification.id" class="notification-item">
            <div class="notification-content">
              <p class="notification-message">
                O usuário
                <strong>{{ notification.InviterName }}</strong> convidou você
                para participar do evento
                <strong>{{ notification.EventDescription }}</strong>
              </p>
            </div>
            <div class="notification-actions">
              <button class="accept-button" @click="
                handleUpdateInviteStatus(notification.ConviteID, 'aceito')
                ">
                Aceitar
              </button>
              <button class="reject-button" @click="
                handleUpdateInviteStatus(notification.ConviteID, 'recusado')
                ">
                Recusar
              </button>
            </div>
          </li>
        </ul>
      </div>

      <invite-modal :showInviteModal="inviteModalVisible" @close-invite-modal="closeInviteModal" />

      <event-form-modal :showModal="modalVisible" @add-event="handleAddEvent" @close-modal="closeModal" />
    </div>
  </nav>
</template>

<script>
import EventFormModal from '../components/eventFormModal.vue'
import InviteModal from '../components/inviteModal.vue'
import axios from '@/utils/axios'
import Swal from 'sweetalert2'
import { jwtDecode } from 'jwt-decode'

export default {
  created() {
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode(token)
      this.userId = Number(decodedToken.userid)
      this.loadNotifications()
      console.log('Nenhum token encontrado no localStorage')
    }
  },

  components: {
    EventFormModal,
    InviteModal,
  },

  data() {
    return {
      searchQuery: '',
      modalVisible: false,
      inviteModalVisible: false,
      showNotifications: false,
      notifications: [],
    }
  },

  props: {
    isMyEventsView: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    formattedTime(time) {
      return new Date(time).toLocaleTimeString()
    },

    search() {
      this.$emit('search-events', this.searchQuery)
    },

    openModal() {
      this.modalVisible = true
    },

    closeModal() {
      this.modalVisible = false
    },

    openInviteModal() {
      this.inviteModalVisible = true
    },

    closeInviteModal() {
      this.inviteModalVisible = false
    },

    handleAddEvent(formData) {
      axios
        .post('/events', formData)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Evento Adicionado com Sucesso!',
            showConfirmButton: false,
            timer: 1500,
          })

          console.log('Evento adicionado com sucesso:', response.data)

          this.$emit('event-added')
        })
        .catch(error => {
          if (error.response && error.response.status === 409) {
            Swal.fire({
              icon: 'error',
              title: 'Erro ao Adicionar Evento',
              text: 'Já existe um evento com as mesmas propriedades.',
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Erro ao Adicionar Evento',
              text: 'Por favor, tente novamente.',
            })

            console.error('Erro ao adicionar evento:', error)
          }
        })
    },

    toggleNotifications() {
      this.showNotifications = !this.showNotifications

      if (this.showNotifications) {
        this.loadNotifications()
      }
    },

    loadNotifications() {
      axios
        .get(`/invitations/${this.userId}`)
        .then(response => {
          this.notifications = response.data
          console.log(this.notifications)
        })
        .catch(error => {
          console.error('Erro ao buscar notificações:', error)
        })
    },

    handleUpdateInviteStatus(conviteId, status) {
      console.log(status)
      axios
        .put(`/invite/${conviteId}`, { status })
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Convite aceito com sucesso!',
            showConfirmButton: false,
            timer: 1500,
          })
          this.toggleNotifications()
          this.loadNotifications()
        })
        .catch(error => {
          console.error('Erro ao atualizar status do convite:', error)
        })
    },
  },
}
</script>

<style scoped>
.navbar {
  background-color: #eeeeee;
  padding: 14px;
  width: 100%;
}

.navbar-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.search-container {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

label {
  color: white;
  margin-right: 5px;
}

input {
  padding: 10px;
  border-radius: 8px;
  outline: none;
  border: solid 1px #cfcfcf;
}

.search-button,
.add-button {
  background-color: #ffffff;
  color: rgb(99, 99, 99);
  font-size: 20px;
  border-radius: 8px;
  border: solid 1px #cfcfcf;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-weight: 600;
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 4px 8px;
  font-size: 12px;
}

.notifications-dropdown {
  position: absolute;
  top: 70px;
  right: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  width: 300px;
}

.notifications-header {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  background-color: #f7f7f7;
  border-radius: 8px 8px 0 0;
}

.notifications-header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.notification-item {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  list-style: none;
}

.notification-content {
  flex-grow: 1;
}

.notification-message {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.notification-actions {
  display: flex;
  justify-content: end;
}

.accept-button,
.reject-button {
  margin-left: 10px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.accept-button {
  background-color: #4caf50;
  color: #fff;
}

.reject-button {
  background-color: #f44336;
  color: #fff;
}

@media (max-width: 768px) {
  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
