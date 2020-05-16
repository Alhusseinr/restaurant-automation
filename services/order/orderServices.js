const db = require("../../config/db");

module.exports = {
    createOrder: (orderinfo) => new Promise((resolve, reject) => {
        const { item, comments, price, status, tableId } = orderinfo;
        db.insert({
            item,
            comments,
            price,
            status,
            tableId
        }).returning('*').into('orders').then(data => {
            console.log(data[0])
            return resolve(data[0])
        }).catch(e => {
            console.log(e),
            reject(e)
        })
    }),
    listOrders: () => new Promise((resolve, reject) => {
        db.table('orders')
            //no tables in db yet, do we need that?
            // .innerJoin('tables', 'tableId', '=', 'tables.id')
            .then(data => {
                console.log(data);
                return resolve(data);
            })
            .catch(e => {
                return reject(e);
            })
    }),
    listOrdersWithTable: (tableId) => new Promise((resolve, reject) => {
        // db.table('orders')
        //     .innerJoin('tables', tableId, '=', 'tables.id')
        db.select("*").from("orders").where("tableId", "=", tableId)
            .then(data => {
                if (data.length == 0) {
                    return reject(new Error(`no orders for table ${tableId}`));
                }
                return resolve(data);
            })
            .catch(e => {
                return reject(e);
            })
    }),
    deleteOrder: (id) => new Promise((resolve, reject) => {
        db.select('*')
            .from('orders')
            .where('id', '=', id)
            .then((data) => {
                if (data[0] !== undefined || data[0] !== null) {
                    return db.select('id')
                        .from('orders')
                        .where('id', '=', id)
                        .del()
                        .then(order => resolve({ order, msg: 'order deleted' }))
                        .catch(e => reject(e));
                }
                return reject({ msg: 'something went wrong' });
            })
    }),
    updateOrder: (orderInfo) => new Promise((resolve, reject) => {
        const { id, comments, price, status, tableId } = orderInfo;

        console.log('updated order in services: ', orderInfo);

        db.select('*')
            .from('orders')
            .where('id', '=', id)
            .update(orderInfo)
            .then((data) => {
                return resolve(data);
            })
            .catch(e => {
                console.log(e)
                reject(e);
            })
    }),
    deleteOrdersTable: (tableId) => new Promise((resolve, reject) => {
        db.select('*')
            .from('orders')
            .where('tableId', '=', tableId)
            .then((data) => {
                if(data[0] !== undefined || data[0] !== null) {
                    return db.select('*')
                        .from('orders')
                        .where('tableId', '=', tableId)
                        .del()
                        .then(order => resolve({ order, msg: 'tables\'s order deleted' }))
                        .catch(e => reject(e));
                }
            })
    })
};
