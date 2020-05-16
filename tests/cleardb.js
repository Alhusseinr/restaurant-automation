require("../config/config");
const db = require("../config/db");
try {
    (async () => {
        return await db.raw("truncate table users, payrolls, menus, orders, tables restart identity").then(res => {
            console.log(res);
        })
    })()

} catch (err) {
    console.log(err);
}
