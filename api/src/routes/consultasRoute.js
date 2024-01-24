const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');
const eventController = require('../controllers/eventController');

// Login
router.post('/login', loginController.fazerLogin);
router.post('/cadastrar', loginController.cadastrarUsuario)

// Rotas de Eventos
router.get('/events', eventController.getAllEvents);
router.get('/events/:userId', eventController.getEventsByUserId);
router.post('/events', eventController.createEvent);
router.put('/events/:eventId', eventController.updateEvent);
router.delete('/events/:eventId', eventController.deleteEvent)

module.exports = router;