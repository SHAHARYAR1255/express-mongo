const cors = require('./cors');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var authenticate = require('../authenticate');
const Promo = require("../models/promos");

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter
  .route("/")
  .get((req, res, next) => {
    Promo.find({})
      .then(
        (promo) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions,authenticate.verifyUser ,authenticate.verifyAdmin,(req, res, next) => {
    Promo.create(req.body)
      .then(
        (promo) => {
          console.log("promo Created ", promo);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions,authenticate.verifyUser ,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /Promo");
  })
  .delete(cors.corsWithOptions,authenticate.verifyUser ,authenticate.verifyAdmin,(req, res, next) => {
    Promo.remove({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

promoRouter
  .route("/:promoId")
  .get((req, res, next) => {
    Promo.findById(req.params.promoId)
      .then(
        (promo) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions,authenticate.verifyUser ,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /Promo/" + req.params.promoId);
  })
  .put(cors.corsWithOptions,authenticate.verifyUser ,authenticate.verifyAdmin,(req, res, next) => {
    Promo.findByIdAndUpdate(
      req.params.promoId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (promo) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions,authenticate.verifyUser ,authenticate.verifyAdmin,(req, res, next) => {
    Promo.findByIdAndRemove(req.params.promoId)
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

module.exports = promoRouter;
