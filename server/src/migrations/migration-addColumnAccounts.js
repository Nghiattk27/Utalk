module.exports = {
    up: function (queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.renameColumn(
                'Users',
                'Last_name',
                'last_name',
            )
        ]);
    },

    down: function (queryInterface, Sequelize) {
        // logic for reverting the changes
    }
};