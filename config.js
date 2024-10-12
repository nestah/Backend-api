require('dotenv').config();

const dbConfig1 = {
  server: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE1,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const dbConfig2 = {
  server: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE2,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

module.exports = { dbConfig1, dbConfig2 };
