var express = require("express");
var router = express.Router();
let {
  CourseModel
} = require("../db/courseModel");
let {
  BatchModel
} = require("../db/batchModel");
let {
  ClassModel
} = require("../db/classModel");
let {
  SectionModel
} = require("../db/sectionModel");
let {
  StudentModel
} = require("../db/studentModel");

router.post("/", (req, res) => {
  let relatedClass = req.body.classId;
  SectionModel.find({
      relatedClass: relatedClass
    })
    .populate("relatedCourse relatedBatch relatedClass students")
    .exec((err, result) => {
      if (err) res.json(err);
      res.json(result);
    });
});
router.post("/remove", (req, res) => {

  SectionModel.deleteMany({
      _id: req.body.sectionId
    })
    .then(section => StudentModel.deleteMany({
      relatedSection: req.body.sectionId
    }))
    .then(student => res.json('delOK'))
    .catch(err => res.json(err));
});
router.post("/add", (req, res) => {
  var newSection = new SectionModel({
    name: req.body.sectionTitle,
    startTime: req.body.sectionStartTime,
    endTime: req.body.sectionEndTime,
    note: req.body.sectionNote,
    startDate: req.body.sectionStartDate,
    endDate: req.body.sectionEndDate,
    status: req.body.status,
    relatedCourse: req.body.relatedCourse,
    relatedBatch: req.body.relatedBatch,
    relatedClass: req.body.relatedClass,
    createdAt: req.body.createdAt,
    teachers: req.body.teachers,
    link: req.body.link
  });
  newSection.save((err, section) => {
    if (err) res.json(err);
    var course = CourseModel.findByIdAndUpdate({
        _id: req.body.relatedCourse
      }, {
        $push: {
          sections: section._id
        }
      },
      err => {
        if (err) res.json(err);
      }
    );
    var batch = BatchModel.findByIdAndUpdate({
        _id: req.body.relatedBatch
      }, {
        $push: {
          sections: section._id
        }
      },
      err => {
        if (err) res.json(err);
      }
    );
    var classes = ClassModel.findByIdAndUpdate({
        _id: req.body.relatedClass
      }, {
        $push: {
          sections: section._id
        }
      },
      err => {
        if (err) res.json(err);
        res.end("Saved Successfully");
      }
    );
  });
});
router.post("/active", (req, res) => {
  let relatedClass = req.body.classId;
  SectionModel.find({
      relatedClass: relatedClass,
      status: "Active"
    })
    .populate("relatedCourse relatedBatch relatedClass students")
    .exec((err, result) => {
      if (err) res.json(err);
      res.json(result);
    });
});
router.post("/deactivated", (req, res) => {
  let relatedClass = req.body.classId;
  SectionModel.find({
      relatedClass: relatedClass,
      status: "Deactivate"
    })
    .populate("relatedCourse relatedBatch relatedClass students")
    .exec((err, result) => {
      if (err) res.json(err);
      res.json(result);
    });
});
router.post("/completed", (req, res) => {
  let relatedClass = req.body.classId;
  SectionModel.find({
      relatedClass: relatedClass,
      status: "Completed"
    })
    .populate("relatedCourse relatedBatch relatedClass students")
    .exec((err, result) => {
      if (err) res.json(err);
      res.json(result);
    });
});

//export this router to use in our server.js
module.exports = router;