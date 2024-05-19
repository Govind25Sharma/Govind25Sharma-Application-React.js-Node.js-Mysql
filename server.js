import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "GS@air666",
    database: "CRUD"
});

app.get("/", async (req, res) => {
    const sql = "SELECT * FROM employee";
    try {
      const [rows] = await db.query(sql);
      res.json(rows);
    } catch (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json(error);
    }
});

app.post('/create', async (req, res) => {
    const sql = "INSERT INTO employee (id,name, email, mobile, dob) VALUES (?, ?, ?, ?, ?)";
    const values = [
        req.body.id,
        req.body.name,
        req.body.email,
        req.body.mobile,
        req.body.dob
    ];

    try {
        const [result] = await db.query(sql, values);
        res.json(result);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json("Error");
    }
});


app.put('/update/:id', async (req, res) => {
    const sql = "UPDATE employee SET name = ?, email = ?, mobile = ?, dob = ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.mobile,
        req.body.dob,
        req.params.id
    ];

    try {
        const [result] = await db.query(sql, values);
        res.json(result);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json("Error");
    }
});

app.delete('/employee/:id', async (req, res) => {
    const sql = "DELETE FROM employee WHERE id = ?";
    try {
        const [result] = await db.query(sql, [req.params.id]);
        res.json(result);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json("Error");
    }
});

app.listen(8081, () => {
    console.log("Backend server is running on port 8081");
});



