const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { CourseModel } = require('./courseModel');
const { BatchModel } = require('./batchModel');
const { ClassModel } = require('./classModel');
const { SectionModel } = require('./sectionModel');


const studentSchema = new Schema({
    rollNo: {
        required: true, type: Number
    },
    name: {
        required: true, type: String
    },
    fatherName: {
        required: true, type: String
    },
    cnic: {
        required: true, type: String
    },
    contact: {
        required: true, type: String
    },
    guardianContact: {
        required: true, type: String
    },
    email: {
        required: true, type: String
    },
    note: String,
    relatedCourse: [{ type: Schema.Types.ObjectId, ref: 'CourseModel' }],
    relatedBatch: [{ type: Schema.Types.ObjectId, ref: 'BatchModel' }],
    relatedClass: [{ type: Schema.Types.ObjectId, ref: 'ClassModel' }],
    relatedSection: [{ type: Schema.Types.ObjectId, ref: 'SectionModel' }],
    status: String,
    link: String,
    createdAt: String,
});

let StudentModel = mongoose.model('StudentModel', studentSchema);

module.exports = { StudentModel };