const tableServices = require('../services/table/tableServices');
const menuServices = require('../services/menu/menuServices');

module.exports = {
    create(req, res) {
        const { waiterId, orderId, status, total } = req.body;

        return tableServices
            .createTable(waiterId, orderId, status, total)
            .then(table => {
                return res.status(200).json(table)
            })
            .catch(e => res.status(400).json(e))
    },
    list(req, res) {
        return tableServices
            .getTables()
            .then(tables => {
                return res.status(200).json(tables)
            })
            .catch(e => res.status(400).json(e))
    },
    table(req, res) {
        const { id } = req.params;
        return tableServices
            .getTableById(id)
            .then(table => {
                menuServices
                    .getItems()
                    .then(menu => {
                        let total = 0;
                        table.map((order) => {
                            const items = menu.filter(item => item.id === order.item);
                            total += +(items[0].price) ;
                            total = Math.round(total * 100)/100;
                        });
                        return res.status(200).json({
                            tableOrders: table,
                            tableTotal: total,
                        })

                    }).catch(e => console.log(e))
            })
            .catch(e => {
                return res.status(400).json(e)
            })
    },
    update(req, res) {
        const { id, waiterId, orderId, status, total } = req.body;

        return tableServices
            .updateTable(id, waiterId, orderId, status, total)
            .then(table => {
                return res.status(200).json({ table, msg: 'table updated' });
            })
            .catch(e => {
                return res.status(400).json(e);
            })
    },
    destroy(req, res) {
        const { id } = req.body;

        return tableServices
            .deleteTable(id)
            .then(table => {
                return res.status(200).json({ table, msg: 'table deleted' })
            })
            .catch(e => {
                return res.status(400).json(e);
            })
    },
};
