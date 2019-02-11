var express = require('express');
var router = express.Router();
let { TempAttendanceModel } = require('../../db/tempAttendanceModel');


router.post('/', (req, res) => {
    TempAttendanceModel.find({ relatedSection: req.body.sectionId }, (err, result) => {
        if (err) res.json(err);
        res.json(result);
    });
});
router.post('/add', (req, res) => {
    let attendance = new TempAttendanceModel({
        relatedSection: req.body.sectionId,
        attendance: req.body.attendance
    });
    attendance.save((err, attendance) => {
        if (err) res.json(err)
        res.end('Saved Successfully');
    });
});
router.post('/remove', (req, res) => {
    TempAttendanceModel.findByIdAndRemove({ _id: req.body.tempId }, (err, result) => {
        if (err) res.json(err);
        res.json(result);
    });
});



//export this router to use in our server.js
module.exports = router;