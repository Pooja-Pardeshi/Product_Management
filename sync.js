const sequelize = require('./db');
const Category = require('./models/category');
const Product = require('./models/product');

(async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Tables created successfully!');
    } catch (err) {
        console.error('Error creating tables:', err);
    }
})();

