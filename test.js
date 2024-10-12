const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
  server: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE1,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function testConnection() {
  try {
    let pool = await sql.connect(dbConfig);
    console.log('Connection successful!');
    pool.close();
  } catch (err) {
    console.error('Connection failed:', err);
  }
}

testConnection();
