<template>
  <div class="modal-overlay" v-if="showModal">
    <div class="modal">
      <div class="modal-header">
        <i class='bx bxs-calendar-event event-icon'></i>
        <button class="close-button" @click="closeModal">&#10006;</button>
      </div>
      <h2 class="modal-title">Adicionar Evento</h2>
      <h3 class="modal-subtitle">Insira todos os campos para adicionar um evento.</h3>
      <form @submit.prevent="handleSubmit">

        <label for="title">Título*</label>
        <input type="text" id="title" v-model="formData.Description" required />

        <label for="startTime">Hora de Início*</label>
        <input type="datetime-local" id="startTime" v-model="formData.StartTime" required />

        <label for="endTime">Hora de Término*</label>
        <input type="datetime-local" id="endTime" v-model="formData.EndTime" required />

        <button type="submit">Adicionar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode';
export default {

  created() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      this.userId = Number(decodedToken.userid);
      this.formData.UserID = this.userId;
    } else {
      console.log('Nenhum token encontrado no localStorage');
    }
  },

  data() {
    return {
      userId: null,
      formData: {
        UserID: null,
        Description: "",
        StartTime: "",
        EndTime: "",
      },
    };
  },
  props: {
    showModal: Boolean,
  },
  methods: {
    
    handleSubmit() {
      this.$emit("add-event", this.formData);
      this.formData = {
        UserID: this.userId,
        Description: "",
        StartTime: "",
        EndTime: "",
      };
      this.closeModal();
    },

    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style scoped>
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
  border: 3px solid #EAECF0;
  background: #FFF;
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

input {
  display: flex;
  padding: 10px 14px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid #D0D5DD;
  background: #FFF;
  outline: none;

  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}

button {
  margin-top: 20px;
  background-color: #274CB3;
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