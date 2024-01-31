<template>
  <div class="modal-overlay" v-if="showInviteModal">
    <Navbar class="navNone" @event-added="refreshEvents" />
    <div class="modal">
      <div class="modal-header">
        <i class="bx bx-mail-send event-icon"></i>
        <button class="close-button" @click="closeModal">&#10006;</button>
      </div>
      <h2 class="modal-title">Convidar Usuários</h2>
      <h3 class="modal-subtitle">
        Selecione o evento e o usuário que deseja convidar.
      </h3>

      <form @submit.prevent="handleInvite">
        <label for="eventoSelect">Selecione o Evento*</label>
        <select required v-model="selectedEvento" id="eventoSelect">
          <option v-if="eventos.length === 0" disabled>Nenhum evento encontrado</option>
          <option v-for="evento in eventos" :key="evento.EventID" :value="evento.EventID">
            {{ evento.Description }}
          </option>
        </select>

        <label for="usuarioSelect">Selecione o Usuário*</label>
        <select required v-model="selectedUsuario" id="usuarioSelect">
          <option v-if="usuarios.length === 0" disabled>Nenhum usuário encontrado</option>
          <option v-for="usuario in usuarios" :key="usuario.UserID" :value="usuario.UserID">
            {{ usuario.Name }}
          </option>
        </select>

        <button type="submit">Enviar Convite</button>
      </form>
    </div>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode'
import axios from '@/utils/axios'
import Swal from 'sweetalert2'

export default {
  
  created() {
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode(token)
      this.userId = Number(decodedToken.userid)
      this.fetchEventos()
      this.fetchUsers()
      console.log('Nenhum token encontrado no localStorage')
    }
  },

  data() {
    return {
      userId: null,
      eventos: [],
      usuarios: [],
      selectedEvento: null,
      selectedUsuario: null,
    }
  },

  props: {
    showInviteModal: Boolean,
  },

  methods: {

    fetchEventos() {
      axios
        .get(`/events/${this.userId}`)
        .then(response => {
          this.eventos = response.data
          console.log(this.eventos)
        })
        .catch(error => {
          console.error('Erro ao buscar eventos:', error)
        })
    },

    fetchUsers() {
      axios
        .get('/users')
        .then(response => {
          this.usuarios = response.data
          console.log(this.usuarios)
        })
        .catch(error => {
          console.error('Erro ao buscar eventos:', error)
        })
    },

    handleInvite() {
      const conviteData = {
        ConvidadorId: this.userId,
        ConvidadoId: this.selectedUsuario,
        EventoId: this.selectedEvento,
      }

      axios
        .post(`/invite`, conviteData)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Convite enviado com sucesso!',
            showConfirmButton: false,
            timer: 1500,
          })
          this.closeModal()
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao convidar usuário',
            text: 'Por favor, tente novamente.',
          })
          console.error('Erro ao convidar usuário:', error)
        })
    },

    closeModal() {
      this.$emit('close-invite-modal')
    },
  },
}
</script>

<style scoped>
.navNone {
  display: none;
}

.modal {
  width: 400px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.modal-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.event-icon {
  padding: 12px;
  border-radius: 10px;
  font-size: 20px;

  color: #344054;
  border: 3px solid #eaecf0;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}

.modal-title {
  color: #101828;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
}

.modal-subtitle {
  color: #475467;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  display: grid;
  gap: 10px;
}

label {
  color: #344054;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
}

select {
  display: flex;
  padding: 10px 14px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid #d0d5dd;
  background: #fff;
  outline: none;

  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}

button {
  margin-top: 20px;
  background-color: #274cb3;
  color: white;
  border: none;
  padding: 10px 28px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

button+button {
  margin-left: 10px;
  background-color: #ccc;
  color: #333;
}

button+button:hover {
  background-color: #bbb;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #555;
}
</style>
