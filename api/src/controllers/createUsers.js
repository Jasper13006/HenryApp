const faker = require("faker");
const { User } = require('../db.js')
module.exports = {
    async generateUsers() {
        let users = [];
        for (let id = 1; id <= 1; id++) {
            const name = faker.name.firstName();
            const lastName = faker.name.lastName();
            const email = faker.internet.email();
            const city = faker.address.state();
            const country = faker.address.country();
            const password = 'admin';
            const image = faker.image.avatar();

            const user = await User.create({  //id: 2
                name: name,
                lastName: 'lastName',
                email: email,
                city: city,
                country: country,
                password: password,
                image: image,
            })
            console.log(user)
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
        // User.bulkCreate([users])
        //     .then(() => {
        return console.log('150 users');
        //     }
        //     ).catch(err => console.log(err))

    }
}
