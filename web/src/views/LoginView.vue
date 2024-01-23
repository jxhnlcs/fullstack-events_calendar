<template>
  <div>
    <div class="background">
      <div class="container">
        <div class="header">
          <h1 style="font-size: 32px; margin-bottom: 10px;">EventSync</h1>
        </div>
        <div class="sub-header">
          <h2 style="font-size: 22px;">ENTRAR</h2>
          <h4 style="font-size: 14px; color: #6C6C6C; font-weight: 400;">
            Entre com suas credenciais para acessar sua conta
          </h4>
        </div>
        <div class="content">
          <form @submit.prevent="login">
            <label for="username">Usuário</label>
            <input v-model="username" type="text" name="username" id="username" placeholder="Digite seu nome de usuário">
            <label for="password">Senha</label>
            <input v-model="password" type="password" name="password" id="password" placeholder="Digite sua senha">
            <button class="submit">Entrar</button>
          </form>
        </div>
        <div class="footer">
          <a href="#">Não tem uma conta? <span>Registre-se</span></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/axios';
import Swal from 'sweetalert2';

export default {
  beforeRouteEnter(to, from, next) {
    document.title = to.meta.title || 'EventSync';
    next();
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/login', {
          Username: this.username,
          Password: this.password,
        });

        console.log(response.data);

        if (response.data.authenticated) {
          localStorage.setItem('token', response.data.token);

          await Swal.fire({
            icon: 'success',
            title: 'Login feito com sucesso',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          // Redirecionar para a página inicial após o timer
          this.$router.push('/home');
        } else {
          // Exibir notificação em caso de erro de login
          await Swal.fire({
            icon: 'error',
            title: 'Erro ao efetuar o login',
            text: 'Credenciais inválidas. Por favor, tente novamente.',
          });
        }

      } catch (error) {
        // Exibir notificação em caso de erro genérico
        await Swal.fire({
          icon: 'error',
          title: 'Erro ao efetuar o login',
          text: 'Ocorreu um erro ao processar o login. Por favor, tente novamente mais tarde.',
        });

        console.error('Erro ao efetuar o login:', error.message);
      }
    },
  },
};
</script>


<style scoped>
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
}

.background {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #39568C, #224abe);
}

.container {
  width: 475px;
  height: 550px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header {
  padding: 10px;
  text-align: center;
  margin-bottom: 20px;
}

.sub-header {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -20px;
}

h1 {
  font-size: 32px;
  margin-bottom: 10px;
}

h2 {
  font-size: 22px;
}

h4 {
  font-size: 14px;
  color: #6C6C6C;
  font-weight: 400;
  margin-top: 10px;
}

.content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  width: 100%;
}

label {
  text-align: left;
  width: 100%;
  margin-bottom: 5px;
  font-weight: bold;
  color: #6C6C6C;
}

input {
  width: calc(100% - 20px);
  margin-top: 10px;
  margin-bottom: 10px;
  height: 40px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  outline: none;
}

form button {
  background-color: #4e73df;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  font-size: 14px;
  margin-top: 10px;
  width: calc(100% - 20px);
  padding: 10px;
  border: none;
}

.footer {
  padding: 20px;
  text-align: center;
}

a {
  text-decoration: none;
  color: #000;
}

span {
  color: #4e73df;
  font-weight: bold;
}
</style>
