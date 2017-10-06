"use strict";
var Slot = require('./slotModel');
var HttpStatus = require('http-status-codes');

var defaultHttpErrMsg = HttpStatus.INTERNAL_SERVER_ERROR;

exports.createSlot = function (req, res) {
    req.body.companyId = req.user.companyId;
  Slot.create(req.body, function (err, todo) {
    if (err) {
      res
        .status(HttpStatus.defaultHttpErrMsg)
        .send(err);
    }
    res
    .status(HttpStatus.CREATED)
    .send({message: "slot is created"})
  });

}

exports.getAllSlots = function (req, res) {
  Slot.find({companyId: req.user.companyId},function (err, slots) {
    if (err) {
      res
        .status(HttpStatus.defaultHttpErrMsg)
        .send(err);
    }
    res.json(slots);
  });
}

exports.getSlotsByCompanyId = function (req, res) {
  Slot.findOne({ "_id": req.params.companyId }, function (err, slots) {
    if (err) {
      res
        .status(HttpStatus.defaultHttpErrMsg)
        .send({message: "slot does not exist"});
    }
    res.json(slots);
  });
};

exports.updateSlotById = function (req, res) {
    req.body.companyId = req.user.companyId;
  Slot.findByIdAndUpdate(req.params.slotId, req.body, function (err, slot) {
    if (err) {
      res
        .status(HttpStatus.defaultHttpErrMsg)
        .send(err);
    }
    Slot.findById(req.params.slotId, function (err, slot) {
      if (err) {
        res
          .status(HttpStatus.defaultHttpErrMsg)
          .send({message: "slot does not exist"});
      }
      res.json(slot);
    })
  })
};

exports.deleteSlot = function (req, res) {
  Slot.findByIdAndRemove(req.params.slotId, function(err, slot){
    if(err){
      res
      .status(HttpStatus.defaultHttpErrMsg)
      .send({message: "slot does not exist"});
    }
    res.json(slot);
  })

};

exports.deleteAllSlots = function (req, res) {
    Slot.collection.drop()
        .then(() => {
        res.status(HttpStatus.OK).send({ "message": "All slots have been deleted successfully" });
}, () => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ "message": "Failed to delete slots" });
    });
}