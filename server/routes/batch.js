var express = require('express');
var router = express.Router();
let { BatchModel } = require('../db/batchModel');
let { CourseModel } = require('../db/courseModel');
let { ClassModel } = require("../db/classModel");
let { SectionModel } = require("../db/sectionModel");
let { StudentModel } = require("../db/studentModel");

router.post('/', (req, res) => {
    let relatedCourse = req.body.relatedCourse;
    BatchModel.find({ relatedCourse: relatedCourse }).populate('relatedCourse classes sections students').exec((err, result) => {
        if (err) res.json(err);
        res.json(result);
    });
});
router.post("/remove", (req, res) => {
    BatchModel.findOneAndRemove({
        _id: req.body.ObjId
      })
      .then(batches => ClassModel.deleteMany({
        relatedBatch: req.body.ObjId
      }))
      .then(classes => SectionModel.deleteMany({
        relatedBatch: req.body.ObjId
      }))
      .then(section => StudentModel.deleteMany({
        relatedBatch: req.body.ObjId
      }))
      .then(student => res.json('delOK'))
      .catch(err => res.json(err));

});
router.post('/add', (req, res) => {
    var newBatch = new BatchModel({
        name: req.body.batchTitle,
        relatedCourse: req.body.relatedCourse,
        startDate: req.body.batchStartDate,
        endDate: req.body.batchEndDate,
        status: req.body.status,
        note: req.body.batchNote,
        createdAt: req.body.createdAt,
        teachers: req.body.teachers,
        link: req.body.link
    });

    newBatch.save((err, batch) => {
        if (err) res.json(err)
        var course = CourseModel.findByIdAndUpdate({ _id: req.body.relatedCourse }, {
            $push: {
                batches: batch._id
            }
        }, (err, course) => {
            if (err) res.json(err)
            res.end('Saved Successfully');
        });

    });
});
router.post('/active', (req, res) => {
    let relatedCourse = req.body.courseId;
    BatchModel.find({
        relatedCourse: relatedCourse,
        status: 'Active'
    }, (err, courses) => {
        if (err) res.json(err);
        res.json(courses);
    })
});
router.post('/deactivated', (req, res) => {
    let relatedCourse = req.body.courseId;
    BatchModel.find({ relatedCourse: relatedCourse, status: 'Deactivate' }, (err, courses) => {
        if (err) res.json(err);
        res.json(courses);
    })
});
router.post('/completed', (req, res) => {
    let relatedCourse = req.body.courseId;
    BatchModel.find({ relatedCourse: relatedCourse, status: 'Completed' }, (err, courses) => {
        if (err) res.json(err);
        res.json(courses);
    })
});


//export this router to use in our server.js
module.exports = router;