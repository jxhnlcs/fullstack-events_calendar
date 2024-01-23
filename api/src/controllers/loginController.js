// Login

const { db } = require('../models/db');
const jwt = require('jsonwebtoken');

const secretKey = 'sua_chave_secreta';

const fazerLogin = (req, res) => {
  const { username, password } = req.body;

  const userQuery = `
    SELECT * 
    FROM Users
    WHERE Username = ? AND Password = SHA2(?, 256)
  `;

  db.query(userQuery, [username, password], (err, userData) => {
    if (err) {
      console.error('Erro ao fazer login na tabela Users:', err);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    if (Array.isArray(userData) && userData.length === 1) {
      const { username, password } = userData[0];

      const userInfo = {
        UserId: username,
        Username: password,
      };

      const token = jwt.sign(userInfo, secretKey, { expiresIn: '5h' });

      return res.status(200).json({ authenticated: true, token });
    } else {
      return res.status(401).json({ authenticated: false, message: 'Credenciais inválidas' });
    }
  });
};

const cadastrarUsuario = (req, res) => {
  const { name, username, password, email } = req.body;

  const insertUserQuery = `
    INSERT INTO Users (Name, Username, Password, Email)
    VALUES (?, ?, SHA2(?, 256), ?)
  `;

  db.query(insertUserQuery, [name, username, password, email], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar usuário na tabela Users:', err);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  });
};

module.exports = {
  fazerLogin,
  cadastrarUsuario,
};