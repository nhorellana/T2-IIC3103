const express = require("express");
const db = require("../db");
const encode = require("btoa");
const router = express.Router();

/* ARTISTS ROUTES*/

/* POST */

router.post("/artists", async (req, res, next) => {
  try {
    let results = await db.create_artist(
      encode(req.body.id),
      req.body.name,
      req.body.age
    );
    let new_artist = await db.one_artist(encode(req.body.id));
    res.json(new_artist);
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

/* ALBUMS ROUTES*/

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

/* TRACKS ROUTES*/

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

module.exports = router;
