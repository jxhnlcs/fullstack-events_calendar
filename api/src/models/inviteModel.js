const { db } = require('../models/db');

const createInvite = (eventData, callback) => {
  const { EventoId, ConvidadorId, ConvidadoId} = eventData;

  const insertInviteQuery = `
    INSERT INTO Convites (EventoID, ConvidadorID, ConvidadoID)
    VALUES (?, ?, ?)
  `;

  db.query(insertInviteQuery, [EventoId, ConvidadorId, ConvidadoId], (err, result) => {
    if (err) {
      return callback(err, null);
    }

    return callback(null, result);
  });
};

const updateInviteStatus = (conviteId, novoStatus, callback) => {
  const updateInviteStatusQuery = `
    UPDATE Convites
    SET Status = ?
    WHERE ConviteID = ?
  `;

  db.query(updateInviteStatusQuery, [novoStatus, conviteId], (err, result) => {
    if (err) {
      return callback(err, null);
    }

    return callback(null, result);
  });
};

const getPendingInvitationsByUserId = (userId, callback) => {
  const getPendingInvitationsQuery = `
    SELECT Convites.*, Events.Description as EventDescription
    FROM Convites
    INNER JOIN Events ON Convites.EventoID = Events.EventID
    WHERE Convites.ConvidadoID = ? AND Convites.Status = 'pendente'
  `;

  db.query(getPendingInvitationsQuery, [userId], (err, result) => {
    if (err) {
      return callback(err, null);
    }

    return callback(null, result);
  });
};

module.exports = {
  createInvite,
  updateInviteStatus,
  getPendingInvitationsByUserId,
};