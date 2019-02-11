const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { CourseModel } = require('./courseModel');
const { ClassModel } = require('./classModel');
const { SectionModel } = require('./sectionModel');
const { StudentModel } = require('./studentModel');



const batchSchema = new Schema({
    name: {
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
    classes: [{ type: Schema.Types.ObjectId, ref: 'ClassModel' }],
    sections: [{ type: Schema.Types.ObjectId, ref: 'SectionModel' }],
    students: [{ type: Schema.Types.ObjectId, ref: 'StudentModel' }],
    status: String,
    link: String,
    createdAt: String,
});

let BatchModel = mongoose.model('BatchModel', batchSchema)

module.exports = { BatchModel };