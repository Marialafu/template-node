const fs = require('fs');
const path = require('path');
const { v4 } = require('uuid');
const usersFilePath = path.resolve(__dirname, '../../data/users.json');

const usersController = {};

usersController.readUsers = (req, res) => {
  fs.readFile(usersFilePath, (error, data) => {
    if (error) return res.status(500).send('Error al leer el archivo');

    const jsonData = JSON.parse(data);
    res.send(jsonData);
  });
};

usersController.postNewUser = (req, res) => {
  const { name, email } = req.body;

  fs.readFile(usersFilePath, (error, data) => {
    if (error) return res.status(500).send('Error al leer el archivo');

    const usersList = JSON.parse(data);
    const newUser = { userId: v4(), name: name, email: email };
    const newUsersList = JSON.stringify([...usersList, newUser]);

    const repeatedEmail = usersList.some(user => {
      return user.email === newUser.email;
    });

    if (repeatedEmail) return res.status(409).send('Correo ya registrado');

    fs.writeFile(usersFilePath, newUsersList, error => {
      if (error) return res.status(500).send('Error al escribir el archivo');
    });
  });
};

usersController.updateUser = (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  fs.readFile(usersFilePath, (error, data) => {
    if (error) return res.status(500).send('Error al leer el archivo');

    if (email) {
      const repeatedEmail = usersList.some(
        user => user.userId !== id && user.email === email
      );
    }
    if (repeatedEmail)
      return res.status(500).send('Error al escribir el archivo');

    const usersList = JSON.parse(data);
    const updatedUser = usersList.map(user => {
      if (user.userId === id) {
        user = { ...req.body };
        return user;
      }
      return user;
    });

    fs.writeFile(usersFilePath, JSON.stringify(updatedUser), error => {
      if (error) return res.status(500).send('Error al actualizar el archivo');
    });
  });

  res.send();
};

usersController.deleteUser = (req, res) => {
  const { id } = req.params;

  fs.readFile(usersFilePath, (error, data) => {
    if (error) return res.status(500).send('Error al leer el archivo');

    const usersList = JSON.parse(data);
    const identifyUser = usersList.find(user => {
      return user.userId === id && user;
    });
    const newUsersList = usersList.filter(user => {
      return user !== identifyUser;
    });

    fs.writeFile(usersFilePath, JSON.stringify(newUsersList), error => {
      if (error) return res.status(500).send('Error al escribir el archivo');
    });
  });

  res.send();
};

module.exports = usersController;
