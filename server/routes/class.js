var express = require('express');
var router = express.Router();
let { CourseModel } = require('../db/courseModel');
let { BatchModel } = require('../db/batchModel');
let { ClassModel } = require('../db/classModel');
let { SectionModel } = require("../db/sectionModel");
let { StudentModel } = require("../db/studentModel");


router.post('/', (req, res) => {
    let relatedBatch = req.body.batchId;
    ClassModel.find({ relatedBatch: relatedBatch }).populate('relatedCourse relatedBatch sections students').exec((err,result)=>{
        if(err) res.json(err);
        res.json(result);
    });
});
router.post("/remove", (req, res) => {

      ClassModel.deleteMany({
        _id: req.body.classId
      })
      .then(classes => SectionModel.deleteMany({
        relatedClass: req.body.classId
      }))
      .then(section => StudentModel.deleteMany({
        relatedClass: req.body.classId
      }))
      .then(student => res.json('delOK'))
      .catch(err => res.json(err));
});
router.post('/add', (req, res) => {

    var newClass = new ClassModel({
        name: req.body.classTitle,
        relatedCourse: req.body.relatedCourse,
        relatedBatch: req.body.relatedBatch,
        note: req.body.classNote,
        startDate: req.body.classStartDate,
        endDate: req.body.classEndDate,
        status: req.body.status,
        createdAt: req.body.createdAt,
        teachers: req.body.teachers,
        link: req.body.link
    });
    newClass.save((err, savedClass) => {
        if (err) res.json(err);
        var course = CourseModel.findByIdAndUpdate({ _id: req.body.relatedCourse }, {
            $push: {
                classes: savedClass._id
            }
        }, (err, course) => {
            if (err) res.json(err)
        });
        var batch = BatchModel.findByIdAndUpdate({ _id: req.body.relatedBatch }, {
            $push: {
                classes: savedClass._id
            }
        }, (err, batch) => {
            if (err) res.json(err)
            res.end('Saved Successfully');
        });
    });
});
router.post('/active', (req, res) => {
    let relatedBatch = req.body.batchId;
    ClassModel.find(
        { relatedBatch: relatedBatch, status: 'Active' },
        (err, classes) => {
            if (err) res.json(err);
            res.json(classes);
        })
});
router.post('/deactivated', (req, res) => {
    let relatedBatch = req.body.batchId;
    ClassModel.find(
        { relatedBatch: relatedBatch, status: 'Deactivate' },
        (err, classes) => {
            if (err) res.json(err);
            res.json(classes);
        })
});
router.post('/completed', (req, res) => {
    ;
    let relatedBatch = req.body.batchId;
    ClassModel.find(
        { relatedBatch: relatedBatch, status: 'Completed' },
        (err, classes) => {
            if (err) res.json(err);
            res.json(classes);
        })
});


//export this router to use in our server.js
module.exports = router;