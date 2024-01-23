<template>
  <div class="event-card">
    <img :src="event.imageUrl" alt="Event Image">
    <h2>{{ event.name }}</h2>
    <p>{{ event.participants }} participantes</p>
    <p>{{ event.description }}</p>
    <p>Hora de Início: {{ event.startTime }}</p>
    <p>Hora de Término: {{ event.endTime }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      event: {
        name: "Exemplo de Evento",
        imageUrl: "URL_DA_IMAGEM",
        participants: 50,
        description: "Descrição do evento...",
        startTime: "14:00",
        endTime: "17:00",
      },
    };
  },
};
</script>

<style scoped>
.event-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
}

.event-card img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
}

</style>
