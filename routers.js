const tableController = require("./controllers").table;
const orderController = require("./controllers").order;
const userController = require("./controllers").users;
//const payrollController = require('./controllers').payroll;

const path = require("path");

module.exports = router => {
  router.get("/api/", (req, res) => {
    res.status(200).json("API ROUTE");
  });

  // route handling for table
  router.route('/api/t/')
    .post(tableController.create)
    .get(tableController.list)
    .put(tableController.update)
    .delete(tableController.destroy);
  router.get("/api/t/perTable", tableController.table);

  // route handling for order
  router.route('/api/o/')
    .post(orderController.create)
    .get(orderController.list)
    .put(orderController.update)
    .delete(orderController.destroy);
  router.get("/api/o/getOrder", orderController.listPerId);

  // route handling for user
  router.route('/api/u/')
    .post(userController.create)
    .get(userController.list)
    .put(userController.updateUser)
    .delete(userController.destroy);
  router.get("/api/u/:username", userController.getUser);
  router.get("/api/u/perRole", userController.perRole);
  router.post("/api/u/login", userController.login);
  router.post("/api/u/checkToken", userController.checkAuth);

  // route handling for payroll
  //router.post("/api/p", payrollController.create);

  router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/dist", "index.html"));
  });
};
