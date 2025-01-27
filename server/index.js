const app = require('./src/app');
const sequelize = require('./src/database');

const PORT = process.env.PORT || 3123;

async function startServer() {
    try {
        await sequelize.authenticate();
        app.listen(PORT, () => console.log(`Server ready on port ${PORT} with PostgreSQL.`));
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

startServer();