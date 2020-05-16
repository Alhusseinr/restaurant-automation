const db = require("../../config/db");

module.exports = {
    create: (userInfo) => new Promise((resolve, reject) => {
        const { userId, clockInTime } = userInfo;

        return db.insert({
            userId,
            clockInTime,
        }).returning('*').into('payrolls').then(data => {
            console.log(data[0]);
            return resolve(data[0])
        }).catch(e => reject(e))
    }),
    get: (id) => new Promise((resolve, reject) => {
        db.select("*").from("payrolls").where("id", "=", id).then(data => {
            if (data) {
                return resolve(data)
            } else {
                return reject(new Error("something went wrong"));
            }
        })
    }),
    listAll: () => new Promise((resolve, reject) => {
        db.select('*')
            .from('payrolls').orderBy("clockInTime", "desc")
            .then(items => resolve(items))
            .catch(e => reject(e));
    }),
    list: (userId) => new Promise((resolve, reject) => {
        db.select('*')
            .from('payrolls').where("userId", "=", userId).orderBy("clockInTime", "desc")
            .then(items => resolve(items))
            .catch(e => reject(e));
    }),
    update: (payrollInfo) => new Promise((resolve, reject) => {
        db.select('*')
            .from('payrolls').where("id", "=", payrollInfo.id).update(payrollInfo)
            .then(items => resolve(items))
            .catch(e => reject(e));
    }),
    delete: (id) => new Promise((resolve, reject) => {
        db.select("*").from("payrolls").where("id", "=", id).del().then(payroll => {
            resolve({ msg: "payroll deleted" });
        }).catch(e => reject(e));
    })
};