const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var authenticate = require('../authenticate');
const Leader = require("../models/Leaders");

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter
  .route("/")
  .get((req,res, next) => {
    Leader.find({})
      .then(
        (Leader) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(Leader);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser , (req,res, next) => {
    Leader.create(req.body)
      .then(
        (Leader) => {
          console.log("Leader Created ", Leader);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(Leader);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser , (req,res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /Leader");
  })
  .delete(authenticate.verifyUser , (req,res, next) => {
    Leader.remove({})
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

leaderRouter
  .route("/:LeaderId")
  .get( (req,res, next) => {
    Leader.findById(req.params.LeaderId)
      .then(
        (Leader) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(Leader);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser , (req,res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /Leader/" + req.params.LeaderId);
  })
  .put(authenticate.verifyUser , (req,res, next) => {
    Leader.findByIdAndUpdate(
      req.params.LeaderId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (Leader) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(Leader);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser , (req,res, next) => {
    Leader.findByIdAndRemove(req.params.LeaderId)
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

module.exports = leaderRouter;
