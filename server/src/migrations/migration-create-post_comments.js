'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Post_comments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            content: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            user_id: {
                allowNull: true,
                type: Sequelize.STRING
            },
            post_id: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Post_comments');
    }
};