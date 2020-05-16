const db = require("../../config/db");

module.exports = {
    createMenuItem: (items) => new Promise((resolve, reject) => {
        const { item, description, price } = items;

        return db.insert({
            item,
            description,
            price
        }).returning('*').into('menus').then(data => {
            console.log(data[0]);
            return resolve(data[0])
        }).catch(e => reject(e))
    }),
    getItems: () => new Promise((resolve, reject) => {
        db.select('*')
            .from('menus')
            .then(items => resolve(items))
            .catch(e => reject(e));
    })
};
