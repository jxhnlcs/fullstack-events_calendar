<template>
  <div class="event-card">
    <p>{{ event.Description }}</p>
    <p>Hora de Início: {{ event.StartTime }}</p>
    <p>Hora de Término: {{ event.EndTime }}</p>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.event-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
  width: 30%;
}

.event-card img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
}

</style>
