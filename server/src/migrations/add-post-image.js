module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'posts',
            'post_image_path',
            Sequelize.STRING,
        );
    },

    down: (queryInterface, Sequelize) => {
    }
}