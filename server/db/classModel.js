const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { CourseModel } = require('./courseModel');
const { BatchModel } = require('./batchModel');
const { SectionModel } = require('./sectionModel');
const { StudentModel } = require('./studentModel');



const classSchema = new Schema({
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
    relatedBatch: [{ type: Schema.Types.ObjectId, ref: 'BatchModel' }],
    sections: [{ type: Schema.Types.ObjectId, ref: 'SectionModel' }],
    students: [{ type: Schema.Types.ObjectId, ref: 'StudentModel' }],
    status: String,
    link: String,
    createdAt: String,
});

let ClassModel = mongoose.model('ClassModel', classSchema);

module.exports = { ClassModel };