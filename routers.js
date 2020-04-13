const tableController = require("./controllers").table;
const orderController = require("./controllers").order;
const userController = require("./controllers").users;
const payroll = require('./controllers').payroll;

const path = require("path");

module.exports = router => {
  router.get(
    "/api/",
    wrap(async (req, res) => {
      res.status(200).json("API ROUTE");
    })
  );

  // route handling for table
  router.route("/api/t")
    .post(tableController.create)
    .get(tableController.list)
    .delete(tableController.destroy);

  // route handling for order
  router.route("/api/o")
    .post(orderController.create)
    .get(orderController.list);

  router.route("/api/o/:orderId")
    .get(orderController.listPerId)
    .delete(orderController.destroy)
    .put(orderController.update);

  router.get("/api/o/t/:tableId", orderController.listPerTableId);

  // route handling for user
  router.route("/api/u")
    .post(userController.create)
    .get(userController.list).delete(userController.destroy)
    .put(userController.update);
  router.post("/api/u/perRole", userController.perRole);
  router.post("/api/u/login", userController.login);

  // route handling for payroll
  router.post("/api/p", userController.create);

  router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/dist", "index.html"));
  });
};
