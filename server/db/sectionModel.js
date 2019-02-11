const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { CourseModel } = require('./courseModel');
const { BatchModel } = require('./batchModel');
const { ClassModel } = require('./classModel');
const { StudentModel } = require('./studentModel');
const { AttendanceModel } = require('./attendanceModel');



const sectionSchema = new Schema({
    name: {
        required: true, type: String
    },
    startTime: {
        required: true, type: String
    },
    endTime: {
        required: true, type: String
    },
    startDate: {
        required: true, type: String
    },
    endDate: {
        required: true, type: String
    },
    teachers: {
        required: true, type: Array
    },
    note:String,
    relatedCourse: [{ type: Schema.Types.ObjectId, ref: 'CourseModel' }],
    relatedBatch: [{ type: Schema.Types.ObjectId, ref: 'BatchModel' }],
    relatedClass: [{ type: Schema.Types.ObjectId, ref: 'ClassModel' }],
    students: [{ type: Schema.Types.ObjectId, ref: 'StudentModel' }],
    attendance: [{ type: Schema.Types.ObjectId, ref: 'AttendanceModel' }],
    status: String,
    link: String,
    createdAt: String,
});

let SectionModel = mongoose.model('SectionModel', sectionSchema);

module.exports = { SectionModel };