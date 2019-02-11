const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const attendanceSchema = new Schema({
    relatedSection: [{ type: Schema.Types.ObjectId, ref: 'SectionModel' }],
    attendance: {
        required: true, type: Array
    }
});

let TempAttendanceModel = mongoose.model('TempAttendanceModel', attendanceSchema)

module.exports = { TempAttendanceModel };