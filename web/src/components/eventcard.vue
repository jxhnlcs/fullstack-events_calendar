<template>
  <div class="event-card">
    <div class="event-card-header">
      <p class="event-description">{{ event.Description }}</p>
    </div>
    <div class="event-card-details">
      <div class="event-time">
        <strong>Hora de Início:</strong> {{ formattedTime(event.StartTime) }}
      </div>
      <div class="event-time">
        <strong>Hora de Término:</strong> {{ formattedTime(event.EndTime) }}
      </div>
    </div>
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
  methods: {
    formattedTime(time) {
      return new Date(time).toLocaleTimeString();
    },
  },
};
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

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
}

.event-card-header {
  margin-bottom: 10px;
}

.event-card h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.event-description {
  margin: 5px 0;
  font-size: 0.9rem;
  color: #666;
}

.event-card-details {
  display: flex;
  flex-direction: column;
}

.event-time {
  margin-bottom: 5px;
  font-size: 0.9rem;
}

</style>
