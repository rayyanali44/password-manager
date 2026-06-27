const express = require('express');
const { MongoClient } = require("mongodb");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors')

dotenv.config()
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())

const client = new MongoClient(process.env.MONGO_URI);
client.connect();
const dbName = "PMUltra"

app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

app.post('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult= await collection.insertOne(password);
  res.json({success: true, result: findResult})
})

app.delete('/:id', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  await collection.deleteOne({
    id: req.params.id,
  });
  res.json({success: true})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})