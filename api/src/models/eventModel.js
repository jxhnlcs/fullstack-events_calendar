const { db } = require('../models/db');

const createEvent = (eventData, callback) => {
  const { UserID, Description, StartTime, EndTime } = eventData;

  const insertEventQuery = `
    INSERT INTO Events (UserID, Description, StartTime, EndTime)
    VALUES (?, ?, ?, ?)
  `;

  db.query(insertEventQuery, [UserID, Description, StartTime, EndTime], (err, result) => {
    if (err) {
      return callback(err, null);
    }

    return callback(null, result);
  });
};

const updateEvent = (eventId, eventData, callback) => {
  const { UserID, Description, StartTime, EndTime } = eventData;

  const updateEventQuery = `
    UPDATE Events
    SET UserId = ?, Description = ?, StartTime = ?, EndTime = ?
    WHERE EventID = ?
  `;

  db.query(updateEventQuery, [UserID, Description, StartTime, EndTime, eventId], (err, result) => {
    if (err) {
      return callback(err, null);
    }

    return callback(null, result);
  });
};

const deleteEvent = (eventId, callback) => {
  const deleteEventQuery = `
    DELETE FROM Events
    WHERE EventID = ?
  `;

  db.query(deleteEventQuery, [eventId], (err, result) => {
    if (err) {
      return callback(err, null);
    }

    return callback(null, result);
  });
};

const getAllEvents = (callback) => {
  const getAllEventsQuery = `
    SELECT * FROM Events
  `;

  db.query(getAllEventsQuery, (err, result) => {
    if (err) {
      return callback(err, null);
    }

    return callback(null, result);
  });
};

const getEventsByUserId = (userId, callback) => {
  const getEventsByUserIdQuery = `
    SELECT * FROM Events
    WHERE UserID = ?
  `;

  db.query(getEventsByUserIdQuery, [userId], (err, result) => {
    if (err) {
      return callback(err, null);
    }

    return callback(null, result);
  });
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEventsByUserId,
};