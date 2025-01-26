import express from 'express';

const app = express();
const PORT = process.env.PORT || 3123;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.send("COMP 3078 Capstone Project"));
app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

export default app;