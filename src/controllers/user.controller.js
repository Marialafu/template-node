const fs = require('fs');
const path = require('path');
const { v4 } = require('uuid');
const usersFilePath = path.resolve(__dirname, '../../data/users.json');

const usersController = {}

usersController.readUsers = (req, res) => {
  fs.readFile(usersFilePath, (error, data) => {
    if (error) return res.status(500).send('Error al leer el archivo');

    const jsonData = JSON.parse(data);
    res.send(jsonData);
  });
}

usersController.postNewUser = (req, res) => {
    const {name, email} = req.body;

    fs.readFile(usersFilePath, (error, data) => {
        if (error) return res.status(500).send('Error al leer el archivo')
        
        const usersList = JSON.parse(data)
        const newUser = {userId: v4(), name: name, email: email}
        const newUsersList = JSON.stringify([...usersList, newUser])

        const repeatedEmail = usersList.some(user => {
            return user.email === newUser.email
        })

        if (repeatedEmail) return res.status(409).send('Correo ya registrado')

        fs.writeFile(usersFilePath, newUsersList, error => {
            if (error) return res.status(500).send('Error al escribir el archivo')
        })
    })
}

usersController.updateUser = (req, res) => {
    const {email, name} = req.body

    fs.readFile(usersFilePath, (error, data) => {
        if (error) return res.status(500).send('Error al leer el archivo')
        
            const usersList = JSON.parse(data)
            const updatedUser = usersList.find(user => {
                const foundedUser = user.name === name && user
                foundedUser.email = email
                return foundedUser
            })
        
            fs.writeFile(usersFilePath, JSON.stringify(updatedUser), error => {
                if (error) return res.status(500).send('Error al actualizar el archivo')
            })

            console.log(updatedUser);
            
            
            
    })

    res.send()
}

usersController.deleteUser = (req, res) => {
    const {email, name} = req.body

    fs.readFile(usersFilePath, (error, data) => {
        if (error) return res.status(500).send('Error al leer el archivo')
        
            const usersList = JSON.parse(data)
            const identifyUser = usersList.find(user => {
                return user.name === name && user 
            })
            const newUsersList = usersList.filter(user => {
                return user !== identifyUser
            })

        fs.writeFile(usersFilePath, JSON.stringify(newUsersList), error => {
            if (error) return res.status(500).send('Error al escribir el archivo')
        })
    })

    res.send()

}

module.exports = usersController