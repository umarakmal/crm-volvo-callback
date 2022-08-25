const Agent = require("../models/agent");

exports.input = (req, res) => {
  // Create a employee
  var agent = new Agent({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    interest: req.body.interest,
    state: req.body.state,
    city: req.body.city,
    zip: req.body.zip,
    address: req.body.address,
  });
  // Save employee in the database
  agent
    .save(agent)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Input Form.",
      });
    });
};

exports.getAll = (req, res) => {
  Agent.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while getting all roles.",
      });
    });
};

exports.postAll = (req, res) => {
  var startDate = req.body.date1;
  var endDate = req.body.date2;
  Agent.find({ createdAt: { $gte: startDate, $lt: endDate } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while getting all roles.",
      });
    });
};

exports.getFirstdata = (req, res) => {
  const { flag } = req.body;
  Agent.findOneAndUpdate({ $set: { flag } })
    .sort({ _id: -1 })
    .exec((err, agent) => {
      if (err || !agent) {
        return res.status(400).json({
          error: "Agent not found",
        });
      }
      res.status(200).json(agent);
    });
};

exports.postchurndata = (req, res) => {
  const { flag } = req.body;
  Agent.findOneAndUpdate({ flag: 1 }, { $set: { flag } })
    .sort({ _id: -1 })
    .exec((err, agent) => {
      if (err || !agent) {
        return res.status(400).json({
          error: "Agent not found",
        });
      }
      res.status(200).json(agent);
    });
};

exports.getchurndata = (req, res) => {
  // const { flag } = req.body;
  Agent.find({ flag: 1 })
    .sort({ _id: -1 })
    .exec((err, agent) => {
      if (err || !agent) {
        return res.status(400).json({
          error: "Agent not found",
        });
      }
      res.status(200).json(agent);
    });
};
