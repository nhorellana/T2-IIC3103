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

/* ARTISTAS */

/* POST */

t2_db.create_artist = (id, name, age) => {
  console.log("Data: " + id, name, age);
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO artist (id, name, age) VALUES (?, ?, ?)",
      [id, name, age],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        console.log("Resultados: " + results);
        return resolve(results);
      }
    );
  });
};

/* GET */

t2_db.all_artists = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM artist", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

t2_db.one_artist = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM artist WHERE id = ?`, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

t2_db.one_artist_albums = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM album WHERE artist_id = ?`,
      [id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

/* DELETE */

t2_db.delete_artist = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM artist WHERE id = ?`, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

/* ALBUMS */

/* POST */

t2_db.create_album = (id, name, genre, artist, artist_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO album (id, name, genre, artist, artist_id) VALUES (?, ?, ?, ?, ?)",
      [id, name, genre, artist, artist_id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        console.log("Resultados: " + results);
        return resolve(results);
      }
    );
  });
};

/* GET */

t2_db.all_albums = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM album", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

t2_db.one_album = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM album WHERE id = ?`, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

t2_db.one_album_tracks = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM track WHERE album_id = ?`,
      [id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

/* DELETE */

t2_db.delete_album = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM album WHERE id = ?`, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

/* TRACKS */

/* POST */

t2_db.create_track = (id, name, duration, artist, album, album_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO track (id, name, duration, artist, album, album_id) VALUES (?, ?, ?, ?, ?, ?)",
      [id, name, duration, artist, album, album_id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        console.log("Resultados: " + results);
        return resolve(results);
      }
    );
  });
};

/* GET */

t2_db.all_tracks = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM track", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

t2_db.one_track = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM track WHERE id = ?`, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

/* PUT */

t2_db.play_tracks = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE track SET times_played = times_played + 1 WHERE (id = ?)`,
      [id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

/* DELETE */

t2_db.delete_track = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM track WHERE id = ?`, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

console.log(t2_db);

module.exports = t2_db;
