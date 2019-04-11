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
let {
  BlackListModal
} = require("../db/blackListModal");

router.post("/", (req, res) => {
  let relatedSection = req.body.sectionId;
  StudentModel.find({
    relatedSection: relatedSection
  })
    .populate("relatedCourse relatedBatch relatedClass relatedSection")
    .exec((err, result) => {
      if (err) res.json(err);
      res.json(result);
    });
});
router.post("/remove", (req, res) => {
  StudentModel.findOneAndRemove({
    _id: req.body.studentId
  })
    .then(student => res.json(student))
    .catch(err => res.json(err));
});
router.post("/add", (req, res) => {
  StudentModel.find({
    cnic: req.body.cnic,
    status: "Active"
  })
    .populate("relatedCourse")
    .exec((err, result) => {
      if (err) res.json(err);
      if (result.length >= 2) {
        res.json({
          error: "Already In Two Course",
          relatedCourses: `Course One: ${
            result[0].relatedCourse[0].name
            }, Course Two: ${result[1].relatedCourse[0].name}`
        });
      } else {
        BlackListModal.find({
          cnic: req.body.cnic
        }, (err, result) => {
          if (err) res.json(err);
          if (result.length !== 0) {
            res.json({
              blacklist: "You Are In BlackList Contact Office"
            });
          } else {
            var newStudent = new StudentModel({
              rollNo: req.body.rollNo,
              name: req.body.studentName,
              email: req.body.email,
              note: req.body.note,
              fatherName: req.body.fatherName,
              cnic: req.body.cnic,
              contact: req.body.studentContactNumber,
              guardianContact: req.body.guardianContactNumber,
              status: req.body.status,
              relatedCourse: req.body.relatedCourse,
              relatedBatch: req.body.relatedBatch,
              relatedClass: req.body.relatedClass,
              relatedSection: req.body.relatedSection,
              createdAt: req.body.createdAt,
              link: req.body.link
            });
            newStudent.save((err, student) => {
              if (err) res.json(err);
              var course = CourseModel.findByIdAndUpdate({
                _id: req.body.relatedCourse
              }, {
                  $push: {
                    students: student._id
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
                    students: student._id
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
                    students: student._id
                  }
                },
                err => {
                  if (err) res.json(err);
                }
              );
              var section = SectionModel.findByIdAndUpdate({
                _id: req.body.relatedSection
              }, {
                  $push: {
                    students: student._id
                  }
                },
                err => {
                  if (err) res.json(err);
                  res.end("Saved Successfully");
                }
              );
            });
          }
        });
      }
    });
});
router.post("/addexcel", (req, res) => {
  var newStudent = new StudentModel({
    rollNo: req.body.rollNo,
    name: req.body.studentName,
    email: req.body.email,
    note: req.body.note,
    fatherName: req.body.fatherName,
    cnic: req.body.cnic,
    contact: req.body.studentContactNumber,
    guardianContact: req.body.guardianContactNumber,
    status: req.body.status,
    relatedCourse: req.body.relatedCourse,
    relatedBatch: req.body.relatedBatch,
    relatedClass: req.body.relatedClass,
    relatedSection: req.body.relatedSection,
    createdAt: req.body.createdAt,
    link: req.body.link
  });
  newStudent.save((err, student) => {
    if (err) res.json(err);
    var course = CourseModel.findByIdAndUpdate({
      _id: req.body.relatedCourse
    }, {
        $push: {
          students: newStudent._id
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
          students: newStudent._id
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
          students: newStudent._id
        }
      },
      err => {
        if (err) res.json(err);
      }
    );
    var section = SectionModel.findByIdAndUpdate({
      _id: req.body.relatedSection
    }, {
        $push: {
          students: newStudent._id
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
  let relatedSection = req.body.sectionId;
  StudentModel.find({
    status: "Active",
    relatedSection
  })
    .populate("relatedCourse relatedBatch relatedClass relatedSection")
    .exec((err, result) => {
      if (err) res.json(err);
      res.json(result);
    });
});
router.post("/eliminated", (req, res) => {
  let relatedSection = req.body.sectionId;
  StudentModel.find({
    status: "Eliminated",
    relatedSection: relatedSection
  })
    .populate("relatedCourse relatedBatch relatedClass relatedSection")
    .exec((err, result) => {
      if (err) res.json(err);
      res.json(result);
    });
})

router.put("/edit/:pid", (req, res) => {
  // let relatedSection = req.body.sectionId;
  let status = req.body.status;
  StudentModel.findByIdAndUpdate(req.params.pid, { status: status }, function (err, user) {
    if (err) res.json(err);

    let updated = user.toJSON();
    updated.status = req.body.status;

      res.json(updated);
  })

});

router.post("/completed", (req, res) => {
  let relatedSection = req.body.sectionId;
  StudentModel.find({
    status: "Completed",
    relatedSection: relatedSection
  })
    .populate("relatedCourse relatedBatch relatedClass relatedSection")
    .exec((err, result) => {
      if (err) res.json(err);
      res.json(result);
    });
});

//export this router to use in our server.js
module.exports = router;