var express = require('express');
var router = express.Router();
let { BlackListModal } = require('../db/blackListModal');


router.post('/', (req, res) => {
    BlackListModal.find({}, (err, result) => {
        if (err) res.json(err);
        res.json(result);
    });
});
router.post('/add', (req, res) => {
    let cnic = req.body.cnic;
    let note = req.body.note;
    let blackListPerson = new BlackListModal({
        cnic, note
    });
    blackListPerson.save((err, result) => {
        let error = [];
        if (err) error.push(err);
        BlackListModal.find({}, (err, result) => {
            if (err) {
                error.push(err);
                res.json({error});
            }
            res.json(result);
        });
    })
});
router.post('/remove', (req, res) => {
    BlackListModal.findByIdAndRemove(req.body.id, (err, result) => {
        if (err) res.json(err);
        BlackListModal.find({}, (err, result) => {
            if (err) res.json(err);
            res.json(result);
        });
    });
});

//export this router to use in our server.js
module.exports = router;