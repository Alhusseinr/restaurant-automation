'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('orders', [
            {
                item: 1,
                comments: "medium rare",
                price: 25,
                status: "pending",
                tableId: 1
            },
            {
                item: 2,
                comments: "no ice",
                price: 25,
                status: "ready",
                tableId: 1
            },
            {
                item: 3,
                comments: "to go",
                price: 60.25,
                status: "pending",
                tableId: 2
            },
            {
                item: 4,
                comments: "extra sauce",
                price: 60.25,
                status: "ready",
                tableId: 2
            },
            {
                item: 5,
                comments: "with chease",
                price: 50.25,
                status: "pending",
                tableId: 6
            },
            {
                item: 6,
                comments: "no chease",
                price: 50.25,
                status: "ready",
                tableId: 6
            },
            {
                item: 7,
                comments: "with chease",
                price: 37.50,
                status: "pending",
                tableId: 7
            },
            {
                item: 8,
                comments: "no chease",
                price: 37.50,
                status: "ready",
                tableId: 7
            },
            {
                item: 9,
                comments: "he wants the plate sideways",
                price: 37.50,
                status: "pending",
                tableId: 10
            },
            {
                item: 10,
                comments: "no comments",
                price: 37.50,
                status: "ready",
                tableId: 10
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
