const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const attendanceSchema = new Schema({
    relatedSection: [{ type: Schema.Types.ObjectId, ref: 'SectionModel' }],
    attendance: {
        required: true, type: Array
    }
});

let AttendanceModel = mongoose.model('AttendanceModel', attendanceSchema)

module.exports = { AttendanceModel };