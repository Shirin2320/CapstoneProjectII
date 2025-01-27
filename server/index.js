import express from 'express';
import { Sequelize } from 'sequelize';

const app = express();
const sequelize = new Sequelize('postgres://komedb:komepass7@localhost:5433/kome');
const PORT = process.env.PORT || 3123;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.send("COMP 3078 Capstone Project"));

sequelize.authenticate()
    .then(_ => app.listen(PORT, () => console.log(`Server ready on port ${PORT} with PostgreSQL.`)))
    .catch(error => console.log(error));

export default app;
