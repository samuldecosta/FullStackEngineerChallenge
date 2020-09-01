const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Employee = require("../../models/Employees");
const Feedback = require("../../models/Feedbacks");
const RequestPool = require("../../models/RequestPool");

//@route  POST api/feedback
//@desc   Submit Feedback
//@access Private

router.post(
  "/",
  [auth, [check("summary", "Feedback summary is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const {
      body: {
        reqId = "",
        employee,
        feedbackId,
        summary,
        overAllPerformance = 0,
      },
    } = req;
    console.log(req.body);
    const submitter = await Employee.findById(req.employee.id);
    const isAdmin = submitter.isAdmin;
    const modelObject = reqId
      ? {
          reviewer: req.employee.id,
          employee: employee,
          summary,
          reviewerName: submitter.name,
          level: overAllPerformance,
          request: reqId,
        }
      : {
          reviewer: req.employee.id,
          employee: employee,
          summary,
          reviewerName: submitter.name,
          level: overAllPerformance,
        };
    const updatedFeedbackObject = new Feedback(modelObject);

    try {
      //Check if request exist in request pool
      if (reqId) {
        const selectedRequest = await RequestPool.findById(reqId);
        if (selectedRequest) {
          selectedRequest.completed = true;
          await RequestPool.findByIdAndUpdate(reqId, selectedRequest, {
            new: true,
          });
        }
      }
      //check if feedback id is available if availabel then update and return
      if (feedbackId) {
        const selectedFeedback = await Feedback.findById(feedbackId);
        selectedFeedback.summary = summary;
        selectedFeedback.reviewerName = submitter.name;
        selectedFeedback.reviewer = req.employee.id;
        const testupdate = await Feedback.findByIdAndUpdate(
          feedbackId,
          selectedFeedback,
          {
            new: true,
          }
        );
      } else {
        // if new feedback then save
        await updatedFeedbackObject.save();
      }
      const data = await Feedback.find({ employee: employee });
      if (isAdmin) {
        return res.json({ success: true, data });
      } else {
        return res.json({ success: true, data: [] });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route  PUT api/feedback
//@desc   Update Feedback
//@access Private
router.put("/", auth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.employee.id);
    const isAdmin = employee.isAdmin;
    if (!isAdmin) {
      return res.status(400).send("Unauthorise access to update feedback");
    }
    const {
      body: { feedbackId, summary, overAllPerformance },
    } = req;
    const updatedFeedback = await Feedback.findById(feedbackId);
    updatedFeedback.level = overAllPerformance;
    updatedFeedback.reviewer = req.employee.id;
    updatedFeedback.summary = summary;
    updatedFeedback.save();
    return res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

//@route  DELETE api/feedback
//@desc   delete feedback
//@access Private
router.delete("/", auth, async (req, res) => {
  try {
    const { id } = req.body;
    const employee = await Employee.findById(req.employee.id);
    const isAdmin = employee && employee.isAdmin;
    if (!isAdmin) {
      return res.status(400).json({ msg: "Unauthorised Access" });
    }
    await Feedback.findOneAndRemove({ _id: id });
    return res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

//@route  GET api/feedback/:empId
//@desc   GET feeds for specific empId
//@access Private

router.get("/:empId", auth, async (req, res) => {
  try {
    const submitter = await Employee.findById(req.employee.id);
    const isAdmin = submitter.isAdmin;
    if (!isAdmin) {
      return res.json({ success: true, data: [] });
    }
    const feedbackList = await Feedback.find({ employee: req.params.empId });
    return res.json({ success: true, data: feedbackList });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
