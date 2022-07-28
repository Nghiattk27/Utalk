module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'posts',
            'amount_like'
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'posts',
            'amount_like',
            Sequelize.INTERGER,
        );
    }
}