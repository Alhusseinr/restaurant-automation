const waiterController = require("./controllers").waiter;
const tableController = require("./controllers").table;

const path = require("path");

module.exports = router => {
  router.get(
    "/api/",
    wrap(async (req, res) => {
      res.status(200).json("API ROUTE");
    })
  );

  // route handling for waiter
  router.get("/api/w/test", waiterController.test);
  router.post("/api/w", waiterController.create);
  router.delete("/api/deleteWaiter/", waiterController.destroy);
  router.get("/api/w", waiterController.list);

  // route handling for table
  router.post("/api/t/:waiterId/t", tableController.create);
  router.get("/api/t/", tableController.list);
  router.delete("/api/t/deleteTable", tableController.destroy);

  router.get(
    "*",
    wrap(async (req, res) => {
      res.sendFile(path.join(__dirname, "/client/dist", "index.html"));
    })
  );
};
