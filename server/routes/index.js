const express = require("express");
const db = require("../db");
const router = express.Router();

const api_host = "https://t2-iic3103-api.herokuapp.com/";

/* ARTISTS ROUTES*/

/* POST */

router.post("/artists", async (req, res, next) => {
  console.log("Log Data: = " + JSON.stringify(req.body));
  try {
    let results = await db.create_artist(
      Buffer.from(`${req.body.name}`).toString("base64"),
      req.body.name,
      req.body.age
    );
    let new_artist = await db.one_artist(
      Buffer.from(`${req.body.name}`).toString("base64")
    );
    console.log("Data: " + req.body.name + req.body.age);
    res.status(201);
    res.json(new_artist);
  } catch (err) {
    if (err.code == "ER_DUP_ENTRY") {
      const msg = "artista ya existe";
      res.status(409).send(msg);
    } else if ((err.code = "ER_BAD_NULL_ERROR")) {
      const msg = "input inválido";
      res.status(400).send(msg);
    }
  }
});

router.post("/artists/:id/albums", async (req, res, next) => {
  console.log("Log Data: = " + JSON.stringify(req.body));
  try {
    let results = await db.create_album(
      Buffer.from(`${req.body.name}:${req.params.id}`).toString("base64"),
      req.body.name,
      req.body.genre,
      req.params.id
    );
    let new_album = await db.one_album(
      Buffer.from(`${req.body.name}:${req.params.id}`).toString("base64")
    );
    res.json(new_album);
  } catch (err) {
    if (err.code == "ER_DUP_ENTRY") {
      const msg = "álbum ya creado";
      res.status(409).send(msg);
    } else if ((err.code = "ER_BAD_NULL_ERROR")) {
      const msg = "input inválido";
      res.status(400).send(msg);
    }
  }
});

/* GET */

router.get("/artists", async (req, res, next) => {
  try {
    let results = await db.all_artists();
    res.json(results);
  } catch (err) {
    console.log("Error: " + err);
    res.sendStatus(500);
  }
});

router.get("/artists/:id", async (req, res, next) => {
  try {
    let results = await db.one_artist(req.params.id);
    res.json(results);
  } catch (err) {
    if ((err = 404)) {
      res.status(404).send("artista no encontrado");
    }
  }
});

router.get("/artists/:id/albums", async (req, res, next) => {
  try {
    let results = await db.one_artist_albums(req.params.id);
    res.json(results);
  } catch (err) {
    if ((err = 404)) {
      res.status(404).send("album no encontrado");
    }
  }
});

/* DELETE */

router.delete("/artists/:id", async (req, res, next) => {
  try {
    let results = await db.delete_artist(req.params.id);
    res.status(204).send("artista eliminado");
  } catch (err) {
    if ((err = 404)) {
      res.status(404).send("artista no encontrado");
    }
  }
});

/* ALBUMS ROUTES*/

/* POST */

router.post("/albums/:id/tracks", async (req, res, next) => {
  console.log("Log Data: = " + JSON.stringify(req.body));
  try {
    let results = await db.create_track(
      Buffer.from(`${req.body.name}`).toString("base64"),
      req.body.name,
      req.body.duration,
      req.body.artist,
      req.body.album,
      Buffer.from(`${req.body.album}`).toString("base64")
    );
    let new_album = await db.one_track(
      Buffer.from(`${req.body.name}`).toString("base64")
    );
    res.json(new_album);
  } catch (err) {
    console.log("Error: " + err);
    res.sendStatus(500);
  }
});

/* GET */

router.get("/albums", async (req, res, next) => {
  try {
    let results = await db.all_albums();
    res.json(results);
  } catch (err) {
    console.log("Error: " + err);
    res.sendStatus(500);
  }
});

router.get("/albums/:id", async (req, res, next) => {
  try {
    let results = await db.one_album(req.params.id);
    res.json(results);
  } catch (err) {
    console.log("Error: " + err);
    res.sendStatus(500);
  }
});

router.get("/albums/:id/tracks", async (req, res, next) => {
  try {
    let results = await db.one_album_tracks(req.params.id);
    res.json(results);
  } catch (err) {
    console.log("Error: " + err);
    res.sendStatus(500);
  }
});

/* DELETE */

router.delete("/albums/:id", async (req, res, next) => {
  try {
    let results = await db.delete_album(req.params.id);
    res.json(results);
  } catch (err) {
    console.log("Error: " + err);
    res.sendStatus(500);
  }
});

/* TRACKS ROUTES*/

/* GET */

router.get("/tracks", async (req, res, next) => {
  try {
    let results = await db.all_tracks();
    res.json(results);
  } catch (err) {
    console.log("Error: " + err);
    res.sendStatus(500);
  }
});

router.get("/tracks/:id", async (req, res, next) => {
  try {
    let results = await db.one_track(req.params.id);
    res.json(results);
  } catch (err) {
    console.log("Error: " + err);
    res.sendStatus(500);
  }
});

/* PUT */

router.put("/tracks/:id/play", async (req, res, next) => {
  try {
    let results = await db.play_tracks(req.params.id);
    res.json(results);
  } catch (err) {
    console.log("Error: " + err);
    res.sendStatus(500);
  }
});

/* DELETE */

router.delete("/tracks/:id", async (req, res, next) => {
  try {
    let results = await db.delete_track(req.params.id);
    res.json(results);
  } catch (err) {
    console.log("Error: " + err);
    res.sendStatus(500);
  }
});

module.exports = router;
