const orderServices = require('../services/order/orderServices');
const menuServices = require('../services/menu/menuServices');
const tableServices = require('../services/table/tableServices');

module.exports = {
    create(req, res) {
        const { item, comments, tableId } = req.body;

        menuServices
            .getItems()
            .then(items => {
                const menuItem = items.filter(items => items.id === item);
                const orderinfo = {
                    item,
                    comments,
                    price: menuItem[0].price,
                    status: "pending",
                    tableId
                }
                console.log(orderinfo);
                //search item in menu table and get item info
                return orderServices
                    .createOrder(orderinfo)
                    .then(order => {
                        const tableStatus = 'serving';
                        const total = null;
                        tableServices
                            .updateTable(
                                order.tableId ,
                                order.waiterId,
                                tableStatus,
                                total
                            )
                            .then(updatedTable => {
                                return res.status(200).json({
                                    msg: 'table\'s order deleted, and updated',
                                    table: updatedTable
                                })
                            })
                            .catch(e => {
                                return res.status(400).json({ error: e.message })
                            })
                    })
                    .catch(error => {
                        return res.status(400).json({ error: error.message });
                    })
            }).catch(e => console.log(e));
    },
    list(req, res) {
        return orderServices
            .listOrders()
            .then(order => {
                return res.status(200).json(order)
            })
            .catch(error => {
                return res.status(400).json({ error: error.message });
            })
    },
    listPerTableId(req, res) {
        const { tableId } = req.params;

        return orderServices
            .listOrdersWithTable(tableId)
            .then(orders => {
                return res.status(200).json(orders);
            })
            .catch(error => {
                return res.status(400).json({ error: error.message });
            })
    },
    destroy(req, res) {
        const { id } = req.body;

        return orderServices
            .deleteOrder(id)
            .then(() => {
                return res.status(200).json({
                    msg: 'order deleted'
                })
            })
            .catch(error => {
                return res.status(400).json({ error: error.message });
            })
    },
    deleteTableOrders(req, res) {
        const { id } = req.body
        console.log('id ', id);

        return orderServices
            .deleteOrdersTable(id)
            .then(() => {
                const waiterId = null;
                const status = 'dirty';
                const total = null;
                tableServices
                    .updateTable(
                        id,
                        waiterId,
                        status,
                        total
                    )
                    .then(updatedTable => {
                        return res.status(200).json({
                            msg: 'table\'s order deleted, and updated',
                            table: updatedTable
                        })
                    })
                    .catch(e => {
                        return res.status(400).json({ error: e.message })
                    })
            })
            .catch(e => {
                return res.status(400).json({ error: e.message })
            })
    },
    update(req, res) {
        const { id, comments, price, status, tableId } = req.body;
        console.log("status: " + status);
        const orderInfo = {
            id,
            comments,
            price,
            status,
            tableId
        }
        console.log('updated order', orderInfo);
        return orderServices
            .updateOrder(orderInfo)
            .then(() => {
                return res.status(200).json({ msg: 'order updated' })
            })
            .catch(error => {
                return res.status(400).json({ error: error.message });
            })
    }
};
