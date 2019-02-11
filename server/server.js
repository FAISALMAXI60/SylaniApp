const sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect("mongodb://amirali:123ABCd@ds153890.mlab.com:53890/saylanidb");
// mongoose.connect("mongodb://localhost:27017/saylaniapp");
const Course = require('./routes/course');
const Edit = require('./routes/edit');
const Batch = require('./routes/batch');
const Class = require('./routes/class');
const Section = require('./routes/section');
const Student = require('./routes/student');
const Dashboard = require('./routes/dashboard');
const BlackList = require('./routes/blacklist');
const Attendance = require('./routes/attendance/attendance');
const TempAttendanceModel = require('./routes/attendance/temporary');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
let port = process.env.PORT || 3000;


mongoose.Promise = global.Promise;
//some important middlewears
app.use(sslRedirect());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/dashboard', Dashboard);
app.use('/attendance', Attendance);
app.use('/attendance/temporary', TempAttendanceModel);
app.use('/blacklist', BlackList);
app.use('/course', Course);
app.use('/course/edit', Edit);
app.use('/course/batch', Batch);
app.use('/course/batch/class', Class);
app.use('/course/batch/class/section', Section);
app.use('/course/batch/class/section/student', Student);

// app.use(express.static('../public'));
app.use(express.static(path.join(__dirname, '../build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

io.on('connection',function(socket){
    socket.on('send_data',function(args){
        socket.broadcast.emit('recieve_data',args);
    });
    socket.on('response',function(args){
        socket.broadcast.emit('recieve_response',args);
    });
})

http.listen(port, () => {
    console.log(`server is up at ${port}`);
});