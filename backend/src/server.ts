import express from 'express';
import pool from './config/db';

const app = express();

import { config } from "./config/config";

const port = config.port;

app.use(express.json());

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('News Portal API is running');
});

app.get('/setup', async (req,res) => {
  try{
    await pool.query('CREATE TABLE news( id SERIAL PRIMARY KEY, title VARCHAR(250), description VARCHAR(250))')
    res.status(200).send("successfully created table")
  } catch(err){
    console.log(err)
    res.sendStatus(500)
  }
})

app.post('/', async (req,res) => {
  const {title,description} = req.body
  try{
    await pool.query('INSERT INTO news(title, description) ($1,$2)', [title,description])
    res.status(200).send("successfully added")
  } catch(err){
    console.log(err)
    res.sendStatus(500)
  }
})

app.get('/news', async (req, res) => {
  try {
      const { rows } = await pool.query('SELECT * FROM news');
      res.json(rows);
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});
