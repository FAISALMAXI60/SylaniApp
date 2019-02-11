let {
  BatchModel
} = require("../db/batchModel");
let {
  CourseModel
} = require("../db/courseModel");
let {
  ClassModel
} = require("../db/classModel");
let {
  SectionModel
} = require("../db/sectionModel");
let {
  StudentModel
} = require("../db/studentModel");
const express = require("express");
const router = express.Router();

var courses, totalStudents, eliminatedStudents, activeStudents;
router.get("/", (req, res) => {
  CourseModel.find({})
    .populate("batches classes sections students")
    .exec((err, result) => {
      if (err) res.json(err);
      res.json(result);
    });
});
router.post("/remove", (req, res) => {
  CourseModel.findOneAndRemove({
      _id: req.body.ObjId
    })
    .then(course => BatchModel.deleteMany({
      relatedCourse: req.body.ObjId
    }))
    .then(batches => ClassModel.deleteMany({
      relatedCourse: req.body.ObjId
    }))
    .then(classes => SectionModel.deleteMany({
      relatedCourse: req.body.ObjId
    }))
    .then(section => StudentModel.deleteMany({
      relatedCourse: req.body.ObjId
    }))
    .then(student => res.json('delOK'))
    .catch(err => res.json(err));
});
router.post("/add", (req, res) => {
  var newCourse = new CourseModel({
    name: req.body.courseTitle,
    startDate: req.body.courseStartDate,
    endDate: req.body.courseEndDate,
    status: req.body.status,
    note: req.body.courseNote,
    createdAt: req.body.createdAt,
    teachers: req.body.teachers,
    link: req.body.link
  });
  newCourse.save((err, course) => {
    if (err) res.json(err);
    res.end("Saved Successfully");
  });
});
router.get("/active", (req, res) => {
  CourseModel.find({
    status: "Active"
  }, (err, courses) => {
    if (err) res.json(err);
    res.json(courses);
  });
});
router.get("/deactivated", (req, res) => {
  CourseModel.find({
    status: "Deactivate"
  }, (err, courses) => {
    if (err) res.json(err);
    res.json(courses);
  });
});
router.get("/completed", (req, res) => {
  CourseModel.find({
    status: "Completed"
  }, (err, courses) => {
    if (err) res.json(err);
    res.json(courses);
  });
});

//export this router to use in our server.js
module.exports = router;