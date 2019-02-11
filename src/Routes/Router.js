import React from 'react';
import { BrowserRouter,Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import Course from '../components/courses/Course';
import Details from '../components/courses/Details';
import Edit from '../components/courses/Edit';
import AddCourse from '../components/courses/AddCourse';
import ActiveCourses from '../components/courses/ActiveCourses';
import DeactiveCourses from '../components/courses/deactivateCourses';
import CompleteCourses from '../components/courses/completeCourses';
import Batch from '../components/courses/Batch';
import AddBatch from '../components/courses/AddBatch';
import ActiveBatches from '../components/courses/activeBatches';
import DeactiveBatches from '../components/courses/deactiveBatches';
import CompletedBatches from '../components/courses/completedBatches';
import Class from '../components/courses/Class';
import AddClass from '../components/courses/AddClass';
import ActiveClasses from '../components/courses/activeClasses';
import DeactiveClasses from '../components/courses/deactiveClasses';
import CompleteClasses from '../components/courses/completedClasses';
import Section from '../components/courses/Section';
import AddSection from '../components/courses/AddSection';
import ActiveSections from '../components/courses/activeSections';
import DeactiveSections from '../components/courses/deactiveSections';
import CompletedSections from '../components/courses/completedSections';
import Students from '../components/courses/students';
import AddStudent from '../components/courses/addStudent';
import ActiveStudents from '../components/courses/activeStudents';
import EliminatedStudents from '../components/courses/eliminatedStudents';
import CompletedStudents from '../components/courses/completedStudents';
import PrintCards from '../components/courses/createCards';
import createBrowserHistory from 'history/createBrowserHistory';
import Attendance from '../components/attendance/Attendance';
import Batches from '../components/attendance/Batches';
import Classes from '../components/attendance/Classes';
import Sections from '../components/attendance/Sections';
import Login from '../components/courses/Login';
import AttendanceEdit from '../components/attendance/Edit';
import AttendanceStudents from '../components/attendance/Students';
import View from '../components/attendance/View';
import AttendanceDetails from '../components/attendance/AttendanceDetails';
import BlackList from '../components/dashboard/BlackList';
import PublicRoute from './publicRoutes';
import PrivateRoute from './PrivateRoutes';


const history = createBrowserHistory()


const AppRoute = () => {
    return (
        <Router history={history}>
            <Switch>
                <PublicRoute path='/' component={Login} exact={true} />
                <PrivateRoute path='/dashboard' component={Dashboard} exact={true} />
                <PrivateRoute path='/course' component={Course} exact={true} />
                <PrivateRoute path='/:course/details' component={Details} exact={true} />
                <PrivateRoute path='/:course/edit' component={Edit} exact={true} />
                <PrivateRoute path='/:course/add' component={AddCourse} />
                <PrivateRoute path='/:course/active' component={ActiveCourses} />
                <PrivateRoute path='/:course/deactivated' component={DeactiveCourses} />
                <PrivateRoute path='/:course/completed' component={CompleteCourses} />
                <PrivateRoute path='/:course/batch' component={Batch} exact={true} />
                <PrivateRoute path='/:course/:batch/add' component={AddBatch} />
                <PrivateRoute path='/:course/:batch/active' component={ActiveBatches} />
                <PrivateRoute path='/:course/:batch/deactivated' component={DeactiveBatches} />
                <PrivateRoute path='/:course/:batch/completed' component={CompletedBatches} />
                <PrivateRoute path='/:course/:batch/class' component={Class}  exact={true} />
                <PrivateRoute path='/:course/:batch/:class/add' component={AddClass} />
                <PrivateRoute path='/:course/:batch/:class/active' component={ActiveClasses} />
                <PrivateRoute path='/:course/:batch/:class/deactivated' component={DeactiveClasses} />
                <PrivateRoute path='/:course/:batch/:class/completed' component={CompleteClasses} />
                <PrivateRoute path='/:course/:batch/:class/section' component={Section} exact={true}/>
                <PrivateRoute path='/:course/:batch/:class/:section/add' component={AddSection} />
                <PrivateRoute path='/:course/:batch/:class/:section/active' component={ActiveSections} />
                <PrivateRoute path='/:course/:batch/:class/:section/deactivated' component={DeactiveSections} />
                <PrivateRoute path='/:course/:batch/:class/:section/completed' component={CompletedSections} />
                <PrivateRoute path='/:course/:batch/:class/:section/student' component={Students} exact={true}/>
                <PrivateRoute path='/:course/:batch/:class/:section/:student/add' component={AddStudent} exact={true}/>
                <PrivateRoute path='/:course/:batch/:class/:section/:student/active' component={ActiveStudents} exact={true}/>
                <PrivateRoute path='/:course/:batch/:class/:section/:student/eliminated' component={EliminatedStudents} exact={true}/>
                <PrivateRoute path='/:course/:batch/:class/:section/:student/completed' component={CompletedStudents} exact={true}/>
                <PrivateRoute path='/:course/:batch/:class/:section/cards' component={PrintCards} exact={true}/>
                <PrivateRoute path='/attendance' component={Attendance} exact={true} />
                <PrivateRoute path='/attendance/view' component={View} exact={true} />
                <PrivateRoute path='/attendance/view/details' component={AttendanceDetails} exact={true}/>
                <PrivateRoute path='/attendance/view/details/edit' component={AttendanceEdit} exact={true} />
                <PrivateRoute path='/attendance/course/batches' component={Batches} exact={true} />
                <PrivateRoute path='/attendance/course/batches/classes' component={Classes} exact={true} />
                <PrivateRoute path='/attendance/course/batches/classes/sections' component={Sections} exact={true} />
                <PrivateRoute path='/attendance/course/batches/classes/sections/students' component={AttendanceStudents} exact={true} />
                <PrivateRoute path='/blacklist' component={BlackList} exact={true} />
            </Switch>
        </Router>
    );
}

export default AppRoute;