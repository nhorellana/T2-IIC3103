const mysql = require("mysql");

const api_host = "https://t2-iic3103-api.herokuapp.com";

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
      "INSERT INTO artist (id, name, age, albums, tracks, self) VALUES (?, ?, ?, ?, ?, ?)",
      [
        id,
        name,
        age,
        `${api_host}/artists/${id}/albums`,
        `${api_host}/artists/${id}/tracks`,
        `${api_host}/artists/${id}`,
      ],
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
      if (!Object.keys(results).length) {
        console.log("testeooo");
        return reject(404);
      }
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
        if (!Object.keys(results).length) {
          return reject(404);
        }
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
      if (!results.affectedRows) {
        return reject(404);
      }
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

/* ALBUMS */

/* POST */

t2_db.create_album = (id, name, genre, artist_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO album (id, name, genre, artist_id, artist, tracks, self) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        name,
        genre,
        artist_id,
        `${api_host}/artists/${artist_id}`,
        `${api_host}/albums/${id}/tracks`,
        `${api_host}/albums/${id}/`,
      ],
      (err, results) => {
        console.log("testeo: e, nro" + err);
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
      if (!Object.keys(results).length) {
        console.log("testeooo");
        return reject(404);
      }
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
        if (!Object.keys(results).length) {
          console.log("testeooo");
          return reject(404);
        }
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
      if (!results.affectedRows) {
        return reject(404);
      }
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
      if (!Object.keys(results).length) {
        console.log("testeooo");
        return reject(404);
      }
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
        if (!results.affectedRows) {
          return reject(404);
        }
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
      if (!results.affectedRows) {
        return reject(404);
      }
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

console.log(t2_db);

module.exports = t2_db;
