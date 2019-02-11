var express = require('express');
var router = express.Router();
let { CourseModel } = require('../db/courseModel');
let { BatchModel } = require('../db/batchModel');
let { ClassModel } = require('../db/classModel');
let { SectionModel } = require('../db/sectionModel');
let { StudentModel } = require('../db/studentModel');

var AllCourses, totalCourses, activeCourses, deactiveCourses, completedCourses,
    AllBatches, totalBatches, activeBatches, deactiveBatches, completedBatches,
    AllClasses, totalClasses, activeClasses, deactiveClasses, completedClasses,
    AllSections, totalSections, activeSections, deactiveSections, completedSections,
    AllStudents, totalStudents, activeStudents, eliminatedStudents, completedStudents, dublicatedStudents;
router.post('/courses', (req, res) => {
    const setTotalCourses = (courses) => {
        return courses ? totalCourses = courses.length : totalCourses = 0;
    }
    const setActiveCourses = (courses) => {
        return courses ? activeCourses = courses.length : activeCourses = 0;
    }
    const setDeactiveCourses = (courses) => {
        courses ? deactiveCourses = courses.length : deactiveCourses = 0;
    }
    const setCompletedCourses = (courses) => {
        courses ? completedCourses = courses.length : completedCourses = 0;
        return res.json({ AllCourses, totalCourses, activeCourses, deactiveCourses, completedCourses });
    }
    CourseModel.find({}, (err, result) => {
        if (err) throw err;
        AllCourses = result;
        setTotalCourses(result);
    })
    CourseModel.find({ status: 'Active' }, (err, courses) => {
        if (err) throw err;
        setActiveCourses(courses);
    });
    CourseModel.find({ status: 'Deactivate' }, (err, courses) => {
        if (err) throw err;
        setDeactiveCourses(courses);
    });
    CourseModel.find({ status: 'Completed' }, (err, courses) => {
        if (err) throw err;
        setCompletedCourses(courses);
    });


});
router.post('/batches', (req, res) => {
    const setTotalBatches = (batches) => {
        return batches ? totalBatches = batches.length : totalBatches = 0;
    }
    const setActiveBatches = (batches) => {
        return batches ? activeBatches = batches.length : activeBatches = 0;
    }
    const setDeactiveBatches = (batches) => {
        batches ? deactiveBatches = batches.length : deactiveBatches = 0;
    }
    const setCompletedBatches = (batches) => {
        batches ? completedBatches = batches.length : completedBatches = 0;
        return res.json({ AllBatches, totalBatches, activeBatches, deactiveBatches, completedBatches });
    }
    BatchModel.find({}, (err, result) => {
        if (err) throw err;
        AllBatches = result;
        setTotalBatches(result);
    })
    BatchModel.find({ status: 'Active' }, (err, Batches) => {
        if (err) throw err;
        setActiveBatches(Batches);
    });
    BatchModel.find({ status: 'Deactivate' }, (err, Batches) => {
        if (err) throw err;
        setDeactiveBatches(Batches);
    });
    BatchModel.find({ status: 'Completed' }, (err, Batches) => {
        if (err) throw err;
        setCompletedBatches(Batches);
    });


});
router.post('/classes', (req, res) => {
    const setTotalClasses = (classes) => {
        return classes ? totalClasses = classes.length : totalClasses = 0;
    }
    const setActiveClasses = (Classes) => {
        return Classes ? activeClasses = Classes.length : activeClasses = 0;
    }
    const setDeactiveClasses = (Classes) => {
        Classes ? deactiveClasses = Classes.length : deactiveClasses = 0;
    }
    const setCompletedClasses = (Classes) => {
        Classes ? completedClasses = Classes.length : completedClasses = 0;
        return res.json({ AllClasses, totalClasses, activeClasses, deactiveClasses, completedClasses });
    }
    ClassModel.find({}, (err, result) => {
        if (err) throw err;
        AllClasses = result;
        setTotalClasses(result);
    })
    ClassModel.find({ status: 'Active' }, (err, Classes) => {
        if (err) throw err;
        setActiveClasses(Classes);
    });
    ClassModel.find({ status: 'Deactivate' }, (err, Classes) => {
        if (err) throw err;
        setDeactiveClasses(Classes);
    });
    ClassModel.find({ status: 'Completed' }, (err, Classes) => {
        if (err) throw err;
        setCompletedClasses(Classes);
    });


});
router.post('/sections', (req, res) => {
    const setTotalSections = (Sections) => {
        return Sections ? totalSections = Sections.length : totalSections = 0;
    }
    const setActiveSections = (Sections) => {
        return Sections ? activeSections = Sections.length : activeSections = 0;
    }
    const setDeactiveSections = (Sections) => {
        Sections ? deactiveSections = Sections.length : deactiveSections = 0;
    }
    const setCompletedSections = (Sections) => {
        Sections ? completedSections = Sections.length : completedSections = 0;
        return res.json({ AllSections, totalSections, activeSections, deactiveSections, completedSections });
    }
    SectionModel.find({}, (err, result) => {
        if (err) throw err;
        AllSections = result;
        setTotalSections(result);
    })
    SectionModel.find({ status: 'Active' }, (err, Sections) => {
        if (err) throw err;
        setActiveSections(Sections);
    });
    SectionModel.find({ status: 'Deactivate' }, (err, Sections) => {
        if (err) throw err;
        setDeactiveSections(Sections);
    });
    SectionModel.find({ status: 'Completed' }, (err, Sections) => {
        if (err) throw err;
        setCompletedSections(Sections);
    });


});
router.post('/students', (req, res) => {
    const setTotalStudents = (Students) => {
        return Students ? totalStudents = Students.length : totalStudents = 0;
    }
    const setActiveStudents = (Students) => {
        return Students ? activeStudents = Students.length : activeStudents = 0;
    }
    const setEliminatedStudents = (Students) => {
        Students ? eliminatedStudents = Students.length : eliminatedStudents = 0;
    }
    const setCompletedStudents = (Students) => {
        Students ? completedStudents = Students.length : completedStudents = 0;
    }
    const setDublicatedStudents = (Students) => {
        Students ? dublicatedStudents = Students : dublicatedStudents = 0;
        return res.json({ AllStudents, totalStudents, activeStudents, eliminatedStudents, completedStudents, dublicatedStudents });
    }

    StudentModel.find({}, (err, result) => {
        if (err) throw err;
        AllStudents = result;
        setTotalStudents(result);
    })
    StudentModel.find({ status: 'Active' }, (err, Students) => {
        if (err) throw err;
        setActiveStudents(Students);
    });
    StudentModel.find({ status: 'Eliminated' }, (err, Students) => {
        if (err) throw err;
        setEliminatedStudents(Students);
    });
    StudentModel.find({ status: 'Completed' }, (err, Students) => {
        if (err) throw err;
        setCompletedStudents(Students);
    });
    StudentModel.find({ status: 'Completed' }, (err, Students) => {
        if (err) throw err;
        setCompletedStudents(Students);
    });
    StudentModel.aggregate([
        {
            $group: {
                _id: { cnic: "$cnic" },
                uniqueIds: { $addToSet: "$_id" },
                count: { $sum: 1 }
            }
        },
        {
            $match: {
                count: { $gt: 1 }
            }
        }
    ], (err, result) => {
        if (err) throw err;
        setDublicatedStudents(result[0] ? result[0].count : 0);
    });


});

//export this router to use in our server.js
module.exports = router;