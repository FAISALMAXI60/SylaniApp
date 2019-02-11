const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { BatchModel } = require('./batchModel');
const { ClassModel } = require('./classModel');
const { SectionModel } = require('./sectionModel');
const { StudentModel } = require('./studentModel');



const courseSchema =new Schema({
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
    status: String,
    link: String,
    createdAt: String,
    note:String,
    batches: [{ type: Schema.Types.ObjectId, ref: 'BatchModel' }],
    classes: [{ type: Schema.Types.ObjectId, ref: 'ClassModel' }],
    sections: [{ type: Schema.Types.ObjectId, ref: 'SectionModel' }],
    students: [{ type: Schema.Types.ObjectId, ref: 'StudentModel' }],
});

let CourseModel = mongoose.model('CourseModel', courseSchema);

module.exports = { CourseModel };