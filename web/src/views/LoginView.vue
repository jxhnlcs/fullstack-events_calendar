<template>
  <div class="background">
    <div class="container" id="container">
      <div class="form-container sign-up" v-if="activeForm === 'signUp'">
        <form @submit.prevent="register">
          <h1>Criar Conta</h1>
          <span>Entre com seus dados para se cadastrar</span>
          <input type="text" placeholder="Usuário" v-model="username" />
          <input type="text" placeholder="Nome" v-model="name" />
          <input type="email" placeholder="E-mail" v-model="email" />
          <input type="password" placeholder="Senha" v-model="password" />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div class="form-container sign-in" v-if="activeForm === 'signIn'">
        <form @submit.prevent="login">
          <h1>Login</h1>
          <span>Entre com seus dados pessoais para logar</span>
          <input type="text" placeholder="Nome de usuário" v-model="username" />
          <input type="password" placeholder="Senha" v-model="password" />
          <button type="submit">Logar</button>
        </form>
      </div>
      <div class="toggle-container">
        <div class="toggle">
          <div
            class="toggle-panel toggle-left"
            @click="setActiveForm('signIn')"
            :class="{ active: activeForm === 'signIn' }"
          >
            <h1>Bem-vindo de volta!</h1>
            <p>Entre com seus dados pessoais para usar o site</p>
            <button class="hidden" id="login">Entrar</button>
          </div>
          <div
            class="toggle-panel toggle-right"
            @click="setActiveForm('signUp')"
            :class="{ active: activeForm === 'signUp' }"
          >
            <h1>Olá, Amigo!</h1>
            <p>Cadastre-se com seus dados pessoais para usar o site</p>
            <button class="hidden" id="register">Cadastro</button>
          </div>
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
      activeForm: 'signIn',
      username: '',
      email: '',
      password: '',
    };
  },

  mounted() {
    const container = document.getElementById('container')
    const registerBtn = document.getElementById('register')
    const loginBtn = document.getElementById('login')

    registerBtn.addEventListener('click', () => {
      container.classList.add('active')
    })

    loginBtn.addEventListener('click', () => {
      container.classList.remove('active')
    })
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

    async register() {
      try {
        const response = await axios.post('/cadastrar', {
          Name: this.name,
          Username: this.username,  
          Password: this.password,
          Email: this.email
        });

        console.log(response.data);

        
        await Swal.fire({
            icon: 'success',
            title: 'Cadastro efetuado',
            text: 'Seu cadastro foi efetuado com sucesso.',
          });
        
        this.setActiveForm('signIn');
      } catch (error) {
        console.log(response);
        await Swal.fire({
          icon: 'error',
          title: 'Erro ao se cadastrar',
          text: 'Ocorreu um erro ao processar o cadastro. Por favor, tente novamente mais tarde.',
        });
        
        console.error('Erro no cadastro:', error);
      }
    },

    setActiveForm(form) {
      this.activeForm = form
    },
  },
};
</script>

<style scoped>
.background {
  background-color: #c9d6ff;
  background: linear-gradient(to right, #e2e2e2, #c9d6ff);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}

.container {
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;
  width: 800px;
  max-width: 100%;
  min-height: 550px;
}

.container p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  margin: 20px 0;
}

.container span {
  font-size: 12px;
}

.container a {
  color: #333;
  font-size: 13px;
  text-decoration: none;
  margin: 15px 0 10px;
}

.container button {
  background-color: #274CB3;
  color: #fff;
  font-size: 12px;
  padding: 10px 45px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 10px;
  cursor: pointer;
}

.container button.hidden {
  background-color: transparent;
  border-color: #fff;
}

.container form {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  height: 100%;
}

.container input {
  background-color: #eee;
  border: none;
  margin: 8px 0;
  padding: 10px 15px;
  font-size: 13px;
  border-radius: 8px;
  width: 100%;
  outline: none;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.active .sign-in {
  transform: translateX(100%);
}

.sign-up {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  transition: all 0.5s;
}

.container.active .sign-up {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: move 0.6s;
}

@keyframes move {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.social-icons a {
  border: 1px solid #ccc;
  border-radius: 20%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 3px;
  width: 40px;
  height: 40px;
  transition: all 0.5s;
}

.social-icons a:hover {
  scale: 1.3;
  border: 1px solid #000;
}

.toggle-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  border-radius: 150px 0 0 100px;
  z-index: 1000;
}

.container.active .toggle-container {
  transform: translateX(-100%);
  border-radius: 0 150px 100px 0;
}

.toggle {
  background-color: #274CB3;
  height: 100%;
  background: linear-gradient(to right, #4e78ee, #274CB3);
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}

.container.active .toggle {
  transform: translateX(50%);
}

.toggle-panel {
  position: absolute;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}

.toggle-left {
  transform: translateX(-200%);
}

.container.active .toggle-left {
  transform: translateX(0);
}

.toggle-right {
  right: 0;
  transform: translateX(0);
}

.container.active .toggle-right {
  transform: translateX(200%);
}
</style>
