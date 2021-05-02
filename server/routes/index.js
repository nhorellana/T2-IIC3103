const express = require("express");
const db = require("../db");
const router = express.Router();

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
    res.json(new_artist);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/artists/:id/albums", async (req, res, next) => {
  console.log("Log Data: = " + JSON.stringify(req.body));
  try {
    let results = await db.create_album(
      Buffer.from(`${req.body.name}`).toString("base64"),
      req.body.name,
      req.body.genre,
      req.body.artist,
      Buffer.from(`${req.body.artist}`).toString("base64")
    );
    let new_album = await db.one_album(
      Buffer.from(`${req.body.name}`).toString("base64")
    );
    res.json(new_album);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/* GET */

router.get("/artists", async (req, res, next) => {
  try {
    let results = await db.all_artists();
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/artists/:id", async (req, res, next) => {
  try {
    let results = await db.one_artist(req.params.id);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/artists/:id/albums", async (req, res, next) => {
  try {
    let results = await db.one_artist_albums(req.params.id);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/* DELETE */

router.delete("/artists/:id", async (req, res, next) => {
  try {
    let results = await db.delete_artist(req.params.id);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
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
    console.log(err);
    res.sendStatus(500);
  }
});

/* GET */

router.get("/albums", async (req, res, next) => {
  try {
    let results = await db.all_albums();
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/albums/:id", async (req, res, next) => {
  try {
    let results = await db.one_album(req.params.id);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/albums/:id/tracks", async (req, res, next) => {
  try {
    let results = await db.one_album_tracks(req.params.id);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/* DELETE */

router.delete("/albums/:id", async (req, res, next) => {
  try {
    let results = await db.delete_album(req.params.id);
    res.json(results);
  } catch (err) {
    console.log(err);
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
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/tracks/:id", async (req, res, next) => {
  try {
    let results = await db.one_track(req.params.id);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/* PUT */

router.put("/tracks/:id/play", async (req, res, next) => {
  try {
    let results = await db.play_tracks(req.params.id);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/* DELETE */

router.delete("/tracks/:id", async (req, res, next) => {
  try {
    let results = await db.delete_track(req.params.id);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
