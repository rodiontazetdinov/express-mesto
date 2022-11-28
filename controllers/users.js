const User = require('../models/User');

const getUser = (req, res) => {
  // res.send(req.params.userId);
  const id = req.params.userId;
  if (id === req.user._id) {
    User.findById({ _id: id })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(404).send({ message: 'Пользователь не найден' }));
  } else {
    throw new Error('Пользователь не авторизован');
  }
};

const getUsers = (req, res) => {
  User.find({})
  .then(users => res.send({ data: users }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then(user => res.send({ data: user }))
  .catch(err => res.status(400).send({ message: 'Переданы некорректные данные' }));
};

const updateUser = (req, res) => {
  // res.send('getUsers');
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name: name, about: about })
      .then(user => res.send({ data: user }))
      .catch(err => res.status(400).send({ message: 'Переданы некорректные данные' }));

};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar: avatar })
      .then(user => res.send({ data: user }))
      .catch(err => res.status(400).send({ message: 'Переданы некорректные данные' }));
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateAvatar
};