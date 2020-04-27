const bcrypt = require('bcryptjs');
const db = require("../../config/db");

module.exports = {
    createUser: (userinfo) => new Promise((resolve, reject) => {
        const { username, password, role, email, phoneNumber } = userinfo;
        const hash = bcrypt.hashSync(password, 10);

        return db.insert({
            username,
            password: hash,
            email,
            role,
            phoneNumber
        }).returning('*').into('users').then(data => {
            console.log(data[0]);
            return resolve(data[0])
        }).catch(e => reject(e))
    }),
    getUser: (userInfo) => new Promise((resolve, reject) => {
        const { username, email } = userInfo;
        if (username && !email) {
            console.log('only username');
            return db.select('*')
                .from('users')
                .where('username', '=', username)
                .then(user => user ? resolve(user[0]) : reject({ error: "no user found" }))
                .catch(e => reject(e));
        } else if (email && !username) {
            console.log('only email');
            return db.select('*')
                .from('users')
                .where('email', '=', email)
                .then(user => user ? resolve(user[0]) : reject({ error: "no user found" }))
                .catch(e => reject(e))
        } else if (email && username) {
            console.log('both fields');
            return db.select('*')
                .from('users')
                .where('username', '=', username)
                .andWhere('email', '=', email)
                .then(user => user ? resolve(user[0]) : reject({ error: "no user found" }))
                .catch(e => reject(e))
        }
    }),
    getAllUsers: () => new Promise((resolve, reject) => {
        db.select('*')
            .from('users')
            .then(users => resolve(users))
            .catch(e => reject(e))
    }),
    updateUser: (userinfo) => new Promise((resolve, reject) => {
        console.log("service info", userinfo);
        const { id, username, password, email, role, phoneNumber } = userinfo;
        if (password) {
            const hash = bcrypt.hashSync(password, 10);
        }
        const payload = {};
        if (username) payload.username = username;
        if (password) payload.password = password;
        if (email) payload.email = email;
        if (role) payload.role = role;
        if (phoneNumber) payload.phoneNumber = phoneNumber;
        console.log("payload", payload);


        db.select('*')
            .from('users')
            .where('username', '=', username)
            .update(payload)
            .then(result => resolve(result))
            .catch(e => reject({ msg: 'from services', e }))


    }),
    getUserPerRole: (role) => new Promise((resolve, reject) => {
        db.select('username', 'email', 'phoneNumber')
            .from('users')
            .where('role', '=', role)
            .then(users => { return resolve(users) })
            .catch(e => reject(e))
    }),
    deleteUser: (id, username) => new Promise((resolve, reject) => {
        db.select('id', 'username')
            .from('users')
            .where('id', '=', id).andWhere('username', '=', username)
            .then(data => {
                console.log(data[0] === undefined);
                if (data[0] !== undefined) {
                    return db.select('id', 'username')
                        .from('users')
                        .where('id', '=', id).andWhere('username', '=', username)
                        .del()
                        .then(user => resolve({ user, msg: 'user deleted' }))
                        .catch(e => reject(e))
                }
                return reject({ msg: 'user does not exist' })
            })
            .catch(e => reject(e))
    })
};
