const express = require('express');
const usersController = require('../controllers/user.controller');
const usersRoutes = express.Router();

usersRoutes.get('/read', usersController.readUsers);
usersRoutes.post('/write', usersController.postNewUser);
usersRoutes.patch('/update/:id', usersController.updateUser);
usersRoutes.delete('/delete/:id', usersController.deleteUser);

module.exports = usersRoutes;
