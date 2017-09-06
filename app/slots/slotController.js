var Slot = require('./slotModel');

exports.createSlot = function (req, res) {
  Slot.create(req.body, function (err, todo) {
    if (err) {
      res.send(err);
    }
    Slot.find(function (err, slots) {
      if (err) {
        res.send(err);
      }
      res.json(slots);
    });
  });

}

exports.getAllSlots = function (req, res) {
  Slot.find(function (err, slots) {
    if (err) {
      res.send(err);
    }
    res.json(slots);
  });

}