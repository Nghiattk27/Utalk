module.exports = {
    up: function (queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn(
                'Accounts',
                'user_id',
                Sequelize.INTEGER
            )]);
    },

    down: function (queryInterface, Sequelize) {
        // logic for reverting the changes
    }
};