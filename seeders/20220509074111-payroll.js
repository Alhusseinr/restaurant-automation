'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('payrolls', [
            {
                userId: 1,
                clockInTime: new Date("2020-05-10T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-10T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 200
            },
            {
                userId: 1,
                clockInTime: new Date("2020-05-11T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-11T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 200
            },
            {
                userId: 2,
                clockInTime: new Date("2020-05-10T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-10T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 184
            },
            {
                userId: 2,
                clockInTime: new Date("2020-05-11T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-11T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 184
            },
            {
                userId: 3,
                clockInTime: new Date("2020-05-10T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-10T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 192
            },
            {
                userId: 3,
                clockInTime: new Date("2020-05-11T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-11T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 192
            },
            {
                userId: 4,
                clockInTime: new Date("2020-05-10T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-10T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 96
            },
            {
                userId: 4,
                clockInTime: new Date("2020-05-11T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-11T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 96
            },
            {
                userId: 5,
                clockInTime: new Date("2020-05-10T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-10T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 80
            },
            {
                userId: 5,
                clockInTime: new Date("2020-05-11T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-11T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 80
            },
            {
                userId: 6,
                clockInTime: new Date("2020-05-10T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-10T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 80
            },
            {
                userId: 6,
                clockInTime: new Date("2020-05-11T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-11T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 80
            },
            {
                userId: 7,
                clockInTime: new Date("2020-05-10T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-10T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 96
            },
            {
                userId: 7,
                clockInTime: new Date("2020-05-11T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-11T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 96
            },
            {
                userId: 8,
                clockInTime: new Date("2020-05-10T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-10T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 80
            },
            {
                userId: 8,
                clockInTime: new Date("2020-05-11T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-11T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 80
            },
            {
                userId: 9,
                clockInTime: new Date("2020-05-10T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-10T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 80
            },
            {
                userId: 9,
                clockInTime: new Date("2020-05-11T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-11T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 80
            },
            {
                userId: 9,
                clockInTime: new Date("2020-05-10T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-10T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 96
            },
            {
                userId: 10,
                clockInTime: new Date("2020-05-11T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-11T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 96
            },
            {
                userId: 11,
                clockInTime: new Date("2020-05-10T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-10T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 80
            },
            {
                userId: 11,
                clockInTime: new Date("2020-05-11T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-11T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 80
            },
            {
                userId: 12,
                clockInTime: new Date("2020-05-10T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-10T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 80
            },
            {
                userId: 12,
                clockInTime: new Date("2020-05-11T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-11T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 80
            },
            {
                userId: 13,
                clockInTime: new Date("2020-05-10T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-10T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 200
            },
            {
                userId: 13,
                clockInTime: new Date("2020-05-11T13:00:00.000Z"),
                clockOutTime: new Date("2020-05-11T21:00:00.000Z"),
                hoursWorked: 8,
                totalWage: 200
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
    }
};
