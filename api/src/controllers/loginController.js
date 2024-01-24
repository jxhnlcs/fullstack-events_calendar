const jwt = require('jsonwebtoken');
const loginModel = require('../models/loginModel');

const secretKey = 'sua_chave_secreta';

const fazerLogin = (req, res) => {
  const { Username, Password } = req.body;

  loginModel.getUserByUsernameAndPassword(Username, Password, (err, userData) => {
    if (err) {
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    if (Array.isArray(userData) && userData.length === 1) {
      const { UserID, Username, Name } = userData[0];

      const userInfo = {
        userid: UserID,
        user: Username,
        name: Name,
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

  loginModel.insertUser(name, username, password, email, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  });
};

module.exports = {
  fazerLogin,
  cadastrarUsuario,
};