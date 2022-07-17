module.exports = {
    up: function (queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.renameColumn(
                'Posts',
                'posts_title',
                'post_title',
            )
        ]);
    },

    down: function (queryInterface, Sequelize) {
        // logic for reverting the changes
    }
};