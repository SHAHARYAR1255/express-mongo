const cors = require('./cors');
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
  .post(cors.corsWithOptions,authenticate.verifyUser ,authenticate.verifyAdmin, (req,res, next) => {
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
  .put(cors.corsWithOptions,authenticate.verifyUser ,authenticate.verifyAdmin, (req,res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /Leader");
  })
  .delete(cors.corsWithOptions,authenticate.verifyUser ,authenticate.verifyAdmin, (req,res, next) => {
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
  .post(cors.corsWithOptions,authenticate.verifyUser ,authenticate.verifyAdmin, (req,res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /Leader/" + req.params.LeaderId);
  })
  .put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin, (req,res, next) => {
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
  .delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,  (req,res, next) => {
    // if (!req.user.admin){
    //   return new Error('you are not authenticated to do so!!')
    // }
    console.log("req", req)
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
