'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [
            {
                username: 'admin1',
                password: "$2a$10$uOwTFOv5M/eDeSWrb5LLm.nnROtMFVE56X8H4RWNxhrVbxFiQeszS",
                email: "admin1@mail.com",
                wage: 25,
                role: "admin",
                phoneNumber: "1112223333"
            },
            {
                username: 'admin2',
                password: "$2a$10$ngf68u7.GWEd2ASLvyR50.WYG4YGQeyGNpqXQys0UKzuAOE6QgyqK",
                email: "admin2@mail.com",
                wage: 23,
                role: "admin",
                phoneNumber: "3334445555"
            },
            {
                username: 'admin3',
                password: "$2a$10$ngf68u7.GWEd2ASLvyR50.WYG4YGQeyGNpqXQys0UKzuAOE6QgyqK",
                email: "admin3@mail.com",
                wage: 24,
                role: "admin",
                phoneNumber: "3334445555"
            },
            {
                username: 'waiter1',
                password: "$2a$10$J3Vg3xuQc57Gc8eHhD33HufXqmNrAhsItnE73UwNy6a3aUetTKmCm",
                email: "waiter1@mail.com",
                wage: 12,
                role: "waiter",
                phoneNumber: "1112223333"
            },
            {
                username: 'waiter2',
                password: "$2a$10$NknKS6hZjxaGCxwNolH5Kew.5Ss0YoAyanAXI8MjU7NUyI31JJJSm",
                email: "waiter2@mail.com",
                wage: 10,
                role: "waiter",
                phoneNumber: "3334445555"
            },
            {
                username: 'waiter3',
                password: "$2a$10$SZmPm3klsgK3o5SIyDDJFeJHeubGm6RPrn4.9Z5LwJNC/xkbOmVUi",
                email: "waiter3@mail.com",
                wage: 10,
                role: "waiter",
                phoneNumber: "3334445555"
            },
            {
                username: 'host1',
                password: "$2a$10$P1MoqXFCKEtXfitxeCTbqeLt9R.EzSx5LO2lngZtdcb..cew1uJD.",
                email: "host1@mail.com",
                wage: 12,
                role: "host",
                phoneNumber: "1112223333"
            },
            {
                username: 'host2',
                password: "$2a$10$ycGzgwSpRItSKTvOKnq9qeWxdJF611SjdIvBofIJMAx7RJYJmTvI2",
                email: "host2@mail.com",
                wage: 10,
                role: "host",
                phoneNumber: "3334445555"
            },
            {
                username: 'host3',
                password: "$2a$10$QR0SdXEhY9rz/NmpD/NwbuH4sSeTGVaZ680aKB3kfo2D/tkU/82Ga",
                email: "host3@mail.com",
                wage: 10,
                role: "host",
                phoneNumber: "3334445555"
            },
            {
                username: 'busboy1',
                password: "$2a$10$jCS1PadoFf4rg/bRFZIMleDbt6rqd89x/y4HxjbdzlSvmmLiVnDbK",
                email: "busboy1@mail.com",
                wage: 12,
                role: "busboy",
                phoneNumber: "1112223333"
            },
            {
                username: 'busboy2',
                password: "$2a$10$M/e.i6cwEAvci1sIvSzC1u21njemPGsf4GdjN9cZw2jA.SNM93vLi",
                email: "busboy2@mail.com",
                wage: 10,
                role: "busboy",
                phoneNumber: "3334445555"
            },
            {
                username: 'busboy3',
                password: "$2a$10$Eu6KhLggFktkzveIEb5d0O32dsoxAbAkDnxtFbrvfXtuqDNoTVb7m",
                email: "busboy3@mail.com",
                wage: 10,
                role: "busboy",
                phoneNumber: "3334445555"
            },
            {
                username: 'cook',
                password: "$2a$10$FHbmt0yAnDk.MnkeHlFeCeSYjBrwwo49xURy80QX1aBqcwIGcYYOO",
                email: "cook@mail.com",
                wage: 25,
                role: "cook",
                phoneNumber: "3334445555"
            }
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
