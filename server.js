const express = require('express');
const sql = require('mssql');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Database configurations for each branch
const dbConfig1 = {
  server: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'NAME_OF_DATABASE1', // replace with actual name
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const dbConfig2 = {
  server: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'NAME_OF_DATABASE2', // replace with actual name
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Create a connection pool for each database configuration
// replace NAME_OF_DATABASE1 with the name of your db
const pool1 = new sql.ConnectionPool(dbConfig1);
const pool2 = new sql.ConnectionPool(dbConfig2);

// Function to connect and set up the pools
async function setupPools() {
  try {
    await pool1.connect();
    console.log('Connected to NAME_OF_DATABASE1 database');

    await pool2.connect();
    console.log('Connected to NAME_OF_DATABASE2 database');
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

// Helper function to query the database
async function queryDatabase(pool, query) {
  try {
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  }
}

// Endpoint for DB1.dbo.NAME_OF_TABLE
app.get('/api/DB1/Name_of_table', async (req, res) => {
  console.log('Received request for /api/DB1/Name_of_table');
  try {
    const result = await queryDatabase(pool1, "SELECT * FROM dbo.NAME_OF_TABLE");
    res.json(result);
  } catch (err) {
    console.error('Error querying NAME_OF_DB1 NAME_OF_TABLE:', err);
    res.status(500).send('Error querying NAME_OF_DB1 NAME_OF_TABLE');
  }
});

// Endpoint for DB2.dbo.NAME_OF_TABLE
app.get('/api/DB2/Name_of_table', async (req, res) => {
  console.log('Received request for /api/DB2/Name_of_table');
  try {
    const result = await queryDatabase(pool2, "SELECT * FROM dbo.NAME_OF_TABLE");
    res.json(result);
  } catch (err) {
    console.error('Error querying NAME_OF_DB2 NAME_OF_TABLE:', err);
    res.status(500).send('Error querying NAME_OF_DB1 NAME_OF_TABLE');
  }
});
// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  setupPools(); // Initialize the database pools
});
