<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="search-container">
        <input type="text" id="search" v-model="searchQuery" placeholder="Pesquisar" />
      </div>

      <button @click="addItem" class="add-button">+</button>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    search() {
      // Lógica de pesquisa aqui
      console.log("Pesquisando:", this.searchQuery);
    },
    addItem() {
      // Lógica para adicionar item aqui
      console.log("Adicionando item");
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #F3F3F3;
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

.search-button, .add-button {
  background-color: #ffffff;
  color: rgb(99, 99, 99);
  font-size: 20px;
  border-radius: 8px;
  border: solid 1px #cfcfcf;
  padding: 6px 12px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .navbar-container {
  display: flex;
  justify-content:space-between;
  align-items: center;
}
}

</style>
