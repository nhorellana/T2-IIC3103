const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  password: "1edb771f",
  user: "b58429afa27c4c",
  database: "heroku_22a4c635eee9441",
  host: "us-cdbr-east-03.cleardb.com",
  port: "3306",
});

let t2_db = {};

t2_db.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM artist", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

t2_db.one = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM artist WHERE id = ?`, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

console.log(t2_db);

module.exports = t2_db;
