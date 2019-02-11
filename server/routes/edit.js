var express = require('express');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
var router = express.Router();
let { CourseModel } = require('../db/courseModel');
let { BatchModel } = require('../db/batchModel');
let { ClassModel } = require('../db/classModel');
let { SectionModel } = require('../db/sectionModel');
let { StudentModel } = require('../db/studentModel');


router.post('/', (req, res) => {
    if (req.body.oldSection != req.body.relatedSection) {
        let oldSection = SectionModel.findByIdAndUpdate({ _id: req.body.oldSection }, {
            $pull: {
                students: req.body.id
            }
        }, (err) => {
            if (err) res.json(err);
        });
        let newSection = SectionModel.findByIdAndUpdate({ _id: req.body.relatedSection }, {
            $push: {
                students: req.body.id
            }
        }, (err) => {
            if (err) res.json(err);
        });
    }
    var id = req.body.id;
    BatchModel.findOneAndUpdate({ _id: id }, {
        $set: {
            teachers: req.body.teachers,
            startDate: req.body.startDate,
            note: req.body.note,
            endDate: req.body.endDate,
            status: req.body.status
        }
    }).then((err, updatedResult) => {
        if (err) res.json(err);
        res.json(updatedResult)
    });
    CourseModel.findOneAndUpdate({ _id: id }, {
        $set: {
            teachers: req.body.teachers,
            startDate: req.body.startDate,
            note: req.body.note,
            endDate: req.body.endDate,
            status: req.body.status
        }
    }).then((err, updatedResult) => {
        if (err) res.json(err);
        res.json(updatedResult);
    });
    ClassModel.findOneAndUpdate({ _id: id }, {
        $set: {
            teachers: req.body.teachers,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            note: req.body.note,
            status: req.body.status
        }
    }).then((err, updatedResult) => {
        if (err) res.json(err);
        res.json(updatedResult);
    });
    SectionModel.findOneAndUpdate({ _id: id }, {
        $set: {
            teachers: req.body.teachers,
            note: req.body.note,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            status: req.body.status,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
        }
    }).then((err, updatedResult) => {
        if (err) res.json(err);
        res.json(updatedResult);
    });
    StudentModel.findOneAndUpdate({ _id: id }, {
        $set: {
            rollNo: req.body.rollNo,
            name: req.body.name,
            note: req.body.note,
            fatherName: req.body.fatherName,
            cnic: req.body.cnic,
            contact: req.body.contact,
            guardianContact: req.body.guardianContact,
            relatedSection: [req.body.relatedSection],
            email: req.body.email,
            status: req.body.status,

        }
    }).then((err, updatedResult) => {
        if (err) res.json(err);

        res.json(updatedResult);
    });

});
router.post('/getSections', (req, res) => {
    let relatedCourse = req.body.relatedCourse,
        relatedBatch = req.body.relatedBatch,
        relatedClass = req.body.relatedClass;
    SectionModel.find(
        { relatedClass: relatedClass }, (err, sections) => {
            if (err) res.json(err);
            res.json(sections);
        }
    )

})


module.exports = router;