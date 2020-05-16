'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('tables', [
            {
                total: 50,
                waiterId: 4,
                status: 'serving'
            },
            {
                total: 120.50,
                waiterId: 5,
                status: "serving"
            },
            {
                total: null,
                waiterId: 6,
                status: "dirty"
            },
            {
                total: null,
                waiterId: null,
                status: "clean"
            },
            {
                total: null,
                waiterId: null,
                status: "clean"
            },
            {
                total: 100.50,
                waiterId: 4,
                status: "serving"
            },
            {
                total: 75,
                waiterId: 5,
                status: "serving"
            },
            {
                total: null,
                waiterId: null,
                status: "clean"
            },
            {
                total: null,
                waiterId: null,
                status: "clean"
            },
            {
                total: 60.12,
                waiterId: 6,
                status: "serving"
            },
            {
                total: null,
                waiterId: null,
                status: "clean"
            },
            {
                total: null,
                waiterId: 4,
                status: "dirty"
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
