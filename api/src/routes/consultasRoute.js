const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');
const eventController = require('../controllers/eventController');
const inviteController = require('../controllers/inviteController');
const userController = require('../controllers/userController')

// Rotas de Login e Cadastro
router.post('/login', loginController.fazerLogin);
router.post('/cadastrar', loginController.cadastrarUsuario);

//Rota de Usuários
router.get('/users', userController.getAllUsers);

// Rotas de Eventos
router.get('/events', eventController.getAllEvents);
router.get('/events/:userId', eventController.getEventsByUserId);
router.post('/events', eventController.createEvent);
router.put('/events/:eventId', eventController.updateEvent);
router.delete('/events/:eventId', eventController.deleteEvent);

// Rotas de Convites
router.post('/invite', inviteController.sendInvite);
router.put('/invite/:conviteId', inviteController.updateInviteStatus);
router.get('/invitations/:userId', inviteController.getPendingInvitations);
router.get('/confirmed-events/:userId', inviteController.getConfirmedEventsByUserId);

module.exports = router;