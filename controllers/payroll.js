/*
'use strict';
module.exports = (sequelize, DataTypes) => {
  const payroll = sequelize.define('payroll', {
    userId: DataTypes.INTEGER,
    clockInTime: DataTypes.DATE,
    clockOutTime: DataTypes.DATE,
    wage: DataTypes.DECIMAL,
    hoursWorked: DataTypes.DECIMAL,
    totalWage: DataTypes.DECIMAL,
  }, {});
  payroll.associate = function(models) {
    // associate can  be defined here
  };
  return payroll;
};
*/
const userServices = require("../services/user/userServices");

const payrollServices = require('../services/payroll/payrollServices');
module.exports = {
    create(req, res) { //creating constants 
        const payrollInfo = { userId, wage, totalWage, clockInTime, clockOutTime, hoursWorked } = req.body;
        return payrollServices //creating tables for our contants with parameters for script
            .createPayroll(payrollInfo)
            .then(payroll => {
                return res.status(200).json(payroll)
            })
            .catch(e => res.status(400).json(e))
    },

    clockIn(req, res) {
        const userInfo = {
            userId: req.user.id,
            clockInTime: new Date(Date.now()),
        };
        payrollServices.create(userInfo).then(data => {
            return res.status(200).json(data);
        }).catch(error => {
            console.warn(error);
            return res.status(400).json({ error: error.message });
        })
    },
    clockOut(req, res) {
        payrollServices.get(req.body.id).then(payroll => {
            const userInfo = {
                id: req.body.id,
                clockOutTime: new Date(Date.now()),
            }
            //get hours worked
            const d1 = new Date(payroll[0].clockInTime);
            const d2 = userInfo.clockOutTime;
            userInfo.hoursWorked = Math.round((d2 - d1) / (1000 * 60 * 60));
            userInfo.totalWage = userInfo.hoursWorked * 2.5;

            payrollServices.update(userInfo).then(data => {
                return res.status(200).json(data);
            }).catch(error => {
                console.warn(error);
                return res.status(400).json({ error: error.message });
            })
        }).catch(error => {
            console.warn(error);
            return res.status(400).json({ error: error.message });
        });

    },
    list(req, res) {
        return payrollServices
            .list(req.params.userId)
            .then(payroll => {
                return res.status(200).json(payroll)
            })
            .catch(error => {
                return res.status(400).json({ error: error.message });
            })
    },
    listAll(req, res) {
        payrollServices.listAll().then(list => {
            return res.status(200).json(list);
        })
    },
    payroll(req, res) {
        const { id } = req.params;

        return payrollServices
            .getPayrollById(id)
            .then(payroll => {
                return res.status(200).json(payroll)
            })
            .catch(error => {
                return res.status(400).json({ error: error.message });
            })
    },

    update(req, res) {
        const { userId, totalWage, clockInTime, clockOutTime } = req.body;
        const payrollInfo = {
            clockInTime: clockInTime || undefined,
            clockOutTime: clockOutTime || undefined,
        }
        payrollServices
            .update(payrollInfo)
            .then(() => {
                return res.status(200).json({ table, msg: 'payroll has been updated' });
            })
            .catch(error => {
                return res.status(400).json({ error: error.message });
            })
    },

    destroy(req, res) {
        const { id } = req.body;

        return payrollServices
            .delete(id)
            .then(() => {
                return res.status(200).json({ msg: 'payroll has been deleted' })
            })
            .catch(error => {
                return res.status(400).json({ error: error.message });
            })
    },
};
