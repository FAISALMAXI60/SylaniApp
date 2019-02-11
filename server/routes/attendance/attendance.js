var express = require('express');
var router = express.Router();
let { AttendanceModel } = require('../../db/attendanceModel');


router.post('/', (req, res) => {
    AttendanceModel.find({ relatedSection: req.body.sectionId }, (err, result) => {
        if (err) res.json(err);
        res.json(result);
    });
});
router.post('/remove', (req, res) => {
    AttendanceModel.findOneAndDelete({ relatedSection: req.body.sectionId }, (err, result) => {
        if (err) res.json(err);
        res.json(result);
    });
});
router.post('/add', (req, res) => {
    let attendance = new AttendanceModel({
        relatedSection: req.body.sectionId,
        attendance: req.body.attendance
    });
    attendance.save((err, attendance) => {
        if (err) res.json(err)
        res.end('Saved Successfully');
    });
});
router.post('/edit', (req, res) => {
    AttendanceModel.findOneAndUpdate({ relatedSection: req.body.sectionId },{
        $set:{
            attendance:req.body.attendance
        }
    }, (err, result) => {
        if (err) res.json(err);
        res.json(result);
    });
});


//export this router to use in our server.js
module.exports = router;