const db = require("../../config/db");

module.exports = {
    createTable: (waiterId, orderId, status, total) => new Promise((resolve, reject) => {
        db.insert({
            waiterId,
            orderId,
            status,
            total
        }).returning('*').into('tables').then(data => {
            return resolve(data[0])
        }).catch(e => reject(e))
    }),
    getTables: () => new Promise((resolve, reject) => {
        db.select('*')
            .from('tables')
            .then(tables => resolve(tables))
            .catch(e => reject(e))
    }),
    getTableById: (tableId) => new Promise((resolve, reject) => {
        db.select('*')
            .from('tables')
            .where('tables.id', '=', tableId)
            .innerJoin('orders', 'tables.id', 'orders.tableId')
            .then(data => {
                return resolve(data);
            })
            .catch(e => reject(e))
    }),
    updateTable: (id, waiterId, status, total) => new Promise((resolve, reject) => {
        console.log('services: ', id, 'status: ', status);
        db.select('*')
            .from('tables')
            .where('id', '=', id)
            .update({
                waiterId,
                status,
                total
            })
            .then(result => resolve(result))
            .catch(e => reject(e))
    }),
    deleteTable: (id) => new Promise((resolve, reject) => {
        db.select('*')
            .from('tables')
            .where('id', '=', id)
            .then(data => {
                if (data[0] !== undefined || data[0] !== null) {
                    return db.select('id')
                        .from('tables')
                        .where('id', '=', id)
                        .del()
                        .then(table => resolve({ table, msg: 'table deleted' }))
                        .catch(e => reject(e))
                }
                return reject({ msg: 'something went wrong' });
            })
            .catch(e => reject(e))
    })
};
