const eventModel = require('../models/eventModel');

const createEvent = (req, res) => {
  const eventData = req.body;

  eventModel.createEvent(eventData, (err, result) => {
    if (err) {
      console.error('Erro ao criar evento:', err);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    return res.status(201).json({ message: 'Evento criado com sucesso', eventId: result.insertId });
  });
};

const updateEvent = (req, res) => {
  const eventId = req.params.eventId;
  const eventData = req.body;

  eventModel.updateEvent(eventId, eventData, (err, result) => {
    if (err) {
      console.error('Erro ao atualizar evento:', err);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    return res.status(200).json({ message: 'Evento atualizado com sucesso' });
  });
};

const deleteEvent = (req, res) => {
  const eventId = req.params.eventId;

  eventModel.deleteEvent(eventId, (err, result) => {
    if (err) {
      console.error('Erro ao excluir evento:', err);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    return res.status(200).json({ message: 'Evento excluído com sucesso' });
  });
};

const getAllEvents = (req, res) => {
  eventModel.getAllEvents((err, result) => {
    if (err) {
      console.error('Erro ao obter todos os eventos:', err);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    return res.status(200).json(result);
  });
};

const getEventsByUserId = (req, res) => {
  const userId = req.params.userId;

  eventModel.getEventsByUserId(userId, (err, result) => {
    if (err) {
      console.error('Erro ao obter eventos por UserID:', err);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    return res.status(200).json(result);
  });
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEventsByUserId,
};