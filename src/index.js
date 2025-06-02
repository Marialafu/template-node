const express = require('express');
const path = require('path');
const fs = require('fs');
const port = 3000;

const app = express();

const usersFilePath = path.resolve(__dirname, '../data/users.json');

app.listen(port, () => {
  console.log('Server running on port ' + port);
});

app.get('/read', (req, res) => {
  fs.readFile(usersFilePath, (error, data) => {
    if (error) return res.status(500).send('Error al leer el archivo');

    const jsonData = JSON.parse(data);
    res.send(jsonData);
  });
});

app.get('/write', (req, res) => {
  const newUser = JSON.stringify({
    userId: '1',
    name: 'Susana Horia',
    email: 'susanahoria@yahoo.com'
  });

  fs.readFile(usersFilePath, (error, data) => {
    if (error) return res.status(500).send('Error al leer el archivo');
    const jsonData = JSON.parse(data);
    const jsonNewUser = JSON.parse(newUser)

    const jsonNewData = [...jsonData, jsonNewUser];

    fs.writeFile(usersFilePath, JSON.stringify(jsonNewData), error => {
      if (error) return res.status(500).send('Error al leer el archivo');

      res.end();
    });
  });
});
