const inviteModel = require('../models/inviteModel');

const sendInvite = (req, res) => {
  const eventData = req.body;

  inviteModel.createInvite(eventData, (err, result) => {
    if (err) {
      console.error('Erro ao enviar convite:', err);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    return res.status(201).json({ message: 'Convite enviado com sucesso', conviteId: result.insertId });
  });
};


const updateInviteStatus = (req, res) => {
  const conviteId = req.params.conviteId;
  const novoStatus = req.body.status;

  inviteModel.updateInviteStatus(conviteId, novoStatus, (err, result) => {
    if (err) {
      console.error('Erro ao atualizar status do convite:', err);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    return res.status(200).json({ message: 'Status do convite atualizado com sucesso' });
  });
};

const getPendingInvitations = (req, res) => {
  const userId = req.params.userId;

  inviteModel.getPendingInvitationsByUserId(userId, (err, result) => {
    if (err) {
      console.error('Erro ao obter convites pendentes:', err);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    return res.status(200).json(result);
  });
};

const getConfirmedEventsByUserId = (req, res) => {
  const userId = req.params.userId;

  inviteModel.getConfirmedEventsByUserId(userId, (err, result) => {
    if (err) {
      console.error('Erro ao buscar eventos confirmados:', err);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    return res.status(200).json(result);
  });
};

module.exports = {
  sendInvite,
  updateInviteStatus,
  getPendingInvitations,
  getConfirmedEventsByUserId,
};