'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('menus', [
            {
                item: "Burger",
                description: "Burger",
                price: 8.99,
                category: 'entrees'
            },
            {
                item: "Spaghetti",
                description: "Spaghetti",
                price: 10.69,
                category: 'entrees'
            },
            {
                item: "Steak",
                description: "Steak",
                price: 12.99,
                category: 'entrees'
            },
            {
                item: "Salmon",
                description: "Salmon",
                price: 14.50,
                category: 'entrees'
            },
            {
                item: "Chicken",
                description: "Chicken",
                price: 8.99,
                category: 'entrees'
            },
            {
                item: "French Fries",
                description: "French Fries",
                price: 5.69,
                category: 'appetizers'
            },
            {
                item: "Nachos",
                description: "Nachos",
                price: 6.50,
                category: 'appetizers'
            },
            {
                item: "Buffalo Wings",
                description: "Buffalo Wings",
                price: 7.23,
                category: 'appetizers'
            },
            {
                item: "Mozzarella Sticks",
                description: "Mozzarella Sticks",
                price: 6.69,
                category: 'appetizers'
            },
            {
                item: "Veggie Platter",
                description: "Veggie Platter",
                price: 6.99,
                category: 'appetizers'
            },
            {
                item: "Chicken Noodle",
                description: "Chicken Noodle",
                price: 4.99,
                category: 'soups&Salads'
            },
            {
                item: "French Onion",
                description: "French Onion",
                price: 4.99,
                category: 'soups&Salads'
            },
            {
                item: "Vegetable",
                description: "Vegetable",
                price: 4.50,
                category: 'soups&Salads'
            },
            {
                item: "House Salad",
                description: "House Salad",
                price: 6.50,
                category: 'soups&Salads'
            },
            {
                item: "Caesar Salad",
                description: "Caesar Salad",
                price: 6.99,
                category: 'soups&Salads'
            },
            {
                item: "Chocolate Cake",
                description: "Chocolate Cake",
                price: 4.99,
                category: 'desserts'
            },
            {
                item: "Red Velvet Cake",
                description: "Red Velvet Cake",
                price: 4.99,
                category: 'desserts'
            },
            {
                item: "Carrot Cake",
                description: "Carrot Cake",
                price: 4.50,
                category: 'desserts'
            },
            {
                item: "Apple Pie",
                description: "Apple Pie",
                price: 5.50,
                category: 'desserts'
            },
            {
                item: "Ice Cream",
                description: "Ice Cream",
                price: 4.69,
                category: 'desserts'
            },
            {
                item: "Water",
                description: "Water",
                price: 0.99,
                category: 'beverages'
            },
            {
                item: "Soda",
                description: "Soda",
                price: 1.99,
                category: 'beverages'
            },
            {
                item: "Iced Tea",
                description: "Iced Tea",
                price: 2.99,
                category: 'beverages'
            },
            {
                item: "Tea",
                description: "Tea",
                price: 1.99,
                category: 'beverages'
            },
            {
                item: "Coffee",
                description: "Coffee",
                price: 3.99,
                category: 'beverages'
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
