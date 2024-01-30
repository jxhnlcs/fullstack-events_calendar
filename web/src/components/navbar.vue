<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="search-container">
        <input type="text" id="search" v-model="searchQuery" @input="search" placeholder="Pesquisar" />
      </div>

      <button v-if="isMyEventsView" @click="openModal" class="add-button">+</button>
      <event-form-modal :showModal="modalVisible" @add-event="handleAddEvent" @close-modal="closeModal" />
    </div>
  </nav>
</template>

<script>
import EventFormModal from "../components/eventFormModal.vue";
import axios from '@/utils/axios'
import Swal from 'sweetalert2';

export default {

  components: {
    EventFormModal,
  },

  data() {
    return {
      searchQuery: "",
      modalVisible: false,
    };
  },

  props: {
    isMyEventsView: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    search() {
      this.$emit("search-events", this.searchQuery);
    },

    openModal() {
      this.modalVisible = true;
    },

    handleAddEvent(formData) {
      axios.post('/events', formData)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Evento Adicionado com Sucesso!',
            showConfirmButton: false,
            timer: 1500,
          });

          console.log('Evento adicionado com sucesso:', response.data);

          this.$emit("event-added");
        })
        .catch(error => {
          if (error.response && error.response.status === 409) {
            Swal.fire({
              icon: 'error',
              title: 'Erro ao Adicionar Evento',
              text: 'Já existe um evento com as mesmas propriedades.',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Erro ao Adicionar Evento',
              text: 'Por favor, tente novamente.',
            });

            console.error('Erro ao adicionar evento:', error);
          }
        });
    },


    closeModal() {
      this.modalVisible = false;
    },
  },
};
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
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 600;
}

@media (max-width: 768px) {
  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
