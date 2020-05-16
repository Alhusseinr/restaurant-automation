const tableController = require("./controllers").table;
const orderController = require("./controllers").order;
const userController = require("./controllers").users;
const menuController = require("./controllers").menu;
const {protected, authorize} = require('./auth');
const payrollController = require('./controllers').payroll;
const wrap = require("./middleware/asyncWrapper");

const path = require("path");

module.exports = router => {
    router.get(
        "/api/",
        wrap(async (req, res) => {
            res.status(200).json("API ROUTE");
        })
    );

    // route handling for table
    router.route('/api/t/')
        .post(protected, tableController.create)
        .get(protected, tableController.list)
        .put(protected, tableController.update)
        .delete(protected, tableController.destroy);
    router.get("/api/t/Table/:id", tableController.table);

    // route handling for order
    router.route('/api/o/')
        .post(protected, orderController.create)
        .get(protected, orderController.list)
        .put(protected, orderController.update)
        .delete(protected, orderController.destroy);
    router.get("/api/o/:tableId", protected, orderController.listPerTableId);
    router.delete("/api/o/deleteAll", protected, orderController.deleteTableOrders)

    // route handling for user
    router.route('/api/u/')
        .post(protected, authorize('admin'), userController.create)
        .get(protected, authorize('admin'), userController.getCurrent)
        .put(protected, authorize('admin'), userController.updateUser)
        .delete(protected, authorize('admin'), userController.destroy);
    router.post("/api/u/login", userController.login);
    router.get("/api/u/all", protected, authorize('admin'), userController.list);

    // route handling for menu
    router.route('/api/m/')
        .post(protected, authorize("admin"), menuController.create)
        .get(protected, menuController.list);

    // route handling for payroll
    router.route("/api/p/")
        .get(protected, authorize("admin"), payrollController.listAll)
        .post(protected, payrollController.clockIn)
        .put(protected, payrollController.clockOut)
        .delete(protected, authorize('admin'), payrollController.destroy)
    router.get("/api/p/:userId", protected, authorize("admin"), payrollController.list);

    router.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "/client/dist", "index.html"));
    });
};
