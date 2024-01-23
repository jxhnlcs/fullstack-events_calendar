const express = require('express');
const router = express.Router();

const { fazerLogin, cadastrarUsuario } = require('../controllers/loginController');

// Login
router.post('/login', fazerLogin);
router.post('/cadastrar', cadastrarUsuario)

module.exports = router;