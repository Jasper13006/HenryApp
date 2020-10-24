const faker = require("faker");
const { User, Student } = require('../db.js')
module.exports = {
    async generateUsers(numberId) {
        let users = [];
        for (let id = 1; id <= 150; id++) {
            const name = faker.name.firstName();
            const lastName = faker.name.lastName();
            const email = faker.internet.email();
            const city = faker.address.state();
            const country = faker.address.country();
            const password = 'admin';
            const image = faker.image.avatar();
            const idUser = numberId + id

            const user = await User.create({  //id: 2
                id: idUser,
                name: name,
                lastName: lastName,
                email: email,
                city: city,
                country: country,
                password: password,
                image: image,
                // admin: true,
            })

            const newStudent = await Student.create({ userId: idUser, cohorteId: '3' })

            console.log('usuario: ', user)
            console.log('NuevoEstudiante: ', newStudent)
            users.push({
                name: name,
                lastName: lastName,
                email: email,
                city: city,
                country: country,
                password: password,
                image: image,
            });
        }
        return console.log('150 users');
    }
}
